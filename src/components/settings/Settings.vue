<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      top
      color="warning"
      multi-line="multi-line"
      auto-height
      :timeout="3000"
    >
      {{ feedback }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-layout justify-center>
      <v-flex>
        <v-sheet elevation="2" class="sheet">
          <v-layout row pa-2 ml-4>
            <v-flex align-self-center>
              <span class="header">Log out of application</span>
            </v-flex>
            <v-flex shrink justify-self-end align-self-center>
              <v-btn color="warning" @click="logout">Logout</v-btn>
            </v-flex>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Settings",

  data() {
    return {
      snackbar: false,
      feedback: "Logging out failed"
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch(error => {
          this.feedback = error.message;
          this.snackbar = true;
        });
    }
  }
};
</script>


<style>
.sheet {
  /* width: 720px; */
}
.sheet .header {
  font-size: 18px;
}

/* .alert {
  position: fixed;
  top: 0;
} */
</style>
