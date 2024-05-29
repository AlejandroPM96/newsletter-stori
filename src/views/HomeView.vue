<template>
  <div>
    <h1>This is the home page</h1>
    <HomepageTabs></HomepageTabs>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import HomepageTabs from '../components/HomepageTabs.vue'
</script>
<style></style>
