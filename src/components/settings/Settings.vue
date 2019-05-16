<template>
  <v-layout justify-center>
    <v-flex shrink>
      <v-sheet elevation="2" class="sheet">
        <v-layout row pa-2 ml-4>
          <v-flex align-self-center>
            <span class="header">Log out of application</span>
          </v-flex>
          <v-flex shrink justify-self-end align-self-center>
            <v-btn color="warning" @click="logout">Logout</v-btn>
          </v-flex>
        </v-layout>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Settings",

  data() {
    return {
      expandIndex: null
    };
  },
  methods: {
    logout() {
      console.log("logout!");
    }
  }
};
</script>


<style>
.sheet {
  width: 720px;
}
.sheet .header {
  font-size: 18px;
}
</style>
