<template>
  <div id="inspire">
    <BotFeatures/>
  </div>
</template>

<script>
import BotFeatures from "@/components/BotFeatures";

export default {
  name: "Bots",
  components: {
    BotFeatures
  },
  data() {
    return {
      drawer: true
    };
  }
};
</script>
