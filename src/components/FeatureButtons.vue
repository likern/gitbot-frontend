<template>
  <v-layout row>
    <v-flex xs4>
      <v-subheader class="bot-settings__subheader__">Select the type of objects to be monitored</v-subheader>
    </v-flex>
    <v-flex xs8>
      <v-btn-toggle mandatory :value="currentState" @change="updateState">
        <v-btn>ISSUE</v-btn>
        <v-btn>PULL REQUEST</v-btn>
      </v-btn-toggle>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "FeatureButtons",
  props: {
    value: {
      issue: {
        type: Boolean,
        required: true
      },
      pullRequest: {
        type: Boolean,
        required: true
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    currentState() {
      let state = [];
      if (this.value.issue) {
        state.push(0);
      }

      if (this.value.pullRequest) {
        state.push(1);
      }

      return state;
    }
  },
  methods: {
    updateState(event) {
      const newState = {
        ...(event.includes(0) ? { issue: true } : { issue: false }),
        ...(event.includes(1) ? { pullRequest: true } : { pullRequest: false })
      };
      this.$emit("input", newState);
    }
  }
};
</script>

<style>
.bot-settings__subheader__ {
  align-items: center;
}

.v-btn--active .v-btn__content {
  color: #4caf50;
}
</style>
