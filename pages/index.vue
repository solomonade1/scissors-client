<template>
  <div class="app">
    <NuxtLoadingIndicator />
    <!-- Header-->
    <!-- <ThemeChanger /> -->
    <Header />
    <v-row class="mt-10" no-gutters>
      <v-col cols="12">
        <h1
          class="text-transparent text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text lg:text-6xl sm:text-4xl font-bold"
        >
          Shorten Your Loooong Link :)
        </h1>
      </v-col>
      <v-col cols="12">
        <p class="text-center text-[#C9CED6] text-body-1 px-3">
          Scissors is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
      </v-col>
    </v-row>
    <v-row no-gutters class=" mt-10 ">
      <v-col cols="12" sm="8" md="6" class="m-auto">
        <v-row no-gutters >
          <v-col v-if="showAlias" cols="9" class="m-auto px-3">
            <InputTextField
              ref="inputAliasField"
              placeholder="Enter link alias here"
              v-model="formData.urlAlias"
              label="Url alias"
            />
          </v-col>
          <v-col cols="6" sm="3" md="3" class="m-auto px-3">
            <v-switch
              class="switch"
              color="#144EE3"
              label="Input Alias"
              v-model="showAlias"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters class="d-flex items-center justify-center">
      <v-col cols="10" sm="6" align-self="center">
        <v-card class="border-2 border-[#c9ced6] rounded-xl">
          <v-row class="centerContainer p-1" no-gutters>
            <v-col
              cols="8"
              sm="8"
              md="8"
              class="left w-full flex-2 bg-transparent flex items-center px-6"
            >
              <v-icon color="#c9ced6" class="d-none d-md-block"
                >mdi-link-variant</v-icon
              >
              <input
                ref="inputField"
                class="w-full outline-none border-none px-4"
                type="text"
                placeholder="Enter the link here"
                @focus="autoPasteOnFocus"
              />
            </v-col>
            <v-col
              cols="4"
              sm="4"
              md="4"
              class="right flex-1 d-flex justify-end"
            >
              <v-btn
                rounded="xl"
                color="#144EE3"
                elevation="8"
                size="x-large"
                class="register text-white"
                :class="{ 'custom-font-size': smAndDown }"
                @click="handleCreateUrl"
              >
                Shorten Now!
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center align-center" no-gutters>
      <v-col cols="8" class="m-auto px-3">
        <v-switch
          color="#144EE3"
          label="Auto Paste from Clipboard"
          v-model="autoPasteSwitch"
          class="m-auto switch"
        >
        </v-switch>
      </v-col>
    </v-row>
    <v-row no-gutters="">
      <v-col class=" px-3">
        <p v-if="!auth.isLoggedIn" class="text-center">
          You can create <span class="create ">{{ linkNumber }} </span> more
          links. Register Now to enjoy Unlimited!!!
          <v-icon color="#c9ced6" class="">mdi-help-circle-outline</v-icon>
        </p>
      </v-col>
    </v-row>

    <Loading v-if="urlPending" />
    <main class="urlTable m-auto mt-10" v-else>
      <v-data-table
        :items-per-page="10"
        :headers="visibleHeaders"
        :items="visibleData"
        class="elevation-8"
        color="success"
        hide-default-header
      >
        <template v-slot:item.qrCode="{ item }">
          <div class="cursor-pointer" @click="showQRCode(item.columns.qrCode)">
            <v-card
              elevation="0"
              width="100%"
              height="100%"
              class="d-flex justify-center transparent align-center"
            >
              <v-img
                :width="30"
                :height="30"
                contain
                :src="item.columns.qrCode"
              ></v-img>
            </v-card>
          </div>
          <v-dialog
            v-model="qrDialog"
            transition="dialog-bottom-transition"
            width="400"
          >
            <v-card class="py-3">
              <v-img
                :src="selectedQRCode"
                width="150"
                height="150"
                contain
                class="mx-auto"
              ></v-img>
              <v-icon
                class="position-absolute top-0 right-0 m-2 cursor-pointer"
                @click="closeQRDialog"
                >mdi-close</v-icon
              >
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.status="{ item }">
          <span
            class="mx-3"
            :class="item.columns.status === 'active' ? 'active' : 'inActive'"
            >{{ item.columns.status }}
          </span>

          <v-chip :color="getColor(item.columns.status)">
            <template v-if="item.columns.status === 'active'">
              <v-icon color="#c9ced6">mdi-link-variant</v-icon>
            </template>
            <template v-else>
              <v-icon>mdi-link-variant-off</v-icon>
            </template>
          </v-chip>
        </template>
        <template v-if="auth.isLoggedIn" v-slot:item._id="{ item }">
          <v-card
            elevation="0"
            width="100%"
            height="100%"
            class="d-flex gap-4 transparent align-center"
          >
            <div
              class="border border-slate-400 rounded-full p-1 cursor-pointer"
              @click.stop="goToUrl(item.columns._id)"
            >
              <v-icon color="#c9ced6">mdi-square-edit-outline</v-icon>
            </div>
            <div
              class="border border-slate-400 rounded-full p-1 cursor-pointer"
              @click.stop="deleteDialog(item.columns._id)"
            >
              <v-icon color="#c9ced6">mdi-delete-outline</v-icon>
            </div>
          </v-card>
        </template>

        <template v-slot:item.shortUrl="{ item }">
          <span class="mr-3">
            {{ item.columns.shortUrl }}
          </span>
          <span class="pointer" @click="copyToClipboard(item.columns.shortUrl)"
            ><v-icon color="#c9ced6">mdi-content-copy</v-icon></span
          >
          <v-snackbar
            v-model="snackbar"
            color="primary darken-2"
            class="text-capitalize py-3"
            :timeout="timeOut"
            top
          >
            <span class="text-center">{{ snackbarText }}</span>
          </v-snackbar>
          <!-- <v-card
          elevation="0"
          width="100%"
          height="100%"
          class="d-flex gap-4 transparent align-center"
        >
        <div class="border border-slate-400 rounded-full p-1">
          <v-icon color="#c9ced6"  >mdi-square-edit-outline</v-icon>
        </div>
        <div class="border border-slate-400 rounded-full p-1">
          <v-icon color="#c9ced6"  >mdi-delete-outline</v-icon>
        </div>
        </v-card> -->
        </template>
        <template v-slot:item.createdAt="{ item }">
          <span>{{ formatDate(item.columns.createdAt) }}</span>
        </template>
      </v-data-table>
    </main>
  </div>
  <v-snackbar
    v-model="urlErrorStatus"
    color="primary darken-2"
    class="text-capitalize py-3"
    :timeout="timeOut"
    top
  >
    <div class="text-center">
      <span class="text-center text-body-1 font-weight-bold">{{ urlMsg }}</span>
    </div>
  </v-snackbar>

  <v-dialog v-model="showDeleteDialog" max-width="400">
    <v-card class="d-flex items-center justify-center">
      <v-card-title class="headline"
        >Are you sure you want to delete this?</v-card-title
      >
      <v-card-actions>
        <!-- Cancel button to close the dialog -->
        <v-btn @click="showDeleteDialog = false" color="primary">Cancel</v-btn>
        <!-- Delete button to confirm the deletion -->
        <v-btn @click="confirmDelete" color="error">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.app {
  position: relative;
}
</style>
<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
import { useUrlStore } from "~/stores/url";
import { useGlobalStore } from "~/stores/globalLength";
import { useDisplay } from "vuetify";
const { $dayjs } = useNuxtApp();

