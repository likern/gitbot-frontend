<template>
  <!-- <v-select v-model="selectedRepos" :items="allRepos" attach chips label="Chips" multiple></v-select> -->
  <v-select
    v-model="selectedRepos"
    :items="allRepos"
    item-text="name"
    item-value="name"
    label="Select repositories"
    multiple
    solo
  >
    <!-- <template v-slot:prepend-item>
      <v-list-tile ripple @click="futureRepositories = !futureRepositories">
        <v-list-tile-action>
          <v-icon :color="futureRepositories ? 'red darken-4' : ''" v-text="futureRepositoriesIcon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Use for future repositories</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple @click="toggle">
        <v-list-tile-action>
          <v-icon
            :color="selectedRepos.length > 0 ? 'indigo darken-4' : ''"
            v-text="selectedRepositoriesIcon"
          ></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Select All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class="mt-2"></v-divider>
    </template>-->
    <template v-slot:item="{ index, item }">
      <v-list-tile v-if="item.futureRepos" ripple @click="toggleRepo(item)">
        <v-list-tile-action>
          <!-- <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon> -->
          <v-icon color="red darken-4" v-text="futureRepoIcon(item)"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.org }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <!-- <v-list-tile-content>
          <v-chip
            v-if="item === Object(item)"
            :color="`${item.color} lighten-3`"
            :selected="selected"
            label
          ></v-chip>
        </v-list-tile-content>-->
      </v-list-tile>
      <v-list-tile v-else-if="item.selectAll" ripple @click="toggleAllRepos">
        <v-list-tile-action>
          <!-- <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon> -->
          <v-icon
            :color="selectedRepos.length > 0 ? 'indigo darken-4' : ''"
            v-text="allRepositoriesIcon"
          ></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.org }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <!-- <v-list-tile-content>
          <v-chip
            v-if="item === Object(item)"
            :color="`${item.color} lighten-3`"
            :selected="selected"
            label
          ></v-chip>
        </v-list-tile-content>-->
      </v-list-tile>
      <v-list-tile v-else ripple @click="toggleRepo(item)">
        <v-list-tile-action>
          <!-- <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon> -->
          <v-icon
            :color="selectedRepos.length > 0 ? 'indigo darken-4' : ''"
            v-text="regularRepoIcon(item)"
          ></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.org }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <!-- <v-list-tile-content>
          <v-chip
            v-if="item === Object(item)"
            :color="`${item.color} lighten-3`"
            :selected="selected"
            label
          ></v-chip>
        </v-list-tile-content>-->
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
      <!-- <v-chip v-if="item.futureRepos" :color="`red lighten-3`" :selected="selected" label>
        <span class="pr-2">Future repositories</span>
        <v-icon small @click="futureRepositories = false" v-text="$vuetify.icons.close"/>
      </v-chip>-->
    </template>
  </v-select>
</template>

<script>
import RepositoryList from "./RepositoryList";
export default {
  name: "RepositoryTest",
  components: { RepositoryList },
  data() {
    return {
      items: [
        { header: "Select an option or create one" },
        {
          text: "Foo",
          color: "blue"
        },
        {
          text: "Bar",
          color: "red"
        }
      ],
      value: ["foo", "bar", "fizz", "buzz"],
      searchRepos: false,
      futureRepositories: false,
      // allRepos: ["Django", "React Native", "BotPlatform"],
      allRepos: [
        {
          id: 4253,
          name: "Use for future repositories",
          futureRepos: true,
          color: "red",
          meta: true
        },
        {
          name: "Select all",
          selectAll: true,
          meta: true
        },
        {
          divider: true
        },
        {
          id: 4578,
          name: "Django",
          org: "octocat",
          repo: true,
          selected: false,
          private: false
        },
        {
          id: 7745,
          name: "React Native",
          org: "octocat",
          repo: true,
          selected: true,
          private: false
        },
        {
          id: 5267,
          name: "BotPlatform",
          org: "helvy",
          repo: true,
          selected: false,
          private: true
        }
      ],
      selectedRepos: []
    };
  },
  computed: {
    allRegularRepos() {
      return this.allRepos.filter(item => item.repo);
    },
    selectedRegularRepos() {
      return this.selectedRepos.filter(item => item.repo);
    },
    allReposSelected() {
      return this.selectedRegularRepos.length === this.allRegularRepos.length;
    },
    someReposSelected() {
      return this.selectedRegularRepos.length > 0 && !this.allReposSelected;
    },

    allRepositoriesIcon() {
      if (this.allReposSelected) return "$vuetify.icons.box-close";
      if (this.someReposSelected) return "$vuetify.icons.box-minus";
      return "$vuetify.icons.box-empty";
    }

    // futureRepositoriesIcon() {
    //   if (this.allReposSelected) return "$vuetify.icons.box-close";
    //   if (this.someReposSelected) return "$vuetify.icons.box-minus";
    //   return "$vuetify.icons.box-empty";
    // }
  },
  methods: {
    isRepoSelected(item) {
      return this.selectedRepos.find(val => val.id === item.id);
    },
    regularRepoIcon(item) {
      if (this.isRepoSelected(item)) return "$vuetify.icons.box-selected";
      return "$vuetify.icons.box-empty";
    },
    futureRepoIcon(item) {
      if (this.isRepoSelected(item)) return "$vuetify.icons.box-selected";
      return "$vuetify.icons.box-empty";
    },
    toggleAllRepos() {
      this.$nextTick(() => {
        const nonRegularRepos = this.selectedRepos.filter(item => !item.repo);
        console.log(nonRegularRepos);
        if (this.allReposSelected) {
          this.selectedRepos = nonRegularRepos;
        } else {
          this.selectedRepos = this.allRegularRepos.concat(nonRegularRepos);
        }
      });
    },
    toggleRepo(item) {
      console.log(item.id);
      this.$nextTick(() => {
        if (this.isRepoSelected(item)) {
          this.selectedRepos = this.selectedRepos.filter(
            val => val.id !== item.id
          );
        } else {
          this.selectedRepos = this.selectedRepos.concat(item);
        }
      });

      // const selection =
      // console.log(selection);
      // this.selectedRepos = selection;

      // console.log(item);
      // this.$nextTick(() => {
      //   if (this.allReposSelected) {
      //     this.selectedRepos = [];
      //   } else {
      //     this.selectedRepos = this.allRepos.slice();
      //   }
      // });
    }
  }
};
</script>

<style>
/* .card--flex-toolbar {
  margin-top: -64px;
} */
</style>
