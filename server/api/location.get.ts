import type { DrizzleError } from "drizzle-orm";

import { eq } from "drizzle-orm";

import db from "../database";
import { location } from "../database/schema/index";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "You are not logged in!",
    }));
  }

  try {
    const fetchUserLocations = await db.query.location.findMany({
      where: eq(location.userId, event.context.user.id),
    });

    return fetchUserLocations;
  }
  catch (e) {
    const error = e as DrizzleError;
    // eslint-disable-next-line no-console
    console.log(error.message);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: "Database error",
    }));
  }
});
