<template>
  <div id="inspire">
    <!-- <BotFeatures/> -->
    <v-flex>
      <Repository/>

      <AddBot/>

      <BotFeatures/>
    </v-flex>
  </div>
</template>

<script>
import BotFeatures from "@/components/BotFeatures";
import Repository from "@/components/bot/settings/repo/Repository";

import AddBot from "@/components/bot/buttons/AddBot";

export default {
  name: "Bots",
  components: {
    BotFeatures,
    AddBot,
    Repository
  },
  data() {
    return {
      drawer: true
    };
  }
};
</script>
