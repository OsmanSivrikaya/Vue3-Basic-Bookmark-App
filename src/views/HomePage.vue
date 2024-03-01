<template>
  <div>
    <app-header></app-header>
    <div class="flex flex-row">
      <side-bar @category-changed="updateBookmarkList"></side-bar>
      <app-bookmark-list v-if="bookmarkList.length > 0" :items="bookmarkList"></app-bookmark-list>
      <div v-else>Bookmark bulunmamaktardır.</div>
    </div>
  </div>
</template>
<script>
import SideBar from "@/components/home/SideBar.vue";
export default {
  components: {
    "side-bar": SideBar,
  },
  data() {
    return {
      bookmarkList: [],
    };
  },
  created() {
    this.$appAxios.get("/bookmarks?_embed=category&_embed=user").then((res) => {
      console.log(res.data);
      this.bookmarkList = res.data || [];
    });
  },
  methods: {
    updateBookmarkList(categoryId) {

      var url = "/bookmarks?_embed=category&_embed=user";
      if(categoryId)
      url = `/bookmarks?_embed=category&_embed=user&categoryId=${categoryId}`;

      this.$appAxios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.bookmarkList = res.data || [];
        });
    },
  },
};
</script>