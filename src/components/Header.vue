<script setup>
function confirmLogout() {
  // Show confirmation dialog
  const userConfirmed = window.confirm("Are you sure you want to log out?");

  if (userConfirmed) {
    logOut();
  }
}
function logOut() {
  // Clear local storage
  localStorage.clear();
  // Redirect to the login page
  window.location.href = '/login';
}
</script>

<template>
<div style="" class="d-flex justify-content-around align-items-center">
  <img src="/img.png" height="40" width="40" alt="">
  <h2>Masterclass ai</h2>
  <button class="btn btn-danger"  @click="confirmLogout">Logout</button>
</div>
</template>

<style scoped>

</style>