<!--장바구니 페이지-->
<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
      rel="stylesheet"
    />
    <cart-header></cart-header>
    <!-- 장바구니 X -->
    <div v-if="basketInfo == 0" class="row">
      <v-layout align-center justify-center>
        <h1 class="m-4">장바구니가 비어있습니다.</h1>
      </v-layout>
    </div>
    <div v-else>
      <!-- 장바구니 O -->
      <!-- 장바구니 리스트 -->
      <!-- 메뉴 이름 / 메뉴 이미지 / 가격 / 수량 + -  -->
      <div v-for="item in basketInfo" :key="item.id">
        <v-card class="mx-auto mt-10 mb-15" max-width="700" outlined>
          <v-divider></v-divider>
          <v-list-item-content>
            <v-list-item-title class="text-h6 mt-1 mb-1 ml-5">
              <v-layout align-end justify-center>
                <div>{{ item.menus.s_menu }}</div>
                <v-spacer></v-spacer>
                <v-btn icon @click="deleteBasket(item)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-layout>
            </v-list-item-title>
          </v-list-item-content>

          <v-divider></v-divider>

          <v-layout>
            <v-layout align-center justify-center>
              <v-img class="mt-5 image" :src="'/' + item.menus.m_image"></v-img>
            </v-layout>
            <v-flex>
              <v-layout column fill-height>
                <v-spacer></v-spacer>
                <div class="mr-3 ml-4 mb-1 mt-1 text-h7">
                  가격:{{ item.menus.m_price }}
                </div>
                <v-spacer></v-spacer>
                <div class="d-flex align-end mb-5 mr-5">
                  <div style="display: flex">
                    <v-btn
                      icon
                      v-bind:disabled="item.m_count === 1"
                      @click="countMinus(item)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <p class="mr-3 ml-4 mb-1 mt-1">{{ item.m_count }}</p>
                    <v-btn icon @click="countPlus(item)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>

        <!-- 주문 금액(배달비 1/3 포함) 및 주문 버튼 -->
        <div v-if="totalPrice" class="row">
          <div class="footer">
            <v-layout align-center justify-center>
              <div class="a7">
                주문 금액 :{{ totalPrice + item.markets.deliveryPrice / 3 }}
              </div>
              <v-btn class="mt-2 mb-2 mx-auto" @click="order(OrderList)"
                >주문하기</v-btn
              >
            </v-layout>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
    
<script>
import CartHeader from "@/components/CartHeader";
import _ from "underscore";

export default {
  components: {
    CartHeader,
  },

  data() {
    return {
      name: "",
      count: 1,
      basketInfo: [],
      totalPrice: "",
      OrderList: [],
    };
  },
  mounted() {
    // 가게 메뉴 내용 가져오기 & 주문 합계 금액
    this.axios.post("/api/baskets/mybasket").then((result) => {
      this.basketInfo = result.data.basketList;

      // 주문 합계 금액
      var sum = _.reduce(
        this.basketInfo,
        function (total, item) {
          return total + item.m_count * item.menus.m_price;
        },
        0
      );
      this.totalPrice = sum;
    });
  },

  methods: {
    // 계좌 번호 체크
    async checkBankLocation() {
      var result = await this.axios.post("/api/baskets/order/check");

      if (result.data.result == "ok") {
        return true;
      } else {
        return false;
      }
    },

    // 장바구니 초기화
    async initBasket() {
      this.axios.post("/api/baskets/order/check/init").then((result) => {
        console.log(result);
      });
    },

    // 주문하기
    async order(OrderList) {
      var checkResult = await this.checkBankLocation();
      if (checkResult) {
        this.axios
          .post("/api/baskets/order", this.basketInfo)
          .then((result) => {
            this.OrderList = result.data.requestorder;
            // console.log(result.data.requestorder.id);
            console.log(this.OrderList);
            this.$router.push("/post/" + this.OrderList.id);
          });
      } else {
        window.alert("계좌정보를 추가해야 합니다.");
        this.$router.push("/profileEdit");
      }

      if (this.OrderList != null) {
        console.log(this.OrderList.id);
        console.log("test");
        await this.initBasket();
      }
    },

    // 수량 카운트
    // 감소
    async countMinus(item) {
      item.m_count--;
      this.modify(item);
    },
    // 증가
    async countPlus(item) {
      item.m_count++;
      this.modify(item);
    },

    // 수량 업데이트 수정
    async modify(item) {
      this.axios
        .post(
          "/api/baskets/modify",
          {
            s_id: item.s_id,
            m_id: item.m_id,
            u_email: item.u_email,
            m_count: item.m_count,
          },
          this.basketInfo
        )
        .then((result) => {
          if (result.data.result == "ok") {
            //alert("수정 되었습니다.");
            this.$router.go(0);
          } else {
            alert(result.data.msg);
          }
        });
    },

    // 장바구니 아이템 삭제
    deleteBasket(item) {
      this.axios
        .post("/api/baskets/remove", {
          s_id: item.s_id,
          m_id: item.m_id,
          u_email: item.u_email,
        })
        .then((result) => {
          console.log(result);
          if (result.data.result == "ok") {
            window.alert("삭제 되었습니다.");
            this.$router.go(0);
          } else {
            alert(result.data.msg);
          }
        });
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
  height: 100px;
  max-width: 200px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.footer {
  padding: 10px 20px;
  box-shadow: inset 1px 1px #bac0cc00;
  width: 600px;
  position: fixed;
  z-index: 100;
  background: #00796b;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
}
* {
  font-family: "Jua", sans-serif;
}
.a7 {
  font-size: 20px;
  color: white;
}
</style>
   
  
