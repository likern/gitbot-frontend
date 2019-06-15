<template>
  <div id="inspire">
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

.buttonTest {
  color: orange;
}
</style>

