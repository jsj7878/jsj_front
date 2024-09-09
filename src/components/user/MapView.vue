<template>
  <div id="map" style="width: 500px; height: 400px"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
const latitude = ref(0);
const longitude = ref(0);
const store = useStore();
const moveLat = ref(0);
const moveLng = ref(0);

watch(
  () => store.state.selectedUser,
  () => {
    console.log(store.state.selectedUser);
    initMap();
  }
);

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
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a099520d66f165ccb0fbeb6279794316";
        document.head.appendChild(script);
      }
    },
    (err) => {
      alert(err.message);
    }
  );
});

const setMarker = (map) => {
  let markerArr = store.state.userData;
  for (var i = 0; i < markerArr.length; i++) {
    var mlatitude = markerArr[i].latitude;
    var mlongitude = markerArr[i].longitude;
    var markerPosition = new kakao.maps.LatLng(mlatitude, mlongitude);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    console.log(markerArr[i]);
    marker.setMap(map);
    var iwContent = `<div class ="label"><span class="left"></span><span class="center" style="background-color:white"> ${markerArr[i].username} </span><span class="right"></span></div>`,
      iwPosition = new kakao.maps.LatLng(mlatitude, mlongitude); //인포윈도우 표시 위치입니다
    var customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: iwPosition,
      content: iwContent,
      yAnchor: 2.5,
    });
    // console.log(markerArr[i]);
    // 커스텀 오버레이를 지도에 표시합니다
    customOverlay.setMap(map);
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

// const createMarker = () => {
//   const container = document.getElementById("map");
//   let options = {
//     center: new kakao.maps.LatLng(latitude.value, longitude.value),
//     level: 6,
//   };
//   let map = new kakao.maps.Map(container, options);
//   setMarker(map);
//   kakao.maps.event.addListener(map, "center_changed", function () {
//     var latlng = map.getCenter();
//     moveLat.value = latlng.getLat();
//     moveLng.value = latlng.getLng();
//   });
// };
</script>

<style lang="scss" scoped></style>
