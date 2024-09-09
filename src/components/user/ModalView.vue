<template>
  <div>
    <div class="modal">
      <div class="modal-content">
        <div class="mb-3 useridInput">
          <input
            type="text"
            class="form-control"
            placeholder="userid"
            readonly
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
        <button
          class="bnt primary-btn"
          @click="$emit('closeAndUpdate', userdata)"
        >
          수정
        </button>
        <button
          class="btn primary-btn"
          @click="$emit('closeAndDelete', userdata)"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const selectedUser = store.state.selectedUser;
const userdata = ref({
  userid: selectedUser.userid,
  password: selectedUser.password,
  username: selectedUser.username,
  addr: selectedUser.addr,
  image: selectedUser.image,
  latitude: selectedUser.latitude,
  longitude: selectedUser.longitude,
});
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  position: relative;
}
</style>
