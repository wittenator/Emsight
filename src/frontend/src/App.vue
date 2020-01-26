<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
    </v-app-bar>

    <v-content>
      <v-container class="grey lighten-5" ma-0 pa-0 fluid>
        <v-row no-gutters >
          <v-col cols="5">
            <List :ideas="ideas"/>
          </v-col>
          <v-col :cols=undefined>
            <Scatter :ideas="ideas"></Scatter>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import List from './components/List';
import * as d3 from 'd3'
import Scatter from "./components/Scatter";

export default {
  name: 'App',

  components: {
    Scatter,
    List,
  },

  data: () => ({
    ideas: []
  }),

  mounted: async function () {
    this.ideas = await d3.json("http://localhost:443/ideas")
  }
};
</script>
