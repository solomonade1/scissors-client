<template>
  <div class="hero mt-12 flex items-center justify-center flex-col gap-2">
    <div class="top flex items-center justify-center flex-col">
      <h1
        class="text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text lg:text-6xl sm:text-4xl font-bold"
      >
        Shorten Your Loooong Link :)
      </h1>
      <p class="text-center text-[#C9CED6]">
        Linkly is an efficient and easy-to-use URL shortening service that
        streamlines your online experience.
      </p>
      <v-switch color="#144EE3" label="Input Alias" v-model="showAlias">
      </v-switch>
      <input
        v-if="showAlias"
        ref="inputAliasField"
        class="w-full outline-none border-none px-4"
        type="text"
        placeholder="Enter link alias here"
        v-model="formData.urlAlias"
      />
    </div>
    <div
      class="center mt-6 max-w-700 mx-auto lg:max-w-lg border-2 border-[#c9ced6] rounded-xl"
    >
      <div class="centerContainer p-1 flex">
        <div class="left w-full flex-2 bg-transparent flex items-center px-3">
          <v-icon class="d-none d-md-block" color="#c9ced6"
            >mdi-link-variant</v-icon
          >
          <input
            ref="inputField"
            class="w-full outline-none border-none px-4"
            type="text"
            placeholder="Enter the link here"
            @focus="autoPasteOnFocus"
          />
        </div>
        <div class="right flex-1">
          <v-btn
            rounded="xl"
            color="#144EE3"
            elevation="8"
            size="x-large"
            class="register text-white text-capitalize"
            @click="handleCreateUrl"
          >
            Shorten Now!
          </v-btn>
        </div>
      </div>
    </div>
    <v-switch
      color="#144EE3"
      label="Auto Paste from Clipboard"
      v-model="autoPasteSwitch"
    >
    </v-switch>

    <p v-if="!auth.isLoggedIn">
      You can create <span class="create">{{5 - urlNumber }} </span> more links. Register Now to
      enjoy Unlimited usage question-circle
      <v-icon color="#c9ced6">mdi-help-circle-outline</v-icon>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
import { useUrlStore } from "~/stores/url";
import { useGlobalStore } from "~/stores/globalLength";

const auth = useAuthStore();
const url = useUrlStore();
const urlNumber = ref(0);
const globalLength = useGlobalStore();
const autoPasteSwitch = ref(false);
const showAlias = ref(false);
const inputField = ref<HTMLInputElement | null>(null);
const inputAliasField = ref<HTMLInputElement | null>(null);

const formData = ref({
  originalUrl: "",
  urlAlias: "", // Initialize it as an empty string
});

const autoPasteOnFocus = () => {
  if (autoPasteSwitch.value && inputField.value) {
    navigator.clipboard.readText().then((clipboardText) => {
      inputField.value!.value = clipboardText; // Use '!' to assert non-null since it's a ref
    });
  }
};
const visibleUserUrlsLength = computed(
  () => globalLength.getVisibleUserUrlsLength
);
const urlRemainder = computed(() => url.urlNumber);

//console.log("REmainder 44499 =>", visibleUserUrlsLength.value);
const handleCreateUrl = async () => {

  if(auth.isLoggedIn) {
    formData.value.originalUrl = inputField.value?.value;
  const { error } = await url.createShortUrl(formData.value);
  if (error) {
    console.log("ERROR => ", error.value.data.message);
  }
  await url.getUserUrls();
  } else {
    formData.value.originalUrl = inputField.value?.value;
  const { error } = await url.createShortUrlNotUsers(formData.value);
  if (error) {
    console.log("ERROR => ", error.value.data.message);
  }
  await url.getUnregisterUserUrls();
  }
  // Set the formData.urlAlias to the inputAliasField's value
 
};

const getUrlNumber = async () => {
  // if (url.urlNumber > 0) {
  //   urlNumber.value = url.urlNumber;
  //   console.log("REmainder URL =>", urlNumber.value);
  // }
  if (!auth.isLoggedIn) {
    const urlss = await url.getUnregisterUserUrls();
    urlNumber.value = urlss.length ;


    console.log("REmainder URL =>", urlNumber.value);
  }
};

//  getUrlNumber();

onMounted(() => {
   getUrlNumber();
});
</script>

<style lang="scss" scoped>
.hero {
  .top {
    // h1 {
    //   font-size: 72px;
    //   font-weight: bold;
    //   background: linear-gradient(
    //     90deg,
    //     rgba(20, 78, 227, 1) 0%,
    //     rgba(63, 80, 228, 1) 16%,
    //     rgba(184, 84, 230, 1) 36%,
    //     rgba(212, 85, 231, 1) 59%,
    //     rgba(20, 78, 227, 1) 78%,
    //     rgba(235, 86, 232, 1) 100%
    //   );
    //   -webkit-text-fill-color: transparent;
    //   -webkit-background-clip: text;
    // }
  }

  .center {
  }

  .create {
    color: #eb56e8;
  }
}
</style>
