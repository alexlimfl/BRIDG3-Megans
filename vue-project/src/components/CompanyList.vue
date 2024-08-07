<template>
  <div class="company-list">
    <header>
      <h1>Project List</h1>
    </header>
    <div class="search-add">
      <label for="search">Search: </label>
      <input v-model=" searchQuery " id="search" placeholder="Type to search..." />
      <button @click="showAddModal = true">Add New Company</button>
    </div>
    <div class="card-container">
      <div class="card"
        v-for="  contract in filteredCompanies                                                                   "
        :key=" contract.transactionHash " @click="showDetails( contract )">
        <img :src=" require( `@/assets/Beta_logo.jpeg` ) " alt="Company Logo" class="card-image" />
        <div class="card-content">
          <h3>{{ contract.name }}</h3>
          <p><strong>Details:</strong> {{ contract.symbol }}</p>
          <button @click.stop="openUploadModal( contract )">Upload Certificate</button>
          <button @click.stop class="donate-button">Donate</button>
        </div>
      </div>
    </div>
    <!-- <div class="pagination">
      <button @click=" prevPage " :disabled=" currentPage === 1 ">Previous</button>
      <span v-for=" page in totalPages " :key=" page " @click="goToPage( page )" :class=" { active: currentPage === page } ">
        {{ page }}
      </span>
      <button @click=" nextPage " :disabled=" currentPage === totalPages ">Next</button>
    </div> -->
    <add-company-modal :is-visible=" showAddModal " @companyAdded=" fetchSmartContract " @save=" addCompany "
      @cancel="showAddModal = false"></add-company-modal>
    <company-details-modal :is-visible=" showDetailsModal " :company=" selectedCompany " @close=" closeDetailsModal "
      @edit=" editCompany "></company-details-modal>
    <!-- <router-link to="/">
      <button>Return to HomePage</button>
    </router-link> -->
    <upload-certificate-modal :is-visible=" showUploadModal " :walletAddress=" selectedContract.walletAddress "
      :toAddress=" selectedContract.toAddress " :contractAddress=" selectedContract.contractAddress "
      @certificateUploaded=" handleCertificateUpload " @close="showUploadModal = false"></upload-certificate-modal>
  </div>
</template>

<script>
import AddCompanyModal from './AddCompanyModal.vue';
import CompanyDetailsModal from './CompanyDetailsModal.vue';
import axios from 'axios';
import UploadCertificateModal from './UploadCertificateModal.vue';

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
  name: 'CompanyList',
  components: {
    AddCompanyModal,
    CompanyDetailsModal,
    UploadCertificateModal,
  },
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 20,
      showAddModal: false,
      showDetailsModal: false,
      showUploadModal: false,
      selectedCompany: {},
      selectedContract: {},
      smartContract: [],
      smartContractDetails: []
    };
  },
  computed: {
    filteredCompanies() {
      const filtered = this.smartContractDetails.filter(contract => {
        const name = contract.name || ''; // Default to empty string if name is undefined
        return name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.smartContractDetails.length / this.itemsPerPage);
    }
  },
  mounted() {
    this.fetchSmartContract();
  },
  methods: {
    async fetchSmartContract() {
      try {
        const response = await axios.get(`${ process.env.VUE_APP_API_URL }/api/certificate/get-smart-contract`, {
          headers: headers
        });
        this.smartContract = response.data.result || [];
        this.fetchSmartContractDetails();
        console.log('response', response);
      } catch (error) {
        console.error('Error fetching smart contracts:', error);
      }
    },
    async fetchSmartContractDetails() {
      try {
        const contractDetailsPromises = this.smartContract.map(contract => {
          return axios.get(`${ process.env.VUE_APP_API_URL }/api/certificate/get-smart-contract/${ contract.contract_address }`, {
            headers: headers
          });
        });
        const contractDetailsResponses = await Promise.all(contractDetailsPromises);
        this.smartContractDetails = contractDetailsResponses.map(response => response.data.result);
      } catch (error) {
        console.error('Error fetching smart contract details:', error);
      }
    },
    addNewCompany() {
      this.showAddModal = true;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    addCompany(newCompany) {
      this.smartContractDetails.push(newCompany);
      this.showAddModal = false;
    },
    showDetails(company) {
      this.selectedCompany = company;
      this.showDetailsModal = true;
    },
    closeDetailsModal() {
      this.showDetailsModal = false;
    },
    editCompany(company) {
      console.log('Edit company:', company);
    },
    openUploadModal(contract) {
      // Ensure the contract object has the necessary properties
      console.log('contract', contract);
      console.log('contract contract_address', contract.contract_address);
      console.log('this.selectedContract.contract_address', this.selectedContract.contract_address);


      if (contract && contract.contract_address) {
        this.selectedContract = {
          walletAddress: walletAddress,
          toAddress: walletAddress,
          contractAddress: contract.contract_address
        };
        console.log('Modal should now be visible');
        this.showUploadModal = true;
      } else {
        console.error('Contract object is missing required properties');
      }
    },
    handleCertificateUpload() {
      this.showUploadModal = true;

    }
  }
};
</script>

<style scoped>
.company-list {
  width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

header {
  background-color: #000000;
  color: white;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: full;
  font-family: 'Roboto', sans-serif;
  border-bottom: 5px solid #ffffff;
}

.card-container {
  color: rgb(0, 0, 0);
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  text-align: center;
}

.card {
  color: rgb(0, 0, 0);
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 25px;
  padding: 20px;
  cursor: pointer;
  width: calc(30% - 20px);
  /* Adjust width to fit cards in a row */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  /* Center-align items vertically */
}

.card-image {
  width: 100%;
  /* Make image responsive to the card's width */
  max-width: 150px;
  /* Limit the maximum width */
  height: 150px;
  /* Keep aspect ratio */
  object-fit: contain;
  margin-right: 25px;
  /* Add space between image and text */
}

.card-content {
  color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h3 {
  color: rgb(0, 0, 0);
}

.card:hover {
  background-color: #e0e0e0;
}

.pagination {
  margin: 40px 0;
  text-align: center;
}

.pagination button,
.pagination span {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.pagination span.active {
  font-weight: bold;
  text-decoration: underline;
}

button {
  font-family: Arial, sans-serif;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s, transform 0.2s;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}

button:hover {
  background-color: #a7c0ff;
}

.search-add {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff
}

.search-bar {
  width: 400px;
  /* Increase the width */
  height: 40px;
  /* Increase the height */
  padding: 10px 20px;
  /* Adjust padding */
  font-size: 18px;
  /* Increase font size */
  border: 1px solid #ddd;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.donate-button {
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

}

.donate-button:hover {
  background-color: #6ab350;
}
</style>