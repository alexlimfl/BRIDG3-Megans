<template>
  <div v-if=" isVisible " class="upload-certificate">
    <h3>Upload New Certificate</h3>
    <input type="text" v-model=" name " placeholder="Certificate Name" required />
    <textarea v-model=" description " placeholder="Description" required></textarea>
    <input type="url" v-model=" callbackUrl " placeholder="Callback URL" required />
    <input type="file" @change=" handleFileUpload " required />
    <textarea v-model=" attributes " placeholder="Attributes (JSON format)"></textarea>
    <button @click=" uploadCertificate ">Upload</button>
    <p v-if=" uploadStatus ">{{ uploadStatus }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UploadCertificateModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    walletAddress: {
      type: String,
      required: true
    },
    toAddress: {
      type: String,
      required: true
    },
    contractAddress: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      selectedFile: null,
      uploadStatus: '',
      name: '',
      description: '',
      callbackUrl: '',
      attributes: ''
    };
  },
  mounted() {
    console.log('upload load');
    console.log("this.contractAddress", this.contractAddress)
    console.log("this.walletAddress", this.walletAddress)
    console.log("this.toAddress", this.toAddress)
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadCertificate() {
      if (!this.selectedFile || !this.name || !this.description) {
        this.uploadStatus = 'Please fill in all required fields.';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('wallet_address', this.walletAddress);
      formData.append('to', this.toAddress);
      formData.append('contract_address', this.contractAddress);
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('callback_url', this.callbackUrl);
      if (this.attributes) {
        formData.append('attributes', this.attributes);
      }

      try {
        const response = await axios.post(
          `${ process.env.VUE_APP_API_URL }/api/certificate/mint-certificate`,
          formData, {
          headers: {
            'client_id': '74ca1e269e2057a8b07523b20e88fe73eddfe67e19e4c9c37b7d1d25c10df149',
            'client_secret': 'sk_e7b0252e3dabf1e1c68830ec195ff6ebfc95a2b8a6b324bd94ef8b8b8716dea3',
            'Content-Type': 'multipart/form-data'
          }
        });
        this.uploadStatus = 'Upload successful!';
        this.$emit('certificateUploaded', response.data);
      } catch (error) {
        this.uploadStatus = 'Upload failed. Please try again.';
        console.error('Error uploading certificate:', error);
      }
    }
  }
};
</script>

<style scoped>
.upload-certificate {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #170101;
  margin-top: 20px;
}

.upload-certificate h3 {
  margin-bottom: 10px;
}

.upload-certificate input {
  margin-bottom: 10px;
}

.upload-certificate button {
  background-color: #4262b9;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.upload-certificate button:hover {
  background-color: #314a7a;
}

.upload-certificate p {
  margin-top: 10px;
  color: green;
}
</style>
