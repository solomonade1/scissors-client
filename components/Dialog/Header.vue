<template>
  <div>
    <v-row>
      <v-spacer />
      <div></div>
      <v-spacer />
      <div class="pl-6">
        <DashboardPageHeader :title="title" :subtitle="subtitle" />
      </div>
      <v-spacer />
      <div class="col-3 d-flex justify-end align-center">
        <div>
          <v-btn class="pa-0 ma-0" small icon @click="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Old",
    },
    subtitle: {
      type: String,
      default: "Title",
    },
    events: {
      type: Array,
      default: [],
    },
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
  },
};
</script>

<style>
</style>