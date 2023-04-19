<!-- 가게 리스트 헤더: 뒤로가기 / 앱이름 ex) 배달의 민족 / 홈버튼 / 장바구니-->
<template>
  <div class="header">
    <v-toolbar color="#00796B" dark>
      <v-btn icon @click="goback">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="a4">가게 목록</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="mr-2" icon @click="moveHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <!-- 장바구니 X -->
      <div class="ml=15">
        <div v-if="basketInfo == 0" class="row">
          <v-btn icon @click="moveCart">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </div>
        <!-- 장바구니 O -->
        <div v-else>
          <v-btn icon @click="moveCart">
            <v-icon>mdi-cart-heart</v-icon>
          </v-btn>
        </div>
      </div>
    </v-toolbar>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      basketInfo: [],
    };
  },
  mounted() {
    // 장바구니 가져오기
    this.axios.post("/api/baskets/mybasket").then((result) => {
      this.basketInfo = result.data.basketList;
    });
  },

  methods: {
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