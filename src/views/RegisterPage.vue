<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Kayıt Ol</h3>
    <input v-model="userData.username" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
    <input v-model="userData.fullname" type="text" placeholder="Tam Ad" class="input mb-3" />
    <input v-model="userData.password" type="password" placeholder="Şifre" class="input mb-3" />
    <button class="default-button" @click="onSave">Kayıt ol</button>
    <span class="text-center mt-3 text-sm">
      Zaten Üyeyim,
      <router-link :to="{name:'LoginPage'}" class="text-red-900 hover:text-black">
        Giriş yap!
      </router-link>
    </span>
  </div>
</template>
<script>
import CryptoJs from "crypto-js"
export default{
  data(){
    return {
      userData : {
        username: null,
        fullname: null,
        password: null
      }
    }
  },
  methods: {
    onSave(){
      const key = this.$store.getters._saltKey;
      const password = CryptoJs.HmacSHA1(this.userData.password, key).toString();
      //const decryptedPassword = CryptoJs.AES.decrypt(cryptedPassword,key).toString(CryptoJs.enc.Utf8)
      //console.log(decryptedPassword)

      this.$appAxios.post("/users",{... this.userData , password}).then(response => {
        console.log(response);
        this.$router.push({name : "HomePage"});
      })
    }
  }
}
</script>