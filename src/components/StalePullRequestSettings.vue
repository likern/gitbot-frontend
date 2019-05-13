<template>
  <v-card mt-5>
    <v-container fluid>
      <!-- <ButtonGroupSettings v-model="buttons"/> -->
      <!-- <v-layout row>
        <v-flex xs4>
          <v-subheader class="bot-settings__subheader__">Select the type of objects to be monitored</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-btn-toggle v-model="text" multiple>
            <v-btn value="left">ISSUE</v-btn>
            <v-btn value="center">PULL REQUEST</v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>-->

      <v-layout row>
        <v-flex xs4>
          <v-subheader
            class="bot-settings__subheader__"
          >Number of days of inactivity before pull request becomes stale</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-text-field label="Days" mask="###" value="60" solo></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4>
          <v-subheader
            class="bot-settings__subheader__"
          >Number of days of inactivity before a stale pull request is closed</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-text-field label="Days" mask="###" value="7" solo></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4>
          <v-subheader
            class="bot-settings__subheader__"
          >Labels to use when marking pull request as stale</v-subheader>
        </v-flex>
        <v-flex xs8>
          <LabelList v-model="staleLabels" :labels="labels" defaultText="Labels for stale issue"/>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4>
          <v-subheader
            class="bot-settings__subheader__"
          >Pull requests with these labels will never be considered stale</v-subheader>
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
        <v-btn :disabled="!buttons.create" color="success">ENABLE</v-btn>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import LabelList from "@/components/LabelList";
import CommentSettings from "@/components/CommentSettings";
import ButtonGroupSettings from "@/components/ButtonGroupSettings";
export default {
  name: "StalePullRequestSettings",
  components: { ButtonGroupSettings, LabelList, CommentSettings },
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
            text: "This pull request was marked as stale due to inactivity",
            label: "Enter text for comment",
            enabled: true
          },
          header: "Add comment to pull request when it is marked as stale"
        },
        close: {
          model: {
            text: "This stale pull request was closed due to inactivity",
            label: "Enter text for comment",
            enabled: true
          },
          header: "Add comment to stale pull request when it is closed"
        }
      },
      staleLabels: [2],
      exceptLabels: [1],
      buttons: {
        issue: true,
        pullRequest: true
      }
    };
  },
  watch: {
    buttons: {
      handler: function() {
        console.log(
          `[Bot Settings] buttons was changed: [${JSON.stringify(
            this.buttons
          )}]`
        );
      },
      deep: true
    },
    staleLabels: {
      handler: function() {
        console.log(
          `[Bot Settings] staleLabels was changed: [${JSON.stringify(
            this.staleLabels
          )}]`
        );
      },
      deep: true
    },
    exceptLabels: {
      handler: function() {
        console.log(
          `[Bot Settings] exceptLabels was changed: [${JSON.stringify(
            this.exceptLabels
          )}]`
        );
      },
      deep: true
    }
  }
};
</script>

<style>
.bot-settings__subheader__ {
  align-items: center;
}
</style>
