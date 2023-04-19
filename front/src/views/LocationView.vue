<!-- 위치 페이지 -->
<template>
  <div class="root">
    <link
      href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
      rel="stylesheet"
    />
    <!-- selectedName이 선택된 장소인데, 다른 데 있는 locationheader에 불러옴 -->
    <location-header :name="selectedName"></location-header>
    <v-container height="600px">
      <v-row dense>
        <v-col cols="12">
          <v-layout fill-height fluid>
            <v-flex>
              <!-- kakaomap-->
              <div class="map-area">
                <div class="searchbox">
                  <div>
                    <input
                      type="text"
                      value=""
                      @keyup.enter="searchPlace"
                      class="text"
                      placeholder="검색어를 입력하세요"
                    />
                  </div>
                  <div class="results">
                    <div
                      class="place"
                      v-for="rs in search.results"
                      :key="rs.id"
                      @click="showPlace(rs)"
                    >
                      <h4>{{ rs.place_name }}</h4>
                      <div class="addr">{{ rs.address_name }}</div>
                    </div>
                  </div>
                </div>
                <KakaoMap
                  class="kakaomap"
                  :options="mapOption"
                  @changeCenter="changeCenter"
                />
              </div>

              <!-- 상세주소 입력 -->
              <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="12">
                  <v-text-field
                    align-center
                    v-model="detailAddress"
                    placeholder="상세주소를 입력해주세요."
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- 내 위치 저장하기 누르면 mylocatoin(내위치저장하기)-->
              <v-btn
                @click="myLocation"
                color="teal"
                style="
                  margin-bottom: 10px;
                  margin-top: 10px;
                  width: 100%;
                  height: 70px;
                "
              >
                <span>내 위치 저장하기</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
 
<script>
import LocationHeader from "@/components/LocationHeader";
import KakaoMap from "@/components/KakaoMap.vue";

export default {
  components: {
    LocationHeader: LocationHeader,
    KakaoMap: KakaoMap,
  },

  name: "Location",

  data() {
    return {
      selectedName: null,
      detailAddress: null,
      mapOption: {
        center: {
          lat: 37.56707642999819,
          lng: 126.9783692094706,
        },
        level: 8,
      },
      search: {
        keyword: null,
        pgn: null,
        results: [],
      },
    };
  },
  // search 부분
  mounted() {},
  methods: {
    // 내 위치 저장하기
    myLocation() {
      this.axios
        .post("/api/locations/item", {
          lat: this.mapOption.center.lat, // 위도
          lng: this.mapOption.center.lng, // 경도
          name: this.selectedName, // 선택한 위치
          address: this.selectedAddress, // 선택한 도로명 주소
          detailAddress: this.detailAddress, // 입력한 상세주소
        })
        .then((result) => {
          this.location = result.data.location;
          console.log(result);
          // 위치 저장하면 바로 main 페이지로 넘어감
          window.alert("위치가 저장되었습니다.");
          this.$router.push("/main");
        });
    },

    changeCenter(center) {
      console.log(center);
    },
    searchPlace(e) {
      const keyword = e.target.value.trim();
      if (keyword.length === 0) {
        return;
      }

      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(keyword, (data, status, pgn) => {
        this.search.keyword = keyword;
        this.search.pgn = pgn;
        this.search.results = data;
      });
    },
    zoom(delta) {
      const level = Math.max(3, this.mapOption.level + delta);
      this.mapOption.level = level;
    },
    showPlace(place) {
      console.log(place);
      // 선택된 장소
      this.selectedName = place.place_name;
      // 선택된 도로명 주소
      this.selectedAddress = place.address_name;
      // 좌표
      this.mapOption.center = {
        lat: place.y,
        lng: place.x,
      };
    },
  },
};
</script>

<style lang="scss">
.map-area {
  display: flex;
  position: relative;
  .searchbox {
    position: absolute;
    height: 500px;
    z-index: 10000;
    background-color: #f9f7ee7d;
    width: 300px;
    display: flex;
    flex-direction: column;
    .results {
      flex: 1 1 auto;
      overflow-y: auto;
    }
    .place {
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: aliceblue;
      }
      h4 {
        margin: 0;
      }
    }
  }
  .kakaomap {
    flex: 1 1 auto;
    height: 500px;
  }
  .text {
    font-weight: medium;
    font-size: large;
  }
}
* {
  font-family: "Jua", sans-serif;
}
</style>