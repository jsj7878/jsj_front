<template>
  <div>
    <div class="mb-3 useridInput">
      <input
        type="text"
        class="form-control"
        placeholder="userid"
        v-model="userdata.userid"
      />
    </div>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="password"
        v-model="userdata.password"
      />
    </div>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="username"
        v-model="userdata.username"
      />
    </div>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="addr"
        v-model="userdata.addr"
      />
    </div>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="latitude"
        v-model="userdata.latitude"
      />
    </div>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="longitude"
        v-model="userdata.longitude"
      />
    </div>
    <div class="input-group mb-3">
      <input
        type="file"
        class="form-control"
        id="fileform"
        @change="handleImg"
      />
      <label class="input-group-text" for="fileform">Upload</label>
    </div>
    <div class="d-flex justify-content-around">
      <div class="btn btn-primary" @click="addUser">확인</div>
      <div class="btn btn-primary" @click="deleteUser">삭제</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
let fixedCenterlat = "37.4915792";
let fixedCenterlong = "126.8788277";
const userdata = ref({
  userid: null,
  password: null,
  username: null,
  addr: null,
  image: null,
  latitude: fixedCenterlat,
  longitude: fixedCenterlong,
});

watch(
  () => store.state.selectedUser,
  (newVal) => {
    userdata.value = newVal;
  }
);

const clearform = () => {
  userdata.value.userid = null;
  userdata.value.password = null;
  userdata.value.username = null;
  userdata.value.addr = null;
  userdata.value.image = null;
  userdata.value.latitude = fixedCenterlat;
  userdata.value.longitude = fixedCenterlong;
};

const addUser = () => {
  let uData = {
    userid: userdata.value.userid,
    password: userdata.value.password,
    username: userdata.value.username,
    addr: userdata.value.addr,
    image: userdata.value.image,
    latitude: userdata.value.latitude,
    longitude: userdata.value.longitude,
  };
  if (uData.userid === store.state.selectedUser.userid) {
    store.commit("updateUser", uData);
  } else if (uData.userid !== null) {
    store.commit("addUser", uData);
  }
  clearform();
};

const deleteUser = () => {
  let uData = {
    userid: userdata.value.userid,
    password: userdata.value.password,
    username: userdata.value.username,
    addr: userdata.value.addr,
    image: userdata.value.image,
    latitude: userdata.value.latitude,
    longitude: userdata.value.longitude,
  };
  store.commit("deleteUser", uData);
  clearform();
};

const handleImg = (e) => {
  const file = e.target.files[0];
  if (file) {
    userdata.value.image = URL.createObjectURL(file);
  }
};
</script>

<style lang="scss" scoped></style>