const nuxtApp = useNuxtApp();
const vuetify = nuxtApp.$vuetify;
const auth = useAuthStore();
const url = useUrlStore();

const router = useRouter();

const urlNumber = ref(5);
const globalLength = useGlobalStore();
const autoPasteSwitch = ref(false);
const showAlias = ref(false);
const inputField = ref<HTMLInputElement | null>(null);
const inputAliasField = ref<HTMLInputElement | null>(null);

const urlLoading = ref(false);
const urlError = ref(false);
const urlErrorStatus = ref(false);
const urlErrorMsg = ref("");
const urlMsg = ref("");
const showDeleteDialog = ref(false);
const selectedItemId = ref(null);
const urlPending = ref(false);

const { mobile, smAndDown } = useDisplay();
const linkNumber = ref(0);
const userUrls = ref([]);
const formData = ref({
  originalUrl: "",
  urlAlias: "", // Initialize it as an empty string
});

const urlHeaader = ref([
  {
    title: "Shorten Url",
    align: "start",
    key: "shortUrl",
    width: "200px",
  },
  {
    title: "Original Url",
    align: "start",
    key: "originalUrl",
    width: "200px",
  },
  {
    title: "QR Code",
    align: "center",
    key: "qrCode",
  },
  {
    title: "Number of Clicks",
    align: "center",
    key: "clicks",
    width: "180px",
  },
  {
    title: "Status",
    align: "start",
    key: "status",
    width: "150px",
  },
  {
    title: "Date",
    align: "center",
    key: "createdAt",
  },
  {
    title: "Action",
    align: "start",
    key: "_id",
  },
]);

const getColor = (status: string) => {
  if (status === "active") return "green";
  else return "orange";
};

const snackbar = ref(false);

