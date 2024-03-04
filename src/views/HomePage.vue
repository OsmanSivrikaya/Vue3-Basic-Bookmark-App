<template>
  <div>
    <app-header></app-header>
    <div class="flex flex-row">
      <side-bar @category-changed="updateBookmarkList"></side-bar>
      <app-bookmark-list
        v-if="bookmarkList.length > 0"
        :items="bookmarkList"
      ></app-bookmark-list>
      <div v-else>Bookmark bulunmamaktardır.</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
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
  mounted(){
    this.$socket.on("NEW_BOOKMARK_ADDED", bookmark => {
      this.bookmarkList.push(bookmark);
    })
  },
  created() {
    this.fetchData();
  },
  methods: {
    updateBookmarkList(categoryId) {
      var url = "/bookmarks?_embed=category&_embed=user";
      if (categoryId)
        url = `/bookmarks?_embed=category&_embed=user&categoryId=${categoryId}`;

      this.$appAxios.get(url).then((res) => {
        console.log(res.data);
        this.bookmarkList = res.data || [];
      });
    },
    fetchData() {
      this.$appAxios
        .get("/bookmarks?_embed=category&_embed=user")
        .then((res) => {
          this.bookmarkList = res.data || [];
        });
      this.$appAxios
        .get(
          `/user_bookmarks?_embed=bookmark&_embed=user&userId=${this._currentUserId}`
        )
        .then((res) => {
          this.$store.commit("setBookmarks", res?.data);
        });
      this.$appAxios
        .get(
          `/user_likes?_embed=bookmark&_embed=user&userId=${this._currentUserId}`
        )
        .then((res) => {
          this.$store.commit("setLikes", res?.data);
        });
    },
  },
  computed: {
    ...mapGetters(["_currentUserId"]),
  },
};
</script>