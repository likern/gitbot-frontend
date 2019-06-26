<template>
  <div id="inspire">
    <g-global-notification
      :enabled="Boolean(message.text)"
      :color="message.color"
      @update:enabled="resetNotification($event)"
    >{{ message.text }}</g-global-notification>
    <v-toolbar :class="toolbar" light fixed app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer">settings</v-toolbar-side-icon> -->
      <!-- <v-toolbar-side-icon>
        <v-icon v-text="$vuetify.icons.box-close"></v-icon>
      </v-toolbar-side-icon>-->

      <!-- <v-icon v-text="$vuetify.icons.box-minus"/> -->
      <v-toolbar-title :class="$style.toolbarTitle">GitBot</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items :class="$style.toolbarItems">
        <v-btn :class="$style.buttonTest" flat :to="{name: 'Bots'}" :ripple="false">Bots</v-btn>
        <v-btn flat :ripple="false">Profile</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-progress-linear v-if="loading" :class="$style.linearProgress" :indeterminate="true"></v-progress-linear>
      <v-layout align-top column>
        <v-flex grow mx-5 pt-2>
          <router-view @update:loading="loading = $event"></router-view>
        </v-flex>
      </v-layout>
    </v-content>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </div>
</template>

<script>
import GGlobalNotification from "@/components/GSnackBar/GGlobalNotification";

export default {
  name: "Frame",
  components: {
    GGlobalNotification
  },
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    loading: function() {
      return this.$store.getters.LOADING;
    },
    message: function() {
      const notification = this.$store.getters.NOTIFICATION;
      let message = { text: null, color: null };

      if (notification != null) {
        if (notification.message) {
          message.text = notification.message;
        }

        if (notification.level === "info") {
          message.color = "blue";
        } else if (notification.level === "warn") {
          message.color = "orange";
        } else if (notification.level === "success") {
          message.color = "green";
        } else {
          message.color = "red";
        }
      }
      return message;
    }
  },
  methods: {
    resetNotification(enabled) {
      console.log("METHOD [resetGlobalMessage] was called");
      if (!enabled) {
        this.$store.commit("RESET_NOTIFICATION");
      }
    },
    goToSettings() {
      this.$router.push({ name: "Settings" });
    },
    goToBots() {
      this.$router.push({ name: "Bots" });
    },
    goToAbout() {
      this.$router.push({ name: "About" });
    }
  }
};
</script>

<style lang="scss" module>
.toolbar {
}

.toolbarTitle {
  color: #666666;
  font-size: 28px;
}

.toolbarItems {
  // color: red;
  // background-color: aquamarine;
}

.linearProgress {
  margin-top: 0px;
}

.buttonTest {
  color: orange;
}
</style>

