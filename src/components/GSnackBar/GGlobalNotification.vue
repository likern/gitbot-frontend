<template>
  <v-snackbar
    :value="enabled"
    :timeout="3000"
    :color="color"
    :class="$style.snackbar"
    top
    auto-height
    @input="close"
  >
    <slot></slot>
    <v-btn outline :class="$style.button" @click="close">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "g-global-notification",
  props: {
    enabled: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("update:enabled", false);
    }
  }
};
</script>

<style lang="scss" module>
$font-size: 18px;

.snackbar {
  font-size: $font-size;
}

.button {
  font-size: $font-size;
}
</style>
