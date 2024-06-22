<template>
  <div class="signin-container">
    <div class="signin-content">
      <div class="back-icon" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke="none" />
          <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </div>
      <h1>Guest Sign Out</h1>
      <p>Please enter your details to sign out:</p>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="name" @input="searchActiveSignIns" placeholder="Name" class="input-field" />
        <div v-if="searchResults.length">
          <div class="column-headers">
            <span class="column-header">Name</span>
            <span class="column-header">Sign-In Time</span>
          </div>
          <ul class="search-results">
            <li v-for="signIn in searchResults" :key="signIn.id" @click="selectSignIn(signIn)" :class="{'selected': selectedSignIn && selectedSignIn.id === signIn.id}" class="search-result-item">
              <span>{{ signIn.fullName }}</span>
              <span>{{ signIn.signInTimestamp }}</span>
            </li>
          </ul>
        </div>
        <div class="gap"></div>
        <button type="submit" class="signin-button" :disabled="!selectedSignIn">Sign Out</button>
      </form>
      <div v-if="msgbox" class="notification">{{ msgbox }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GuestSignOut',
  data() {
    return {
      name: '',
      searchResults: [],
      selectedSignIn: null,
      msgbox: ''
    };
  },
  methods: {
    async searchActiveSignIns() {
      if (this.name.length > 2) {
        try {
          const response = await axios.get(`/api/SiteSignIn/searchActiveSignIns?name=${this.name}`);
          this.searchResults = response.data;
          console.log('Search Results:', this.searchResults);
        } catch (error) {
          console.error('Error searching active sign-ins:', error);
          this.searchResults = [];
        }
      } else {
        this.searchResults = [];
      }
    },
    selectSignIn(signIn) {
      this.selectedSignIn = signIn;
    },
    async handleSubmit() {
      if (this.selectedSignIn) {
        try {
          await axios.post('/api/SiteSignIn/signOut', { id: this.selectedSignIn.id, signOutType: 'Guest' });
          this.msgbox = 'You have been successfully signed out, this page will automatically redirect to the home page in 3 seconds.';
          setTimeout(() => {
            this.msgbox = '';
            this.$router.push({ name: 'HomePage' });
          }, 3000);
        } catch (error) {
          console.error('Error signing out:', error);
          this.msgbox = 'Error signing out. Please try again.';
        }
      }
    },
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    }
  }
}
</script>

<style scoped>
.column-headers {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.column-header {
  flex: 1;
  text-align: left;
}

.search-results {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
}

.search-result-item:hover, .search-result-item.selected {
  background-color: #e0e0e0;
}

.gap {
  height: 20px; /* Adjust the height as needed */
}

.signin-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

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
</style>

<style src="../views/EmployeeSignIn.css"></style>
