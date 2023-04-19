<!-- 가게 상세 페이지 : ShopDetialView -->
<template>
  <div>
    <detail-header></detail-header>
    <!-- 가게 대표사진 -->
    <div align-center justify-center>
      <link
        href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
        rel="stylesheet"
      />
      <img :src="'/' + market.firstImage" class="image" />
    </div>

    <v-divider></v-divider>
    <div class="section">
      <!-- 가게 이름 -->
      <div class="name">
        <h1 class="a2">{{ market.name }}</h1>
      </div>
      <!-- 가게 기타 정보 -->
      <div>
        <table class="plusInfo">
          <tr>
            <th class="a3">최소주문금액</th>
            <td>{{ market.mOrder }}원</td>
          </tr>
          <tr>
            <th class="a3">배달팁</th>
            <td>{{ market.deliveryPrice }}원</td>
          </tr>
          <tr>
            <th class="a3">배달시간</th>
            <td>{{ market.time }}분</td>
          </tr>
        </table>
      </div>

      <!-- 가게 음식 리스트 -->
      <v-card class="mx-auto" max-width="1000">
        <v-list subheader three-line>
          <v-subheader class="a1">메뉴 목록</v-subheader>
          <v-list-item
            v-for="(menulistTwo, key) in menulistTwo"
            :key="key"
            @click="menu(menulistTwo)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ menulistTwo.s_menu }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ menulistTwo.m_introduce }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                >{{ menulistTwo.m_price }}원</v-list-item-subtitle
              >
            </v-list-item-content>

            <!-- 이미지는 나중에 테이블에 넣고 menulistTwo.이미지속성 하면 됨 -->
            <v-list-item-avatar tile size="100" color="grey">
              <img :src="'/' + menulistTwo.m_image" class="image" />
            </v-list-item-avatar>
            <!-- <v-divider></v-divider> -->
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>
 
<script>
// 슬라이드 구성
// import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import "swiper/swiper-bundle.css";
import DetailHeader from "@/components/DetailHeader";
import _ from "underscore";

export default {
  components: {
    //Swiper,
    //SwiperSlide,
    DetailHeader: DetailHeader,
  },

  data() {
    return {
      // loop 설정

      market: {
        firstImage: "",
      },
      // swiperOption: {
      //   loop: true,
      // },
      // menulist: {
      //   id: "",
      //   s_menu: "",
      //   m_price: "",
      //   m_introduce: "",
      //   menu_id: "",
      // },
      menulistOne: [],
      menulistTwo: [],
    };
  },
  mounted() {
    this.getMarketItem();

    this.axios.post("/api/menus/item").then((result) => {
      this.menulistOne = result.data.menu;
      var marketId = this.market.id;
      this.menulistTwo = _.filter(this.menulistOne, { menu_id: marketId });
      // var finded = _.find(this.menulistOne, (item) => {
      //   return item.menu_id == market.id;
      // });
      // if (finded) {
      //   this.menulistTwo = _.indexOf(this.menulistOne, finded);
      // }
      // console.log(menulistTwo);
      // this.menulistTwo = _.find(menulistOne, index);
    });
  },
  methods: {
    menu(menulistTwo) {
      //음식 상세 페이지 이동

      this.$router.push(
        "/menuDetail/" + this.$route.params.id + "/" + menulistTwo.id
      );
    },
    // 가게 아이템 별 내용 가져오기
    getMarketItem() {
      this.axios
        .post("/api/markets/detail", { id: this.$route.params.id })
        .then((result) => {
          // console.log(result);
          this.market = result.data.market;
        });
    },
  },
};
</script>

<style scoped lang="less">
.image {
  max-height: 500px;
  width: 620px;
}

.all {
  text-align: right;
}
.plusInfo {
  text-align: left;
  margin: 0 0 10px 20px;
  th,
  td {
    padding: 5px;
  }
}
.slide {
  margin-bottom: 30px;
}
.section {
  // 너비, 여백 기본 지정
  width: 600px;
  margin: 0 auto; // 위아래, 좌우
  padding-top: 40px;
  padding-bottom: 40px;
}
.menu {
  float: left;
}
* {
  font-family: "Jua", sans-serif;
  font-size: 20px;
}
.a1 {
  font-size: 30px;
  color: black;
}

.a2 {
  font-size: 30px;
}
.a3 {
  font-size: 20px;
}
</style>
