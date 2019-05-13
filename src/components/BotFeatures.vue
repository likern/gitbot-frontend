<template>
  <div class="bot-features">
    <v-expansion-panel v-model="expandIndex">
      <Feature title="Stale Issues" @click="shrink">
        <StaleIssueSettings/>
      </Feature>

      <Feature title="Stale Pull Requests" @click="shrink">
        <StalePullRequestSettings/>
      </Feature>
    </v-expansion-panel>
  </div>
</template>

<script>
import StaleIssueSettings from "@/components/StaleIssueSettings";
import StalePullRequestSettings from "@/components/StalePullRequestSettings";
import Feature from "@/components/Feature";

export default {
  name: "BotFeatures",
  components: {
    Feature,
    StaleIssueSettings,
    StalePullRequestSettings
  },
  data() {
    return {
      expandIndex: null
    };
  },
  methods: {
    shrink() {
      this.expandIndex = -1;
    }
  }
};
</script>


<style>
</style>
