import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient();

export const useAuthStore = defineStore("authStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);
  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  async function signIn() {
    // we need to access to the csfr token when sign in:
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csfr-token", csrf);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  };

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csfr-token", csrf);
    await authClient.signOut({ fetchOptions: {
      headers,
    } });
    navigateTo("/");
  };

  return { loading, signIn, user, signOut, init };
});
