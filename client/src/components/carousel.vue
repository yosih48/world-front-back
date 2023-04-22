<template>
  <v-main class="">
    <div class="carousel-wrapper">
      <!-- <v-btn @click="test">test</v-btn> -->
      <v-carousel
        @change="getThisUserGusses(mergedData[$event].fixture.id)"
        class="carousel-wrapper"
        hide-delimiters
        hide-delimiter-background
        show-arrows
      
      >
        <v-carousel-item
          v-for="(slide, key) in gamesToShow"
          :key="key"
          class=""
        >
          <!-- {{ key }} -->
          <v-row class="mt-7 d-flex justify-space-between title teams-color">
           
            <v-col cols="2" class="text-end">
              <v-avatar>
                <img :src="slide.teams.home.logo" />
              </v-avatar>
            </v-col>
            <v-col cols="3" class="text-end">
              {{ slide.teams.home.name }}
            </v-col>

            <v-col cols="2" class="text-center">
              {{ slide.goals.away }}:{{ slide.goals.home }}
            </v-col>
            <v-col cols="3" class="text-start">
              {{ slide.teams.away.name }}
            </v-col>
            <v-col cols="2" class="text-start">
              <v-avatar>
                <img :src="slide.teams.away.logo" />
              </v-avatar>
            </v-col>
          </v-row>
          <v-row class="primary mt-10">
            <v-layout child-flex>
              <v-simple-table
                fixed-header
                class="mx-auto text-center"
                calculate-widths
              >
                <template v-slot:default>
                  <thead>
                    <tr class=" ">
                      <th class="text-center">דירוג</th>
                      <th class="text-center">שם</th>
                      <v-spacer></v-spacer>
                      <th class="text-center">נקודות</th>
                      <th class="text-center">ניחוש</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(user, i) in dataGuess"
                      :key="i"
                      class="font-weight-bold title"
                    >
                      <td class="">{{ i + 1 }}</td>
                      <td class="">{{ user.userName }}</td>

                      <v-spacer></v-spacer>
                      <td class="">{{ user.sum_points }}</td>
                      <td class="d-flex justify-center align-center">
                        <!-- <v-row> -->

                        <div class=" res">
                          {{ user.away_team_goals }}:{{ user.home_team_goals }}
                        </div>

                        <!-- </v-row> -->
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-layout>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import tables from "../components/table";
export default {
  name: "carousel",
  data() {
    return {
      dataGuess: [],
      index: null,
      currentTitle: null,
      diffBetweenArrays: null,
    };
  },

  components: {
    tables,
  },
    mounted() {
    this.$store.dispatch("fetchOdds");
    // this.$store.dispatch("fetchGames");
    // console.log(new Date());
  },

  computed: {
    resultarr() {
      return this.$store.state.resultarr;
    },
    users() {
      return this.$store.state.users;
    },
    clientInfo() {
      return this.$store.state.clientInfo;
    },
    items() {
      return this.$store.state.items;
    },

    gamesToShow() {
      // console.log(this.mergedData)
      let currentTime = new Date().getTime();


      let games2 = this.mergedData

      for (let x = 0; x < games2.length; x++) {
        if (Date.parse(games2[x].fixture.date) > currentTime) {
      
       
    
          games2.splice(x, 1);
        }
      }
// return games2



      return games2.sort((p1, p2) =>
        p1.fixture.date > p2.fixture.date
          ? -1
          : p1.fixture.date < p2.fixture.date
          ? 1
          : 0
      );
   
    },
    localHost() {
      return this.$store.state.localHost;
    },

    ...mapState(["games"]),
    ...mapState(["odds"]),
     ...mapState(["mergedData"]),
  },



  methods: {
    test() {
      console.log(this.currentTitle);
    },

    getThisUserGusses(index) {
      // console.log(index);

      fetch(`${process.env.VUE_APP_HOST}guesses/game/${index}`)
        .then((response) => response.json())
        .then((jsonObject) => {
          for (let i = 0; i < jsonObject.length; i++) { 
         let obj = jsonObject[i];
            let numStr = obj.sum_points.toString();
            let numParts = numStr.split(".");

            if (numParts.length > 1 && numParts[1] == 0) {
              obj.sum_points = parseInt(numParts[0]);
            }
           

          }

          this.dataGuess = jsonObject;

          // console.log(this.dataGuess);
        });
    },
  },
};
</script>

<style>
.carousel-wrapper {
  max-width: 800px;
  margin: 0 auto;
}
.page-color {
  /* background-color: #26000d; */
}
.teams-color {
  /* background-color:#5e0b28 ; */
}
.res {
  width: 60px;
  border: 1px solid gray;
}
</style>
