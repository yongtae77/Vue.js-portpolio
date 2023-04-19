<!-- 회원가입 헤더: 페이지 이름 / 뒤로가기(로그인페이지) -->
<template>
  <div class="header">
    <v-toolbar color="#00796B" dark>
      <v-btn icon @click="goLogin">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="a4">회원가입</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>
  
  <script>
export default {
  methods: {
    // 로그인 페이지 이동
    goLogin() {
      this.$router.push("/login");
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