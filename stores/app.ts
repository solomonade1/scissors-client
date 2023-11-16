import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {

  const themeMode = reactive({
    theme: "dark"
  })
  const nuxtApp = useNuxtApp();

  //States
  const darkMode: any = useLocalStorage("dark", true);
  const theme = ref("dark")

  function switchTheme(theme) {
    darkMode.value = !darkMode.value;
    nuxtApp.$vuetify.theme.dark = darkMode.value;
  }

  return {
    darkMode,
    switchTheme,
  };
});
