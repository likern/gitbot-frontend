<template>
  <v-layout row>
    <v-flex xs4>
      <v-subheader class="bot-settings__subheader__">{{ header }}</v-subheader>
    </v-flex>
    <v-flex grow>
      <v-textarea
        :value="value.text"
        :label="value.label"
        :disabled="!value.enabled"
        solo
        @input="updateText"
      ></v-textarea>
    </v-flex>
    <v-flex shrink ml-3>
      <v-switch color="success" :input-value="value.enabled" @click.native="toggleSwitch"></v-switch>
    </v-flex>
  </v-layout>
</template>

<script>
import RepoList from "@/components/RepoList";
import LabelList from "@/components/LabelList";
export default {
  name: "CommentSettings",
  components: { RepoList, LabelList },
  props: {
    value: {
      text: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        default: ""
      },
      enabled: {
        type: Boolean,
        default: true
      }
    },
    header: {
      type: String,
      default: ""
    }
  },
  methods: {
    updateText(event) {
      let newValue = Object.assign(this.value)
      newValue.text = event
      this.$emit("input", newValue);
    },
    toggleSwitch(event) {
      let newValue = Object.assign(this.value)
      newValue.enabled = !this.value.enabled
      this.$emit("input", newValue)
    }
  }
};
</script>

<style>
.bot-settings__subheader__ {
  align-items: center;
}
</style>
