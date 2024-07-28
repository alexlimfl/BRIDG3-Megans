<template>
  <div class="modal-overlay" v-if=" isVisible ">
    <div class="modal">
      <header>
        <h5>Add New Company</h5>
      </header>
      <div class="modal-body">
        <div>
          <label for="companyName">Company Name: </label>
          <input v-model=" companyName " id="companyName" placeholder="Company Name" />
        </div>
        <div>
          <label for="Description">Description: </label>
          <input v-model=" symbol " id="description" placeholder="Description" />
        </div>
        <!-- <div class="file-input-container">
          <label for="certificate">Upload Certificate:</label>
          <input type="file" @change=" handleFileUpload " id="certificate" />
        </div> -->
      </div>
      <footer>
        <button @click=" createSmartContract ">Create</button>
        <button @click=" cancel ">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const walletAddressEnv = process.env.VUE_APP_WALLET_ADDRESS;
const clientId = process.env.VUE_APP_CLIENT_ID;
const clientSecret = process.env.VUE_APP_CLIENT_SECRET;
const headers = {
  'client_id': clientId,
  'client_secret': clientSecret,
  'Content-type': 'application/json'
};
const walletAddress = walletAddressEnv;

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
      symbol: '',
      email: '',
      phone: '',
      certificate: null
    };
  },
  methods: {
    handleFileUpload(event) {
      this.certificate = event.target.files[0];
    },
    async createSmartContract() {
      // Emit an event with the new company data
      const data = {
        wallet_address: walletAddress,
        name: this.companyName,
        field: {
          wallet_address_owner: walletAddress,
          max_supply: 5,
          name: this.companyName,
          symbol: this.symbol
        }
      };
      console.log('data', data);
      try {
        const response = await axios.post(
          `${ process.env.VUE_APP_API_URL }/api/certificate/create-smartcontract`,
          data,
          { headers: headers }
        );
        console.log('Smart contract created:', response.data);
        this.$emit('save', response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error creating smart contract:', error);
      }
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
  border-radius: 10px;
  width: 300px;
}

.modal header {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.modal-body div {
  margin-bottom: 10px;
}

.file-input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal footer {
  display: flex;
  justify-content: flex-end;
}
</style>
