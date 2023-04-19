<!--장바구니 리스트 페이지-->
<template>
  <v-app>
    <main-header></main-header>
    <!--스크롤바-->
    <div v-scroll.self="onScroll" calss="overflow-y-auto">
      <!--장바구니 리스트 시작-->
      <v-card class="mx-auto mt-15 mb-7" max-width="700" outlined @click="test">
        <v-list-item-content>
          <v-list-item-title class="text-h5 mt-5 mb-1 ml-5">
            가게이름
          </v-list-item-title>
        </v-list-item-content>

        <v-divider></v-divider>

        <v-list-item-content>
          <v-list-item-title class="text-h6 mt-1 mb-1 ml-5">
            음식이름
          </v-list-item-title>
        </v-list-item-content>
        <div style="display: flex">
          <v-img
            class="image"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-col>
            <v-card-text class="text-h7">가격:9000원</v-card-text>
            <v-card-text class="text-h7">옵션 리스트</v-card-text>
          </v-col>
          <div class="d-flex align-end mb-5 mr-5">
            <v-btn class="mr-4">옵션변경</v-btn>
            <div style="display: flex">
              <v-btn icon @click="a">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <p class="mr-4 ml-4 mb-1 mt-1">{{ count }}</p>
              <v-btn icon @click="count++">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </v-app>
</template>
    
<script>
import MainHeader from "@/components/MainHeader";

export default {
  components: {
    MainHeader,
  },
  name: "Home",
  data() {
    return {
      name: "",
      count: 1,
    };
  },
  methods: {
    a(count) {
      if (count > 0) {
        count--;
      } else {
        window.alert("수량이 최소 한개는 있어야합니다");
        return;
      }
    },
  },
};
</script>
    
<style scoped>
.background {
  background: #eeeeee;
}

.background .form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}

.image {
  height: 130px;
  max-width: 150px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
   
  