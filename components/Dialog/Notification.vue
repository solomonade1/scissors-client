<template>
  <v-snackbar
    v-model="show"
    :timeout="timeOut"
    @mouseover="delayTimeOut"
    color="primary darken-2"
    class="text-capitalize py-3"
  >
    <div>
      <v-icon class="mr-3">
        {{ icon }}
      </v-icon>
      <span v-text="text" />
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useDialogStore } from "~/stores/dialog";
const dialog = useDialogStore();

const props = defineProps({
  icon: {
    type: String,
    default: "mdi-information-outline",
  },
  timeout: {
    type: Number,
    default: 3000,
  },
});

//Computed properties
const text = computed(() => {
  return dialog.notification.text;
});

const show = computed({
  get() {
    return dialog.notification.show;
  },
  set(value) {
    dialog.closeNotification();
    return value;
  },
});

let timeOut = computed<number>({
  get() {
    return props.timeout;
  },
  set(value) {
    return value;
  },
});

function delayTimeOut() {
  timeOut.value += 2000;
}
</script>
