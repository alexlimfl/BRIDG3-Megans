<template>
  <div>
    <img :src=" imageSrc " alt="Description">
    <h3>- Trusted Fundraising Certification Group -</h3>
    <router-link to="/companylist">
      <button>Project List</button>
    </router-link>
  </div>
</template>

<script>
import imageSrc from '@/assets/logo.png';

export default {
  name: 'HomePage',
  data() {
    return {
      imageSrc
    };
  }
};
</script>

<style>
body {
  background-image: url("../assets/black.jpg");
  background: cover;
  background-size: cover;
}

h3 {
  color: white;
}

img {
  width: 500px;
  height: auto;
}
</style>
