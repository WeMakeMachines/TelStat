<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

if (!userStore.getLoggedInStatus) {
  router.push("/login");
} else {
  router.push("/auth");
}
</script>

<template>
  <header>
    <img alt="Telstat logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  </header>

  <RouterView />
</template>
