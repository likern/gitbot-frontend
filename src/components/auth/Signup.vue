<template>
  <div>
    <g-error-message :enabled.sync="errorState" :color="error.color">{{ error.message }}</g-error-message>
    <v-form>
      <v-container>
        <v-layout justify-center>
          <v-flex shrink>
            <div class="signup">
              <v-card>
                <v-card-title>
                  <v-layout column>
                    <div class="field">
                      <v-text-field
                        label="E-mail"
                        v-model="email"
                        type="email"
                        browser-autocomplete="email"
                        :error-messages="errorMessages.email"
                      ></v-text-field>
                    </div>

                    <div class="field">
                      <v-text-field
                        label="Password"
                        v-model="password"
                        browser-autocomplete="new-password"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                        :error-messages="errorMessages.password"
                        @click:append="showPassword = !showPassword"
                      />
                    </div>

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
    </v-form>
  </div>
</template>

<script>
import firebaseApp from "@/firebase/init";
import gitbot from "@/api/gitbot";

import GErrorMessage from "@/components/GSnackBar/GErrorMessage";

export default {
  name: "Signup",
  components: {
    GErrorMessage
  },
  data() {
    return {
      status: null,
      email: "",
      password: null,
      showPassword: false,
      emailFeedback: null,
      error: {
        message: "",
        color: ""
      },
      errorMessages: {
        email: null,
        password: null
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
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
    async signup() {
      if (!this.email) {
        this.errorMessages.email = "email can't be empty";
      }

      if (!this.password) {
        this.errorMessages.password = "password can't be empty";
      }

      try {
        await gitbot.signup(this.email, this.password);
        this.$router.push({ name: "Bots" });
      } catch (error) {
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
      }
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


