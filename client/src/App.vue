<template>
<v-app class="page-color">
  <toolbar ></toolbar>
  <v-main>
    <!-- <v-container fluid class=""> -->
      <router-view/>
    <!-- </v-container > -->
  </v-main>
  </v-app>
</template>

<script>
import toolbar from "./components/toolbar";
import Tables from "./views/tableView";
import  Match  from "./views/matchesView";
export default {
  name: 'App',
    components: {
      toolbar,
      Tables,
    Match
  },

  data: () => ({
    //
  }),

    beforeMount() {
    this.checkLocal();
    this.checkLocalb();

  },

  computed: {
       clientInfo() {
      return this.$store.state.clientInfo;
    },
      items() {
      return this.$store.state.items;
    },
  },

  methods: {
       checkLocal() {
      if (localStorage["user"]) {
        this.$store.commit("increment", JSON.parse(localStorage.user));
        // console.log(this.clientInfo);
      }
    },
      checkLocalb() {
      if (localStorage["test"]) {
        this.$store.commit("setItems", JSON.parse(localStorage.test));
        // console.log(this.items);
      }
    },
  },
};
</script>
<style >

.page-color{
  /* background-color: #0161db; */
  /* background-color: #0353c5; */
   background-image: linear-gradient(to right, rgba(8,50,144,255), rgba(1,88,205,255));
  
}
</style>