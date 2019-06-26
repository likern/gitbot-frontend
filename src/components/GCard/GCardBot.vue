<template>
  <g-card-base-bot>
    <div :class="$style.main">
      <div :class="$style.title">{{ title }}</div>

      <div v-for="feature in features" :key="feature" :class="$style.feature">{{ feature }}</div>
      <div :class="$style.content">
        <div v-for="repo in repositories" :key="repo" :class="$style.repos">{{ repo }}</div>
      </div>
    </div>

    <v-divider light></v-divider>
    <div :class="$style.actions">
      <v-btn>edit</v-btn>
    </div>
  </g-card-base-bot>
</template>

<script>
import GCardBaseBot from "@/components/GCard/GCardBaseBot";
export default {
  name: "g-card-bot",
  components: {
    GCardBaseBot
  },
  props: {
    title: {
      type: String,
      required: true
    },
    features: {
      type: Array,
      required: true
    },
    repositories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" module>
@import "@/assets/scss/components/GCardBaseBot.scss";
.actions {
  display: flex;
  justify-content: flex-end;
  padding: 4px;
}
</style>
