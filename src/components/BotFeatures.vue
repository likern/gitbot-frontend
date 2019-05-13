<template>
  <div class="bot-features">
    <v-expansion-panel v-model="openedPanel">
      <v-expansion-panel-content>
        <template v-slot:header>
          <div class="feature-title">Stale Issues</div>
          <div v-if="settings.staleIssue" class="feature-status green" style="flex-grow: 0">ENABLED</div>
          <div v-else class="feature-status grey" style="flex-grow: 0">DISABLED</div>
        </template>

        <v-card>
          <StaleIssueSettings v-model="settings.staleIssue" @input="closePanel"/>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div class="feature-title">Stale Pull Requests</div>
          <div
            v-if="settings.stalePullRequest"
            class="feature-status green"
            style="flex-grow: 0"
          >ENABLED</div>
          <div v-else class="feature-status grey" style="flex-grow: 0">DISABLED</div>
        </template>
        <v-card>
          <StalePullRequestSettings/>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import StaleIssueSettings from "@/components/StaleIssueSettings";
import StalePullRequestSettings from "@/components/StalePullRequestSettings";

export default {
  name: "BotFeatures",
  components: {
    StaleIssueSettings,
    StalePullRequestSettings
  },
  data() {
    return {
      settings: {
        staleIssue: false,
        stalePullRequest: false
      },
      panels: [false, false],
      openedPanel: null
    };
  },
  computed: {
    // expansion: {
    //   get: function() {
    //     return Object.values(this.settings);
    //   },
    //   set: function(newValue) {
    //     console.log(`expansion setter: [${newValue}]`);
    //     this.settings = newValue;
    //   }
    // }
  },
  methods: {
    closePanel() {
      console.log("close panel");
      this.openedPanel = -1;
    }
  },
  watch: {
    settings: {
      handler: function() {
        console.log(`settings changed: [${JSON.stringify(this.settings)}]`);

        const index = Object.values(this.settings).findIndex(
          val => val == true
        );
        console.log(`test: ${index}`);
        this.openedPanel = -1;
      },
      deep: true
    }
  }
};
</script>


<style>
.feature-title {
  font-size: 20px;
  flex-direction: row;
  flex-grow: 0;
  justify-content: flex-end;
}

.feature-status {
  font-size: 14px;
  font-weight: 500;
  background-color: #4caf50;
  color: white;
  border-radius: 2px;
  padding: 8px 16px;
  margin: 6px 8px;
}
</style>
