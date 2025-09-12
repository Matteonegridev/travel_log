import type { DrizzleError } from "drizzle-orm";

import db from "../database";
// import { formSchema } from "../database/schema";
import { location } from "../database/schema/index";

export default defineEventHandler(async (event) => {
  if (event.context.user) {
    try {
      const fetchFromDatabase = await db.select().from(location);

      // const result = await getValidatedQuery(event, () => formSchema.safeParse(fetchFromDatabase));

      if (!fetchFromDatabase) {
        return sendError(event, createError({
          statusCode: 404,
          statusMessage: "impossible to get data",
        }));
      }

      return fetchFromDatabase;

      // return result.data;
    }
    catch (e) {
      const error = e as DrizzleError;
      console.log(error.message);
    }
  }
});
