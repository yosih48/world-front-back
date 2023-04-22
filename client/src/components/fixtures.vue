<template>
  <v-responsive>
    <v-container fluid class="page-color">
      <v-flex v-if="Object.keys(this.clientInfo).length > 0">
        <v-card
          max-width="600"
          class="mx-auto card-width mt-13"
          flat
          v-for="(user, i) in premToShow"
          :key="i"
        >
          <!-- <v-container class="yellow"> -->
          <v-row dense class="">
            <v-col cols="12">
              <v-card theme="dark" class="card-color" flat>
                <!-- <v-card-title class="text-h6"> </v-card-title> -->

                <v-card-subtitle
                  class="white--text text-center card-subtitle d-flex align-center"
                >
                  <v-row>
                    <v-col cols="4" class="text-start">
                      <!-- {{ user.league.round }} -->
                      <!-- {{ user.fixture.original_id }} -->
                      {{ user.fixture.id }}
                    </v-col>
                    <v-col cols="4"
                      ><p class="live-color text-h5">
                        {{ user.fixture.live }}
                      </p></v-col
                    >
                    <v-col cols="4" class="text-end">
                      שריקת פתיחה: {{ user.fixture.time }}

                      {{ user.fixture.datetoShow }}
                    </v-col>
                  </v-row>
                </v-card-subtitle>

                <v-card-actions
                  class="card-actions font-weight-bold text-center white--text"
                >
                  <!-- <v-col cols="2" class="d-none d-sm-flex "> -->
                  <v-flex sm2 xs1 class=" ">
                    <v-avatar>
                      <img
                        :src="user.teams.home.logo"
                        @click="linkToHomeTeam(i)"
                      />
                    </v-avatar>
                  </v-flex>
                  <!-- <v-flex cols="4" sm="3"  class="title sm-font text-truncate"> -->
                  <v-flex
                    xs4
                    sm4
                    class="text-caption text-sm-h6 text-md-h6 text-lg-h6 text-center"
                  >
                    {{ user.teams.home.name }}
                  </v-flex>

                  <v-flex xs2 class=" ">
                    <v-layout
                      class="custom-border-input"
                      v-if="user.goals.away !== null"
                    >
                      <v-flex
                        cols="4"
                        xs4
                        class="text-end result-margin text-sm-h5"
                      >
                        {{ user.goals.home }}
                      </v-flex>
                      <v-flex
                        cols="3"
                        xs4
                        class="text-center result-margin text-sm-h5"
                        >:</v-flex
                      >
                      <v-flex
                        cols="4"
                        xs4
                        class="text-start result-margin text-sm-h5"
                      >
                        {{ user.goals.away }}
                      </v-flex>
                    </v-layout>

                    <v-layout v-else class="custom-border-input">
                      <v-flex
                        xs4
                        class="user-score d-flex align-center result-margin4"
                      >
                        <v-layout
                          ><v-icon color="pink" class="mb-8"
                            >mdi-grease-pencil</v-icon
                          ></v-layout
                        >
                        <v-text-field
                          v-model="homeTeam[i]"
                          class="custom-text-field1 text-end text-sm-h5 input2"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-center text-sm-h5 result-margin3"
                        >:</v-flex
                      >
                      <v-flex
                        xs4
                        class="user-score d-flex align-center result-margin4"
                      >
                        <v-text-field
                          v-model="awayTeam[i]"
                          class="custom-text-field1 text-sm-h5"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex
                    xs4
                    sm4
                    class="text-caption text-sm-h6 text-md-h6 text-lg-h6 text-center"
                  >
                    {{ user.teams.away.name }}
                  </v-flex>

                  <v-flex sm2 xs1 class="">
                    <v-avatar>
                      <img
                        :src="user.teams.away.logo"
                        @click="linkToAwayTeam(i)"
                      />
                    </v-avatar>
                  </v-flex>
                </v-card-actions>
                <v-card-actions class="white--text card-actions2">
                  <v-flex
                    sm5
                    xs5
                    cols="5"
                    sm="5"
                    class="text-center"
                    v-if="user.goals.away !== null"
                    >הניחוש שלי</v-flex
                  >

                  <v-flex cols="4" sm="5" sm4 xs5 class="text-center" v-else>{{
                    `${user.odds.Home} (${user.odds.Home + 4} נק') `
                  }}</v-flex>

                  <v-flex sm2 class="">
                    <v-layout
                      class="custom-border-input2"
                      v-if="user.goals.away !== null"
                    >
                      <v-flex
                        cols="4"
                        xs5
                        class="user-scoreb d-flex align-center"
                      >
                        <v-text-field
                          disabled
                          v-model="homeTeam[i]"
                          class="custom-text-field input test"
                        ></v-text-field>
                      </v-flex>
                      <v-flex
                        cols="4"
                        xs4
                        class="d-flex align-center input test3"
                        >:</v-flex
                      >
                      <v-flex
                        cols="4"
                        xs4
                        class="user-scoreb d-flex align-center input2 test2"
                      >
                        <v-text-field
                          disabled
                          v-model="awayTeam[i]"
                          class="custom-text-field text--start"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex
                    v-if="user.goals.away === null"
                    xs4
                    sm4
                    class="mr-5 mt-1"
                    >{{ `${user.odds.Draw} (${user.odds.Draw + 4} נק')` }}
                  </v-flex>

                  <v-flex
                    sm5
                    v-if="user.goals.away !== null"
                    class="font-weight-bold text-center points_color ms-5"
                  >
                    {{ user.fixture.points || 0 }} נקודות
                  </v-flex>
                  <v-flex v-else xs4 sm4 class="text-center ms-5 mt-1">
                    {{ `${user.odds.Away} (${user.odds.Away + 4} נק') ` }}
                  </v-flex>
                </v-card-actions>
                <v-card-actions>
                  <v-layout
                    v-if="user.goals.away == null"
                    class="text-center d-flex justify-center"
                  >
                    <toast
                      @onClose="keepGuess(i)"
                      :msg="toastText"
                      class="button-margin"
                      >שמור תוצאה
                    </toast>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>

      <v-main v-else>
        <v-col class="d-flex justify-center">
          <v-btn bottom color="#61e1a8  " width="350" height="40">
            אתה לא משתמש רשום

            <router-link style="color: black" to="/" class="font-weight-bold">
              להרשמה
            </router-link>
          </v-btn>
        </v-col>
      </v-main>
    </v-container>
  </v-responsive>
