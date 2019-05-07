<template>
  <v-card mt-5>
    <v-container fluid>
      <v-layout row>
        <v-flex xs4>
          <v-subheader
            class="bot-settings__subheader__"
          >Number of days of inactivity before an issue becomes stale</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-text-field label="Days" mask="###" value="60"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4>
          <v-subheader
            class="bot-settings__subheader__"
          >Number of days of inactivity before a stale issue is closed</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-text-field label="Days" mask="###" value="7"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4>
          <v-subheader
            class="bot-settings__subheader__"
          >Labels to use when marking an issue as stale</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-text-field label="Labels" value="wontfix"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4>
          <v-subheader
            class="bot-settings__subheader__"
          >Issues with these labels will never be considered stale</v-subheader>
        </v-flex>
        <v-flex xs8>
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
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4>
          <v-subheader>Suffix for time zone</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-text-field label="Label Text" value="12:30:00" type="time" suffix="PST"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- <v-layout column wrap></v-layout>
    <v-layout row wrap>
      <v-flex grow>Number of days of inactivity before an issue becomes stale</v-flex>
      <v-flex grow>60</v-flex>
    </v-layout>-->

    <!-- <v-card-text style="height: 200px;"></v-card-text> -->
    <!-- <RepoList v-if="!searchRepos"/> -->
  </v-card>
</template>

<script>
import RepoList from "@/components/RepoList";
export default {
  name: "BotSettings",
  components: { RepoList },
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
