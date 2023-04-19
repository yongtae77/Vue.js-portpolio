<!-- 가게 리스트 페이지 -->
<template>
  <div class="root">
    <link
      href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
      rel="stylesheet"
    />
    <list-head></list-head>
    <!-- 음식 카테고리 탭바 -->
    <v-card>
      <v-toolbar flat>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="(item, key) in categorys" :key="key" @click="tabtest">
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <!-- 가게 리스트 -->

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, key) in categorys" :key="key">
          <v-card
            class="ma-2"
            white
            v-for="(market, key) in item.markets"
            :key="key"
            @click="GoDetailpage(market)"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-layout fill-height align-center justify-center>
                  <div>
                    <!-- class="listview mr-4이 부분 수정 부탁드려요.-->
                    <img :src="market.firstImage" class="listview mr-4" />
                  </div>

                  <div>{{ market.name }}</div>
                </v-layout>
              </div>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
    
<script>
import ListHead from "@/components/ListHead.vue";
import _ from "underscore";
export default {
  components: {
    ListHead: ListHead,
  },
  mounted() {
    var category = this.$route.query.category;
    this.axios.post("/api/markets/item").then((result) => {
      this.categorys = result.data.market;
      console.log(this.market);
      var finded = _.find(this.categorys, (item) => {
        return item.name == category;
      });
      if (finded) {
        console.log(_.indexOf(this.categorys, finded));
        this.tab = _.indexOf(this.categorys, finded);
      }
      // this.tab = this.items.indexOf(category);
    });
  },
  data() {
    return {
      tab: null,
      categorys: [],
    };
  },
  methods: {
    tabtest(item) {
      console.log("test");
    },
    getMarkets(index) {
      return this.market[index].markets;
    },
    // 가게 상세 페이지 이동
    GoDetailpage(market) {
      this.$router.push("/shopDetail/" + market.id);
    },
  },
};
</script>
    
    
<style scoped>
.listview {
  margin: 10px 10px;
  width: 100px;
  height: 100px;
  max-width: 150px;
  max-height: 150px;
}
* {
  font-family: "Jua", sans-serif;
  font-size: 20px;
}
</style>