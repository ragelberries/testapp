import axios from "axios";
import { defineComponent, ref } from "vue";

export let isAuthenticated = ref(false);
export let name = ref("");

export const logout = async (redirect: boolean) => {
  const data = new URLSearchParams({
    client_id: "testclient",
    id_token_hint: localStorage.getItem("idToken") ?? "",
  });

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_OAUTH2_BASE}/logout?${data.toString()}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch {
    // Do nothing
  }
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("idToken");
  if (redirect) {
    localStorage.setItem("resumeLocation", window.location.pathname);
  } else {
    localStorage.removeItem("resumeLocation");
  }
  window.location.href = oauth2LoginRedirect();
  isAuthenticated.value = false;
};

export const LoginCallback = defineComponent({
  setup() {},
});

const oauth2LoginRedirect = () => {
  return `${import.meta.env.VITE_OAUTH2_BASE}/auth?client_id=${
    import.meta.env.VITE_OAUTH2_CLIENT_ID
  }&redirect_uri=${
    window.location.origin
  }/login-callback&response_type=code&scope=openid`;
};
