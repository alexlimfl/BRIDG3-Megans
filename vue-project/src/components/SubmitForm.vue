<template>
  <div>
    <button @click="sendPostRequest">Send POST Request</button>
    <p v-if="responseMessage">{{ responseMessage }}</p> <!-- Display response message -->
  </div>
</template>

<script>
import api from '@/api'; // Adjust the path if necessary

export default {
  data() {
    return {
      responseMessage: '' // To store and display the response message
    };
  },
  methods: {
    async sendPostRequest() {
      const postData = {
        wallet_address: "0xDDAd72dcC48bf4362ad898CDD1CE3Ad3CB82Aae6", // Address used to deploy this contract
        name: "NFT2", // Contract Nickname
        field: {
          wallet_address_owner: "0xDDAd72dcC48bf4362ad898CDD1CE3Ad3CB82Aae6", // Owner of the Certificate contract
          max_supply: 1000, // Maximum supply
          name: "MasChain", // Name of Certificate
          symbol: "MT" // Certificate Symbol
        },
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA...", // Base64 encoded image
        callback_url: "https://postman-echo.com/post?" // Callback URL
      };

      try {
        const response = await api.postData(postData);

        // Check for successful status codes
        if (response.status >= 200 && response.status < 300) {
          // Success
          this.responseMessage = 'POST request was successful!';
          console.log('Response:', response.data); // Log response data
        } else {
          // Handle non-success status codes
          this.responseMessage = `POST request failed with status: ${response.status}`;
          alert(`Failed to send POST request. Status: ${response.status}`); // Alert on failure
          console.error('Error:', response);
        }
      } catch (error) {
        // Handle network or other errors
        this.responseMessage = 'An error occurred while sending the POST request.';
        alert('An error occurred while sending the POST request. Please try again.'); // Alert on error
        console.error('Error during POST request:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
