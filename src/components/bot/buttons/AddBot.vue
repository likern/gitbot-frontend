<template>
  <div class="bots-grid">
    <v-sheet elevation="2" class="bot-card">
      <div class="add-bot">
        <v-icon size="64">add</v-icon>
        <div class="add-bot-text">Add Bot</div>
      </div>
    </v-sheet>
    <v-sheet elevation="2" class="bot-card">
      <div class="bot-main">
        <div class="bot-title title">Bot 1</div>
        <!-- <span>Work on repositories:</span> -->
        <div>
          <div class="bot-feature">issues</div>
          <div class="bot-feature">pull requests</div>
          <div class="bot-feature">test 1</div>
          <div class="bot-feature">test 2</div>
          <div class="bot-feature">test 3</div>
          <div class="bot-feature">test 4</div>
        </div>
        <div class="bot-content">
          <div class="bot-repos">testbot</div>
          <div class="bot-repos">Productivo</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <div class="bot-repos">test</div>
          <!-- <div
            class="bot-repos"
          >testsssssssssssssssssssssssssssssssssssssssssssssssdddddddddddddddddd</div>-->
        </div>
      </div>

      <v-divider light></v-divider>
      <div class="bot-actions">
        <v-btn>edit</v-btn>
      </div>
    </v-sheet>
  </div>

  <!-- <v-expansion-panel-content>
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
  </v-expansion-panel-content>-->
</template>

<script>
export default {
  name: "AddBot",
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

<style scoped>
.bots-grid {
  display: grid;
  grid-template-columns: repeat(3, [column] 400px);
  grid-template-rows: repeat(3, [row] 1fr);
  grid-column-gap: 20px;
  /* justify-items: center; */
  /* align-items: center; */
  /* background-color: orange; */
}

.bot-card {
  border-radius: 8px;
}

.bot-card:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}

.add-bot-card {
  display: flex;
  border-radius: 8px;
}

.bot-main {
  padding: 0px 16px 0px 16px;
}

.bot-title {
  padding: 16px 0px 16px 0px;
}

.bot-feature {
  display: inline-block;
  background-color: #c8c5ef;
  padding: 4px 4px 4px 4px;
  border-radius: 2px;
  margin: 0px 8px 8px 0px;
}

.bot-content {
  padding: 0px 0px 8px 0px;
}

.bot-actions {
  display: flex;
  justify-content: flex-end;
  padding: 4px;
}

.bot-repos {
  display: inline-block;
  margin: 0px 8px 0px 0px;
  font-weight: bold;
  color: #446fff;

  overflow: hidden;
  text-overflow: ellipsis;
}

.add-bot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* grid-template-columns: 1fr; */
  /* grid-template-rows: 1fr; */
}

.add-bot-text {
  font-size: 28px;

  color: #0000008a;
}

.add-button-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.add-button-text {
  font-size: 22px;
  color: #757575;
}

.card-style {
  /* font-size: 20px; */
  /* flex-direction: row;
  flex-grow: 0;
  justify-content: flex-end; */
  height: 150px;
  width: 200px;
  max-width: 300px;
}

/* .feature-status {
  font-size: 14px;
  font-weight: 500;
  background-color: #4caf50;
  color: white;
  border-radius: 2px;
  padding: 8px 16px;
  margin: 6px 8px;
} */
</style>
