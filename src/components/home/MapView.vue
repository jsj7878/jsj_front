<template>
  <div id="map" style="width: 100%; height: 600px"></div>
  <article></article>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
const latitude = ref(0);
const longitude = ref(0);
const store = useStore();
const moveLat = ref(0);
const moveLng = ref(0);

onMounted(() => {
  if (!("geolocation" in navigator)) {
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      latitude.value = pos.coords.latitude;
      longitude.value = pos.coords.longitude;
      store.state.nowLatitude = pos.coords.latitude;
      store.state.nowLongitude = pos.coords.longitude;

      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(initMap);
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=05222ace53571c8fbb636c91def0fbc2";
        document.head.appendChild(script);
      }
    },
    (err) => {
      alert(err.message);
    }
  );
});

const setMarker = (map) => {
  let markerArr = store.state.caffeData;
  for (var i = 0; i < markerArr.length; i++) {
    var mlatitude = markerArr[i].latitude;
    var mlongitude = markerArr[i].longitude;
    var markerPosition = new kakao.maps.LatLng(mlatitude, mlongitude);
    var imageSrc =
        "//image.istarbucks.co.kr/common/img/store/pin/pin_general.png",
      imageSize = new kakao.maps.Size(30, 50), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) };
    var markerImg = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImg,
    });
    marker.setMap(map);
  }
};

const initMap = () => {
  const container = document.getElementById("map");
  let options = {
    center: new kakao.maps.LatLng(latitude.value, longitude.value),
    level: 6,
  };

  let map = new kakao.maps.Map(container, options);
  setMarker(map);

  kakao.maps.event.addListener(map, "center_changed", function () {
    var latlng = map.getCenter();
    moveLat.value = latlng.getLat();
    moveLng.value = latlng.getLng();
  });
};

const createMarker = () => {
  const container = document.getElementById("map");
  let options = {
    center: new kakao.maps.LatLng(latitude.value, longitude.value),
    level: 3,
  };
  let map = new kakao.maps.Map(container, options);
  setMarker(map);
  kakao.maps.event.addListener(map, "center_changed", function () {
    var latlng = map.getCenter();
    moveLat.value = latlng.getLat();
    moveLng.value = latlng.getLng();
  });
};
</script>

<style lang="scss" scoped></style>
