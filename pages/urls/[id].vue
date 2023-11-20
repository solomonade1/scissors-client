<template>
  <Header />
  <div class="pa-10">
    <v-row class="col-md-10 col-12 pa-0 px-8">
      <v-col cols="12" md="6" class="px-1">
        <h1>Total Number of Clicks: <span>{{singleUrl.clicks}} </span></h1>
      </v-col>
      <v-col cols="12" md="6" class="px-1 d-flex align-center justify-center">
        <h2>Status: <span class="text-capitalize">{{singleUrl.status}}</span></h2>
      </v-col>
    </v-row>

    <div class="mt-5 px-8">
      <v-row class="col-md-10 col-12 pa-0">
        <v-col cols="12" md="6" class="px-1">
          <v-row>
            <v-col cols="12" md="12" class="px-1">
              <InputTextField
                 v-model="formData.shortUrl"
                label="Url alias"
                required
              />
            </v-col>
            <v-col cols="12" md="12" class="px-1">
              <InputTextField
                v-model="formData.originalUrl"
                
                label="Original Url"
                required
              />
            </v-col>
            <v-col cols="12" md="6" class="px-1">
              <v-btn depressed dense block color="primary" @click="updateUrl">
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  size="20"
                  :width="2"
                  color="grey"
                ></v-progress-circular>
                <span v-else>Update</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6" class="px-1 d-flex align-center justify-center">
          <div>
            <img
              :src="singleUrl.qrCode"
              height="200"
              width="200"
              alt="qrr"
            />
          </div>
        </v-col>
      </v-row>
      <div class="mt-12">
        <h2>Click Information</h2>
        <v-data-table
          :items-per-page="6"
          :headers="headers"
          :items="urlClickInfos"
          class="elevation-8"
          color="success"
          hide-default-header
        >

        <template v-slot:item.createdAt="{ item }">
    <span>{{ formatDate(item.columns.createdAt) }}</span>
  </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { useUrlStore } from "~/stores/url";
const { $dayjs } = useNuxtApp();


const auth = useAuthStore();
const url = useUrlStore();
const router = useRouter();
const route = useRoute();

const formData = ref({
  shortUrl: "",
  originalUrl: "",
});

const singleUrl = ref({})

const loading = ref(false);

const urlClickInfos = ref([])

const headers = ref([
  {
    title: "Country",
    align: "start",
    key: "country",
  },
  {
    title: "Continent",
    align: "start",
    key: "continent",
  },
  {
    title: "City",
    align: "start",
    key: "city",
  },
  {
    title: "Currency",
    align: "start",
    key: "currency",
  },
  {
    title: "Time",
    align: "start",
    key: "createdAt",
  }
]);

const clickList = ref([
  {
    country: "Nigeria",
    continents: "Africa",
    city: "Lagos",
    currency: "Naira",
  },
  {
    country: "Kenya",
    continents: "Africa",
    city: "Nairobi",
    currency: "Shilling",
  },
]);

const formatDate = (date) => {
  // Assuming the 'date' parameter is in ISO 8601 format (e.g., '2023-10-17T20:16:02.748Z')
  return $dayjs(date).format('DD/MM/YYYY');
};

const getUrl = async () => {
  const urlData = await url.getSingleUrl(route.params.id)
  singleUrl.value = urlData

  if(singleUrl.value) {
    formData.value.shortUrl = singleUrl.value.urlId;
    formData.value.originalUrl = singleUrl.value.originalUrl;
  }
  //console.log("URLLLLL =>", singleUrl.value)
  console.log(auth.user.username, "User")

}

const getUrlClickInfo = async () => {
  const urlData = await url.getUrlClickInfo(route.params.id)
 urlClickInfos.value = urlData

  // if(singleUrl.value) {
  //   formData.value.shortUrl = singleUrl.value.urlId;
  //   formData.value.originalUrl = singleUrl.value.originalUrl;
  // }
//  console.log("URLLLLL INFOOOO =>", urlClickInfos.value)
}


const updateUrl = async () => {
  const payload = {
    id: route.params.id,
    url: formData.value
  }
  const urlUpdate = await url.updateUrl(payload)
  console.log("UPDate =>", urlUpdate)
}
// watch(singleUrl, (newValue) => {
//   if (newValue) {
//     formData.value.shortUrl = newValue.urlId;
//     formData.value.originalUrl = newValue.originalUrl;
//   }
// }, { immediate: true });

// Use onMounted for asynchronous operations
onMounted( () => {
   getUrl();
   getUrlClickInfo();
  console.log("FormDATA =>", formData);
});

</script>

<style scoped></style>
