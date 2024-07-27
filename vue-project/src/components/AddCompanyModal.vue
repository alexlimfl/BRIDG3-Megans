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
            <label for="certificate">Upload Certificate:</label>
            <input type="file" @change="handleFileUpload" id="certificate" />
          </div>
        </div>
        <footer>
          <button @click="saveCompany">Save</button>
          <button @click="cancel">Cancel</button>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
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
        certificate: null
      };
    },
    methods: {
      handleFileUpload(event) {
        this.certificate = event.target.files[0];
      },
      saveCompany() {
        // Emit an event with the new company data
        this.$emit('save', {
          name: this.companyName,
          industry: this.industry,
          location: this.location,
          email: this.email,
          phone: this.phone,
          certificate: this.certificate
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
        this.certificate = null;
      }
    }
  };
  </script>
  
  <style>
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
  .modal footer {
    display: flex;
    justify-content: flex-end;
  }
  </style>
  