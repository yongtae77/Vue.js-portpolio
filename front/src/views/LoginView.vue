 <!-- 로그인 페이지 -->
<template>
  <v-app>
    <login-header></login-header>

    <v-main>
      <div>
        <div class="top">
          <v-card width="500" class="mx-auto mt-9">
            <v-card-title>
              <v-layout fill-heght align-center justify-left column>
                <link
                  href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
                  rel="stylesheet"
                />
                <img src="/image/저기요2.jpg" class="login" 요기요 />
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="form.email"
                label="이메일 주소 입력"
                prepend-icon="mdi-account-circle"
              />
              <v-text-field
                v-model="form.password"
                label="비밀번호 입력"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-layout fill-height align-center justift-center column>
                <v-btn block color="success" @click="login">로그인</v-btn>
                <v-btn block class="mt-2" color="info" @click="moveRegister"
                  >회원가입</v-btn
                >
              </v-layout>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import LoginHeader from "@/components/LoginHeader.vue";

export default {
  components: {
    LoginHeader: LoginHeader,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      nickname: "",
      showPassword: false,
    };
  },
  mounted() {
    // this.axios.post("/api/users/login", this.form).then((result) => {
    //   console.log(result);
    // });
  },

  methods: {
    // 회원가입 이동
    moveRegister() {
      this.$router.push("/register");
    },

    // 위치 저장 체크
    async checkLocation() {
      var result = await this.axios.post("/api/locations/check", this.form);
      console.log(result.data.result);

      if (result.data.result == "ok") {
        return true;
      } else {
        return false;
      }
    },
    // 로그인 & 폼 체크
    async login() {
      // 로그인 폼 체크 및 알림창
      if (this.form.email == "") {
        window.alert("이메일을 입력해주세요");
        return;
      }
      if (this.form.password < 8) {
        window.alert("패스워드는 8자 이상이어야 합니다.");
        return;
      }
      var checkResult = await this.checkLocation();
      console.log(checkResult);
      if (checkResult) {
        // 서버에 전송해서 로그인 시키기
        this.axios.post("/api/users/login", this.form).then((result) => {
          if (result.data.result == "ok") {
            console.log(result.data.user);
            this.$store.commit("setUser", result.data.user);
            // 로그인 성공한 경우
            this.$router.push("/main");
          }
          if (result.data.result == "fail") {
            window.alret(result.data.message);
          }
        });
      } else {
        // 서버에 전송해서 로그인 시키기
        this.axios.post("/api/users/login", this.form).then((result) => {
          if (result.data.result == "ok") {
            console.log(result.data.user);
            this.$store.commit("setUser", result.data.user);
            // 로그인 성공한 경우
            this.$router.push("/location");
          }
          if (result.data.result == "fail") {
            window.alret(result.data.message);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 100px;
  height: 100px;
  border-radius: 70%;
}

* {
  font-family: "Jua", sans-serif;
  font-size: 20px;
}
</style>