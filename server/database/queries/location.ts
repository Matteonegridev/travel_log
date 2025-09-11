import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import type { LocationSchemaValidation } from "../schema";

import db from "../index";
import { location } from "../schema";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

export async function findExistingLocation(locationName: LocationSchemaValidation, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, locationName.name),
      eq(location.userId, userId),
    ),
  });
}

async function findExistingSlug(slug: string) {
  return db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function getUniqueSlug(slugName: string): Promise<string> {
  let existing = !!(await findExistingSlug(slugName));

  while (existing) {
    const id = nanoid();
    const slugId = `${slugName}-${id}`;
    existing = !!(await findExistingSlug(slugName));
    if (!existing) {
      return slugId;
    }
  }
  return slugName;
}

export async function InsertDataIntoDB(result: LocationSchemaValidation, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...result,
    slug,
    userId,
  }).returning();

  return created;
}
