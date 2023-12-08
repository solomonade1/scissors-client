<template>
  <Header />
  <v-container>
    <v-row>
      <v-col cols="6" class="d-none d-md-block pa-0 half-bg m-auto">
        <div class="fill-height d-flex justify-center align-center">
          <img src="/svg/login.svg" class="fullHeight" />
        </div>
      </v-col>
      <v-col cols="12" md="6" class="m-auto px-6">
        <form @submit.prevent="handleRegister">
          <v-row>
            <v-col cols="12">
              <h2
                class="text-transparent text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text lg:text-6xl sm:text-4xl font-bold"
              >
                Scissors <span class="text-h4">Register</span>
              </h2>
            </v-col>
            <v-col cols="12">
              <InputTextField
                type="email"
                placeholder="JohhDoe@gmail.com"
                v-model="form.email"
                label="Email"
              />
            </v-col>
            <v-col cols="12">
              <InputTextField
                placeholder="JohhDoe"
                v-model="form.username"
                label="Username"
              />
            </v-col>
            <v-col cols="12">
              <InputTextField
                type="password"
                v-model="form.password"
                label="Password"
              />
            </v-col>
            <v-col>
              <Loading v-if="loading" />
              <v-btn v-else size="x-large" type="submit"> Register </v-btn>
              <span v-if="errorMessage" style="color: tomato">{{ errorMessage }}</span>
              <div class="d-flex items-center">
                <v-btn variant="plain" @click="navigateTo('/login')"
                  >Login</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="loading"
      color="primary darken-2"
      class="text-capitalize py-3"
      :timeout="timeOut"
      top
    >
      <div class="text-center">
        <span class="text-center">{{ snackbarText }}</span>
      </div>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
let rememberMe = true;
import { useAuthStore } from "~/stores/useAuthStore";
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: ["guest"],
});
const loading = ref(false);
const timeOut = ref(3000);

const userLoading = ref(false);
const snackbarText = ref("");
const form = ref({
  email: "",
  username: "",
  password: "",
});

const errorMessage = ref("");

const auth = useAuthStore();

async function handleRegister() {
  
  const { error, status } = await auth.register(form.value);
 
  // console.log("User =>", error);

  if (error && error.value) {
    console.log("ERROR => ", error.value.data.message);
    errorMessage.value = error.value.data.message;
  }

  if (status.value === "success") {
    loading.value = true;
    snackbarText.value = "User Created Successfully!!!";
    navigateTo("/login");
  }
}

definePageMeta({
  colorMode: "dark",
});
</script>

<style scoped></style>
