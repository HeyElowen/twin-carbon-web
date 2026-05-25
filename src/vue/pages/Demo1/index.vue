<template>
  <Suspense>
    <template #default>
      <Demo />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Loading from "./loading.vue";

const Demo = defineAsyncComponent(() => import("./demo.vue"));
</script>
