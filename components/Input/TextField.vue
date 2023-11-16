<template>
    <div>
      <v-text-field
        v-model="inputValue"
        v-on:input="$emit('input', $event)"
        @blur="$emit('blur', $event)"
        :loading="loading"
        :rules="required ? inputRule : []"
        :label="label"
        :prefix="prefix"
        :hint="hint"
        :placeholder="placeholder"
        :required="required"
        v-bind="$attrs"
        dense
        variant="outlined"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  const nuxtApp = useNuxtApp();
  
  const props = defineProps({
    label: {
      type: String,
      default: "Label",
    },
    prefix: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    rules: {
      type: Array,
      default: () => [],
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
    loading: { type: Boolean, default: false },
  });
  
  const inputValue = computed({
    get() {
      return props.value;
    },
    set(value) {
      return value;
    },
  });
  
  const inputRule = computed(() => {
    if (props.rules.length === 0) {
      return [(v: string) => !!v || "This Field is required"];
    } else {
      return props.rules;
    }
  });
  
  onMounted(() => {
    //what happens on mounted?
  });
  </script>
  