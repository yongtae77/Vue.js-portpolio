<template>
  <div ref="map"></div>
</template>

<script>
import Vue from "vue";
export default {
  props: ["options"],
  data() {
    return {
      mapInstance: null,
      marker: null,
    };
  },

  //* 할일: 마커도 그대로 위치 저장
  /*검색했을 때 센터 변경*/
  watch: {
    "options.center": function () {
      console.log("change");
      this.changeCenter();
    },
    "options.center.lat": function () {
      console.log("change");
      this.changeCenter();
    },
    "options.center.lng": function () {
      console.log("change");
      this.changeCenter();
    },
  },

  mounted() {
    let kakao = window.kakao;

    var container = this.$refs.map;
    const { center, level } = this.options;
    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 2,
    });

    // 지도에서 아무데나 클릭하면 마커 찍히고 좌표 가져옴
    kakao.maps.event.addListener(this.mapInstance, "click", (mouseEvent) => {
      console.log(mouseEvent);
      Vue.nextTick(() => {
        this.options.center.lat = mouseEvent.latLng.Ma;
        this.options.center.lng = mouseEvent.latLng.La;
        console.log(mouseEvent.latLng.Ma, mouseEvent.latLng.La);
      });
    });
  },
  /*검색했을 때 센터 변경*/
  methods: {
    changeCenter() {
      this.mapInstance.setCenter(
        new kakao.maps.LatLng(this.options.center.lat, this.options.center.lng)
      );

      // 마커 한 번에 하나만 생성하도록, 마커 새로 생성하면 그 전에 생성된 마커 없앰
      console.log(this.marker);
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.marker = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        position: this.mapInstance.getCenter(),
      });
      // 지도에 마커를 표시합니다
      this.marker.setMap(this.mapInstance);
      this.$emit("changeCenter", this.options.center);
    },
  },
};
</script>

<style>
.kakaomap {
  width: 100%;
  height: 600px;
}
</style>