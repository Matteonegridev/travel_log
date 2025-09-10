import db from "../database";
import { formSchema, location } from "../database/schema";

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

  // push data to db:
  const [created] = await db.insert(location).values({
    ...result.data,
    slug: result.data.name.replaceAll(" ", "-").toLowerCase(),
    userId: event.context.user.id,
  }).returning();

  return created;
});
