<template>
  <div class="vld-parent">
    <g-error-message :enabled.sync="errorState" :color="error.color">{{ error.message }}</g-error-message>
    <g-progress :enabled.sync="loading"></g-progress>
    <g-dialog-bot-new
      :key="dialog.key"
      :enabled.sync="dialog.enabled"
      :repositories.sync="dialog.repositories"
      :future-repositories-enabled.sync="dialog.futureRepositoriesEnabled"
    ></g-dialog-bot-new>
    <v-sheet elevation="2" :class="$style.card" @click.stop="getAvailableRepositories">
      <div :class="$style.content">
        <v-icon size="64">add</v-icon>
        <div :class="$style.title">Add Bot</div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";

import GErrorMessage from "@/components/GSnackBar/GErrorMessage";
import GProgress from "@/components/GProgress/GProgress";
import GDialogBotNew from "@/components/GDialog/GDialogBotNew";

export default {
  name: "g-button-bot-new",
  components: {
    GErrorMessage,
    GProgress,
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
    clickEvent() {
      this.$emit("click", true);
    },
    getAvailableRepositories() {
      this.dialog.key++;
      this.loading = true;

      firebase
        .auth()
        .currentUser.getIdToken()
        .then(token => {
          axios
            .get("http://helvy.ngrok.io/v1/bot/new", {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(resp => {
              console.log(resp);
              this.dialog.repositories = resp.data.available.repos;
              this.dialog.futureRepositoriesEnabled =
                resp.data.available.futureRepos;
              this.dialog.enabled = true;
              this.loading = false;
            })
            .catch(error => {
              if (!error.response) {
                this.error.color = "red";
                this.error.message = error.message;
              } else {
                this.error.message = error.message;
              }
              this.loading = false;
            });
        })
        .catch(err => {
          console.log(err);
          this.error.message = err.message;
          this.error.message.firebase = err.message;
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" module>
.card {
  border-radius: 8px;
  height: 100%;
}

.card:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}

.add-bot-card {
  display: flex;
  border-radius: 8px;
}

.bot-main {
  padding: 0px 16px 0px 16px;
}

.bot-title {
  padding: 16px 0px 16px 0px;
}

.bot-feature {
  display: inline-block;
  background-color: #c8c5ef;
  padding: 4px 4px 4px 4px;
  border-radius: 2px;
  margin: 0px 8px 8px 0px;
}

.bot-content {
  padding: 0px 0px 8px 0px;
}

.bot-actions {
  display: flex;
  justify-content: flex-end;
  padding: 4px;
}

.bot-repos {
  display: inline-block;
  margin: 0px 8px 0px 0px;
  font-weight: bold;
  color: #446fff;
  overflow: hidden;
  text-overflow: ellipsis;
}

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

.add-button-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.add-button-text {
  font-size: 22px;
  color: #757575;
}

.card-style {
  height: 150px;
  width: 200px;
  max-width: 300px;
}
</style>
