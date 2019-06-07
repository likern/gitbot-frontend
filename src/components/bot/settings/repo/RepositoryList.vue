<template>
  <v-list scrollable>
    <template v-for="(repo, index) in repos">
      <v-list-tile :key="index">
        <v-list-tile-content @click="repo.selected = !repo.selected">
          <v-list-tile-title>{{repo.name}}</v-list-tile-title>
          <v-list-tile-sub-title>{{repo.fullName}}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-switch v-model="repo.selected" color="success"></v-switch>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider :key="index" v-if="!isLastRepo(index)"></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "RepositoryList",
  data() {
    return {
      repos: [
        {
          name: "Hello-World",
          fullName: "octocat/Hello-World",
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
  },
  methods: {
    isLastRepo(index) {
      return index + 1 == this.repos.length;
    }
  }
};
</script>

<style>
</style>
