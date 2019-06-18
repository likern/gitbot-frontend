<template>
  <div>
    <g-error-message :enabled.sync="errorState" :color="error.color">{{ error.message }}</g-error-message>
    <v-dialog v-model="enabled" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add a bot</span>
          <g-svg-future-repositories-enabled v-if="futureReposSelected" :class="$style.futureSvg"/>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <v-text-field v-model="botName" solo label="Enter a bot name" required/>
            </v-flex>
            <v-flex xs12>
              <g-repository-list
                :selects="selects"
                :repos="repositories"
                :future-repos-selected="futureReposSelected"
                :future-repos-disabled="!futureRepositoriesEnabled"
                @future-repos-changed="futureReposSelected = !futureReposSelected"
                @selects-changed="handleSelectsChanged"
              />
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cancel">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="create">Create bot</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";

import GErrorMessage from "@/components/GSnackBar/GErrorMessage";
import GRepositoryList from "@/components/GRepository/GRepositoryList";
import GSvgFutureRepositoriesEnabled from "@/assets/svg/future-repositories-enabled.svg";

export default {
  name: "g-dialog-bot-new",
  components: {
    GRepositoryList,
    GErrorMessage,
    GSvgFutureRepositoriesEnabled
  },
  props: {
    enabled: {
      type: Boolean,
      required: true
    },
    repositories: {
      type: Array,
      required: true
    },
    futureRepositoriesEnabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      botName: "",
      selects: [],
      futureReposSelected: false,
      expandIndex: null,
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
    },
    selectedRepositories() {
      return this.selects.map(id => this.repos[id]);
    }
  },
  methods: {
    shrink() {
      this.expandIndex = -1;
    },
    handleSelectsChanged(selects) {
      console.log(selects);
      this.selects = selects;
    },
    create() {
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(token => {
          axios
            .post(
              "http://helvy.ngrok.io/v1/bot/new",
              {
                // Add support for future repositories option
                name: this.botName,
                repositories: this.selects
              },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            )
            .then(() => {
              // this.dialog = false;
              this.$router.push({ name: "Bots" });
            })
            .catch(error => {
              if (!error.response) {
                this.error.color = "red";
                this.error.message = error.message;
              } else if (error.response.status >= 500) {
                this.error.color = "red";
                this.error.message = error.response.statusText;
              } else {
                this.error.color = "red";
                this.error.message = error.response.statusText;
              }
            });
        })
        .catch(error => {
          console.log(error);
          this.error.message = error.message;
        });
    },
    cancel() {
      this.$emit("update:enabled", false);
    }
  }
};
</script>

<style module>
.futureSvg {
  position: absolute;
  right: 0px;
}
</style>
