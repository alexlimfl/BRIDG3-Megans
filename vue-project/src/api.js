// src/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://service-testnet.maschain.com', // Replace with your API base URL
  headers: {
    'client_id': 'a51aab2576a261080c7b5449aed6c8c8b3a7812edc0c868273a7e5e69b0af026',
    'client_secret': 'sk_069dcb9c49d11678b656709c2433c1acbe1e412db9b8d5b541d9f6c5eb44e8f5',
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
