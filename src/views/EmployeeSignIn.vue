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
import axios from 'axios';
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
      try {
        const response = await axios.post('/api/SiteSignIn/checkPin', { pinNumber: pin });
        store.signIn = response.data.signIn;
        if (response.data.signIn) {
          this.$router.push({ name: 'EmployeeSignOut' });
        } else {
          store.employee = response.data.employee;
          this.$router.push({ name: 'EmployeeSignInConfirm' });
        }
      } catch (error) {
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
