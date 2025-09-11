import type { DrizzleError } from "drizzle-orm";

import { and, eq } from "drizzle-orm";
// import { customAlphabet } from "nanoid";
import slugify from "slug";

import db from "../database";
import { formSchema, location } from "../database/schema";

// const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => formSchema.safeParse(body));

  // if user is not found in the context we created in the auth file:
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }

  if (!result.success) {
    const statusMessage = result.error.issues.map(err => `${err.path.join("")}: ${err.message}`).join("; ");

    const data = result.error.issues.reduce((errors, err) => {
      errors[err.path.join("")] = err.message;
      return errors;
    }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const checkExistingLocation = await db.query.location.findFirst({
    where:
      and(
        eq(location.name, result.data.name),
        eq(location.userId, event.context.user.id),
      ),
  });

  if (checkExistingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "Location name already exists. Please use another name.",
    }));
  }

  // // create a random slug checking if it exists in the database:
  // let slug = slugify(result.data.name);
  // let existing = Boolean(await db.query.location.findFirst({
  //   where: eq(location.slug, slug),
  // }));

  // while (existing) {
  //   const id = nanoid();
  //   const slugId = `${slug}-${id}`;
  //   existing = Boolean(await db.query.location.findFirst({
  //     where: eq(location.slug, slugId),
  //   }));
  //   if (!existing) {
  //     slug = slugId;
  //   }
  // }

  try {
    // push data to db:
    const [created] = await db.insert(location).values({
      ...result.data,
      slug: slugify(result.data.name),
      userId: event.context.user.id,
    }).returning();

    return created;
  }
  catch (e) {
    const error = e as DrizzleError;
    if (error.message) {
      throw sendError(event, createError({
        statusCode: 409,
        statusMessage: "Slug must be unique (the location name is used to generate the slug) ",
      }));
    }
    console.error(error.message);
  }
});
