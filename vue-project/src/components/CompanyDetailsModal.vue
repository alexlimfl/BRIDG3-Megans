<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal">
      <header>
        <h2>Company Details</h2>
      </header>
      <div class="modal-body">
        <div class="info-item">
          <label>Company Name:</label>
          <span>{{ company.name }}</span>
        </div>
        <div class="info-item">
          <label>Industry:</label>
          <span>{{ company.industry }}</span>
        </div>
        <div class="info-item">
          <label>Location:</label>
          <span>{{ company.location }}</span>
        </div>
        <div class="info-item">
          <label>Contact Email:</label>
          <span>{{ company.email }}</span>
        </div>
        <div class="info-item">
          <label>Phone Number:</label>
          <span>{{ company.phone }}</span>
        </div>
        <div class="info-item">
          <label>Certificate:</label>
          <a :href="company.certificateUrl" target="_blank" class="download-link">Download/View</a>
        </div>
      </div>
      <footer>
        <button @click="editCompany" class="edit-button">Edit</button>
        <button @click="closeModal" class="close-button">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyDetailsModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    company: {
      type: Object,
      required: true
    }
  },
  methods: {
    editCompany() {
      this.$emit('edit', this.company);
    },
    closeModal() {
      this.$emit('close');
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
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
}

.modal header {
  font-size: 1.6em;
  color: #333;
  border-bottom: 2px solid #4a90e2;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1em;
  color: #555;
}

.info-item label {
  font-weight: bold;
  color: #333;
}

.info-item span {
  font-weight: normal;
  color: #666;
}

.download-link {
  color: #4a90e2;
  text-decoration: none;
}

.download-link:hover {
  text-decoration: underline;
}

footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.edit-button, .close-button {
  font-size: 16px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.edit-button {
  background-color: #4a90e2;
  color: #fff;
}

.edit-button:hover {
  background-color: #357abd;
}

.close-button {
  background-color: #e94e77;
  color: #fff;
}

.close-button:hover {
  background-color: #c83a60;
}
</style>
