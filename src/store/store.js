import { createStore } from "vuex";

export default createStore({
  state: {
    caffeData: [
      {
        title: "가산에스케이",
        addr: "서울특별시 금천구 가산디지털1로 171 (가산동), SK V1센터 1층",
        detail: "1522-3232",
        latitude: "37.48082408602027",
        longitude: "126.88100079322535",
      },
      {
        title: "가산디지털단지역",
        addr: "서울특별시 금천구 벚꽃로 298 (가산동), 대륭포스트타워 6차 1층",
        detail: "1522-3232",
        latitude: "37.48089352069766",
        longitude: "126.88358906045958",
      },
      {
        title: "가산퍼블릭",
        addr: "서울특별시 금천구 디지털로 178 (가산동), B동 F Park 1층",
        detail: "1522-3232",
        latitude: "37.47574363470601",
        longitude: "126.88684803652211",
      },
      {
        title: "가산그레이트",
        addr: "서울특별시 금천구 디지털로9길 32, 갑을그레이트밸리 1층 (가산동)",
        detail: "1522-3232",
        latitude: "37.47955080325422",
        longitude: "126.88727191931528",
      },
    ],
    userData: [
      {
        userid: "hanyong5",
        password: "123",
        username: "홍길동",
        addr: "서울",
        image: "https://picsum.photos/100",
        latitude: "37.4824",
        longitude: "126.87",
      },
      {
        userid: "ttomi",
        password: "123",
        username: "김유신",
        addr: "서울",
        image: "https://picsum.photos/100",
        latitude: "37.4824909",
        longitude: "126.8800456",
      },
      {
        userid: "test",
        password: "123",
        username: "감강찬",
        addr: "서울",
        image: "https://picsum.photos/100",
        latitude: "37.4812",
        longitude: "126.88",
      },
    ],
    selectedUser: {
      userid: "",
      password: "",
      username: "",
      addr: "",
      image: "",
    },
    defaultUser: {
      userid: "",
      password: "",
      username: "",
      addr: "",
      image: "",
    },
    nowLongitude: 0,
    nowLatitude: 0,
  },
  mutations: {
    addUser(state, payload) {
      state.userData.push(payload);
    },
    selectedUser(state, payload) {
      state.selectedUser = payload;
    },
    deleteUser(state, payload) {
      const index = state.userData.findIndex(
        (user) => user.userid === payload.userid
      );
      if (index !== -1) {
        state.userData.splice(index, 1);
      }
    },
    updateUser(state, payload) {
      const index = state.userData.findIndex(
        (user) => user.userid === payload.userid
      );
      if (index !== -1) {
        state.userData[index] = payload;
        state.selectedUser = state.defaultUser;
      }
      console.log(state.userData);
    },
  },
});
