<template>
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
      </div>
    </div>

    <v-divider light></v-divider>
    <div class="bot-actions">
      <v-btn>edit</v-btn>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "BotInfo",
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

<style lang="scss" module>
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
  height: 150px;
  width: 200px;
  max-width: 300px;
}
</style>
