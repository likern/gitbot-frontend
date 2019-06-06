<template>
  <div id="inspire">
    <!-- <BotFeatures/> -->
    <v-flex>
      <AddBot/>
    </v-flex>
  </div>
</template>

<script>
import BotFeatures from "@/components/BotFeatures";
import AddBot from "@/components/bot/buttons/AddBot";

export default {
  name: "Bots",
  components: {
    BotFeatures,
    AddBot
  },
  data() {
    return {
      drawer: true
    };
  }
};
</script>
