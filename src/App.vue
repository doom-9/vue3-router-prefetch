<script setup lang="ts"></script>

<template>
  <router-link
    :to="{
      path: '/two',
    }"
  >
    two
  </router-link>
  <router-link
    :to="{
      path: '/three',
    }"
    type="view"
  >
    two
  </router-link>
  <router-view />
</template>

<style></style>
