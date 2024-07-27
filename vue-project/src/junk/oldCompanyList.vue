<template>
    <div class="company-list">
      <header>
        <h1>Company List</h1>
      </header>
      <div class="search-add">
        <label for="search">Search: </label>
        <input v-model="searchQuery" id="search" placeholder="Type to search..." />
        <button @click="addNewCompany">Add New Company</button>
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
      <router-link to="/">
        <button>Return to HomePage</button>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CompanyList',
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
        // Logic to add a new company
        alert('Add New Company clicked');
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
      }
    }
  };
  </script>
  
  <style>
  .company-list {
    width: 80%;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  header {
    background-color: #42b983;
    padding: 20px;
    color: white;
    text-align: center;
  }
  .search-add {
    margin: 20px 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
  .pagination {
    margin: 20px 0;
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
  