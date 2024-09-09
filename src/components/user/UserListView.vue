<template>
  <div
    v-for="(item, i) in $store.state.userData"
    :key="i"
    class="userCard d-flex gap-2 border rounded p-3 mb-3"
    @click="SelectedUser(item)"
  >
    <div class="avata">
      <img :src="item.image" alt="" />
    </div>
    <div>
      <h5 class="mb-0">{{ item.userid }}</h5>
      <p class="mb-0">{{ item.username }}</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
const SelectedUser = (item) => {
  store.commit("selectedUser", item);
};
</script>

<style lang="scss" scoped>
.avata {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.userCard:hover {
  cursor: pointer;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3); /* 그림자 추가 */
}
</style>
