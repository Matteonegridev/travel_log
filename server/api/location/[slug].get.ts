import { findLocation } from "~~/server/database/queries/location";
import defineAuthenticatedEventHandler from "~~/server/types/define-auth-event";

export default defineAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") as string;
  const location = await findLocation(slug, event.context.user.id);

  if (!location) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Location not found",
    }));
  }
  return location;
});
