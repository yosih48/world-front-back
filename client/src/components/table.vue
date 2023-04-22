<template>
  <v-container class="con-width">
    <v-main class=" ">
      <v-simple-table
        fixed-header
        class="table mx-auto text-center"
        calculate-widths
      >
        <template v-slot:default>
          <thead>
            <!-- <tr>
            <th class="">שם</th>
            <th class="">נקודות</th>
          </tr> -->
          </thead>
          <tbody>
            <tr
              v-for="(user, i) in scoreByOrder"
              :key="i"
              class="font-weight-bold title"
            >
              <td class="numbers pa-4">{{ i + 1 }}</td>
              <td class="name text-right">{{ user.userName }}</td>
              <!-- <v-spacer></v-spacer> -->
              <td class="text-left">{{ user.points + " נקודות" }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-main>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tablePoints",
  props: {},
  data() {
    return {
      score: [],
      // games: [],
      dataGuess: [],
      number: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },

  mounted() {
    this.userPoints();
    // this.$store.dispatch("fetchGames");

    // this.getGames();
    // this.getUsersGusses();
    // console.log(this.dataGuess);
    // console.log(this.score);
    // console.log(this.resultarr);
    // console.log(process.env.VUE_APP_HOST)
  },

  computed: {
    resultarr() {
      return this.$store.state.resultarr;
    },
    items() {
      return this.$store.state.items;
    },
    localHost() {
      return this.$store.state.localHost;
    },

    // הצגת הטבלה לפי סכום הנקודות
    scoreByOrder() {
      return this.score.sort((p1, p2) =>
        // p1.points > p2.points ? -1 : p1.points < p2.points ? 1 : 0
        p1.points - p2.points > 0 ? -1 : p1.points - p2.points < 0 ? 1 : 0
      );
    },
  },

  methods: {
    userPoints() {
      fetch(`${process.env.VUE_APP_HOST}users/register`)
        // fetch(`http://lab.mosesnet.net:3000//users/register`)
        .then((response) => response.json())
        .then((jsonObject) => {
          for (let i = 0; i < jsonObject.length; i++) {
            var obj = jsonObject[i];
            var numStr = obj.points.toString();
            var numParts = numStr.split(".");

            if (numParts.length > 1 && numParts[1] == 0) {
              obj.points = parseInt(numParts[0]);
            }
            // console.log(jsonObject);

            this.score.push(jsonObject[i]);
            // console.log(this.score);
          }
        });
    },

    getUsersGusses() {
      console.log(this.index);
      fetch(`${process.env.VUE_APP_HOST}guesses/register`)
        .then((response) => response.json())
        .then((jsonObject) => {
          for (let x = 0; x < jsonObject.length; x++) {
            this.dataGuess.push(jsonObject[x]);
          }
        });
    },
  },
};
</script>
<style scoped>
.table {
  /* max-width: 700px !important; */
}
.con-width {
  /* width: 1200px; */
}
.numbers {
  /* border-radius: 5%; */
  /* background-color: aqua; */
  width: 80px;
}

table td {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
</style>
7
