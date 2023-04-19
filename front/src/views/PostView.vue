<!-- 주문 완료 & 결제 완료 페이지  -->
<template>
  <div class="root">
    <link
      href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
      rel="stylesheet"
    />
    <post-head></post-head>
    <div v-if="orderWait">
      <v-layout justify-center align-center>
        <v-col cols="3">
          <v-progress-circular
            :size="50"
            :width="10"
            color="green"
            indeterminate
          ></v-progress-circular>
        </v-col>

        <v-col class="mt-5" cols="6" justify="center">
          <h1>대기중입니다</h1>
        </v-col>
      </v-layout>
    </div>
    <!-- <v-divider class="mt-7"></v-divider> -->
    <div v-else-if="orderInfo">
      <h1 class="mt-7">{{ this.orderInfo.market.name }}</h1>
      <v-spacer></v-spacer>
      <!-- <v-btn class="mt-4">취소문의</v-btn> -->
      <v-spacer></v-spacer>
      <v-divider class="mt-7"></v-divider>

      <v-row>
        <v-col class="cost">
          <div class="mt-7">주문번호</div>
        </v-col>
        <v-spacer></v-spacer>
        <div class="mt-13">{{ orderInfo.id }}</div>
      </v-row>

      <v-row>
        <v-col class="cost">
          <div class="mt-7">주문시간</div>
        </v-col>
        <v-spacer></v-spacer>
        <div class="mt-13">{{ dateFormat(orderInfo.orderDate) }}</div>
      </v-row>

      <v-divider class="mt-7"></v-divider>
      <div class="text-h5 mt-5">주문 내역</div>
      <div v-for="item in orderMenu" :key="item.id">
        <v-row>
          <v-col class="cost">
            <div class="mt-7">{{ item.menus.s_menu }}x{{ item.count }}</div>
          </v-col>
          <v-spacer></v-spacer>
          <div class="mt-13">{{ item.count * item.menus.m_price }}원</div>
        </v-row>
      </div>
      <!-- <v-row>
      <v-col class="cost">
        <div class="mt-2">매운맛 단계 선택 : 3단계</div>
      </v-col>
      <v-spacer></v-spacer>
      <div class="mt-5">0원</div>
    </v-row> -->

      <v-divider class="mt-7"></v-divider>

      <v-row>
        <v-col class="cost">
          <div class="text-h6 mt-7">상품합계</div>
        </v-col>
        <v-spacer></v-spacer>
        <div class="text-h6 mt-10">{{ totalPrice }}원</div>
      </v-row>

      <v-divider class="mt-7"></v-divider>

      <v-row>
        <v-col class="cost">
          <div class="mt-7">배달요금</div>
        </v-col>
        <v-spacer></v-spacer>
        <div class="mt-10">{{ orderInfo.market.deliveryPrice / 3 }} 원</div>
      </v-row>

      <!-- <v-row>
      <v-col class="cost">
        <div>쿠폰 할인</div>
      </v-col>
      <v-spacer></v-spacer>
      <div class="mt-3">-10.000원</div>
    </v-row> -->

      <v-divider class="mt-7"></v-divider>

      <v-row>
        <v-col class="cost">
          <div class="text-h6 mt-7">결제금액</div>
        </v-col>
        <v-spacer></v-spacer>
        <div class="text-h6 mt-10">
          {{ totalPrice + orderInfo.market.deliveryPrice / 3 }}원
        </div>
      </v-row>

      <v-row>
        <v-col class="cost">
          <div>결제방식</div>
        </v-col>
        <v-spacer></v-spacer>
        <div class="mt-2">
          계좌이체: {{ orderInfo.user.bankType }}
          {{ orderInfo.user.bankNumber }}
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
import PostHead from "@/components/PostHead.vue";
import _ from "underscore";
// moment import
import moment from "moment";

export default {
  components: {
    PostHead: PostHead,
  },
  data() {
    return {
      // 대기중 주문
      orderWait: [],
      // 주문완료 주문
      orderInfo: {
        market: {
          name: "",
        },
        user: {
          bankType: "",
        },
      },
      //주문메뉴
      orderMenu: [],
      //주문 합계
      totalPrice: "",
    };
  },
  mounted() {
    // 주문내역, 가게 정보 가져오기
    this.axios
      .post("/api/orders/item", { id: this.$route.params.orderId })
      .then((result) => {
        this.orderWait = result.data.orderWait;
        console.log(result.data.orderOK);
        this.orderInfo = result.data.orderOK;
        console.log(result.data.orderOK);
        this.orderMenu = result.data.ordermenu;
        console.log(result.data.ordermenu);

        // 주문 합계 금액
        var sum = _.reduce(
          this.orderMenu,
          function (total, item) {
            return total + item.count * item.menus.m_price;
          },
          0
        );
        this.totalPrice = sum;
      });
  },

  methods: {
    // 포멧팅 방법1: moment
    dateFormat(dateStr) {
      return moment(dateStr).format("YY/MM/DD HH:mm");
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Jua", sans-serif;
}
</style>
   
  
