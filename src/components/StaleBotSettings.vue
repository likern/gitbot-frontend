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
          <v-text-field label="Days" mask="###" value="60" solo></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4>
          <v-subheader
            class="bot-settings__subheader__"
          >Number of days of inactivity before a stale issue is closed</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-text-field label="Days" mask="###" value="7" solo></v-text-field>
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

      <CommentSettings v-model="comments.stale.model" :header="comments.stale.header"/>

      <CommentSettings v-model="comments.close.model" :header="comments.close.header"/>

      <v-layout row justify-end>
        <v-btn :disabled="!buttons.create" color="success">CREATE</v-btn>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import LabelList from "@/components/LabelList";
import CommentSettings from "@/components/CommentSettings";
export default {
  name: "StaleBotSettings",
  components: { LabelList, CommentSettings },
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
      comments: {
        stale: {
          model: {
            text: "This issue was marked as stale due to inactivity",
            label: "Enter text for comment",
            enabled: true
          },
          header: "Add comment to issue when it is marked as stale"
        },
        close: {
          model: {
            text: "This stale issue was closed due to inactivity",
            label: "Enter text for comment",
            enabled: true
          },
          header: "Add comment to stale issue when it is closed"
        }
      },
      staleLabels: [2],
      exceptLabels: [1],
      buttons: {
        create: true
      }
    };
  }
  // watch: {
  //   staleLabels: {
  //     handler: function() {
  //       console.log(`[Bot Settings] staleLabels was changed: [${JSON.stringify(this.staleLabels)}]`)
  //     },
  //     deep: true
  //   },
  //   exceptLabels: {
  //     handler: function() {
  //       console.log(`[Bot Settings] exceptLabels was changed: [${JSON.stringify(this.exceptLabels)}]`)
  //     },
  //     deep: true
  //   }
  // }
};
</script>

<style>
.bot-settings__subheader__ {
  align-items: center;
}
</style>
