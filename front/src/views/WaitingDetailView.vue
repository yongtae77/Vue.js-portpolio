<!--대기목록별 멤버 리스트 페이지-->
<template>
  <v-app>
    <wait-header></wait-header>
    <!--스크롤바-->
    <div v-scroll.self="onScroll" calss="overflow-y-auto">
      <!--멤버 리스트 시작-->

      <!--멤버 1 시작-->
      <v-card class="mx-auto mt-15 mb-7" max-width="700" outlined>
        <v-toolbar dark height="70">
          <v-toolbar-title> 멤버 1 </v-toolbar-title>
        </v-toolbar>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 mt-5 mb-5">
              장바구니 담은 금액:9000원
            </v-list-item-title>
          </v-list-item-content>
          <v-btn class="mx-4">수정</v-btn>
          <v-btn>삭제</v-btn>
        </v-list-item>
      </v-card>
      <!--멤버 1 끝-->

      <!--멤버 2 시작-->
      <v-card class="mx-auto mt-15 mb-7" max-width="700" outlined>
        <v-toolbar dark height="70">
          <v-toolbar-title> 멤버 2 </v-toolbar-title>
        </v-toolbar>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 mt-5 mb-5">
              장바구니 담은 금액:8000원
            </v-list-item-title>
          </v-list-item-content>
          <v-btn class="mx-4">수정</v-btn>
          <v-btn>삭제</v-btn>
        </v-list-item>
      </v-card>
      <!--멤버 2 끝-->

      <!--멤버 리스트 끝-->
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
.button {
  padding: 20px;
}
</style>
   
  
  
