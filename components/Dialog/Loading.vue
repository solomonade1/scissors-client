<template>
  <v-overlay v-if="show">
    <v-dialog v-model="show" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ text }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-overlay>
</template>

<script setup lang="ts">
import { useDialogStore } from "~/stores/dialog";

const dialog = useDialogStore();

const text = computed(() => {
  return dialog.loading.text;
});

const show = computed(() => {
  return dialog.loading.show;
});
</script>
