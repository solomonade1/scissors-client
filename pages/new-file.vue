<template>
    <div>
        <Loading v-if="urlPending" />
    <main class="urlTable m-auto mt-10" v-else>
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
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>