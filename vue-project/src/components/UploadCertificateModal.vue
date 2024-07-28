<template>
  <div v-if=" isVisible " class="upload-certificate">
    <div class="upload-certificate-content">
      <h2>Upload New Certificate</h2>
      <input type="text" v-model=" name " placeholder="Certificate Name" required />
      <textarea v-model=" description " placeholder="Description" required></textarea>
      <input type="file" @change=" handleFileUpload " required />
      <textarea v-model=" attributes " placeholder="Attributes (JSON format)"></textarea>
      <div class="button-group">
        <button @click=" uploadCertificate ">Upload</button>
        <button @click="$emit( 'close' )">Cancel</button>
      </div>
      <p v-if=" uploadStatus ">{{ uploadStatus }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const clientId = process.env.VUE_APP_CLIENT_ID;
const clientSecret = process.env.VUE_APP_CLIENT_SECRET;

const headers = {
  'client_id': clientId,
  'client_secret': clientSecret,
  'Content-Type': 'multipart/form-data'
};

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
      callbackUrl: `${ process.env.VUE_APP_API_URL }/companyList`,
      attributes: ''
    };
  },
  mounted() {
    console.log('upload load');
    console.log("this.contractAddress", this.contractAddress);
    console.log("this.walletAddress", this.walletAddress);
    console.log("this.toAddress", this.toAddress);
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
          headers: headers
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  z-index: 1000;
}

.upload-certificate-content {
  display: flex;
  flex-direction: column;
}

.upload-certificate h3 {
  margin-bottom: 10px;
  text-align: center;
}

.upload-certificate input,
.upload-certificate textarea {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.upload-certificate button {
  background-color: #4262b9;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  flex: 1;
  margin: 5px;
  transition: background-color 0.3s;
}

.upload-certificate button:hover {
  background-color: #314a7a;
}

.upload-certificate p {
  margin-top: 10px;
  color: green;
  text-align: center;
}
</style>
