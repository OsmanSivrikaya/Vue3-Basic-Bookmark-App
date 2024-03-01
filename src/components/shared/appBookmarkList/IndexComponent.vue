<template>
    <div>
      <div class="p-2 grid grid-cols-8 gap-4">
        <bookmark-list-item v-for="item in items" :key="item.id" :item="item"></bookmark-list-item>
      </div>
    </div>
</template>
<script>
import BookmarkListItem from "./BookmarkListItem.vue"
export default {
    components:{
        "bookmark-list-item" : BookmarkListItem,
    },
    props: {
      items:{
        type: Array,
        required: true,
        default: () => []
      }
    }
}
</script>