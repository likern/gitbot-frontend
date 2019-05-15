<template>
  <v-container>
    <v-layout justify-center>
      <v-flex shrink>
        <div class="signup">
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

                <v-btn color="success">Signup</v-btn>
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
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      showPassword: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
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


