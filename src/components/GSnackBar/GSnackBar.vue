<template>
  <v-snackbar
    v-model="enabled"
    top
    color="$style.color"
    multi-line="multi-line"
    auto-height
    :timeout="3000"
  >
    {{ description }}
    <slot></slot>
    <v-btn dark flat @click="enabled = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "g-snackbar",
  data() {
    return {
      description: "",
      enabled: false
    };
  },
  methods: {
    clickEvent(val) {
      this.isEnabled = val;
      this.$emit("click", true);
    }
  }
};
</script>

<style lang="scss" module>
.color {
  color: green;
}
</style>
