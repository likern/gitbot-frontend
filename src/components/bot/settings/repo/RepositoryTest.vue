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
      <!-- <v-list-tile ripple @click="toggle">
        <v-list-tile-action>
          <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Select All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>-->

      <v-list-tile ripple @click="$emit('future-repos-changed')" :disabled="futureReposDisabled">
        <v-list-tile-action>
          <v-icon color="red darken-4" v-text="iconFutureRepos" :disabled="futureReposDisabled"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Use for future repositories</v-list-tile-title>
          <!-- <v-list-tile-sub-title>{{ item.org }}</v-list-tile-sub-title> -->
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple @click="toggleAllRepos">
        <v-list-tile-action>
          <v-icon :color="selects.length > 0 ? 'indigo darken-4' : ''" v-text="iconSelectAll"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Select all</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class="mt-2"></v-divider>
    </template>
    <!-- <template v-slot:item="{ index, item }">
      <v-list-tile v-else ripple @click="toggleRepo(item)">
        <v-list-tile-action>
          <v-icon
            :color="selectedRepos.length > 0 ? 'indigo darken-4' : ''"
            v-text="regularRepoIcon(item)"
          ></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.org }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
    <template v-slot:selection="{ index, item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        :color="`${item.color} lighten-3`"
        :selected="selected"
        label
      >
        <span class="pr-2">{{ item.name }}</span>
        <v-icon small @click="toggleRepo(item)" v-text="$vuetify.icons.close"/>
      </v-chip>
    </template>-->
  </v-select>
</template>

<script>
export default {
  name: "RepositoryTest",
  props: {
    // value: {
    //   type: Object,
    //   required: true
    // },
    repos: {
      type: Array,
      required: true
      // default() {
      //   return [];
      // }
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
    return {
      // items: [
      //   { header: "Select an option or create one" },
      //   {
      //     text: "Foo",
      //     color: "blue"
      //   },
      //   {
      //     text: "Bar",
      //     color: "red"
      //   }
      // ],
      // allRepos: [
      //   {
      //     id: 4253,
      //     name: "Use for future repositories",
      //     futureRepos: true,
      //     color: "red",
      //     meta: true
      //   },
      //   {
      //     name: "Select all",
      //     selectAll: true,
      //     meta: true
      //   },
      //   {
      //     divider: true
      //   },
      //   {
      //     id: 4578,
      //     name: "Django",
      //     org: "octocat",
      //     repo: true,
      //     selected: false,
      //     private: false
      //   },
      //   {
      //     id: 7745,
      //     name: "React Native",
      //     org: "octocat",
      //     repo: true,
      //     selected: true,
      //     private: false
      //   },
      //   {
      //     id: 5267,
      //     name: "BotPlatform",
      //     org: "helvy",
      //     repo: true,
      //     selected: false,
      //     private: true
      //   }
      // ],
      // selectedRepos: []
    };
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
      if (this.allRepos) return "$vuetify.icons.box-close";
      if (this.someRepos) return "$vuetify.icons.box-minus";
      return "$vuetify.icons.box-empty";
    },
    iconFutureRepos() {
      if (this.futureReposSelected) return "$vuetify.icons.box-selected";
      return "$vuetify.icons.box-empty";
    }
    // allRepos() {
    //   const futureRepos = {
    //     id: 75486754575,
    //     name: "Use for future repositories",
    //     futureRepos: false,
    //     color: "red",
    //     meta: true
    //   };

    //   const selectAll = {
    //     name: "Select all",
    //     selectAll: true,
    //     meta: true
    //   };

    //   let array = Array.of(selectAll);

    //   if (!this.value) {
    //     return array;
    //   }

    //   array = array.concat(this.value.repos);

    //   // Future repositories setting is allowed
    //   if (this.value.futureRepos) {
    //     array.unshift(futureRepos);
    //   }

    //   return array;

    //   // const keys = Object.keys(this.value).reduce((obj, key) => {
    //   //   if (key === "futureRepos") {
    //   //     return {
    //   //       name: "Use for future repositories",
    //   //       futureRepos: this.value.futureRepos,
    //   //       color: "red",
    //   //       meta: true
    //   //     };
    //   //   } else {
    //   //   }
    //   // }, []);
    // },
    // allRegularRepos() {
    //   return this.allRepos.filter(item => item.repo);
    // },
    // selectedRegularRepos() {
    //   return this.selectedRepos.filter(item => item.repo);
    // },
    // exposedRepos() {
    //   // Expose to v-model binding only allowed properties
    //   const allowed = ["name", "org"];
    //   const futureRepo = this.allRepos.filter(item => item.futureRepos);

    //   const repos = this.allRepos
    //     .filter(item => item.repo)
    //     .map(repo => {
    //       return allowed.reduce((obj, key) => {
    //         obj[key] = repo[key];
    //       }, {});
    //     });

    //   return {
    //     repos: repos,
    //     futureRepos: futureRepo.futureRepos
    //   };
    // },
    // isAllReposSelected() {
    //   return this.selectedRegularRepos.length === this.allRegularRepos.length;
    // },
    // isSomeReposSelected() {
    //   return this.selectedRegularRepos.length > 0 && !this.isAllReposSelected;
    // },
    // allRepositoriesIcon() {
    //   if (this.isAllReposSelected) return "$vuetify.icons.box-close";
    //   if (this.isSomeReposSelected) return "$vuetify.icons.box-minus";
    //   return "$vuetify.icons.box-empty";
    // }
  },
  methods: {
    handleInput(event) {
      console.log(event);
      this.$emit("selects-changed", event);
    },
    // isRepoSelected(item) {
    //   return this.selectedRepos.find(val => val.id === item.id);
    // },
    // regularRepoIcon(item) {
    //   if (this.isRepoSelected(item)) return "$vuetify.icons.box-selected";
    //   return "$vuetify.icons.box-empty";
    // },

    // futureRepoIcon(item) {
    //   if (this.isRepoSelected(item)) return "$vuetify.icons.box-selected";
    //   return "$vuetify.icons.box-empty";
    // },
    toggleAllRepos() {
      this.$nextTick(() => {
        let newSelects = [];
        if (this.allRepos) {
          this.$emit("selects-changed", newSelects);
        } else {
          newSelects = this.repos.map(item => item.id);
          this.$emit("selects-changed", newSelects);
        }
        // const nonRegularRepos = this.selectedRepos.filter(item => !item.repo);
        // console.log(nonRegularRepos);
        // if (this.isAllReposSelected) {
        //   this.selectedRepos = nonRegularRepos;
        // } else {
        //   this.selectedRepos = this.allRegularRepos.concat(nonRegularRepos);
        // }
        // this.$emit("input", this.exposedRepos);
      });
    }
    // toggleRepo(item) {
    //   console.log(item.id);
    //   this.$nextTick(() => {
    //     if (this.isRepoSelected(item)) {
    //       this.selectedRepos = this.selectedRepos.filter(
    //         val => val.id !== item.id
    //       );
    //     } else {
    //       this.selectedRepos = this.selectedRepos.concat(item);
    //     }
    //     this.$emit("input", this.exposedRepos);
    //   });
    // }
  }
};
</script>

<style>
</style>
