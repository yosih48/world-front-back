<template>
  <v-container class="mt-10">
    <v-simple-table class="tr mr-16">
      <template v-slot:default>
        <tbody class="mx-auto">
          <!-- <tr height="100px" >  -->
            <tr
            height="100px"
            v-for="(user, i) in games"
            :key="i"
            class="text-center table"
            >
            <v-btn @click="keepGuess(i)" class="button">שמור תוצאה</v-btn>
            <td>
              {{ user.home_team.name }}
            </td>

            <!-- <td class="hover">
                <router-link
                  class="white--text"
                  style="text-decoration: none"
                  :to="{ name: 'product', params: { id: item.id } }"
                  >{{ item.title }}</router-link
                >
              </td> -->
            <td>
              {{ user.home_team.goals }}
              <v-text-field
                class="input mx-auto"
                v-model="homeTeam[i]"
              ></v-text-field>
            </td>
            <td>
              {{ user.away_team.goals }}
              <v-text-field
                class="input mx-auto"
                v-model="awayTeam[i]"
              ></v-text-field>
            </td>
            <td>
              {{ user.away_team.name }}
            </td>
           
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  // name: "match",

  created() {},
  components: {},
  props: {},
  data() {
    return {
      status: false,

      games: [],
      userGuess: [],
      obj: {},
      table: [],
      users: [],

      result: {},

      index: null,
      userWinner: "",
      userPoints: null,
      homeTeam: {},
      awayTeam: {},
    };
  },

  created() {},

  mounted() {
  
    this.getData();
    this.getUsers();
    // console.log(this.users)
  },
  computed: {
    resultarr() {
      return this.$store.state.resultarr;
    },
  },

  methods: {
    getData() {
      fetch("https://worldcupjson.net/matches")
        .then((response) => response.json())
        .then((jsonObject) => {
          this.games = jsonObject;
        });
    },
    getUsers() {
      fetch("http://localhost:3000/users/register")
        .then((response) => response.json())
        .then((jsonObject) => {
          for (let i = 0; i < jsonObject.length; i++) {
            this.users.push(jsonObject[i]);
          }
        });
    },

    points(i) {
      if (
        this.games[i].home_team.goals === this.userGuess[i].home_team.goals &&
        this.games[i].away_team.goals === this.userGuess[i].away_team.goals
      ) {
        this.userPoints = 5;
      } else if (
        (this.games[i].home_team.goals > this.games[i].away_team.goals &&
          this.userGuess[i].home_team.goals >
            this.userGuess[i].away_team.goals) ||
        (this.games[i].away_team.goals > this.games[i].home_team.goals &&
          this.userGuess[i].away_team.goals >
            this.userGuess[i].home_team.goals) ||
        (this.games[i].home_team.goals === this.games[i].away_team.goals &&
          this.userGuess[i].home_team.goals ===
            this.userGuess[i].away_team.goals)
      ) {
        this.userPoints = 4;
      } else {
        this.userPoints = 0;
      }
      console.log(this.userPoints);
      this.result = {
        userID: this.users[i].id,
        username: this.users[i].userName,
        id: this.games[i].id,
        points: this.userPoints,
        table: null,
      };

      this.resultarr[i] = this.result;

      this.table = this.resultarr.reduce((currentTotal, item) => {
        return item.points + currentTotal;
      }, 0);
      console.log(this.resultarr[i]);
      this.resultarr[i].table = this.table;

      console.log(this.table);
      console.log(this.resultarr);
    },

    keepGuess(i) {
      this.index = i;

      this.obj = {
        id: this.games[i].id,
        // winner: ,
        home_team: {
          name: this.games[i].home_team.name,
          goals: this.homeTeam[i],
        },
        away_team: {
          name: this.games[i].away_team.name,
          goals: this.awayTeam[i],
        },
      };

      this.userGuess[i] = this.obj;

      this.points(i);

      // console.log(this.games[i].home_team.name)
      // console.log(this.userGuess[i].home_team.name)
    },
  },

  watch: {},
};
</script>

<style>
.container {
  /* width: 1200px; */
}

.input {
  width: 100px;
}
.button {
  align-items: center;
}
</style>
