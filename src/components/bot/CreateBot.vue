<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
    </template>
    <div class="bot-features">
      <v-text-field solo label="Enter a bot name">Bot Name</v-text-field>
      <Repository></Repository>
      <v-expansion-panel v-model="expandIndex">
        <Feature title="Stale Issues" @click="shrink">
          <StaleIssueSettings/>
        </Feature>

        <Feature title="Stale Pull Requests" @click="shrink">
          <StalePullRequestSettings/>
        </Feature>
      </v-expansion-panel>
      <v-layout row justify-end mb-2>
        <v-btn color="error" @click="clickEvent(false)">CREATE</v-btn>
        <v-btn color="success" @click="clickEvent(true)">CREATE BOT</v-btn>
      </v-layout>
      <v-btn color="success" @click="clickEvent(true)">CREATE</v-btn>
    </div>
  </v-dialog>
</template>

<script>
import Repository from "@/components/bot/settings/repo/Repository";
import StaleIssueSettings from "@/components/StaleIssueSettings";
import StalePullRequestSettings from "@/components/StalePullRequestSettings";
import Feature from "@/components/Feature";

export default {
  name: "CreateBot",
  components: {
    Repository,
    Feature,
    StaleIssueSettings,
    StalePullRequestSettings
  },
  data() {
    return {
      dialog: false,
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
