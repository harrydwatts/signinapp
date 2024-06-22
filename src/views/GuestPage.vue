<template>
    <div class="splash-container">
      <div class="splash-content">
        <div class="back-icon" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="none"/>
            <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </div>
        <h1>Welcome to SEC</h1>
        <p>Do you need to...</p>
        <div class="button-container">
          <button @click="goToGuestSignIn" class="splash-button">Sign In</button>
          <button @click="goToGuestSignOut" class="splash-button signout-button">Sign Out</button>
        </div>
      </div>
      <div class="footer">
        <p>Select an option to proceed</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GuestPage',
    methods: {
      goToGuestSignIn() {
        this.$router.push('/guest-signin');
      },
      goToGuestSignOut() {
        this.$router.push('/guest-signout');
      },
      goBack() {
        this.$router.go(-1); // Go back to the previous page
      }
    }
  }
  </script>
  
  <style src="../components/SplashPage.css"></style>
  <style>
  .signout-button {
    background: #a52a2a; /* Darkish red */
  }
  
  .signout-button:hover {
    background: #8b0000; /* Darker red on hover */
  }
  </style>
  