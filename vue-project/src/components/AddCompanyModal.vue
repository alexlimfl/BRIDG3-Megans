<template>
  <div class="modal-overlay" v-if=" isVisible ">
    <div class="modal">
      <header>
        <h5>Add New Project</h5>
      </header>
      <div class="modal-body">
        <div class="form-group">
          <label for="companyName">Project Name:</label>
          <input v-model=" companyName " id="companyName" placeholder="Project Name" />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input v-model=" symbol " id="description" placeholder="Description" />
        </div>
        <!-- <div class="form-group">
          <label for="certificate">Upload Certificate:</label>
          <input type="file" @change="handleFileUpload" id="certificate" />
        </div> -->
      </div>
      <footer>
        <button class="btn btn-primary" @click=" createSmartContract ">Create</button>
        <button class="btn btn-secondary" @click=" cancel ">Cancel</button>
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
        this.$emit('companyAdded');
        this.resetForm();
      } catch (error) {
        console.error('Error creating smart contract:', error);
      }
    },
    cancel() {
      this.$emit('cancel');
      this.resetForm();
    },
    resetForm() {
      this.companyName = '';
      this.symbol = '';
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
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

header h5 {
  margin: 0;
  font-size: 1.5em;
  text-align: center;
}

.modal-body {
  margin-top: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

footer .btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

footer .btn-primary {
  background-color: #007bff;
  color: white;
}

footer .btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>
