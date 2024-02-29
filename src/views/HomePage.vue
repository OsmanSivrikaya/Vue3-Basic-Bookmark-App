<template>
  <div>
    <app-header></app-header>
  <div class="flex flex-row">
    <side-bar></side-bar>
    <app-bookmark-list></app-bookmark-list>
  </div>
  </div>
</template>
<script>
  import SideBar from "@/components/home/SideBar.vue";
  export default{
    components: {
      "side-bar": SideBar,
    }
  }
</script>