import { formSchema } from "../database/schema";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => formSchema.safeParse(body));

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

  return result.data;
});
