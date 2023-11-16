<template>
  <div class="header">
    <div class="headerContainer">
      <div class="flex logo">
        <NuxtLink to="/">
          <h2>Scissors</h2>
        <span>&reg;</span>
        </NuxtLink>
       
      </div>
      <div class="flex gap-4">
        <!-- <ThemeChanger /> -->
        <NuxtLink v-if="auth.isLoggedIn"  >
          <v-btn
            color="#181E29"
            rounded="xl"
            outlined
            append-icon="mdi-login"
            size="x-large"
            class="login text-white text-capitalize"
            @click="handleLogout"
          >
           logout
          </v-btn>
        </NuxtLink>
        <NuxtLink v-else  to="/login">
          <v-btn
            color="#181E29"
            rounded="xl"
            outlined
            append-icon="mdi-login"
            size="x-large"
            class="login text-white text-capitalize"
          
          >
            login
          </v-btn>
        </NuxtLink>
        <NuxtLink v-if="!auth.isLoggedIn" to="/register">
          <v-btn
            rounded="xl"
            color="#144EE3"
            elevation="8"
            size="x-large"
            class="register invisible md:visible text-white text-capitalize"
            >Register Now</v-btn
          >
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "../../stores/app";
import { useAuthStore } from "~/stores/useAuthStore";
const app = useAppStore();

const nuxtApp = useNuxtApp();
const auth = useAuthStore();

async function handleLogout() {


 await auth.logout();
if(!auth.isLoggedIn) {
  navigateTo("/login");
}

}

//console.log(nuxtApp.$vuetify);
</script>

<style lang="scss" scoped>
.header {
  height: 80px;

  .headerContainer {
    padding: 10px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      //   display: flex;
      position: relative;

      h2 {
        font-size: 30px;
        line-height: 1.5rem;
        font-family: Arial, Helvetica, sans-serif;
        background: linear-gradient(to right, #eb568e, #144ee3);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
      span {
        font-size: 15px;
        color: #144ee3;
        font-weight: bold;
        position: absolute;
        right: -10px;
        top: -5px;

        z-index: 99;
      }
    }
  }
}
</style>
