<template>
  <div class="modal-overlay" v-if=" isVisible ">
    <div class="modal">
      <header>
        <h2>{{ company.name }}</h2>
      </header>
      <div class="modal-body">
        <div class="info-item">
          <label>Description:</label>
          <span>{{ company.symbol }}</span>
        </div>
        <div class="info-item">
          <label>Address:</label>
          <span class="contract-address">{{ truncatedAddress }}</span>
          <button @click="copyToClipboard( company.contract_address )" class="copy-button">Copy</button>
        </div>
        <div class="info-item" v-if=" certificateUrl ">
          <label> Certificate: </label>
          <a :href=" certificateUrl " target=" _blank" class="download-link">Download/View</a>
        </div>
      </div>
      <footer>
        <!-- <button @click=" editCompany " class="edit-button">Edit</button> -->
        <button @click=" closeModal " class="close-button">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const walletAddressEnv = process.env.VUE_APP_WALLET_ADDRESS;

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
  data() {
    return {
      certificateUrl: null
    };
  },
  computed: {
    truncatedAddress() {
      if (!this.company.contract_address) return '';
      const address = this.company.contract_address;
      return `${ address.slice(0, 6) }…${ address.slice(-4) }`;
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.fetchCertificateDetails();
      }
    }
  },
  methods: {
    async fetchCertificateDetails() {
      try {
        const response = await axios.get(`${ process.env.VUE_APP_API_URL }/api/certificate/get-certificate`, {
          params: {
            from: walletAddressEnv,
            to: walletAddressEnv,
            contract_address: this.company.contract_address,
            // transaction_id: this.company.transactionHash
          },
          headers: {
            'client_id': process.env.VUE_APP_CLIENT_ID,
            'client_secret': process.env.VUE_APP_CLIENT_SECRET,
            'Content-type': 'application/json'
          }
        });
        this.certificateUrl = response.data.result[0].certificate_file;
        console.log('response.data.result', response.data.result);
        console.log('certificate', this.certificateUrl);
      } catch (error) {
        console.error('Error fetching certificate details:', error);
      }
    },
    editCompany() {
      this.$emit('edit', this.company);
    },
    closeModal() {
      this.$emit('close');
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Address copied to clipboard!');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
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
  padding-bottom: 5px;
  margin-bottom: 5px;
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

.edit-button,
.close-button {
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
