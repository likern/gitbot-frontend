<template>
  <v-select
    :value="selects"
    :items="repos"
    item-text="name"
    item-value="id"
    label="Select repositories"
    multiple
    solo
    @change="handleInput"
  >
    <template v-slot:prepend-item>
      <v-list-tile
        ripple
        @click="$emit('future-repos-changed')"
        :disabled="futureReposDisabled"
        :class="$style.futureTile"
      >
        <v-list-tile-action>
          <g-icon-test
            :icon="iconFutureRepos"
            :disabled="futureReposDisabled"
            :class="$style.futureTileIcon"
          ></g-icon-test>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Use for future repositories</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple @click="toggleAllRepos" :class="$style.selectAllTile">
        <v-list-tile-action>
          <g-icon-test :class="$style.selectAllTileIcon" :icon="iconSelectAll"></g-icon-test>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Select all</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "g-repository-list",
  props: {
    repos: {
      type: Array,
      required: true
    },
    selects: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    futureReposDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    futureReposSelected: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    notSelectedRepos() {
      const ids = new Set(this.selects);
      const notSelects = this.repos.filter(item => !ids.has(item.id));
      return notSelects;
    },
    allRepos() {
      return this.notSelectedRepos.length == 0;
    },
    someRepos() {
      return this.notSelectedRepos.length != this.repos.length;
    },
    iconSelectAll() {
      if (this.allRepos) return this.$vuetify.icons.boxClose;
      if (this.someRepos) return this.$vuetify.icons.boxMinus;
      return this.$vuetify.icons.boxEmpty;
    },
    iconFutureRepos() {
      if (this.futureReposSelected) return this.$vuetify.icons.boxSelected;
      return this.$vuetify.icons.boxEmpty;
    }
  },
  methods: {
    handleInput(event) {
      console.log(event);
      this.$emit("selects-changed", event);
    },
    toggleAllRepos() {
      this.$nextTick(() => {
        let newSelects = [];
        if (this.allRepos) {
          this.$emit("selects-changed", newSelects);
        } else {
          newSelects = this.repos.map(item => item.id);
          this.$emit("selects-changed", newSelects);
        }
      });
    }
  }
};
</script>

<style lang="scss" module>
$future-repo-color: #da7906 !important;
$select-all-color: #1729d4 !important;

.futureTile {
  color: $future-repo-color;
  caret-color: $future-repo-color;
}

.futureTileIcon {
  color: $future-repo-color;
  caret-color: $future-repo-color;
}

.selectAllTile {
  color: $select-all-color;
  caret-color: $select-all-color;
}

.selectAllTileIcon {
  color: $select-all-color;
  caret-color: $select-all-color;
}
</style>
