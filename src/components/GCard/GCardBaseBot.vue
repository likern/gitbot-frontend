<template>
  <v-sheet elevation="2" :class="$style.card">
    <slot></slot>
  </v-sheet>
</template>

<script>
export default {
  name: "g-card-base-bot",
  data() {
    return {};
  }
};
</script>

<style lang="scss" module>
@import "@/assets/scss/components/GCardBaseBot.scss";
</style>
