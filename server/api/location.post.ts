import type { DrizzleError } from "drizzle-orm";

import slugify from "slug";

import { findExistingLocation, getUniqueSlug, InsertDataIntoDB } from "../database/queries/location";
import { formSchema } from "../database/schema";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => formSchema.safeParse(body));

  // if user is not found in the context we created in the auth file:
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }

  // if success = false diplay errors:
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
  // createed function to find existing location:
  const checkExistingLocation = await findExistingLocation(result.data, event.context.user.id);

  if (checkExistingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "Location name already exists. Please use another name.",
    }));
  }

  // created function to get unique slug:
  const slug = await getUniqueSlug(slugify(result.data.name));

  try {
    // push data to db:
    return InsertDataIntoDB(result.data, slug, event.context.user.id);
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
