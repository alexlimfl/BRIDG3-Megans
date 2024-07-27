// This is a temporary/unusable vue file.

<template>
    <div class="company-list">
      <header>
        <h1>Company List</h1>
      </header>
      <div class="search-add">
        <label for="search">Search: </label>
        <input v-model="searchQuery" id="search" placeholder="Type to search..." />
        <button @click="showModal = true">Add New Company</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Industry</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in filteredCompanies" :key="company.name">
            <td>{{ company.name }}</td>
            <td>{{ company.industry }}</td>
            <td>{{ company.location }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }">
          {{ page }}
        </span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
      <add-company-modal :is-visible="showModal" @save="addCompany" @cancel="showModal = false"></add-company-modal>
    </div>
  </template>
  
  <script>
  import AddCompanyModal from './AddCompanyModal.vue';
  
  export default {
    name: 'CompanyList',
    components: {
      AddCompanyModal
    },
    data() {
      return {
        searchQuery: '',
        companies: [
          { name: 'Acme Corp', industry: 'Tech', location: 'NY' },
          { name: 'Beta Ltd', industry: 'Finance', location: 'SF' },
          // Add more companies here if needed
        ],
        currentPage: 1,
        itemsPerPage: 5,
        showModal: false
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
    methods: {
      addNewCompany() {
        this.showModal = true;
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
        this.showModal = false;
      }
    }
  };
  </script>
  
  <style>
  /* Add any additional styles for the company list */
  </style>
  