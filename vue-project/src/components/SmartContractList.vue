<template>
  <div>
    <h1>Smart Contracts</h1>
    <ul>
      <li v-for="contract in contracts" :key="contract.contract_address">
        <p><strong>Transaction Hash:</strong> {{ contract.transactionHash }}</p>
        <p><strong>Contract Address:</strong> {{ contract.contract_address }}</p>
        <p><strong>Name:</strong> {{ contract.name }}</p>
        <p><strong>Limit to Org:</strong> {{ contract.limit_to_org }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contracts: []
    };
  },
  created() {
    this.fetchContracts();
  },
  methods: {
    async fetchContracts() {
      try {
        const response = await axios.get('/api/certificate/get-smart-contract'); //your-api-endpoint
        if (response.status === 200) {
          this.contracts = response.data.result;
        } else {
          console.error('Error fetching contracts:', response.status);
        }
      } catch (error) {
        console.error('Error fetching contracts:');
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
