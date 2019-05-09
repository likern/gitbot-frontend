<template>
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Helvy.ai</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile @click>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Bots</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-layout align-top column>
        <!-- <v-flex grow mx-5 pt-2>
          <ReposSwitch/>
        </v-flex>-->
        <v-flex grow mx-5 pt-2>
          <StaleBotSettings/>
        </v-flex>
      </v-layout>
    </v-content>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import ReposSwitch from "./components/ReposSwitch";
import StaleBotSettings from "./components/StaleBotSettings";

export default {
  name: "App",
  components: {
    ReposSwitch,
    StaleBotSettings
  },
  data() {
    return {
      drawer: true
    };
  }
};
</script>
