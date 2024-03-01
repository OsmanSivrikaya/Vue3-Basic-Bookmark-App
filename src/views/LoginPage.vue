<template>
  <form @submit="onSubmit" style="">
    <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Giriş Yap</h3>
      <input
        v-model="userData.username"
        type="text"
        placeholder="Kullanıcı Adı"
        class="input mb-3"
        required
      />
      <input
        v-model="userData.password"
        type="password"
        placeholder="Şifre"
        class="input mb-3"
        required
      />
      <button type="submit" class="default-button">Giriş yap</button>
      <span class="text-center mt-3 text-sm">
        Üye değilim,
        <router-link
          :to="{ name: 'RegisterPage' }"
          class="text-red-900 hover:text-black"
        >
          Üye olmak istiyorum!
        </router-link>
      </span>
    </div>
  </form>
</template>
<script>
import CryptoJs from "crypto-js";
export default {
  data() {
    return {
      userData: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit() {
      const key = this.$store.getters._saltKey;
      const cryptedPassword = CryptoJs.HmacSHA1(
        this.userData.password,
        key
      ).toString();

      this.$appAxios
        .get(
          `/users?username=${this.userData.username}&password=${cryptedPassword}`
        )
        .then((res) => {
          console.log(res);
          if (res?.data?.length > 0) {
            this.$store.commit("setUser", res?.data[0]);
            this.$router.push({ name: "HomePage" });
          } else {
            alert("Böyle bir kullanıcı bulunmamaktadır.");
          }
        })
        .catch((e) => console.log(e));
      //.finaly(() => this.loader = false);
    },
  },
};
</script>