</template>

<script>
import _ from "lodash";
import toast from "./snackbar";
import { mapState } from "vuex";

export default {
  name: "fixtures",

  components: {
    toast,
  },
  created() {},

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
      toastText: "",
      timeOver: false,

      allUsersGuesses: [],

      allUsers: [],
      all: [],
      dataGuess2: [],
      reduceAllSumPoints: null,

      prem: [],
      games: [],
    };
  },

  created() {},
  beforeMount() {},

  mounted() {
    // this.getGames()
    this.getAllUsers();
    this.getAllUsersGuesses(3);
    this.getThisUserGusses();

    // this.$store.dispatch("fetchGames");
    this.$store.dispatch("fetchOdds");

    this.getUsers();
  },
  computed: {
    selected() {
      return this.games.map((item) => item.fixture.id);
    },

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

    premToShow() {
      this.mergedData.forEach((value, key) => {
        if (value.odds == undefined) {
          value.odds = 10;
        }
      });
      for (let x = 0; x < this.dataGuess2.length; x++) {
        this.mergedData.forEach((value, key) => {
          if (value.fixture.id == [x]) {
            value.fixture.points = this.dataGuess2[x];
          }
          if (
            value.fixture.status.short === "1H" ||
            value.fixture.status.short === "2H"
          ) {
            value.fixture.live = "LIVE";
          }
        });
      }
      this.games = this.mergedData;

      // return finish games and games with odds
      return this.games.reduce((acc, item, key) => {
        if (
          item.odds !== 10 ||
          (item.goals.away !== null &&
            // item.league.round === "שמינית גמר" ||
            item.league.round === "רבע גמר")
        ) {
          acc[key] = item;
        }

        return acc;
      }, {});
    },

    ...mapState(["odds"]),
    ...mapState(["mergedData"]),
  },

  methods: {
    linkToAwayTeam(i) {
      console.log("link");
      let foo = i;

      switch (foo) {
        case "185":
          window.location.href =
            "https://www.365scores.com/he/football/england/tottenham/team/114";
          break;
        case "186":
          window.location.href =
            "https://www.365scores.com/he/football/italy/ac-milan/team/227";
          break;
        case 3:
          window.location.href =
            "https://www.365scores.com/he/football/england/tottenham/team/114";
          break;
        case "187":
          window.location.href =
            "https://www.365scores.com/he/football/germany/bayern-munich/team/331";
          break;
        case "188":
          window.location.href =
            "https://www.365scores.com/he/football/france/psg/team/480";
          break;
        case "189":
          window.location.href =
            "https://www.365scores.com/he/football/portugal/benfica/team/888";
          break;
        case "190":
          window.location.href =
            "https://www.365scores.com/he/football/belgium/club-brugge/team/1169";
          break;
        case "191":
          window.location.href =
            "https://www.365scores.com/he/football/england/chelsea/team/106";
          break;
        case "192":
          window.location.href =
            "https://www.365scores.com/he/football/germany/dortmund/team/341";
          break;
        case "193":
          window.location.href =
            "https://www.365scores.com/he/football/spain/real-madrid/team/131";
          break;
        case "194":
          window.location.href =
            "https://www.365scores.com/he/football/england/liverpool/team/108";
          break;
        case "195":
          window.location.href =
            "https://www.365scores.com/he/football/italy/napoli/team/234";
          break;
        case "196":
          window.location.href =
            "https://www.365scores.com/he/football/germany/eintracht-frankfurt/team/337";
          break;
        case "197":
          window.location.href =
            "https://www.365scores.com/he/football/england/manchester-city/team/110";
          break;
        case "198":
          window.location.href =
            "https://www.365scores.com/he/football/germany/rb-leipzig/team/7171";
          break;
        case "199":
          window.location.href =
            "https://www.365scores.com/he/football/portugal/fc-porto/team/887";
          break;
        case "200":
          window.location.href =
            "https://www.365scores.com/he/football/italy/inter-milan/team/224";
          break;
        default:
      }
    },
    linkToHomeTeam(i) {
      let foo = i;

      switch (foo) {
        case "186":
          window.location.href =
            "https://www.365scores.com/he/football/england/tottenham/team/114";

          break;
        case "185":
          window.location.href =
            "https://www.365scores.com/he/football/italy/ac-milan/team/227";
          break;
        case 3:
          window.location.href =
            "https://www.365scores.com/he/football/england/tottenham/team/114";
          break;
        case "188":
          window.location.href =
            "https://www.365scores.com/he/football/germany/bayern-munich/team/331";
          break;
        case "187":
          window.location.href =
            "https://www.365scores.com/he/football/france/psg/team/480";
          break;
        case "189":
          window.location.href =
            "https://www.365scores.com/he/football/belgium/club-brugge/team/1169";
          break;
        case "190":
          window.location.href =
            "https://www.365scores.com/he/football/portugal/benfica/team/888";
          break;
        case "192":
          window.location.href =
            "https://www.365scores.com/he/football/england/chelsea/team/106";
          break;
        case "191":
          window.location.href =
            "https://www.365scores.com/he/football/germany/dortmund/team/341";
          break;
        case "194":
          window.location.href =
            "https://www.365scores.com/he/football/spain/real-madrid/team/131";
          break;
        case "193":
          window.location.href =
            "https://www.365scores.com/he/football/england/liverpool/team/108";
          break;
        case "196":
          window.location.href =
            "https://www.365scores.com/he/football/italy/napoli/team/234";
          break;
        case "195":
          window.location.href =
            "https://www.365scores.com/he/football/germany/eintracht-frankfurt/team/337";
          break;
        case "198":
          window.location.href =
            "https://www.365scores.com/he/football/england/manchester-city/team/110";
          break;
        case "197":
          window.location.href =
            "https://www.365scores.com/he/football/germany/rb-leipzig/team/7171";
          break;
        case "200":
          window.location.href =
            "https://www.365scores.com/he/football/portugal/fc-porto/team/887";
          break;
        case "199":
          window.location.href =
            "https://www.365scores.com/he/football/italy/inter-milan/team/224";
          break;
        default:
      }
    },

    async getAllUsersGuesses(user) {
      const response = await fetch(
        `${process.env.VUE_APP_HOST}guesses/${user}`
      );
      const jsonObject = await response.json();
      this.allUsersGuesses = jsonObject;
      // console.log(this.allUsersGuesses);

      return jsonObject;
    },

    getThisUserGusses() {
      fetch(`${process.env.VUE_APP_HOST}guesses/${this.clientInfo.id}`)
        .then((response) => response.json())
        .then((jsonObject) => {
          // console.log(jsonObject);
          for (let x = 0; x < jsonObject.length; x++) {
            // הורדה של ה0 אחר הנקודה
            let obj = jsonObject[x];
            let numStr = obj.sum_points.toString();
            let numParts = numStr.split(".");

            if (numParts.length > 1 && numParts[1] == 0) {
              obj.sum_points = parseInt(numParts[0]);
            }
            this.dataGuess.push(jsonObject[x]);

            this.homeTeam[this.dataGuess[x].gameID] =
              this.dataGuess[x].home_team_goals;
            this.awayTeam[this.dataGuess[x].gameID] =
              this.dataGuess[x].away_team_goals;
            this.dataGuess2[jsonObject[x].gameID] = jsonObject[x].sum_points;
          }

          // console.log(this.dataGuess2);
          // console.log(this.homeTeam)
          // this.getThisUserGusses2()
        });
    },

    addToUserGueses(i) {
      // console.log(i);
      fetch(`${process.env.VUE_APP_HOST}guesses/add`, {
        method: "post",
        body: JSON.stringify({
          userID: this.clientInfo.id,
          gameID: this.games[i].fixture.id,
          // gameID: this.mergedData[i].fixture.id,
          home_team_goals: this.homeTeam[i],
          away_team_goals: this.awayTeam[i],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error === false) {
            // if(data.error){
            this.toastText = "נשמר בהצלחה";
            console.log("edit successfully");
            this.getThisUserGusses();
          } else {
            this.toastText = "לא הוזנו נתונים מלאים";
          }
        });
    },

    getUsers() {
      fetch(`${process.env.VUE_APP_HOST}users/${this.clientInfo.id}`)
        .then((response) => response.json())
        .then((jsonObject) => {
          for (let i = 0; i < jsonObject.length; i++) {
            this.currentUserDetail.push(jsonObject[i]);
          }
        });
    },
    getAllUsers() {
      fetch(`${process.env.VUE_APP_HOST}users/register`)
        .then((response) => response.json())
        .then((jsonObject) => {
          for (let i = 0; i < jsonObject.length; i++) {
            this.allUsers.push(jsonObject[i]);
          }
        });
    },

    editUserPoints(user) {
      // console.log(this.reduceAllSumPoints)
      fetch(`${process.env.VUE_APP_HOST}users/`, {
        method: "put",
        body: JSON.stringify({
          // id: this.clientInfo.id,
          id: user,

          // points: this.sumPoints,
          points: this.reduceAllSumPoints,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((jsonObject) => {
          // console.log(jsonObject);
        });
    },

    isBeforeTargetTime(targetTimeStr) {
      const targetTime = Date.parse(targetTimeStr);
      const currentTime = new Date().getTime();
      const timeDifferenceInMinutes = (targetTime - currentTime) / (1000 * 60);
    
      return timeDifferenceInMinutes <= 30;
    },

    keepGuess(i) {
      this.index = i;
   

      // if (2>1) {
      if (this.isBeforeTargetTime(this.mergedData[i].fixture.date) === false) {
        this.userGuessobj = {
          gameID: this.games[i].fixture.id,

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
          return item.gameID === this.mergedData[i].fixture.id;
        });

        // console.log(foundGameID);

        if (!foundGameID) {
          // console.log("found");
          this.addToUserGueses(i);
          // this.toastText = "נשמר בהצלחה"
        } else {
          // console.log("not found");
          this.editGusses(i);
        }
      } else {
        this.toastText = "לא ניתן עוד לנחש עבור משחק זה";
        console.log("time is over");
      }
    },

    editGusses(i) {
      fetch(`${process.env.VUE_APP_HOST}guesses/`, {
        method: "put",
        body: JSON.stringify({
          userID: this.clientInfo.id,
          gameID: this.games[i].fixture.id,
          home_team_goals: this.homeTeam[i],
          away_team_goals: this.awayTeam[i],
          // sum_points: this.sumPoints
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((jsonObject) => {
          console.log("put successfully");
          this.toastText = "נשמר בהצלחה";
        });
    },
    replaceOrderInItems(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    },

    editSumPoints(user, game) {
      fetch(`${process.env.VUE_APP_HOST}guesses/`, {
        method: "put",
        body: JSON.stringify({
          // userID: this.clientInfo.id,
          userID: user,
          gameID: game,

          sum_points: this.userPoints,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(
        console.log(`succsses GAME ${game} for ${user} got ${this.userPoints} `)
      );
    },

    async compareResult(user) {
      // console.log("compare");
      // console.log(user);

      await this.getAllUsersGuesses(user);

      // משנה את הPLACE לפי הKEY
      this.allUsersGuesses.forEach((value, key) => {
        value.id = `${key}`;
      });
      // console.log(this.allUsersGuesses);
      for (let x = 0; x < this.allUsersGuesses.length; x++) {
        this.items.forEach((value, key) => {
          if (
            value.fixture.id == this.allUsersGuesses[x].gameID &&
            key !== this.allUsersGuesses[x].id
          ) {
            this.replaceOrderInItems(this.items, key, x);
          }
        });

        if (
          this.items[x].fixture.id == this.allUsersGuesses[x].gameID &&
          this.allUsersGuesses[x].userID == user &&
          this.items[x].goals.home == this.allUsersGuesses[x].home_team_goals &&
          this.items[x].goals.away == this.allUsersGuesses[x].away_team_goals
        ) {
          // new point system
          if (this.items[x].teams.home.winner == true) {
            console.log("home_winner");
            console.log(this.items[x].odds.Home + 4);
            //  this.userPoints = this.items[x].odds.Home + 4
            this.userPoints = this.items[x].odds.Home
              ? this.items[x].odds.Home + 4
              : 6;
          } else if (this.items[x].teams.away.winner == true) {
            // console.log("away_winner");
            // console.log(this.items[x].odds.Away);
            // this.userPoints = this.items[x].odds.Away + 4
            this.userPoints = this.items[x].odds.Home
              ? this.items[x].odds.Away + 4
              : 6;
          } else {
            //  this.userPoints = this.items[x].odds.Draw + 4
            this.userPoints = this.items[x].odds.Home
              ? this.items[x].odds.Draw + 4
              : 6;
          }
          //end new point system

          // this.userPoints = 6;
          // console.log("even");
          // console.log(this.items[x]);
          // console.log(this.userPoints);
        } else if (
          this.items[x].fixture.id == this.allUsersGuesses[x].gameID &&
          this.allUsersGuesses[x].userID == user &&
          ((this.items[x].goals.home > this.items[x].goals.away &&
            this.allUsersGuesses[x].home_team_goals >
              this.allUsersGuesses[x].away_team_goals) ||
            (this.items[x].goals.away > this.items[x].goals.home &&
              this.allUsersGuesses[x].away_team_goals >
                this.allUsersGuesses[x].home_team_goals) ||
            (this.items[x].goals.home === this.items[x].goals.away &&
              this.allUsersGuesses[x].home_team_goals ===
                this.allUsersGuesses[x].away_team_goals))
        ) {
          // new point system
          if (this.items[x].teams.home.winner == true) {
            //  this.userPoints = this.items[x].odds.Home

            this.userPoints = this.items[x].odds.Home
              ? this.items[x].odds.Home
              : 3;
          } else if (this.items[x].teams.away.winner == true) {
            // this.userPoints = this.items[x].odds.away
            this.userPoints = this.items[x].odds.Home
              ? this.items[x].odds.Away
              : 3;
          } else {
            //  this.userPoints = this.items[x].odds.Draw
            // console.log("draw");
            // console.log(this.items[x].odds.Home);
            this.userPoints =
              this.items[x].odds !== 10 ? this.items[x].odds.Draw : 3;
          }
          //end new point system

          // this.userPoints = 3;
          // console.log(" almost even");
          // console.log(this.items[x]);
          // console.log(this.userPoints);
        } else {
          this.userPoints = 0;
          // console.log(" mot even");
        }
        this.editSumPoints(user, this.items[x].fixture.id);

        this.userresult = {
          gameID: this.items[x].fixture.id,
          points: this.userPoints,
          sumPoints: null,
        };

        this.resultarr[x] = this.userresult;
        // test
        // this.getAllUsersGuesses(user)
        this.sumPoints = this.resultarr.reduce((currentTotal, item) => {
          return item.points + currentTotal;
        }, 0);

        this.reduceAllSumPoints = this.allUsersGuesses.reduce(
          (currentTotal, item) => {
            return +item.sum_points + +currentTotal;
          },
          0
        );

        // console.log(this.reduceAllSumPoints);

        this.resultarr[x].sumPoints = this.sumPoints;

        this.editUserPoints(user);
      }
    },
  },

  watch: {
    games: {
      handler(newVal, oldVal) {
        const equalsCheck = (a, b) => {
          return JSON.stringify(a) === JSON.stringify(b);
        };

        for (let i = 0; i < newVal.length; i++) {
          if (
            newVal[i].fixture.status.short === "1H" ||
            newVal[i].fixture.status.short === "2H" ||
            (newVal[i].fixture.status.short === "FT" &&
              newVal[i].goals.home !== null &&
              newVal[i].goals.away !== null)
          ) {
            this.testarr.push(newVal[i]);
          }
        }

        if (equalsCheck(this.testarr, this.items)) {
          console.log("The arrays have the same elements.");
        } else {
          console.log("The arrays have different elements.");
          localStorage.setItem("test", JSON.stringify(this.testarr));
          if (localStorage["test"]) {
            this.$store.commit("setItems", JSON.parse(localStorage.test));
          }
          // console.log(this.allUsers);
          for (let i = 0; i < this.allUsers.length; i++) {
            this.compareResult(this.allUsers[i].id);
          }
        }
      },
    },
    deep: true,
  },
};
</script>

<style scope>
.input {
}
.centered-input input {
  text-align: left;
}
.v-text-field {
}
.v-text-field--outlined fieldset {
}
.button {
}

.table {
  max-width: 800px !important;
}
.middle-row {
  height: 120px;
}

.bottom-row {
  height: 100px;
}

.user-score {
  height: 25px !important;
}
.user-scoreb {
  height: 30px !important;
}

.custom-text-field input {
  font-size: 17px !important;
  color: white !important;

  margin-top: 25px;
  width: 15px !important;
}
.custom-text-field1 input {
  color: white !important;

  margin-top: 25px;
}

.input2 {
  margin-right: 12px;
  margin-bottom: 2px;
}

.v-input__slot::before {
  border-style: none !important;
}
.card-actions {
  background-color: #0161db;
  border: 1px solid #4693f5;
  height: 70px;
}
.card-actions2 {
  height: 55px;
}
.custom-border-input {
  border-radius: 10%;
  background-color: #071f5d;
  height: 60px;
}
.points_color {
  color: #d66d77;
}
.card-subtitle {
  height: 40px;
}
.card-width {
  background-color: transparent !important;
}
.card-color {
  background-color: transparent !important;
}
.custom-border-input2 {
  border: 1px solid #4693f5;
  border-radius: 10%;
  background-color: #071f5d;
  width: 80px;
  height: 50px;
  margin-right: 20px;
}
.page-color {
  background-image: linear-gradient(
    to right,
    rgba(8, 50, 144, 255),
    rgba(1, 88, 205, 255)
  );
}
.text-break {
  word-break: break-word;
}
.result-margin {
  margin-top: 15px;
}
.result-margin4 {
  margin-top: 10px;
}
.result-margin3 {
  margin-top: 15px;
}
.test {
  margin-right: 13px;
}
.test2 {
  margin-left: 10px;
}
.test3 {
  margin-right: 10px;
  margin-top: 0px;
}
.live-color {
  color: red;
}
@media screen and (max-width: 700px) {
  .result-margin2 {
    margin-top: 8px;
  }
  .result-margin {
    margin-top: 10px;
  }
  .result-margin4 {
    margin-top: 0px;
  }
  .result-margin3 {
    margin-top: 8px;
  }

  .input2 {
    margin-right: 5px;
    margin-bottom: 0px;
  }
  .input {
    margin-right: 2px;
  }
  .test {
    margin-right: 10px;
  }
  .test3 {
    margin-top: 1px;
  }
  .user-score {
    /* height: 20px !important; */
  }

  .user-scoreb {
    height: 20px !important;
  }
  .custom-border {
    border: 1px solid #4693f5;

    /* background-color: #071f5d; */
    /* background-color: aqua; */
  }
  .card-subtitle {
    /* height: 60px; */
  }

  .card-actions {
    /* color:#0161db !important; */

    height: 58px !important;
    width: 102%;
  }

  .card-actions2 {
    margin-top: 3px;
    height: 50px;
  }
  .custom-border-input {
    width: 50px;
    height: 40px;
  }
  .custom-border-input2 {
    width: 55px;
    height: 40px;
    margin-right: 1px;
  }
  .button-margin {
    /* margin-left: 20px !important; */
  }
  .result-margin {
    margin-top: 10px;
  }
}
</style>
