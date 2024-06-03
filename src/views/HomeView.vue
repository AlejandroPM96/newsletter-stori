<template>
  <div class="header">
    <h1>Newsletter Maker</h1>
    <p>
      There is a bit of a bug I couldn't narrow down. If there is no content on the 2nd and 3rd tab
      just change in bewtween tabs a couple of times and content will appear
    </p>
    <p>Sorry o(TヘTo)</p>
    <HomepageTabs></HomepageTabs>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import HomepageTabs from '../components/HomepageTabs.vue'
</script>
<style>
body {
  background-color: #f0f8ff; /* Light cyan background for the page */
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.header {
  text-align: center;
  color: #0f4c81; /* Deep blue color for the text */
  background: linear-gradient(
    90deg,
    #00bfff,
    #1e90ff
  ); /* Gradient background from cyan to dodger blue */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.header h1 {
  margin: 0;
  font-size: 2.5em;
}
.header p {
  color: rgb(168, 62, 1);
}
.header p {
  color: rgb(168, 62, 1);
}
</style>
