<template>
  <div class="tabs">
    <div class="tab-buttons">
      <router-link
        to="/home/CreateNewsletter"
        :class="{ active: $route.name === 'CreateNewsletter' }"
        >Register Newsletter</router-link
      >
      <router-link
        to="/home/LaunchNewsletter"
        :class="{ active: $route.name === 'LaunchNewsletter' }"
        >Launch Newsletter</router-link
      >
      <router-link
        to="/home/NewsletterDashboard"
        :class="{ active: $route.name === 'NewsletterDashboard' }"
        >Dashboard</router-link
      >
    </div>
    <!-- No need for <router-view> here -->
  </div>
</template>

<script>
export default {
  name: 'HomepageTabs'
}
</script>

<style scoped>
.tabs {
  text-align: center;
}

.tab-buttons {
  display: inline-block;
}

.tab-buttons router-link {
  display: inline-block;
  margin: 0 10px;
  padding: 15px 30px;
  font-size: 18px;
  text-decoration: none;
  border-radius: 25px;
  background-color: #f0f0f0;
  color: #333;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.tab-buttons router-link.active {
  background-color: #007bff;
  color: white;
}

.tab-buttons router-link:hover {
  background-color: #0056b3;
  color: white;
}
</style>
