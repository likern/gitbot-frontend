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
          <LabelList v-model="staleLabels" :labels="labels" defaultText="Labels for stale issue"/>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4>
          <v-subheader
            class="bot-settings__subheader__"
          >Issues with these labels will never be considered stale</v-subheader>
        </v-flex>
        <v-flex xs8>
          <LabelList
            v-model="exceptLabels"
            :labels="labels"
            defaultText="Exclude issues with labels"
          />
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
import LabelList from "@/components/LabelList";
export default {
  name: "BotSettings",
  components: { RepoList, LabelList },
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
        { id: 1, name: "security" },
        { id: 2, name: "wontfix" },
        { id: 3, name: "help wanted" },
        { id: 4, name: "bug" },
        { id: 5, name: "improvements" }
      ],
      staleLabels: [],
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
