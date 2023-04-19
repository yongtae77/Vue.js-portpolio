<!-- 처음 화면 페이지 -->
<template>
  <v-layout fill-heght align-center justify-left column>
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
        rel="stylesheet"
      />
      <!-- 웹앱 설명 및 로그인 버튼 -->
      <img src="/image/저기요.jpg" />
      <v-container style="height: 50px"></v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#009688" dark>
            <div class="a1">💛 배달비 부담을 줄여보세요 💛</div>
            <br />
            <div class="text-h8 text-center">
              주문 완료 시 자동으로 대기목록 입장
              <br />
              동일 음식점 주문 건을 자동으로 모아 주문 완료
            </div>
          </v-card>
        </v-col>
        <v-row dense>
          <v-col cols="12">
            <v-card color="#009688" dark>
              <div class="a1">
                💛 다 같이 맛있는 음식을 함께 주문해 보세요 💛
              </div>
              <br />
              <div class="text-h8 text-center">
                너와 나의 거리 단, 500m ! <br />
                각자 원하는 메뉴를 담고 하나의 주소지에서 음식을 수령하는 서비스
              </div>
            </v-card>
          </v-col>

          <v-col v-for="(item, i) in items" :key="i" cols="12">
            <v-card :color="item.color" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="text-h5"
                    v-text="item.title"
                  ></v-card-title>

                  <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                </div>

                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card :color="item.color" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <br />
      <v-btn class="btn1" dark block color="#009688" @click="moveLogin"
        >로그인</v-btn
      >
    </div>
  </v-layout>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 로그인 페이지 이동
    moveLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="less">
* {
  font-family: "Jua", sans-serif;
}

img {
  width: 60%;
  margin: auto;
  display: block;
}

.a1 {
  font-size: 30px;
  text-align: center;
}

.btn1 {
  font-size: 20px;
}
</style>