const snackbarText = ref("");
const timeOut = ref(3000);

const qrDialog = ref(false);
const selectedQRCode = ref("");

const showQRCode = (qrUrl: string) => {
  selectedQRCode.value = qrUrl;
  qrDialog.value = true;
};

const closeQRDialog = () => {
  qrDialog.value = false;
};

const copyToClipboard = (text: string) => {
  const textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
  const inpuText = text.split("/")[2];
  snackbarText.value = `${text} copied to clipboard`;
  snackbar.value = true;
  timeOut.value = 3000;
  // console.log("INPUT", inpuText)
  //alert(`${inpuText} is copy to clipboard`)
  // Optionally, you can show a notification or perform other actions after copying.
};

const autoPasteOnFocus = () => {
  if (autoPasteSwitch.value && inputField.value) {
    navigator.clipboard.readText().then((clipboardText) => {
      inputField.value!.value = clipboardText; // Use '!' to assert non-null since it's a ref
    });
  }
};

const formatDate = (date) => {
  // Assuming the 'date' parameter is in ISO 8601 format (e.g., '2023-10-17T20:16:02.748Z')
  return $dayjs(date).format("DD/MM/YYYY");
};

const goToUrl = (id) => {
  router.push("/urls/" + id);
};

const visibleHeaders = computed(() => {
  return auth.isLoggedIn
    ? urlHeaader.value
    : urlHeaader.value.filter(
        (header) => header.key !== "_id" && header.key !== "status"
      );
});

const visibleData = computed(() => {
  return auth.isLoggedIn
    ? userUrls.value
    : userUrls.value.map((item) => {
        const { action, ...otherData } = item;
        return otherData;
      });
});

const getUrls = async () => {
  urlPending.value = true;
  let urlss;
  if (auth.isLoggedIn) {
    urlss = await url.getUserUrls();
  } else {
    urlss = await url.getUnregisterUserUrls();
  }
  urlPending.value = false;
  userUrls.value = urlss;
  const lengthDifference = 5 - userUrls.value.length;
  linkNumber.value = lengthDifference >= 0 ? lengthDifference : 5;
};

const handleCreateUrl = async () => {
  if (auth.isLoggedIn) {
    formData.value.originalUrl = inputField.value?.value;
    const { status, pending, error, data } = await url.createShortUrl(
      formData.value
    );

    urlLoading.value = pending.value;
    //   urlError.value = error.value

    if (status.value === "error") {
      urlErrorMsg.value = error.value.data.message;
      urlMsg.value = error.value.data.message;
      console.log("ERROR MSG => ", error.value.data.message)
      urlErrorStatus.value = true;
    }

    // Clear the input field
    if (inputField.value && status.value === "success") {
      urlLoading.value = true;
      urlMsg.value = "Url Created Successfully...";
      inputField.value.value = "";
      formData.value.urlAlias = "";
    }

    await getUrls();
    return data.value;
  } else {
    formData.value.originalUrl = inputField.value?.value;
    const { error, status } = await url.createShortUrlNotUsers(formData.value);

    // Clear the input field
    
    if (error && error.value) {
      urlErrorStatus.value = true
      console.log("ERROR => ", error.value.data.message);
      urlErrorMsg.value = error.value.data.message
    }
    if (status.value === "error") {
      urlErrorMsg.value = error.value.data.message;
      urlMsg.value = error.value.data.message;
      console.log("ERROR MSG => ", error.value.data.message)
      urlErrorStatus.value = true;
    }
    // if (inputField.value) {
    //   inputField.value.value = "";
    //   formData.value.urlAlias = "";
    // }
    // await getUrls();
  }
  // Set the formData.urlAlias to the inputAliasField's value
};

const deleteDialog = (itemId) => {
  selectedItemId.value = itemId;
  showDeleteDialog.value = true;
};

const confirmDelete = async () => {
  // Implement the delete logic here using the selectedItemId
  // Call your API or method to delete the item by ID
  await url.deleteUrl(selectedItemId.value);

  urlLoading.value = true;
  urlMsg.value = "Url Deleted Successfully...";

  // After successful deletion, close the dialog
  showDeleteDialog.value = false;
  getUrls();
  // Optionally, refresh the table or update the data
};

onMounted(() => {
  getUrls();
});
definePageMeta({
  colorMode: "dark",
});
</script>

<style scoped>
.custom-font-size {
  font-size: 14px; /* Adjust the font size as needed for small screens */
  text-transform: capitalize;
}
.switch {
  display: flex;
  justify-content: center;
}
.create {
  color: #eb56e8;
}
.urlTable {
  height: 30vh;
  width: 95vw;
}
</style>
