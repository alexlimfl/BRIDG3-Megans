<!-- App.vue -->
<template>
  <div id="app">
    <h1>Web3 Certificate Uploader</h1>
    <input type="file" @change="onFileSelected" accept=".pdf,.jpg,.png">
    <button @click="uploadCertificate" :disabled="!selectedFile">Upload to Blockchain</button>
    <p>{{ status }}</p>
  </div>
</template>

<script>
import Web3 from 'web3'

export default {
  name: 'App',
  data() {
    return {
      selectedFile: null,
      status: '',
      web3: null
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },
    async uploadCertificate() {
      if (!this.selectedFile) {
        this.status = 'Please select a file first.'
        return
      }

      this.status = 'Connecting to Web3...'
      if (typeof window.ethereum !== 'undefined') {
        this.web3 = new Web3(window.ethereum)
        try {
          await window.ethereum.enable()
          this.status = 'Connected to Web3. Preparing to upload...'
          
          // Here you would implement the actual blockchain upload logic
          // This is a placeholder for the actual implementation
          this.status = 'Uploading to blockchain... (This is a placeholder)'
          
          // Simulating blockchain interaction
          setTimeout(() => {
            this.status = 'Certificate uploaded successfully! (Simulated)'
          }, 2000)

        } catch (error) {
          this.status = 'Failed to connect: ' + error.message
        }
      } else {
        this.status = 'Web3 not detected. Please install MetaMask or another Web3 provider.'
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  color: #333;
}
</style>