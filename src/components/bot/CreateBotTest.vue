<template>
  <div>
    <v-btn color="primary" dark @click.stop="loadAvailRepositories">Test Open Dialog</v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!-- <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on" @click.stop="dialog = true">Open Dialog</v-btn>
      </template>-->
      <v-card>
        <v-card-title>
          <span class="headline">Add a bot</span>
          <FutureReposMark/>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <v-text-field v-model="botName" solo label="Enter a bot name" required/>
            </v-flex>
            <v-flex xs12>
              <RepositoryTest
                :selects="selects"
                :repos="repos"
                :future-repos-selected="futureReposSelected"
                :future-repos-disabled="futureReposDisabled"
                @future-repos-changed="futureReposSelected = !futureReposSelected"
                @selects-changed="handleSelectsChanged"
              />
            </v-flex>
            <!-- <v-flex xs12>
            <v-card>
              <div class="feature-title">{{ title }}</div>
              <div class="feature-title">Stale Issue</div>
              <div v-if="isEnabled" class="feature-status green" style="flex-grow: 0">ENABLED</div>
              <div v-else class="feature-status grey" style="flex-grow: 0">DISABLED</div>
            </v-card>

            <v-expansion-panel v-model="expandIndex">
              <Feature title="Stale Issues" @click="shrink">
                <StaleIssueSettings/>
              </Feature>

              <Feature title="Stale Pull Requests" @click="shrink">
                <StalePullRequestSettings/>
              </Feature>
            </v-expansion-panel>
            </v-flex>-->
          </v-container>
          <!-- <div class="note-text">
          <b>Note:</b> Later you can customize full set of settings
          </div>-->
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
import Repository from "@/components/bot/settings/repo/Repository";
import RepositoryTest from "@/components/bot/settings/repo/RepositoryTest";
import StaleIssueSettings from "@/components/StaleIssueSettings";
import StalePullRequestSettings from "@/components/StalePullRequestSettings";
import Feature from "@/components/Feature";

import FutureReposMark from "@/assets/svg/future-repositories-enabled.svg";

export default {
  name: "CreateBot",
  components: {
    Repository,
    RepositoryTest,
    Feature,
    StaleIssueSettings,
    StalePullRequestSettings,
    FutureReposMark
  },
  data() {
    return {
      botName: "",
      repos: [],
      selects: [],
      futureReposSelected: false,
      futureReposDisabled: true,
      dialog: false,
      expandIndex: null
    };
  },
  methods: {
    shrink() {
      this.expandIndex = -1;
    },
    handleSelectsChanged(selects) {
      console.log(selects);
      this.selects = selects;
    },
    loadAvailRepositories() {
      console.log("loadAvailRepositories");
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
              this.repos = resp.data.available.repos;
              this.futureReposDisabled = !resp.data.available.futureRepos;
              this.dialog = true;
            })
            .catch(err => {
              console.log("can't fetch available repositories from server");
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
          this.errorMessages.firebase = err.message;
        });
    },
    create() {
      console.log("CREATE");

      firebase
        .auth()
        .currentUser.getIdToken()
        .then(token => {
          axios
            .post("http://helvy.ngrok.io/v1/bot/new", this.bot, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
              this.dialog = false;
              this.$router.push({ name: "Bots" });
            })
            .catch(err => {
              console.log("error when try to create a new bot");
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
          this.errorMessages.firebase = err.message;
        });
    },
    cancel() {
      console.log("CANCEL");
      this.dialog = false;
    }
  },
  mounted() {
    console.log("webhook [mounted]");
    // firebase
    //   .auth()
    //   .currentUser.getIdToken()
    //   .then(token => {
    //     axios
    //       .get(
    //         "http://helvy.ngrok.io/v1/bot/new",
    //         {},
    //         {
    //           headers: { Authorization: `Bearer ${token}` }
    //         }
    //       )
    //       .then(response => {
    //         console.log(response);
    //         this.repos = response.available;
    //       })
    //       .catch(err => {
    //         console.log("can't fetch available repositories from server");
    //         console.log(err);
    //       });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.errorMessages.firebase = err.message;
    //   });
  }
};
</script>


<style>
.note-text {
  font-size: 14px;
}

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
