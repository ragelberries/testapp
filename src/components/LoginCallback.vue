<template></template>

<script setup lang="ts">
import { isAuthenticated } from "@/oauth2";
import router from "@/router";
import axios from "axios";
import { name } from "@/oauth2";
import { type JwtPayload, jwtDecode } from "jwt-decode";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

onMounted(async () => {
  const route = useRoute();
  const data = new URLSearchParams({
    client_id: "testclient",
    redirect_uri: `${window.location.origin}/login-callback`,
    code: route.query.code as string,
    grant_type: "authorization_code",
  });

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_OAUTH2_BASE}/token`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    isAuthenticated.value = true;
    localStorage.setItem("accessToken", response.data.access_token);
    localStorage.setItem("idToken", response.data.id_token);
    localStorage.setItem("refreshToken", response.data.refresh_token);
    interface IdToken extends JwtPayload {
      name: string;
    }
    const jwt = jwtDecode<IdToken>(response.data.id_token);
    name.value = jwt.name;
    const resumeLocation = localStorage.getItem("resumeLocation");
    console.log('Got resumeLocation: ' + resumeLocation)
    if (resumeLocation) {
      router.replace(resumeLocation);
    } else {
      router.replace("/");
    }
  } catch (e) {
    isAuthenticated.value = false;
  }
});
</script>
