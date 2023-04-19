<!-- 음식 상세 페이지: MenuDetail -->
<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
      rel="stylesheet"
    />
    <menuDetail-head></menuDetail-head>
    <!-- 음식 사진 -->
    <div align-center justify-center>
      <img :src="'/' + menuInfo.m_image" class="image" />
    </div>
    <v-divider></v-divider>
    <!-- 음식 이름 및 설명 -->
    <v-container class="section">
      <v-card class="mx-auto" max-width="1000">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="a1">
                {{ menuInfo.s_menu }}
              </v-list-item-title>
              <v-list-item-subtitle class="a2">
                {{ menuInfo.m_introduce }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="a2"> 가격 </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-subtitle class="text-h6 pb-2 pl-5">
                {{ menuInfo.m_price }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="a2"> 수량 </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content class="pb-2 pt-4">
              <div style="display: flex">
                <v-btn
                  icon
                  v-bind:disabled="this.basket.m_count === 1"
                  @click="countMinus()"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>

                <div class="text-h6 pb-2 pl-2 pr-2">
                  {{ basket.m_count }}
                </div>

                <v-btn icon @click="countPlus()">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>
    <!-- 수량 -->
    <!-- 최소주문 금액 및 담기 버튼 -->
    <div class="footer" v-if="delivery">
      <v-row>
        <v-col class="cost">
          <div class="a7">최소주문금액</div>
          <div class="a7">{{ delivery.mOrder }}</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn class="mt-5" @click="putCart(basket)"
          >{{ menuInfo.m_price * basket.m_count }}원 담기</v-btn
        >
      </v-row>
    </div>
  </div>
</template>

<script>
import MenuDetailHead from "@/components/MenuDetailHead.vue";

export default {
  data() {
    return {
      count: 1,
      menuInfo: [],
      index: [],
      basket: {
        s_id: this.$route.params.shopId,
        m_id: this.$route.params.menuId,
        m_count: 1,
      },
      delivery: null,
    };
  },

  components: {
    MenuDetailHead: MenuDetailHead,
  },

  mounted() {
    // 가게 메뉴 내용 가져오기
    this.axios
      .post("/api/menus/info", { id: this.$route.params.menuId })
      .then((result) => {
        this.menuInfo = result.data.menu.menus[0];
        this.delivery = result.data.menu;
        console.log(result.data.menu.menus);
      });
  },
  methods: {
    // 수량 카운트
    countMinus() {
      this.basket.m_count--;
    },
    countPlus() {
      this.basket.m_count++;
    },

    async check() {
      var result = await this.axios.post("/api/baskets/basket/check");
      console.log(result);
      if (result.data.result == "ok" && result.data.basket) {
        if (this.$route.params.shopId != result.data.basket.s_id) {
          if (
            window.confirm(
              "장바구니에는 같은 가게의 메뉴만 담을 수 있습니다. 기존 장바구니 삭제하시겠습니까?"
            )
          ) {
            return true;
          }
        } else {
          if (result.data.basket != null) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return true;
      }
    },

    async putCart(basket) {
      //장바구니 담기
      var checkResult = await this.check();
      console.log(checkResult);
      if (checkResult) {
        this.axios.post("/api/baskets/basket", this.basket).then((result) => {
          this.basket.m_count = 1;
          //console.log(this.basket);
        });
      }
      alert("장바구니에 메뉴를 추가했습니다.");
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.section {
  // 너비, 여백 기본 지정
  width: 620px;
  margin: 0 auto; // 위아래, 좌우
  padding-top: 40px;
  padding-bottom: 100px;
}

.cost {
  text-align: left;
}

.check {
  padding-top: 15px;
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

.image {
  max-height: 500px;
  width: 620px;
}

* {
  font-family: "Jua", sans-serif;
}
.a1 {
  font-size: 30px;
}
.a2 {
  font-size: 20px;
}
.a7 {
  font-size: 20px;
  color: white;
}
</style>
