<template>
  <div class="signin-container">
    <div class="back-icon" @click="goBack">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke="none" />
        <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </div>
    <div class="signin-content">
      <h1>Guest Sign In</h1>
      <p>Please enter your details:</p>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="firstName" placeholder="First Name" class="input-field" required />
        <input type="text" v-model="lastName" placeholder="Last Name" class="input-field" required />
        <input type="text" v-model="phoneNumber" placeholder="Phone Number" class="input-field" />
        <input type="email" v-model="emailAddress" placeholder="Email Address" class="input-field" />
        <input type="text" v-model="carRegistration" placeholder="Car Registration" class="input-field" />
        <input type="text" v-model="visiting" placeholder="Person You Are Visiting" class="input-field" />
        <button type="submit" class="signin-button">Sign In</button>
      </form>
      <div v-if="msgbox" class="notification">{{ msgbox }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GuestSignIn',
  data() {
    return {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      carRegistration: '',
      visiting: '',
      msgbox: ''
    };
  },
  methods: {
    async handleSubmit() {
      const guestDetails = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        emailAddress: this.emailAddress,
        carRegistration: this.carRegistration,
        visiting: this.visiting
      };

      try {
        await axios.post('/api/SiteSignIn/addGuestAndSignIn', guestDetails);
        this.msgbox = 'You have successfully signed in, this page will automatically redirect to the home page in 3 seconds.';
        setTimeout(() => {
          this.msgbox = '';
          this.$router.push({ name: 'HomePage' });
        }, 3000);
      } catch (error) {
        console.error('Error signing in:', error);
        if (error.response && error.response.data && error.response.data.Message) {
          this.msgbox = `Error: ${error.response.data.Message}`;
        } else {
          this.msgbox = 'An unexpected error occurred. Please try again later.';
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

.search-results {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
}

.search-result-item {
  padding: 10px;
  cursor: pointer;
}

.search-result-item:hover {
  background-color: #f0f0f0;
}

.signin-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  text-align: center;
  padding: 20px;
  position: relative;
}

.signin-content {
  width: 90%; /* Increased width */
  max-width: 800px; /* Increased max-width */
  background: white;
  padding: 60px; /* Increased padding for more space */
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.back-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  width: 48px;
  height: 48px;
}

.back-icon svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: #000;
  stroke-width: 2px;
  border-radius: 50%;
  background: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 56px;
  margin-bottom: 30px;
}

p {
  font-size: 24px;
  color: #666;
  margin-bottom: 30px;
}

.pin-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.pin-input {
  width: 60px;
  height: 60px;
  font-size: 32px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 5px;
}

.signin-button {
  width: 100%;
  padding: 20px;
  font-size: 32px;
  color: white;
  background: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.signin-button:hover {
  background: #45a049;
}

.signin-button.green {
  background-color: #28a745;
}

.signin-button.red {
  background-color: #dc3545;
}

.input-field {
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  font-size: 24px; /* Larger font size for tablet-friendly input */
  border: 2px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.msgbox {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.form-container {
  margin: 20px 0;
  text-align: left;
}

.form-group {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 24px; /* Increased font size */
}

.form-group label {
  font-weight: bold;
}

.form-group span {
  margin-left: 10px;
  font-size: 24px; /* Increased font size */
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}
</style>
