<template>
  <div id="app">
      <SmartContractList />
  </div>
  <div>
    <img :src="imageSrc" alt="Description">
    <!-- <h1>Megans</h1> -->
    <h3>- Trusted Fundraising Certification Group -</h3>
    <router-link to="/about">
      <button>About Us</button>
    </router-link>
    <router-link to="/companylist">
      <button>Company List</button>
    </router-link>
  </div>
</template>

<script>
import imageSrc from '@/assets/logo.png';
import SmartContractList from './SmartContractList.vue';
export default {
  name: 'HomePage',
  data() {
    return {
      imageSrc
    };
  },
  components: {
    SmartContractList
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
