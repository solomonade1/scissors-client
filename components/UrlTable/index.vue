<template>
  <main class="urlTable m-auto mt-5">
    <v-data-table
      :items-per-page="6"
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
            class="border border-slate-400 rounded-full p-1"
            @click.stop="goToUrl(item.columns._id)"
          >
            <v-icon color="#c9ced6">mdi-square-edit-outline</v-icon>
          </div>
          <div class="border border-slate-400 rounded-full p-1">
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
        <v-snackbar v-model="snackbar" :timeout="timeOut" top>
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
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
import { useUrlStore } from "~/stores/url";
import { useGlobalStore } from "~/stores/globalLength";
const { $dayjs } = useNuxtApp();

const auth = useAuthStore();
const url = useUrlStore();
const globalLength = useGlobalStore();
const router = useRouter();

const userUrls = ref([]);
const linkNumber = ref(0);
const itemsPerPage = ref(10);

const urlHeaader = ref([
  {
    title: "Shorten Url",
    align: "start",
    key: "shortUrl",
  },
  {
    title: "Original Url",
    align: "start",
    key: "originalUrl",
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

// const urlList = ref([
//   {
//     short: "https://cbgllp0s.com",
//     original: "https://iy7kq43c.com",
//     qr: "https://api.qrserver.com/v1/create-qr-code/?data=https://3z45xwll.com&size=100x100",
//     clicks: 301,
//     status: "active",
//     date: "2021-10-07",
//   },
//   {
//     short: "https://i5m44vye.com",
//     original: "https://tbe8957l.com",
//     qr: "https://api.qrserver.com/v1/create-qr-code/?data=https://0i7fgfdg.com&size=100x100",
//     clicks: 308,
//     status: "inactive",
//     date: "2021-03-12",
//   },
//   {
//     short: "https://695go60q.com",
//     original: "https://8rzdce9s.com",
//     qr: "https://api.qrserver.com/v1/create-qr-code/?data=https://e9c3l8zz.com&size=100x100",
//     clicks: 697,
//     status: "active",
//     date: "2021-06-19",
//   },
//   {
//     short: "https://zcb1m1v5.com",
//     original: "https://07vbrxst.com",
//     qr: "https://api.qrserver.com/v1/create-qr-code/?data=https://gachy667.com&size=100x100",
//     clicks: 814,
//     status: "inactive",
//     date: "2021-12-24",
//   },
//   {
//     short: "https://yqzzhga1.com",
//     original: "https://as9j8d3v.com",
//     qr: "https://api.qrserver.com/v1/create-qr-code/?data=https://1ko6mwgt.com&size=100x100",
//     clicks: 364,
//     status: "active",
//     date: "2021-07-12",
//   },
//   {
//     short: "https://dwuaf8bo.com",
//     original: "https://8jn9er1k.com",
//     qr: "https://api.qrserver.com/v1/create-qr-code/?data=https://ocvds96q.com&size=100x100",
//     clicks: 638,
//     status: "active",
//     date: "2022-11-04",
//   },
//   {
//     short: "https://vid7o1hm.com",
//     original: "https://42yq14z8.com",
//     qr: "https://api.qrserver.com/v1/create-qr-code/?data=https://2kpv3y5p.com&size=100x100",
//     clicks: 604,
//     status: "inactive",
//     date: "2022-06-21",
//   },
//   {
//     short: "https://1tcyqh5p.com",
//     original: "https://a8kujesd.com",
//     qr: "https://api.qrserver.com/v1/create-qr-code/?data=https://0ev7gfwn.com&size=100x100",
//     clicks: 771,
//     status: "inactive",
//     date: "2022-09-15",
//   },
//   {
//     short: "https://x4vamgl0.com",
//     original: "https://lheilwku.com",
//     qr: "https://api.qrserver.com/v1/create-qr-code/?data=https://92kev9xx.com&size=100x100",
//     clicks: 856,
//     status: "active",
//     date: "2021-10-08",
//   },
//   {
//     short: "https://bmaurbhi.com",
//     original: "https://h7gx01kd.com",
//     qr: "https://api.qrserver.com/v1/create-qr-code/?data=https://q0d7j9b8.com&size=100x100",
//     clicks: 362,
//     status: "active",
//     date: "2020-10-23",
//   },
// ]);

const getColor = (status: string) => {
  if (status === "active") return "green";
  else return "orange";
};

const snackbar = ref(false);
const snackbarText = ref("");
const timeOut = ref(2000);

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

const formatDate = (date) => {
  // Assuming the 'date' parameter is in ISO 8601 format (e.g., '2023-10-17T20:16:02.748Z')
  return $dayjs(date).format("DD/MM/YYYY");
};

const goToUrl = (id) => {
  router.push("/urls/" + id);
};

const visibleUserUrlsLength = computed(() => {
  if (!auth.isLoggedIn) {
    const lengthDifference = userUrls.value.length - 5;
    console.log("LENGTDIff => ", lengthDifference);
    return lengthDifference >= 0 ? lengthDifference : 0;
  } else {
    return 0;
  }
});
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

// watch(userUrls, () => {
//   getUrls();
// });
const getUrls = async () => {
  let urlss;
  if (auth.isLoggedIn) {
    urlss = await url.getUserUrls();
  } else {
    urlss = await url.getUnregisterUserUrls();
  }
  userUrls.value = urlss;
  
  const lengthDifference = 5 - userUrls.value.length;
  console.log("LENGTDIff => ", lengthDifference);
  linkNumber.value = lengthDifference >= 0 ? lengthDifference : 0;
  
  // Update global state only after data is loaded
  globalLength.setVisibleUserUrlsLength(linkNumber.value);
  console.log("URLSSS Length =>", userUrls.value.length);
  console.log("LINK Length =>", linkNumber.value);
};

console.log("LINK Lentgth Second=>", linkNumber.value);

onMounted(() => {
  getUrls();
  // globalLength.setVisibleUserUrlsLength(linkNumber.value);
});
</script>

<style lang="scss" scoped>
.urlTable {
  height: 30vh;
  width: 80vw;
}

.active {
  color: green;
}

.inActive {
  color: orange;
}

.pointer {
  cursor: pointer;
}
</style>
