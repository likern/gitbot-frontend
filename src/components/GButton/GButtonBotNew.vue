<template>
  <div class="vld-parent">
    <g-global-notification :enabled.sync="errorState" :color="error.color">{{ error.message }}</g-global-notification>
    <g-progress :enabled.sync="loading"></g-progress>
    <g-dialog-bot-new
      :key="dialog.key"
      :enabled.sync="dialog.enabled"
      :repositories.sync="dialog.repositories"
      :future-repositories-enabled.sync="dialog.futureRepositoriesEnabled"
    ></g-dialog-bot-new>
    <g-card-base-bot @click.native.stop="getAvailableRepositories">
      <div :class="$style.content">
        <v-icon size="64">add</v-icon>
        <div :class="$style.title">Add Bot</div>
      </div>
    </g-card-base-bot>
  </div>
</template>

<script>
import gitbot from "@/api/gitbot";

import GGlobalNotification from "@/components/GSnackBar/GGlobalNotification";
import GProgress from "@/components/GProgress/GProgress";
import GDialogBotNew from "@/components/GDialog/GDialogBotNew";
import GCardBaseBot from "@/components/GCard/GCardBaseBot";

export default {
  name: "g-button-bot-new",
  components: {
    GGlobalNotification,
    GProgress,
    GCardBaseBot,
    GDialogBotNew
  },
  data() {
    return {
      loading: false,
      dialog: {
        key: 0,
        enabled: false,
        repositories: [],
        futureRepositoriesEnabled: false
      },
      error: {
        message: "",
        color: ""
      }
    };
  },
  computed: {
    errorState: {
      get: function() {
        return Boolean(this.error.message);
      },
      set: function(newState) {
        if (!newState) {
          this.error.message = "";
        }
      }
    }
  },
  methods: {
    async getAvailableRepositories() {
      this.dialog.key++;
      this.loading = true;

      try {
        const response = await gitbot.getAvailableRepositories();
        this.dialog.repositories = response.data.available.repos;
        this.dialog.futureRepositoriesEnabled =
          response.data.available.futureRepos;
        this.dialog.enabled = true;
        this.loading = false;
      } catch (error) {
        if (!error.response) {
          this.error.color = "red";
          this.error.message = error.message;
        } else {
          this.error.message = error.message;
        }
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" module>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title {
  font-size: 28px;
  color: #0000008a;
}
</style>
