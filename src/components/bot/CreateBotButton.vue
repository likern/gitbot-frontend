<template>
  <v-sheet elevation="2" class="bot-card" @click>
    <div class="add-bot">
      <v-icon size="64">add</v-icon>
      <div class="add-bot-text">Add Bot</div>
    </div>
  </v-sheet>
</template>

<script>
import axios from "axios";
import firebase from "firebase";

export default {
  name: "AddBot",
  data() {
    return {
      isEnabled: false,
      loading: false
    };
  },
  methods: {
    clickEvent(val) {
      this.isEnabled = val;
      this.$emit("click", true);
    },
    getAvailableRepositories() {
      console.log("getAvailableRepositories");
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
    }
  }
};
</script>

<style scoped>
.bot-card {
  border-radius: 8px;
}

.bot-card:hover {
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

.add-bot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.add-bot-text {
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
