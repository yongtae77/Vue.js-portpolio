<!-- 메인 헤더: 위치 버튼 / 프로필 버튼 -->
<template>
  <div class="header">
    <v-toolbar color="#00796B" dark>
      <v-spacer></v-spacer>
      <v-btn icon @click="moveLocation">
        <v-icon>mdi-map-marker-outline</v-icon>
      </v-btn>
      <div>{{ addressInfo.address }}</div>
      <v-spacer></v-spacer>
      <v-btn icon @click="moveProfile">
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressInfo: {
        address: "",
      },
    };
  },
  mounted() {
    this.axios.post("/api/locations/item").then((result) => {});
    // 사용자 위치 정보 가져오기
    this.axios.post("/api/locations/info").then((result) => {
      console.log(result);
      this.addressInfo = result.data.locationInfo;
      //addressInfo.name;
    });
  },
  methods: {
    // Location 페이지로 넘어감
    moveLocation() {
      this.$router.push("/location");
    },
    // 프로필 페이지 이동
    moveProfile() {
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
.a4 {
  font-size: 25px;
}
</style>