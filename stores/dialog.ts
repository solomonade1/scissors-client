import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", () => {
  //States
  const notification = reactive({
    text: "",
    show: false,
  });

  const loading = reactive({
    text: "",
    show: false,
  });

  //Functions
  async function showNotification(message) {
    notification.text = message;
    notification.show = true;

    setTimeout(() => {
      closeNotification();
    }, 7000);
  }

  function closeNotification() {
    notification.text = "";
    notification.show = false;
  }

  function showLoading(message) {
    loading.text = message;
    loading.show = true;
  }

  function closeLoading() {
    loading.text = "";
    loading.show = false;
  }

  return {
    notification,
    loading,
    showNotification,
    closeNotification,
    showLoading,
    closeLoading,
  };
});
