<template>
  <div>
    <div class="bots-grid">
      <g-button-bot-new/>
      <g-card-bot
        v-for="bot in bots"
        :key="bot._id"
        :title="bot.name"
        :repositories="bot.repositories"
        :features="extractFeatures(bot)"
      ></g-card-bot>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import GButtonBotNew from "@/components/GButton/GButtonBotNew";
import GCardBot from "@/components/GCard/GCardBot";

export default {
  name: "g-layout-bot-grid",
  components: {
    GButtonBotNew,
    GCardBot
  },
  data() {
    return {
      repositories: [],
      features: []
    };
  },
  methods: {
    clickEvent(val) {
      this.isEnabled = val;
      this.$emit("click", true);
    },
    extractFeatures(bot) {
      const object = Object.assign({}, bot.settings);
      const features = Object.getOwnPropertyNames(object);
      const observable = Vue.observable(features);
      return observable;
    }
  },
  computed: {
    bots() {
      return this.$store.getters.BOTS;
    }
  },
  async mounted() {
    await this.$store.dispatch("GET_BOTS", { detailed: true });
  }
};
</script>

<style scoped>
.bots-grid {
  display: grid;
  grid-template-columns: repeat(3, [column] 400px);
  grid-template-rows: repeat(3, [row] 250px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
</style>
