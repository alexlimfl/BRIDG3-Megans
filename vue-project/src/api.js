// src/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://service-testnet.maschain.com', // Replace with your API base URL
  headers: {
    'client_id': '74ca1e269e2057a8b07523b20e88fe73eddfe67e19e4c9c37b7d1d25c10df149',
    'client_secret': 'sk_e7b0252e3dabf1e1c68830ec195ff6ebfc95a2b8a6b324bd94ef8b8b8716dea3',
    'Content-Type': 'application/json'
  }
});

export default {
  getData() {
    return apiClient.get('/api/certificate/get-smart-contract'); // Updated to use relative path
  },
  postData(data) {
    return apiClient.post('/api/certificate/get-smart-contract', data); // Corrected URL to use relative path
  }
};
