<template>
  <v-app class="app">
    <router-view></router-view>
  </v-app>
</template>
 
<script>
export default {
  name: "App",
  mounted() {
    // 로그인된 사용자 정보 가져오기
    this.axios.post("/api/users/info").then((result) => {
      if (result.data.result == "ok") {
        this.$store.commit("setUser", result.data.user);
      }
    });
  },
};
</script>

<style>
/* 웹앱 */
.app {
  width: 620px;
  margin: 0 auto;
}
</style>
