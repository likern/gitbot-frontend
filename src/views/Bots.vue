<template>
  <div id="inspire">
    <!-- <BotFeatures/> -->
    <v-flex>
      <RepositoryTest/>

      <AddBot/>

      <Repository/>
      <BotFeatures/>
    </v-flex>
  </div>
</template>

<script>
import BotFeatures from "@/components/BotFeatures";
import Repository from "@/components/bot/settings/repo/Repository";
import RepositoryTest from "@/components/bot/settings/repo/RepositoryTest";
import AddBot from "@/components/bot/buttons/AddBot";

export default {
  name: "Bots",
  components: {
    BotFeatures,
    AddBot,
    Repository,
    RepositoryTest
  },
  data() {
    return {
      drawer: true
    };
  }
};
</script>
