<template>
  <div class="tabs-container">
    <div class="tabs">
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
.tabs-container {
  text-align: center;
  padding: 20px 0 0 0;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 20px; /* Adjust this value for more separation between tabs */
}

.tab {
  padding: 10px 20px;
  border: 2px solid #007bff;
  border-bottom: none; /* Remove the bottom border */
  border-radius: 10px 10px 0 0; /* Rounded corners at the top */
  background-color: #f0f8ff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tab:hover {
  background-color: #e0f0ff;
}

.active-tab {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.tab-content {
  border: 2px solid #007bff;
  border-top: none; /* Remove the top border to connect with tabs */
  padding: 20px;
  border-radius: 0 0 10px 10px; /* Rounded corners at the bottom */
  background-color: #f0f8ff;
}

a,
.blue {
  text-decoration: none;
  color: rgb(0, 120, 189);
  transition: 0.4s;
  padding-bottom: 0px;
  border: 2px solid #007bff;
  border-bottom: none; /* Remove the top border to connect with tabs */
  padding: 20px;
  border-radius: 10px 10px 0 0; /* Rounded corners at the bottom */
  background-color: #f0f8ff;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(249, 100%, 37%, 0.2);
  }
}
</style>
