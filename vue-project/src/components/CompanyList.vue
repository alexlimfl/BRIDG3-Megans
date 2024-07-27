<template>
  <div class="company-list">
    <header>
      <h1>Company List</h1>
    </header>
    <div class="search-add">
      <label for="search">Search: </label>
      <input v-model="searchQuery" id="search" placeholder="Type to search..." />
      <button @click="showAddModal = true">Add New Company</button>
    </div>
    <div class="card-container">
      <div 
        class="card" 
        v-for="contract in smartContractDetails" 
        :key="contract.transactionHash" 
        @click="showDetails(contract)"
      >
        <img :src="require(`@/assets/Beta_logo.jpeg`)" alt="Company Logo" class="card-image" />
        <div class="card-content">
          <h3>{{ contract.name }}</h3>
          <p><strong>Industry:</strong> {{ contract.symbol }}</p>
        </div>
      </div>
    </div>
    <div class="pagination">
      <!-- <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }">
        {{ page }}
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button> -->
    </div>
    <add-company-modal :is-visible="showAddModal" @save="addCompany" @cancel="showAddModal = false"></add-company-modal>
    <company-details-modal :is-visible="showDetailsModal" :company="selectedCompany" @close="closeDetailsModal" @edit="editCompany"></company-details-modal>
    <router-link to="/">
      <button>Return to HomePage</button>
    </router-link>
  </div>
</template>

<script>
import AddCompanyModal from './AddCompanyModal.vue';
import CompanyDetailsModal from './CompanyDetailsModal.vue';
import axios from 'axios';

const headers = {
  'client_id': '74ca1e269e2057a8b07523b20e88fe73eddfe67e19e4c9c37b7d1d25c10df149',
  'client_secret': 'sk_e7b0252e3dabf1e1c68830ec195ff6ebfc95a2b8a6b324bd94ef8b8b8716dea3',
  'Content-type': 'application/json'
};

export default {
  name: 'CompanyList',
  components: {
    AddCompanyModal,
    CompanyDetailsModal
  },
  data() {
    return {
      searchQuery: '',
      companies: [
        { name: 'Acme Corp', industry: 'Tech', location: 'NY', email: 'info@acme.com', phone: '123-456-7890', certificateUrl: '#', imageUrl: require('@/assets/ACME_logo.jpeg')},
        { name: 'Beta Ltd', industry: 'Finance', location: 'SF', email: 'contact@beta.com', phone: '098-765-4321', certificateUrl: '#', imageUrl: require('@/assets/Beta_logo.jpeg')}
        // Add more companies here if needed
      ],
      currentPage: 1,
      itemsPerPage: 5,
      showAddModal: false,
      showDetailsModal: false,
      selectedCompany: {},
      smartContract: [],
      smartContractDetails: []
    };
  },
  computed: {
    filteredCompanies() {
      const filtered = this.companies.filter(company => 
        company.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.companies.length / this.itemsPerPage);
    }
  },
  mounted() {
    console.log("created");
    this.fetchSmartContract();
  },
  methods: {
    async fetchSmartContract() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/certificate/get-smart-contract`, {
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
          console.log("contract", contract.transactionHash);
          return axios.get(`${process.env.VUE_APP_API_URL}/api/certificate/get-smart-contract/${contract.contract_address}`, {
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
      this.companies.push(newCompany);
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
  background-color: #4262b9;
  padding: 20px;
  color: white;
  text-align: center;
}
.search-add {
  margin: 20px 0;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.card {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  width: calc(33% - 20px); /* Adjust width to fit cards in a row */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center; /* Center-align items vertically */
}
.card-image {
  width: 100%; /* Make image responsive to the card's width */
  max-width: 150px; /* Limit the maximum width */
  height: 150px; /* Keep aspect ratio */
  object-fit: contain;
  margin-right: 25px; /* Add space between image and text */
}
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
</style>
