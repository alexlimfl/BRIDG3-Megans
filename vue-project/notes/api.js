import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://service-testnet.maschain.com/api/', // Replace with your API base URL
  headers: {
    'client_id': '74ca1e269e2057a8b07523b20e88fe73eddfe67e19e4c9c37b7d1d25c10df149',
    'client_secret': 'sk_e7b0252e3dabf1e1c68830ec195ff6ebfc95a2b8a6b324bd94ef8b8b8716dea3',
    'Content-Type': 'application/json'
  }
});

export default {
  async getData() {
    return apiClient.get('certificate/get-smart-contract'); // Updated to use relative path
  },
  async postData(data) {
    try {
      const response = await apiClient.post('certificate/create-smartcontract', data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log('Server responded with an error:', error.response.data);
        console.log('Status code:', error.response.status);
        throw new Error(`Request error: ${error.response.status}`);
      } else if (error.request) {
        console.log('No response received:', error.request);
        throw new Error('No response received from server.');
      } else {
        console.log('Error:', error.message);
        throw new Error(`Request error: ${error.message}`);
      }
    }
  }
};
