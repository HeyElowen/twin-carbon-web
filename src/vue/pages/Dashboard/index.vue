<template>
  <Suspense>
    <template #default>
      <Dashboard />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Loading from "./loading.vue";

const Dashboard = defineAsyncComponent(() => import("./dashboard.vue"));
</script>
