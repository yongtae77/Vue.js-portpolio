<!-- 위치 헤더: 뒤로가기 버튼 / 위치 / 위치 버튼 -->
<template>
  <v-toolbar color="#00796B" dark>
    <!-- 메인페이지로 넘어감 (= 뒤로 가기)-->
    <v-btn icon @click="moveMain">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>

    <!-- 검색 장소 없으면 이름 안 뜨고-->
    <div class="a4" v-if="!name"></div>
    <!-- 검색 장소 있으면 이름 뜨고-->
    <div class="a4" v-else>{{ name }}</div>

    <v-btn icon>
      <v-icon>mdi-map-marker-outline</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>


<script>
export default {
  props: ["name"],
  methods: {
    moveMain() {
      this.$router.push("/main");
    },
  },
};
</script>

<style scoped>
.header {
  padding: 10px 20px;
  box-shadow: 0 6px 6px #eee;
}
.a4 {
  font-size: 25px;
}
</style>