import { defineStore } from 'pinia';

export const useGlobalStore = defineStore({
  id: 'global',
  state: () => ({
    visibleUserUrlsLength: 0, // Initialize with the default value
  }),
  getters: {
    getVisibleUserUrlsLength(state) {
      return state.visibleUserUrlsLength;
    },
  },
  actions: {
    setVisibleUserUrlsLength(length) {
      this.visibleUserUrlsLength = length;
    },
  },
});
