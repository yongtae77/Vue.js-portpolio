<!--대기목록 리스트 페이지-->
<template>
  <v-app>
    <wait-header></wait-header>
    <!--스크롤바-->
    <div v-scroll.self="onScroll" calss="overflow-y-auto">
      <!--대기목록 리스트 시작 (moveWaitingListDetail 메소드:클릭시 대기목록별 멤버 리스트로 이동)-->

      <!--그룹 1 시작-->
      <v-card
        class="mx-auto mt-15 mb-7"
        max-width="700"
        outlined
        @click="moveWaitingListDetail"
      >
        <v-toolbar dark height="70">
          <v-toolbar-title> 그룹 1 </v-toolbar-title>
        </v-toolbar>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 mt-2 mb-5">
              배달비:3000원
            </v-list-item-title>

            <v-list-item-title class="text-h6 mb-2">
              남은 최소주문금액:5000원
            </v-list-item-title>

            <v-list-item-title class="text-h6 mb-2">
              남은시간:5분 13초
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <!--그룹 1 끝-->

      <!--그룹 2 시작-->
      <v-card class="mx-auto mt-15 mb-7" max-width="700" outlined>
        <v-toolbar dark height="70">
          <v-toolbar-title> 그룹 2 </v-toolbar-title>
        </v-toolbar>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 mt-2 mb-5">
              배달비:3000원
            </v-list-item-title>

            <v-list-item-title class="text-h6 mb-2">
              남은 최소주문금액:5000원
            </v-list-item-title>

            <v-list-item-title class="text-h6 mb-2">
              남은시간:5분 13초
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <!--그룹 2 끝-->

      <!--그룹 3 시작-->
      <v-card class="mx-auto mt-15 mb-7" max-width="700" outlined>
        <v-toolbar dark height="70">
          <v-toolbar-title> 그룹 3 </v-toolbar-title>
        </v-toolbar>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 mt-2 mb-5">
              배달비:3000원
            </v-list-item-title>

            <v-list-item-title class="text-h6 mb-2">
              남은 최소주문금액:5000원
            </v-list-item-title>

            <v-list-item-title class="text-h6 mb-2">
              남은시간:5분 13초
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <!--그룹 3 끝-->

      <!--그룹 4 시작-->
      <v-card class="mx-auto mt-15 mb-7" max-width="700" outlined>
        <v-toolbar dark height="70">
          <v-toolbar-title> 그룹 4 </v-toolbar-title>
        </v-toolbar>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 mt-2 mb-5">
              배달비:3000원
            </v-list-item-title>

            <v-list-item-title class="text-h6 mb-2">
              남은 최소주문금액:5000원
            </v-list-item-title>

            <v-list-item-title class="text-h6 mb-2">
              남은시간:5분 13초
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <!--그룹 4 끝-->
      <!--대기목록 리스트 끝-->
    </div>
  </v-app>
</template>
  
<script>
import WaitHeader from "@/components/WaitHeader";

export default {
  components: {
    WaitHeader,
  },

  data() {
    return {
      name: "",
    };
  },
  methods: {
    moveWaitingListDetail() {
      this.$router.push("/waitingDetail");
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
</style>
 
