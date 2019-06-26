<template>
  <div>
    <v-snackbar
      v-model="snackbar.model"
      top
      color="warning"
      multi-line="multi-line"
      auto-height
      :timeout="3000"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.model = false">Close</v-btn>
    </v-snackbar>
    <v-container>
      <v-layout justify-center>
        <v-flex shrink>
          <div class="login">
            <v-card>
              <v-card-title>
                <v-layout column>
                  <div class="field">
                    <v-text-field label="E-mail" browser-autocomplete="email" v-model="email"/>
                  </div>

                  <div class="field">
                    <v-text-field
                      label="Password"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                      v-model="password"
                      @click:append="showPassword = !showPassword"
                    />
                  </div>

                  <v-btn color="success" @click="login">Login</v-btn>
                  <div class="divider">
                    <v-divider></v-divider>
                  </div>

                  <v-flex align-self-center mt-3>
                    <span class="account-text">
                      Don't have account?
                      <router-link :to="{name: 'Signup'}">Signup</router-link>
                    </span>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import gitbot from "@/api/gitbot";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      showPassword: false,
      snackbar: {
        model: false,
        text: ""
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    async login() {
      /* FIXME:  Check email and password fields */
      try {
        await gitbot.login(this.email, this.password);
        this.$router.push({ name: "Bots" });
      } catch (error) {
        this.snackbar.text = error.message;
        this.snackbar.model = true;
      }

      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(this.email, this.password)
      //   .then(() => {
      //     this.$router.push({ name: "Bots" });
      //   })
      //   .catch(error => {
      //     this.snackbar.text = error.message;
      //     this.snackbar.model = true;
      //   });
    }
  }
};
</script>

<style>
.login {
  min-width: 350px;
  margin-top: 60px;
}

.login h2 {
  font-size: 2.4em;
}

.login .field {
  margin-bottom: 16px;
  margin-left: 10px;
  margin-right: 10px;
}

.login .divider {
  margin-top: 6px;
}

.login .account-text {
  font-size: 14px;
  color: grey;
}
</style>


