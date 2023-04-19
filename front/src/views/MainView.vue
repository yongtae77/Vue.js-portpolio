<!-- 메인 페이지 -->
<template>
  <div class="root">
    <main-head></main-head>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#00796B" dark>
            <v-card-title class="a4"> 주문 </v-card-title>
            <v-card-subtitle class="a3"
              >오늘은 어떤 메뉴를 먹을까?</v-card-subtitle
            >
          </v-card>
        </v-col>

        <v-layout wrap class="px-5 py-5">
          <v-row>
            <v-card
              class="mx-3 my-3"
              width="260px"
              v-for="item in itemlist"
              :key="item.itemId"
              white
            >
              <div>
                <div class="n1">
                  <v-avatar class="ma-3" size="150" tile>
                    <link
                      href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
                      rel="stylesheet"
                    />
                    <img :src="item.image" class="image" />
                  </v-avatar>
                  <v-card-actions>
                    <v-btn
                      color="#00796B"
                      dark
                      v-text="item.category"
                      class="btn1"
                      @click="moveShopList(item)"
                    ></v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </v-row>
        </v-layout>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import MainHead from "@/components/MainHead";
export default {
  data() {
    return {
      itemlist: [
        { category: "한식", image: "image/foodCategory/한식.jpg" },
        { category: "중식", image: "image/foodCategory/중식.jpg" },
        { category: "일식", image: "image/foodCategory/일식.jpg" },
        { category: "양식", image: "image/foodCategory/양식.jpg" },
        { category: "야식", image: "image/foodCategory/야식.jpg" },
        { category: "카페", image: "image/foodCategory/카페.jpg" },
      ],
    };
  },
  components: {
    MainHead: MainHead,
  },
  // 가게 리스트 페이지 이동(카데고리별)
  methods: {
    moveShopList(item) {
      this.$router.push("/shopList?category=" + item.category);
    },
  },
};
</script>
 
<style scoped>
.v-avatar {
  width: 300px;
  height: 150px;
  object-fit: cover;
}

.n1 {
  text-align: center;
}

.btn1 {
  box-align: center;
  width: 250px;
  font-size: 20px;
}

.img {
  position: absolute;
  box-align: center;
}

* {
  font-family: "Jua", sans-serif;
  font-size: 25px;
}

.a4 {
  font-size: 35px;
}

.a3 {
  font-size: 25px;
}
</style>