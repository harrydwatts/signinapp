<template>
  <div class="signin-container">
    <div class="back-icon" @click="goBack">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke="none"/>
        <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </div>
    <div class="signin-content">
      <h1>Welcome Back</h1>
      <p>Please enter your Personal Identification Number (PIN) and then press continue to Sign In or Out:</p>
      <form @submit.prevent="handleSubmit">
        <div class="pin-container">
          <input v-for="(digit, index) in pin" :key="index" ref="pinInput" type="password" maxlength="1" @input="handleInput($event, index)" class="pin-input" />
        </div>
        <button type="submit" class="signin-button">Continue</button>
      </form>
      <div v-if="msgbox" class="msgbox">{{ msgbox }}</div>
    </div>
  </div>
</template>

<script>
import axios from '@/axiosConfig';
import { store } from '@/store';

export default {
  name: 'EmployeeSignIn',
  data() {
    return {
      pin: ['', '', '', ''],
      msgbox: ''
    };
  },
  methods: {
    handleInput(event, index) {
      const value = event.target.value;
      if (value.match(/[0-9]/)) {
        this.pin[index] = value;
        if (index < this.pin.length - 1) {
          this.$refs.pinInput[index + 1].focus();
        }
      } else {
        this.pin[index] = '';
      }
    },
    async handleSubmit() {
      const pin = this.pin.join('');
      console.log(`PIN entered: ${pin}`); // Debugging log
      try {
        const response = await axios.post('/SiteSignIn/checkPin', { pinNumber: pin });
        console.log('API response:', response.data); // Debugging log

        if (response.data.signIn) {
          store.signIn = response.data.signIn;
          this.$router.push({ name: 'EmployeeSignOut' });
        } else {
          store.employee = response.data.employee;
          this.$router.push({ name: 'EmployeeSignInConfirm' });
        }
      } catch (error) {
        console.error('Error during API call:', error); // Debugging log
        if (error.response && error.response.data && error.response.data.message) {
          this.msgbox = `Error: ${error.response.data.message}`;
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

<style src="./EmployeeSignIn.css"></style>

<style>
/* Use a modern sans-serif font */
body {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  stroke: #1a2a6c; /* Dark blue from the logo */
  stroke-width: 2px;
  border-radius: 50%;
  background: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 56px;
  margin-bottom: 30px;
  color: #1a2a6c; /* Dark blue from the logo */
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
  background: #1a2a6c; /* Dark blue from the logo */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.signin-button:hover {
  background: #253c78; /* Slightly lighter dark blue for hover effect */
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

.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1a2a6c; /* Dark blue from the logo */
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 1000;
  font-size: 18px;
  text-align: center;
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
