<template>
  <v-container class="mt-10">
    <v-simple-table
      class="table mx-auto"
      v-if="Object.keys(this.clientInfo).length > 0"
    >
      <template v-slot:default>
        <tbody class="">
          <!-- <tr height="100px" >  -->
          <tr
            height="100px"
            v-for="(user, i) in games"
            :key="user.fixture_id"
            class="text-center table button"
          >
            <v-row class="games-row-borders d-flex align-center">
              <!-- <v-col>
                <td>
                  {{ user.fixture.id }}
                </td></v-col> -->
              <v-col cols="2" class="text-end">
                <v-avatar>
                  <img :src="user.teams.home.logo" />
                </v-avatar>
              </v-col>
              <v-col cols="2" class="font-weight-bold text-end">
                {{ user.teams.home.name }}
              </v-col>
              <v-col cols="2" class="text-end  font-weight-bold title">{{ user.goals.home }} </v-col>
              <v-col cols="2" class="text-start  font-weight-bold title">{{ user.goals.away }}</v-col>
              <v-col cols="2" class="font-weight-bold text-start">
                {{ user.teams.away.name }}
              </v-col>
              <v-col cols="2" class="text-start">
                <v-avatar>
                  <img :src="user.teams.away.logo" />
                </v-avatar>
              </v-col>
            </v-row>
            <v-row   class="mx-auto d-flex align-start">
              <v-col cols="5" class="text-end">הניחוש שלי</v-col>
              <v-col cols="1" class="d-flex align-start ">
                <v-text-field
              
                  outlined
                  
                  class="input "
                  v-model="homeTeam[i]"
                ></v-text-field>
              </v-col>
              <v-col cols="1"
              class=" d-flex align-start">
                <v-text-field
                  outlined
                  class="input  "
                  v-model="awayTeam[i]"
                ></v-text-field>
              </v-col>
              <v-col cols="5" class="text-start">0 נקודות</v-col>
            </v-row>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-layout>
      <v-main>
        <v-col class="d-flex justify-center">
          <v-btn bottom color="#61e1a8  " width="350" height="40">
            אתה לא משתמש רשום

            <router-link style="color: black" to="/" class="font-weight-bold">
              להרשמה
            </router-link>
          </v-btn>
        </v-col>
      </v-main>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "fixtures",

  created() {},
  components: {},
  props: {},
  data() {
    return {
      alert: false,
      temorGames: [],
      // games: [],
      userGuessobj: {},
      userGuess: [],
      userresult: {},
      sumPoints: [],
      index: null,
      userPoints: null,
      homeTeam: [],
      awayTeam: [],
      currentUserDetail: [],
      dataGuess: [],
      dataGuessCopy: [],
      number: 3,
      foundGameID: [],
      test: true,
      rr: [],
      testarr: [],
      // item: [],
    };
  },

  created() {
    // this.getGames();
  },
  beforeMount() {},

  mounted() {
    this.getThisUserGusses();

    this.$store.dispatch("fetchGames");
    this.getUsers();
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

    ...mapState(["games"]),
  },

  methods: {
    // getGames() {
    //   fetch("../games.json")
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((data) => {
    //       this.temorGames = data;

    //       // console.log(this.games);
    //       this.temorGames.forEach((object, key) => {
    //         object.fixture.id = key;
    //       });
    //       this.$store.commit("fixtures", this.temorGames);
    //       console.log(this.games);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    getThisUserGusses() {
      fetch(`http://localhost:3000/guesses/${this.clientInfo.id}`)
        .then((response) => response.json())
        .then((jsonObject) => {
          // console.log(jsonObject);

          for (let x = 0; x < jsonObject.length; x++) {
            this.dataGuess.push(jsonObject[x]);
            this.homeTeam[this.dataGuess[x].gameID] =
              this.dataGuess[x].home_team_goals;
            this.awayTeam[this.dataGuess[x].gameID] =
              this.dataGuess[x].away_team_goals;
          }

          // this.homeTeam.push(this.dataGuess[0].home_team_goals)
          // console.log(this.dataGuess);
          // console.log(this.homeTeam);
          // console.log(this.awayTeam);
        });
    },

    addToUserGueses(i) {
      fetch(`http://localhost:3000/guesses/add`, {
        method: "post",
        body: JSON.stringify({
          userID: this.clientInfo.id,
          gameID: this.games[i].fixture.id,
          home_team_goals: this.homeTeam[i],
          away_team_goals: this.awayTeam[i],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((jsonObject) => {
          console.log("edit successfully");
        });
    },

    getUsers() {
      fetch(`http://localhost:3000/users/${this.clientInfo.id}`)
        .then((response) => response.json())
        .then((jsonObject) => {
          for (let i = 0; i < jsonObject.length; i++) {
            this.currentUserDetail.push(jsonObject[i]);
          }
        });
    },

    editUserPoints() {
      fetch(`http://localhost:3000/users/`, {
        method: "put",
        body: JSON.stringify({
          id: this.clientInfo.id,

          points: this.sumPoints,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((jsonObject) => {
          console.log(jsonObject);
        });
    },

    points(i) {
      // console.log(i)
      // if (
      //   this.games[i].goals.home == this.userGuess[i].home_team.goals &&
      //   this.games[i].goals.away == this.userGuess[i].away_team.goals
      // ) {
      //   this.userPoints = 6;
      // } else if (
      //   (this.games[i].goals.home > this.games[i].goals.away &&
      //     this.userGuess[i].home_team.goals >
      //       this.userGuess[i].away_team.goals) ||
      //   (this.games[i].goals.away > this.games[i].goals.home &&
      //     this.userGuess[i].away_team.goals >
      //       this.userGuess[i].home_team.goals) ||
      //   (this.games[i].goals.home === this.games[i].goals.away &&
      //     this.userGuess[i].home_team.goals ===
      //       this.userGuess[i].away_team.goals)
      // ) {
      //   this.userPoints = 4;
      // } else {
      //   this.userPoints = 0;
      // }
      // this.userresult = {
      //   gameID: this.games[i].fixture.id,
      //   points: this.userPoints,
      //   sumPoints: null,
      // };
      // console.log(this.userresult.points);
      // this.resultarr[i] = this.userresult;
      // this.sumPoints = this.resultarr.reduce((currentTotal, item) => {
      //   return item.points + currentTotal;
      //   // }, this.currentUserDetail[this.$route.params.id - 1].points);
      // }, this.currentUserDetail[0].points);
      // // }, 0);
      // this.resultarr[i].sumPoints = this.sumPoints;
      // this.editUserPoints();
    },
    testa(i) {
      // console.log(this.items)
      // console.log(this.dataGuess)
      //     this.dataGuessCopy = this.dataGuess
      //     this.dataGuessCopy.sort((a, b) => a.gameID - b.gameID );
      // console.log(this.dataGuessCopy)
      // console.log(this.getFormattedDate())
      // console.log( typeof this.getFormattedDate())
      console.log(this.isBeforeTargetTime(this.games[i].fixture.date));
      console.log(this.items);
    },

    isBeforeTargetTime(targetTimeStr) {
      const targetTime = Date.parse(targetTimeStr);
      const currentTime = new Date().getTime();
      const timeDifferenceInMinutes = (targetTime - currentTime) / (1000 * 60);
      console.log(currentTime);
      return timeDifferenceInMinutes <= 30;
    },

    keepGuess(i) {
      this.index = i;
      if (this.isBeforeTargetTime(this.games[i].fixture.date) === false) {
        this.userGuessobj = {
          gameID: this.games[i].fixture.id,
          // winner: ,
          home_team: {
            name: this.games[i].teams.home.name,
            goals: this.homeTeam[i],
          },
          away_team: {
            name: this.games[i].teams.away.name,
            goals: this.awayTeam[i],
          },
        };

        this.userGuess[i] = this.userGuessobj;
        // console.log(this.userGuess);

        const foundGameID = this.dataGuess.some((item) => {
          return item.gameID === this.games[i].fixture.id;
        });

        // console.log(foundGameID);

        if (!foundGameID) {
          this.addToUserGueses(i);
          // console.log("good");
          // this.points(i);
        } else {
          console.log(this.sumPoints);
          this.editGusee(i);
        }
      } else {
        console.log("time is over");
      }
    },

    editGusee(i) {
      fetch(`http://localhost:3000/guesses/`, {
        method: "put",
        body: JSON.stringify({
          userID: this.clientInfo.id,
          gameID: this.games[i].fixture.id,
          home_team_goals: this.homeTeam[i],
          away_team_goals: this.awayTeam[i],
          sum_points: this.sumPoints,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((jsonObject) => {});
    },
    replaceOrderInItems(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    },

    compareResult() {
      this.dataGuessCopy = this.dataGuess;
      this.dataGuessCopy.sort((a, b) => a.gameID - b.gameID);
      console.log(this.items);
      console.log(this.dataGuess);

      // משנה את הPLACE לפי הKEY
      this.dataGuess.forEach((value, key) => {
        value.id = `${key}`;
      });
      // let diff = Math.abs(this.items.length -this.dataGuess.length)
      for (let x = 0; x < this.dataGuess.length; x++) {
        this.items.forEach((value, key) => {
          if (
            value.fixture.id === this.dataGuess[x].gameID &&
            key !== this.dataGuess[x].id
          ) {
            this.replaceOrderInItems(this.items, key, x);
          }
          // console.log(value)
        });

        if (
          this.items[x].goals.home == this.dataGuess[x].home_team_goals &&
          this.items[x].goals.away == this.dataGuess[x].away_team_goals
        ) {
          this.userPoints = 6;
        } else if (
          (this.items[x].goals.home > this.items[x].goals.away &&
            this.dataGuess[x].home_team_goals >
              this.dataGuess[x].away_team_goals) ||
          (this.items[x].goals.away > this.items[x].goals.home &&
            this.dataGuess[x].away_team_goals >
              this.dataGuess[x].home_team_goals) ||
          (this.items[x].goals.home === this.items[x].goals.away &&
            this.dataGuess[x].home_team_goals ===
              this.dataGuess[x].away_team_goals)
        ) {
          this.userPoints = 4;
        } else {
          this.userPoints = 0;
        }
        console.log(this.items[x].fixture.id);
        console.log(this.userPoints);
        fetch(`http://localhost:3000/guesses/`, {
          method: "put",
          body: JSON.stringify({
            userID: this.clientInfo.id,
            gameID: this.items[x].fixture.id,

            sum_points: this.userPoints,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        this.userresult = {
          gameID: this.items[x].fixture.id,
          points: this.userPoints,
          sumPoints: null,
        };
        // console.log(this.userresult.points)
        this.resultarr[x] = this.userresult;

        this.sumPoints = this.resultarr.reduce((currentTotal, item) => {
          return item.points + currentTotal;
          // }, this.currentUserDetail[this.$route.params.id - 1].points);
          // }, this.currentUserDetail[0].points);
        }, 0);

        this.resultarr[x].sumPoints = this.sumPoints;

        this.editUserPoints();
      }
    },
  },

  watch: {
    games: {
      handler(newVal, oldVal) {
        console.log("change");
        // console.log(newVal)
        // console.log(oldVal)
        //  console.log(this.testarr)
        for (let i = 0; i < newVal.length; i++) {
          if (
            newVal[i].fixture.status.short === "1H" ||
            "2H" ||
            ("FT" &&
              newVal[i].goals.home !== null &&
              newVal[i].goals.away !== null)
          ) {
            console.log("whatc works1");

            this.testarr.push(newVal[i]);

            // console.log(this.testarr);
            // console.log(this.items);
          }
        }

        const equalsCheck = (a, b) => {
          return JSON.stringify(a) === JSON.stringify(b);
        };

        if (equalsCheck(this.testarr, this.items)) {
          //  console.log(this.items)
          console.log("The arrays have the same elements.");
        } else {
          console.log("The arrays have different elements.");
          localStorage.setItem("test", JSON.stringify(this.testarr));
          if (localStorage["test"]) {
            this.$store.commit("setItems", JSON.parse(localStorage.test));
            // console.log(this.items)
            this.compareResult();
          }
        }
        // console.log(this.testarr);
      },
      deep: true,
      // immediate: true
    },
  },
};
</script>

<style>
.container {
  /* width: 1200px; */
}

.input {
  width: 80px;
  /* height: 10px; */
}
.button {
}

.table {
  max-width: 800px !important;
}

.games-row-borders{
  border: 1px solid lightcoral;
  background-color:#5e0b28 ;
  color: white;
}
</style>
