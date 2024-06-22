<template>
    <div class="signin-container" v-if="signIn && signIn.username">
      <div class="signin-content">
        <h1>Employee Sign-Out</h1>
        <p>We can see that you are already signed in:</p>
        <div class="form-container">
          <div class="form-group">
            <label>Username:</label>
            <span>{{ signIn.username }}</span>
          </div>
          <div class="form-group">
            <label>Sign-In Time:</label>
            <span>{{ signIn.signInTimestamp }}</span>
          </div>
          <div class="form-group">
            <label>Sign-In Type:</label>
            <span>{{ signIn.signInType }}</span>
          </div>
        </div>
        <p>Would you like us to sign you out now?</p>
        <div class="button-container">
          <button @click="handleSignOut(true)" class="signin-button green">Yes</button>
          <button @click="handleSignOut(false)" class="signin-button red">No</button>
        </div>
      </div>
      <div v-if="msgbox" class="notification">{{ msgbox }}</div>
    </div>
    <div class="signin-container" v-else>
      <div class="signin-content">
        <p>No sign-in details found.</p>
        <button @click="goBack" class="signin-button">Go Back</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { store } from '@/store';
  import './EmployeeSignIn.css';
  
  export default {
    name: 'EmployeeSignOut',
    data() {
      return {
        signIn: store.signIn,
        msgbox: ''
      };
    },
    methods: {
      async handleSignOut(confirm) {
        if (confirm) {
          try {
            await axios.post('/api/SiteSignIn/signOut', { id: this.signIn.id, signOutType: 'Standard' });
            this.msgbox = 'You have been successfully signed out, this page will automatically redirect to the home page in 3 seconds.';
            setTimeout(() => {
              this.msgbox = '';
              this.$router.push({ name: 'HomePage' });
            }, 3000); // Redirect to home after 10 seconds
          } catch (error) {
            console.error('Error signing out:', error);
            alert('Error signing out. Please try again.');
          }
        } else {
          this.goBack();
        }
      },
      goBack() {
        this.$router.go(-1); // Go back to the previous page
      }
    }
  }
  </script>
  
  <style scoped>
  .notification {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4caf50;
    color: white;
    padding: 15px;
    border-radius: 5px;
    z-index: 1000;
    font-size: 18px;
    text-align: center;
  }
  
  .form-container {
    width: 100%;
    margin-bottom: 30px;
  }
  
  .form-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .form-group label {
    font-weight: bold;
  }
  
  .form-group span {
    font-size: 18px;
  }
  </style>
  