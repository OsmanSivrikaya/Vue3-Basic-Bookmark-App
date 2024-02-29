<template>
    <div>
      <div class="p-2 grid grid-cols-8 gap-4">
        <bookmark-list-item v-for="i in 10" :key="i"></bookmark-list-item>
      </div>
    </div>
</template>
<script>
import BookmarkListItem from "./BookmarkListItem.vue"
export default {
    components:{
        "bookmark-list-item" : BookmarkListItem,
    }
}
</script>