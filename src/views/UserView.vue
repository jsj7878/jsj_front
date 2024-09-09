<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h3>User List</h3>
        <UserListView />
        <ModalView
          v-if="isModalOpen"
          @closeAndDelete="closeModalAndDelete"
          @closeAndUpdate="closeModalAndUpdate"
        />
      </div>
      <div class="col-md-6">
        <h3>User sign</h3>
        <userSignView />
      </div>
      <div class="row">
        <div class="col-md-6">
          <MapView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserListView from "../components/user/UserListView.vue";
import userSignView from "../components/user/UserSignView.vue";
import MapView from "../components/user/MapView.vue";
import ModalView from "../components/user/ModalView.vue";
import { ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const isModalOpen = ref(false);
const deleteUser = (userdata) => {
  let uData = {
    userid: userdata.userid,
    password: userdata.password,
    username: userdata.username,
    addr: userdata.addr,
    image: userdata.image,
    latitude: userdata.latitude,
    longitude: userdata.longitude,
  };
  store.commit("deleteUser", uData);
};
const updateUser = (userdata) => {
  let uData = {
    userid: userdata.userid,
    password: userdata.password,
    username: userdata.username,
    addr: userdata.addr,
    image: userdata.image,
    latitude: userdata.latitude,
    longitude: userdata.longitude,
  };
  store.commit("updateUser", uData);
};
const openModal = () => {
  isModalOpen.value = true;
};
const closeModalAndDelete = (userdata) => {
  isModalOpen.value = false;
  deleteUser(userdata);
};
const closeModalAndUpdate = (userdata) => {
  isModalOpen.value = false;
  updateUser(userdata);
};
watch(
  () => store.state.selectedUser,
  () => {
    openModal();
  }
);
</script>

<style lang="scss" scoped></style>
