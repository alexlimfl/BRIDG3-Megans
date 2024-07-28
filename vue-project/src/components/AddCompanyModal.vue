<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal">
      <header>
        <h5>Add New Company</h5>
      </header>
      <div class="modal-body">
        <div class="form-group">
          <label for="companyName">Company Name:</label>
          <input v-model="companyName" id="companyName" placeholder="Enter company name" />
        </div>
        <div class="form-group">
          <label for="industry">Industry:</label>
          <select v-model="industry" id="industry">
            <option value="" disabled>Select industry</option>
            <option>Tech</option>
            <option>Finance</option>
            <option>Health</option>
            <!-- Add more industries as needed -->
          </select>
        </div>
        <div class="form-group">
          <label for="location">Location:</label>
          <input v-model="location" id="location" placeholder="Enter location" />
        </div>
        <div class="form-group">
          <label for="email">Contact Email:</label>
          <input v-model="email" id="email" placeholder="Enter email" type="email" />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number:</label>
          <input v-model="phone" id="phone" placeholder="Enter phone number" type="tel" />
        </div>
        <div class="file-input-container">
          <label for="certificate">Upload Certificate:</label>
          <input type="file" @change="handleFileUpload" id="certificate" />
        </div>
      </div>
      <footer>
        <button @click="saveCompany" class="save-button">Save</button>
        <button @click="cancel" class="cancel-button">Cancel</button>
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
}

.modal header {
  font-size: 1.6em;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #ececec;
  padding-bottom: 10px;
}

.modal-body {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1em;
}

.file-input-container {
  display: flex;
  flex-direction: column;
}

.file-input-container label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.save-button {
  background-color: #4CAF50;
  color: white;
}

.save-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.cancel-button:hover {
  background-color: #e53935;
}
</style>
