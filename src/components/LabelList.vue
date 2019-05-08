<template>
  <v-autocomplete
    :value="value"
    :items="labels"
    :label="defaultText"
    item-text="name"
    item-value="id"
    chips
    multiple
    color="blue-grey lighten-2"
    @input="emitValue"
  >
    <template v-slot:selection="data">
      <v-chip
        :selected="data.selected"
        close
        class="chip--select-multi"
        @input="remove(data.item.id)"
      >{{data.item.name}}</v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "LabelList",
  props: {
    value: {
      type: Array
    },
    labels: {
      type: Array,
      required: true
    },
    defaultText: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    remove(itemId) {
      let newValue = this.value.filter(id => id != itemId);
      this.$emit("input", newValue);
    },
    emitValue(event) {
      this.$emit("input", event);
    }
  }
};
</script>

<style>
.bot-settings__subheader__ {
  align-items: center;
}
</style>
