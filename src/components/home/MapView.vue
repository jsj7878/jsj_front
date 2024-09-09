<template>
  <div>
    <div id="map" style="width: 100%; height: 600px"></div>
    <div class="articleWrap">
      <article style="justify-content: center">
        <ul
          class="placeUl"
          style="
            list-style-type: none;
            vertical-align: baseline;
            list-style: none;
          "
        >
          <li class="placeList" v-for="item in store.state.caffeData">
            <strong class="itemTitle">{{ item.title }}</strong>
            <p class="itemAddr">{{ item.addr }}</p>
            <i
              class="placeImg"
              style="
                background: url(https://www.starbucks.co.kr/common/img/store/pin/pin_general.png);
              "
              @click="showInfoWindow(item)"
            ></i>
          </li>
        </ul>
      </article>
    </div>
  </div>
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

const showInfoWindow = (item) => {
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
  var iwContent = `<div class ="label" style ="background-color:white"><span class="left"></span><div class="infoWindow" 
    style="background-color:white;
    float: left;
    font-size: 12px;
    min-height: 14px;
    line-height: 14px;
    margin-top: 10px;
    display: inline-block;
    word-wrap: break-word; 
    overflow-wrap: break-word;
    white-space: normal;
    padding-left: 17px;
    width: 237px;"> ${item.title} <br> ${item.addr}</div><span class="right"></span></div>`,
    iwPosition = new kakao.maps.LatLng(item.latitude, item.longitude); //인포윈도우 표시 위치입니다
  var customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    position: iwPosition,
    content: iwContent,
    yAnchor: 2.5,
  });
};

// const showInfoWindow = (item) => {};
</script>

<style lang="scss" scoped>
.strong {
  float: left;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  margin-top: 8px;
  width: 100%;
}
.articleWrap {
  background: #fff;
  border-radius: 3px;
  // height: 118px;
  position: absolute;
  top: 120px;
  left: 20px;
  z-index: 10;
}
.article {
  position: absolute;
  top: 20px;
  width: 300px;
}
.itemAddr {
  float: left;
  font-size: 12px;
  margin-top: 5px;
  line-height: 1.4;
  width: 80%;
}
.itemTitle {
  color: #444;
  float: left;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  margin-top: 8px;
  width: 100%;
}
.placeList {
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  height: 100px;
  position: relative;
  width: 270px;
}
.placeUl {
  padding: 0;
  margin: 0 auto;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  unicode-bidi: isolate;
  width: 100%;
}

.placeImg {
  background-size: 100% auto;
  display: block;
  height: 60px;
  overflow: hidden;
  position: absolute;
  right: 5px;
  text-indent: -20000px;
  top: 22px;
  width: 38px;
}

.label .infoWindow {
}
</style>
