 <!-- 회원가입 페이지 -->
<template>
  <v-app>
    <register-header></register-header>
    <v-content>
      <div>
        <div class="form">
          <v-card width="500" class="mx-auto mt-9">
            <v-card-title>
              <v-layout fill-heght align-center justify-left column>
                <link
                  href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
                  rel="stylesheet"
                />
                <img src="/image/저기요.jpg" class="login" 요기요 />
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="form.email"
                label="이메일 주소 입력"
                prepend-icon="mdi-account-circle"
              />
              <v-text-field
                v-model="form.nickname"
                label="닉네임"
                prepend-icon="mdi-account-circle"
              />
              <v-text-field
                v-model="form.password"
                label="비밀번호 "
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                v-model="form.passwordConfirm"
                label="비밀번호 확인"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-layout fill-height align-center justift-center column>
                <v-btn block class="mt-2" color="info" @click="register"
                  >회원가입</v-btn
                >
              </v-layout>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import RegisterHeader from "@/components/RegisterHeader.vue";

export default {
  components: {
    RegisterHeader: RegisterHeader,
  },

  data() {
    return {
      form: {
        email: "",
        nickname: "",
        password: "",
        passwordConfirm: "",
      },
      showPassword: false,
    };
  },
  methods: {
    // 회원가입
    register() {
      if (this.form.email == "") {
        window.alert("이메일을 입력해주세요.");
        return;
      }
      if (this.form.nickname == "") {
        window.alert("닉네임을 입력해주세요.");
        return;
      }
      if (this.form.password.length < 8) {
        window.alert("패스워드는 8자 이상이어야 합니다.");
        return;
      }
      if (this.form.password != this.form.passwordConfirm) {
        window.alert("패스워드가 일치하지 않습니다.");
        return;
      }

      // 서버 전송해서 회원가입
      this.axios.post("/api/users/register", this.form).then((result) => {
        console.log(result);
        if (result.data.result == "ok") {
          // 회원가입이 성공한 경우
          window.alert("회원가입이 완료되었습니다.");
          this.$router.push("/login");
        }
        if (result.data.result == "fail") {
          //회원가입이 실패한 경우
          window.alert(result.data.message);
        }
      });
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