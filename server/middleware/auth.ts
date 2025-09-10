import type { UserWithId } from "~/lib/auth";

import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  // excract user from the session:
  event.context.user = session?.user as unknown as UserWithId;

  if (event.path.startsWith("/dashboard")) {
    if (!session) {
      await sendRedirect(event, "/protected", 302);
    }
  }
});
