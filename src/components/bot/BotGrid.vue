<template>
  <div class="bots-grid">
    <CreateBotButton/>
    <!-- <BotInfo/> -->
  </div>
</template>

<script>
import CreateBotButton from "./CreateBotButton";
import BotInfo from "./BotInfo";
export default {
  name: "AddBot",
  components: {
    CreateBotButton,
    BotInfo
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

<style scoped>
.bots-grid {
  display: grid;
  grid-template-columns: repeat(3, [column] 400px);
  grid-template-rows: repeat(3, [row] 250px);
  grid-column-gap: 20px;
}

/* .bot-card {
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
} */

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
