<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal">
      <header>
        <h1>Add New Company</h1>
      </header>
      <div class="modal-body">
        <div>
          <label for="companyName">Company Name:</label>
          <input v-model="companyName" id="companyName" placeholder="Company Name" />
        </div>
        <div>
          <label for="industry">Industry:</label>
          <select v-model="industry" id="industry">
            <option>Tech</option>
            <option>Finance</option>
            <option>Health</option>
            <!-- Add more industries as needed -->
          </select>
        </div>
        <div>
          <label for="location">Location:</label>
          <input v-model="location" id="location" placeholder="Location" />
        </div>
        <div>
          <label for="email">Contact Email:</label>
          <input v-model="email" id="email" placeholder="Contact Email" type="email" />
        </div>
        <div>
          <label for="phone">Phone Number:</label>
          <input v-model="phone" id="phone" placeholder="Phone Number" type="tel" />
        </div>
        <div>
          <label for="image">Upload Image:</label>
          <input type="file" @change="handleFileUpload" id="image" />
        </div>
      </div>
      <footer>
        <button @click="saveCompany">Save</button>
        <button @click="cancel">Cancel</button>
      </footer>
      <div>
        <button @click="sendPostRequest">Send POST Request</button>
        <p v-if="responseMessage">{{ responseMessage }}</p> <!-- Display response message -->
      </div>
    </div>
  </div>
</template>


<script>
import api from '@/api'; // Adjust the path if necessary

export default {
  name: 'AddCompanyModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      companyName: '',
      industry: '',
      location: '',
      email: '',
      phone: '',
      image: null,
      responseMessage: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    saveCompany() {
      // Emit an event with the new company data
      this.$emit('save', {
        name: this.companyName,
        industry: this.industry,
        location: this.location,
        email: this.email,
        phone: this.phone,
        image: this.image
      });
      this.resetForm();
    },
    cancel() {
      // Emit an event to close the modal
      this.$emit('cancel');
      this.resetForm();
    },
    resetForm() {
      this.companyName = '';
      this.industry = '';
      this.location = '';
      this.email = '';
      this.phone = '';
      this.image = null;
    },
    async sendPostRequest() {
      const postData = {
        wallet_address: "0xBBF5a6486a2100ae17484199Cbb8d320460f6d11", // Address used to deploy this contract
        name: this.companyName, // Contract Nickname
        field: {
          wallet_address_owner: "0xBBF5a6486a2100ae17484199Cbb8d320460f6d11", // Owner of the Certificate contract
          max_supply: 1000, // Maximum supply
          name: this.companyName, // Name of Certificate
          symbol: "MT" // Certificate Symbol
        },
        image: this.image, // Base64 encoded image
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}
.modal header {
  font-size: 1.5em;
  margin-bottom: 10px;
}
.modal-body div {
  margin-bottom: 10px;
}
</style>
