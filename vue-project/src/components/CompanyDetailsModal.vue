<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal">
        <header>
          <h1>Company Details</h1>
        </header>
        <div class="modal-body">
          <div>
            <label>Company Name:</label>
            <span>{{ company.name }}</span>
          </div>
          <div>
            <label>Industry:</label>
            <span>{{ company.industry }}</span>
          </div>
          <div>
            <label>Location:</label>
            <span>{{ company.location }}</span>
          </div>
          <div>
            <label>Contact Email:</label>
            <span>{{ company.email }}</span>
          </div>
          <div>
            <label>Phone Number:</label>
            <span>{{ company.phone }}</span>
          </div>
          <div>
            <label>Certificate:</label>
            <a :href="company.certificateUrl" target="_blank">Download/View</a>
          </div>
        </div>
        <footer>
          <button @click="editCompany">Edit</button>
          <button @click="closeModal">Close</button>
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
        // Emit an event to handle editing the company
        this.$emit('edit', this.company);
      },
      closeModal() {
        this.$emit('close');
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
  