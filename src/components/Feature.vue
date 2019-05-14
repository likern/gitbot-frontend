<template>
  <v-expansion-panel-content>
    <template v-slot:header>
      <div class="feature-title">{{ title }}</div>
      <div v-if="isEnabled" class="feature-status green" style="flex-grow: 0">ENABLED</div>
      <div v-else class="feature-status grey" style="flex-grow: 0">DISABLED</div>
    </template>

    <v-card>
      <slot></slot>
      <v-layout row justify-end mb-2 mr-2>
        <v-btn color="error" @click="clickEvent(false)">DISABLE</v-btn>
        <v-btn color="success" @click="clickEvent(true)">ENABLE</v-btn>
      </v-layout>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
export default {
  name: "Feature",
  props: {
    value: {
      type: Boolean,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    enabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isEnabled: false
    };
  },
  methods: {
    clickEvent(val) {
      this.isEnabled = val;
      this.$emit("click", true);
    }
  }
};
</script>

<style>
.feature-title {
  font-size: 20px;
  flex-direction: row;
  flex-grow: 0;
  justify-content: flex-end;
}

.feature-status {
  font-size: 14px;
  font-weight: 500;
  background-color: #4caf50;
  color: white;
  border-radius: 2px;
  padding: 8px 16px;
  margin: 6px 8px;
}
</style>
