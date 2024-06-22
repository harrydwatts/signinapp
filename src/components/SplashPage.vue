<template>
    <div class="splash-container">
      <div class="splash-content">
        <img src="@/assets/logo.png" alt="Logo" class="logo"/>
        <h1>Welcome to SEC</h1>
        <p>To Sign In, please first select what type of Visitor you are.</p>
        <div class="button-container">
          <button @click="goToEmployeeSignIn" class="splash-button">I'm a Member of Staff</button>
          <button @click="goToGuestPage" class="splash-button">I'm a Guest</button>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'SplashPage',
    methods: {
      goToEmployeeSignIn() {
        this.$router.push('/employee-signin');
      },
      goToGuestPage() {
        this.$router.push('/guest');
      }
    }
  }
  </script>
  
  <style src="./SplashPage.css"></style>
  