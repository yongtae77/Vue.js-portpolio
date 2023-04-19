<!-- 로그인 헤더: 페이지 이름 -->
<template>
  <div class="header">
    <v-toolbar color="#00796B" dark>
      <v-toolbar-title class="a4">로그인</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>
  
  <script>
export default {
  methods: {
    // 뒤로가기
    goback() {
      this.$router.go(-1);
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