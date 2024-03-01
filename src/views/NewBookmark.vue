<template>
  <div>
    <form @submit="onSave">
      <div class="login_register_container">
        <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
        <input
          ref="title"
          v-model="userData.title"
          type="text"
          placeholder="Başlık"
          class="input mb-3"
          required
        />
        <input
          v-model="userData.url"
          type="text"
          placeholder="URL"
          class="input mb-3"
          required
        />
        <select v-model="userData.categoryId" class="input mb-3" required>
          <option
            v-for="category in categoryList"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <textarea
          v-model="userData.description"
          placeholder="Açıklama"
          class="input mb-3"
          cols="30"
          rows="10"
        ></textarea>
        <div class="flex items-center justify-end gap-x-1">
          <button @click="$router.push({name: 'HomePage'})" type="button" class="secondary-button">İptal</button>
          <button type="submit" class="default-button">Kaydet</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      categoryList: [],
      userData: {
        title: null,
        url: null,
        categoryId: null,
        description: null,
      },
    };
  },
  mounted() {
    this.$appAxios.get("/categories").then((res) => {
      this.categoryList = res?.data || [];
    });
    this.$nextTick(() => {
      this.$refs.title.focus();
    })
  },
  methods:{
    onSave(){
      const saveData = {
        ... this.userData,
        userId : this._getCurrentUser?.id,
        created_at: new Date()
      };
      this.$appAxios.post("/bookmarks", saveData).then(res => {
        if(res.status == 201){
          Object.keys(this.userData)?.forEach(field => (this.userData[field] = null));
          this.$router.push({name: "HomePage"});
        }
      })
    }
  },
  computed : {
    ... mapGetters(["_getCurrentUser"])
  }
};
</script>