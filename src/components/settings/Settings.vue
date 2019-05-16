<template>
  <div class="bot-features">
    <v-expansion-panel v-model="expandIndex">
      <Feature title="Logout" @click="shrink">
        <StaleIssueSettings/>
      </Feature>

      <Feature title="Delete account" @click="shrink">
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
  name: "Settings",
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
