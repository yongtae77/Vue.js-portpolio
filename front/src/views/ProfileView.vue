<!-- 프로필 페이지 -->
<template>
  <div>
    <profile-header></profile-header>
    <v-card>
      <div class="top">
        <v-layout fill-height align-center justify-center column>
          <link
            href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
            rel="stylesheet"
          />
          <img src="/image/profile.jpg" class="profile" />
          <div text class="a2">닉네임</div>
          <div class="a2">
            {{ userInfo.nickname }}
          </div>
        </v-layout>
        <div class="text-center">
          <v-btn class="a4" block @click="moveEdit">회원정보 수정</v-btn>
        </div>
        <div class="text-center" v-if="$store.state.user">
          <v-btn class="a4" block @click="logout">로그아웃</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
  
<script>
import ProfileHeader from "@/components/ProfileHeader.vue";

export default {
  data() {
    return {
      userInfo: [],
    };
  },
  components: {
    ProfileHeader: ProfileHeader,
  },

  methods: {
    // 프로필 수정 페이지 이동
    moveEdit() {
      this.$router.push("/profileEdit");
    },
    // 로그아웃
    logout() {
      this.axios.post("/api/users/logout").then((result) => {
        if (result.data.result == "ok") {
          this.$store.commit("logout");
          this.$router.push("/");
        }
      });
    },
  },

  mounted() {
    // 사용자 로그인된 상태 가져오기
    this.axios.post("/api/users/info").then((result) => {
      console.log(result);
      if (result.data.result == "ok") {
        this.$store.commit("setUser", result.data.user);
        //console.log(this.$store.state.user.nickname);
      }
    });
    // 프로필 정보 가져오기
    this.axios.post("/api/users/profile").then((result) => {
      this.userInfo = result.data.profile;

      // this.$store.state.user.nickname = result.data.profile.nickname;
      // console.log(result.data.profile.nickname);
    });
  },
};
</script>
<style scoped>
.top {
  height: 300px;
  background: #eee;
}

.profile {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.text {
  width: 100px;
  height: 100x;
  border-radius: 50%;
}

.modify-btn {
  margin-top: 10px;
  width: 500px;
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
.a3 {
  font-size: 40px;
}
.a4 {
  font-size: 22px;
}
</style>
