<!-- 메뉴 상세 페이지 헤더: 뒤로가기 / 홈버튼 -->
<template>
  <div class="header">
    <v-toolbar color="#00796B" dark>
      <v-btn icon @click="goback">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn class="mr-2" icon @click="moveHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
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
    moveHome() {
      // 메인 페이지 이동
      this.$router.push("/main");
    },

    moveCart() {
      //장바구니 페이지 이동
      this.$router.push("/cart");
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