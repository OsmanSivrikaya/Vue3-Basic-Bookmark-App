<template>
  <div>
    <app-header></app-header>
    <div class="flex flex-row">
        <side-bar></side-bar>
        <component :is="$route.meta.componentName" :items="bookmarkList"></component>
    </div>
  </div>
</template>
<script>
import sideBar from "@/components/account/sideBarAccount.vue";
export default {
  components: {
    "side-bar": sideBar,
  },
  data() {
    return {
      bookmarkList: [],
      socekt: {}
    };
  },
  created() {
    this.$appAxios.get("/bookmarks?_embed=category&_embed=user").then((res) => {
      this.bookmarkList = res.data || [];
    });
  },
};
</script>