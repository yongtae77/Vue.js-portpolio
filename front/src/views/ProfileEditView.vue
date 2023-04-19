<!-- 프로필 수정 페이지 -->
<template>
  <div>
    <profileEdit-head> </profileEdit-head>

    <div>
      <div class="top">
        <v-layout fill-height align-center justify-center column>
          <link
            href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
            rel="stylesheet"
          />
          <img src="/image/profile.jpg" class="profile" />
        </v-layout>
        <div class="text-center"></div>
        <v-container fluid>
          <v-row>
            <v-col cols="4">
              <v-subheader class="a4">이메일아이디</v-subheader>
            </v-col>
            <v-col cols="7">
              <v-text-field v-model="account.email"> </v-text-field>
            </v-col>
          </v-row>
          <div>
            <v-row v-if="show">
              <v-col cols="4">
                <v-subheader class="a4"> 현재 비밀번호</v-subheader>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  v-model="account.password"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="show">
              <v-col cols="4">
                <v-subheader class="a4"> 신규 비밀번호</v-subheader>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  v-model="account.Newpassword"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row v-if="!show">
              <v-col cols="4">
                <v-subheader class="a4"> 현재 비밀번호</v-subheader>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  :disabled="validated ? disabled : ''"
                  @click:append="show1 = !show1"
                  v-model="account.password"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="!show">
              <v-col cols="4">
                <v-subheader class="a4"> 신규 비밀번호</v-subheader>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  :disabled="validated ? disabled : ''"
                  @click:append="show1 = !show1"
                  v-model="form.Newpassword"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </div>

          <v-btn
            v-if="!show"
            depressed
            class="btn"
            color="primary"
            @click="toggleShow"
          >
            변경
          </v-btn>
          <v-btn
            v-else
            depressed
            class="btn"
            color="primary"
            @click="toggleShow"
          >
            취소
          </v-btn>

          <v-row>
            <v-col cols="4">
              <v-subheader class="a4">닉네임</v-subheader>
            </v-col>
            <v-col cols="7">
              <v-text-field v-model="account.nickname"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-subheader class="a4">계좌등록</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="account.bankType"
                :items="bankTypes"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="account.bankNumber"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <div class="text-center">
          <v-btn depressed class="btn" color="primary" @click="save">
            저장
          </v-btn>
          <v-btn depressed class="btn" color="error" @click="cancel">
            취소
          </v-btn>
          <!-- <v-btn depressed class="btn" color="gray"> 회원탈퇴 </v-btn> -->
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import ProfileEditHead from "@/components/ProfileEditHead.vue";

export default {
  components: {
    ProfileEditHead: ProfileEditHead,
  },

  data() {
    return {
      show1: false,
      show: false,
      validated: "",
      form: {
        password: "",
        Newpassword: "",
      },
      account: {
        email: "",
        password: "",
        nickname: "",
        bankType: "",
        bankNumber: "",
      },
      bankTypes: [
        "카카오뱅크",
        "신한은행",
        "국민은행",
        "농협",
        "기업은행",
        "하나은행",
        "신협",
      ],
    };
  },

  mounted() {
    // 프로필 정보 가져오기
    this.axios.post("/api/users/profile").then((result) => {
      // console.log(result);
      this.account = result.data.profile;
    });
  },
  methods: {
    // 비밀번호 변경 toggle
    toggleShow() {
      this.show = !this.show;
    },

    // 프로필 수정 & 폼 체크
    save() {
      // 폼 체크 및 알림창

      if (this.account.nickname == "") {
        window.alert("닉네임을 입력해주세요");
        return;
      }

      if (this.show == true && this.account.password == "") {
        window.alert("비밀번호를 입력해주세요");
        return;
      }

      if (this.show == true && this.account.Newpassword == "") {
        window.alert("새 비밀번호를 입력해주세요");
        return;
      }

      if (this.account.bankType == "") {
        window.alert("계좌를 등록해주세요");
        return;
      }

      // 프로필 정보 업데이트
      this.axios.post("/api/users/modify", this.account).then((result) => {
        if (result.data.result == "ok") {
          window.alert("회원정보가 수정되었습니다.");
          this.$router.go(0);
        } else {
          alert(result.data.msg);
        }
      });
    },

    // 취소 버튼
    cancel() {
      alert("취소하시겠습니까?");
    },
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

.btn {
  width: 150px;
  margin-left: 10px;
  margin-right: 10px;
}
* {
  font-family: "Jua", sans-serif;
}
.a4 {
  font-size: 20px;
}
</style>
