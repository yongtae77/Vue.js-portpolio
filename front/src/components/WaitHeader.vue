<template>
  <div class="header">
    <v-toolbar color="green" dark flat>
      <v-spacer></v-spacer>
      <div>서대문구 홍은동</div>
      <v-btn icon @click="moveLocation">
        <v-icon>mdi-map-marker-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="moveAccount">
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  methods: {
    // Location 페이지로 넘어감
    moveLocation() {
      this.$router.push("/location");
    },
    // mypage 페이지
    moveAccount() {
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
}
.header .image {
  font-size: 20px;
}
</style>
