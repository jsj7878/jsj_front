<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h3>User List</h3>
        <UserListView />
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
</script>

<style lang="scss" scoped></style>
