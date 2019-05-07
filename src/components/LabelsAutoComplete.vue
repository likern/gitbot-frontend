<template>
  <v-autocomplete
    v-model="exceptLabels"
    :disabled="isUpdating"
    :items="labels"
    chips
    color="blue-grey lighten-2"
    label="Select"
    item-text="name"
    item-value="name"
    multiple
  >
    <template v-slot:selection="data">
      <v-chip
        :selected="data.selected"
        close
        class="chip--select-multi"
        @input="remove(data.item)"
      >{{data.item.name}}</v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import RepoList from "@/components/RepoList";
export default {
  name: "BotSettings",
  components: { RepoList },
  props: [""],
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
      ],
      labels: [
        { header: "octocat/Django" },
        { name: "security", group: "Django" },
        { name: "wontfix", group: "Django" },
        { name: "help wanted", group: "Django" },
        { name: "bug", group: "Django" },
        { divider: true },
        { header: "octocat/React-Native" },
        { name: "wontfix", group: "React Native" },
        { name: "bug", group: "React Native" },
        { name: "improvements", group: "React Native" },
        { name: "tests", group: "React Native" }
      ],
      exceptLabels: []
    };
  },
  methods: {
    remove(item) {
      const index = this.exceptLabels.indexOf(item.name);
      if (index >= 0) this.exceptLabels.splice(index, 1);
    }
  }
};
</script>

<style>
.bot-settings__subheader__ {
  align-items: center;
}
</style>
