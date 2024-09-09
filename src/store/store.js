import { createStore } from "vuex";

export default createStore({
  state: {
    userData: [
      {
        userid: "hanyong5",
        password: "123",
        username: "홍길동",
        addr: "서울",
        image: "https://picsum.photos/100",
        latitude: "37.4915792",
        longitude: "126.8788277",
      },
      {
        userid: "ttomi",
        password: "123",
        username: "김유신",
        addr: "서울",
        image: "https://picsum.photos/100",
        latitude: "37.4915792",
        longitude: "126.8788277",
      },
      {
        userid: "test",
        password: "123",
        username: "감강찬",
        addr: "서울",
        image: "https://picsum.photos/100",
        latitude: "37.4915792",
        longitude: "126.8788277",
      },
    ],
    selectedUser: {
      userid: "",
      password: "",
      username: "",
      addr: "",
      image: "",
    },
  },
  mutations: {
    addUser(state, payload) {
      state.userData.push(payload);
    },
    updateUser(state, payload) {
      for (const item of state.userData) {
        if (item.userid === payload.userid) {
          item = payload;
        }
      }
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
  },
});
