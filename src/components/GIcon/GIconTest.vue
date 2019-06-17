<template>
  <font-awesome-icon v-bind="$attrs" :class="currentTheme()"></font-awesome-icon>
</template>

<script>
export default {
  name: "g-icon-test",
  methods: {
    currentTheme() {
      const theme = this.$vuetify.dark ? "theme--dark" : "theme--light";
      return `v-icon ${theme}`;
    }
  }
};
</script>
