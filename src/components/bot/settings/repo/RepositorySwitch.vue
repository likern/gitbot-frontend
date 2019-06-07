<template>
  <v-card>
    <template>
      <v-toolbar card prominent>
        <!-- <v-toolbar-title class="body-5 black--text">All Repositories</v-toolbar-title> -->

        <!-- <v-spacer></v-spacer> -->

        <h2 v-if="searchRepos">All Repositories</h2>
        <v-layout row wrap justify-end>
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            class="mx-3"
            flat
            hide-no-data
            hide-details
            label="Select repositories"
            solo
            v-if="!searchRepos"
          ></v-autocomplete>

          <v-btn icon>
            <v-switch color="success" v-model="searchRepos" align-self="flex-end"></v-switch>
          </v-btn>
        </v-layout>
      </v-toolbar>
    </template>

    <v-divider></v-divider>

    <!-- <v-card-text style="height: 200px;"></v-card-text> -->
    <RepositoryList v-if="!searchRepos"/>
  </v-card>
</template>

<script>
import RepositoryList from "./RepositoryList";
export default {
  name: "RepositorySwitch",
  components: { RepositoryList },
  data() {
    return {
      searchRepos: false,
      repos: [
        {
          name: "All Repositories",
          selected: false,
          private: true
        },
        {
          name: "Django",
          fullName: "octocat/Django",
          selected: false,
          private: false
        },
        {
          name: "React Native",
          fullName: "octocat/React-Native",
          selected: true,
          private: false
        },
        {
          name: "BotPlatform",
          fullName: "helvy/BotPlatform",
          selected: false,
          private: true
        }
      ]
    };
  }
};
</script>

<style>
.card--flex-toolbar {
  margin-top: -64px;
}
</style>
