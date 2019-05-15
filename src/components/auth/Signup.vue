<template>
  <v-container>
    <v-layout justify-center>
      <v-flex shrink>
        <div class="signup">
          <v-card>
            <h2>Status: {{ status }}</h2>
            <v-card-title>
              <v-layout column>
                <div class="field">
                  <v-text-field
                    label="E-mail"
                    browser-autocomplete="email"
                    v-model="email"
                    :error-messages="errorMessages.email"
                  />
                </div>

                <div class="field">
                  <v-text-field
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    v-model="password"
                    :error-messages="errorMessages.password"
                    @click:append="showPassword = !showPassword"
                  />
                </div>

                <span v-if="errorMessages.firebase">{{ errorMessages.firebase }}</span>

                <v-btn color="success" @click="signup">Signup</v-btn>
                <div class="divider">
                  <v-divider></v-divider>
                </div>

                <v-flex align-self-center mt-3>
                  <span class="account-text">
                    Already have account?
                    <router-link :to="{name: 'Login'}">Login</router-link>
                  </span>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebaseApp from "@/firebase/init";
import firebase from "firebase";
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      status: null,
      email: null,
      password: null,
      showPassword: false,
      emailFeedback: null,
      errorMessages: {
        email: null,
        password: null,
        firebase: null
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    signup() {
      if (!this.email) {
        this.errorMessages.email = "email can't be empty";
      }

      if (!this.password) {
        this.errorMessages.password = "password can't be empty";
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          cred.user.getIdToken().then(function(token) {
            console.log(`signup: token is [${token}]`);
            axios
              .post(
                "http://helvy.ngrok.io/signup",
                {},
                {
                  headers: { Authorization: `Bearer ${token}` }
                }
              )
              .catch(err => {
                console.log("error when try signup");
                console.log(err);
              });
          });
          console.log(cred.user);
        })
        .catch(err => {
          console.log(err);
          this.errorMessages.firebase = err.message;
        });
    }
  }
};
</script>

<style>
.signup {
  min-width: 350px;
  margin-top: 60px;
}

.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottom: 16px;
  margin-left: 10px;
  margin-right: 10px;
}

.signup .divider {
  margin-top: 6px;
}

.signup .account-text {
  font-size: 14px;
  color: grey;
}
</style>


