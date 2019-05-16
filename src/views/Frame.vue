<template>
  <div id="inspire">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Helvy.ai</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile @click="goToBots">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Bots</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goToAbout">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goToSettings">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-layout align-top column>
        <v-flex grow mx-5 pt-2>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-content>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Frame",
  data() {
    return {
      drawer: true
    };
  },
  methods: {
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
