<template>
  <div>
    <v-dialog v-model="enabled" persistent max-width="600px">
      <g-progress :enabled.sync="loading"></g-progress>
      <v-card>
        <v-card-title>
          <span class="headline">Add a bot</span>
          <g-svg-future-repositories-enabled v-if="futureReposSelected" :class="$style.futureSvg"/>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <v-text-field v-model="botName" solo label="Enter a bot name" required/>
            </v-flex>
            <v-flex xs12>
              <g-repository-list
                :selects="selects"
                :repos="repositories"
                :future-repos-selected="futureReposSelected"
                :future-repos-disabled="!futureRepositoriesEnabled"
                @future-repos-changed="futureReposSelected = !futureReposSelected"
                @selects-changed="handleSelectsChanged"
              />
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cancel">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="create">Create bot</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import GProgress from "@/components/GProgress/GProgress";
import GRepositoryList from "@/components/GRepository/GRepositoryList";
import GSvgFutureRepositoriesEnabled from "@/assets/svg/future-repositories-enabled.svg";

export default {
  name: "g-dialog-bot-new",
  components: {
    GRepositoryList,
    GProgress,
    GSvgFutureRepositoriesEnabled
  },
  props: {
    enabled: {
      type: Boolean,
      required: true
    },
    repositories: {
      type: Array,
      required: true
    },
    futureRepositoriesEnabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      botName: "",
      selects: [],
      futureReposSelected: false,
      expandIndex: null
    };
  },
  computed: {
    selectedRepositories() {
      return this.selects.map(id => this.repos[id]);
    }
  },
  methods: {
    shrink() {
      this.expandIndex = -1;
    },
    handleSelectsChanged(selects) {
      console.log(selects);
      this.selects = selects;
    },
    async create() {
      try {
        this.loading = true;

        let repoNames = [];
        for (const repo of this.repositories) {
          if (this.selects.includes(repo.id)) {
            repoNames.push(repo.name);
          }
        }

        const payload = {
          // Add support for future repositories option
          name: this.botName,
          repositories: repoNames
        };

        await this.$store.dispatch("CREATE_BOT", payload);
      } finally {
        this.loading = false;
        this.$emit("update:enabled", false);
        this.$router.push({ name: "Bots" });
      }
    },
    cancel() {
      this.$emit("update:enabled", false);
    }
  }
};
</script>

<style module>
.futureSvg {
  position: absolute;
  right: 0px;
}
</style>
