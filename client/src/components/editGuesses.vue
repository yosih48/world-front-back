<template>
  <v-container class="item_size">
    <v-main>
      <h2 class="white--text">משתמשים</h2>

      <v-simple-table
        class="simple-table-color border white--text mt-7"
        calculate-widths
      >
        <template v-slot:default>
          <thead class="tr-color">
            <tr class="border-left">
              <th class="white--text">ID</th>
              <th class="white--text">userID</th>
              <th class="white--text">שם</th>
              <th class="white--text">GAME ID</th>
              <th class="white--text">HOME GOAL</th>
              <th class="white--text text-center">AWAY GOAL</th>
              <th class="white--text text-center">POINTS GAME</th>
            </tr>
          </thead>
          <tbody class="border-left">
            <tr
              v-for="(item, index) in guesses"
              :key="item.id"
              class="border-left"
            >
              <!-- <td class="" style="">{{ item.id }}</td> -->

              <td style="">{{ item.id }}</td>
              <td style="">{{ item.userID }}</td>
              <td style="">{{ item.userName }}</td>
              <td style="">{{ item.gameID }}</td>
              <!-- <td>{{ item.isAdmin }} </td> -->
              <td style="">
                {{ item.away_team_goals }}
              </td>
              <td style="">{{ item.home_team_goals }}</td>
              <td style="">{{ item.sum_points }}</td>

              <td class="text-center" style="">
                <!-- <v-btn
                  text
                  class="mx-auto center"
                  color="white"
                  @click="updateUser(index)"
                >
                  <v-icon>mdi-account-edit</v-icon>
                </v-btn> -->
                  <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
         עריכה
        </v-btn>
      </template>
     <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
              <v-form ref="form" lazy-validation>
            <v-row>
              <v-col
                cols="12"
             
              >
                <v-text-field
                  label="gameID"
                  v-model="gameID"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
               
                  label="HomeGoal"
          v-model="HomeGoal"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
        
                  label="awayGoal"
                
                    v-model="awayGoal"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
      
                  label="שם משתמש*"
                
                    v-model="userName"
                  required
                ></v-text-field>
              </v-col>
         
            </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click=" dialog = false; updateUser(index)"
  
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
              </td>
              <td class="text-center" style="width: 10%">
                <v-btn
                  text
                  class="mx-auto center"
                  color="white"
                  @click="deleteUser(index)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-main>
  </v-container>
</template>

<script>
export default {
  name: "editGuesses",



  data() {
    return {
      gameID: null,
      userName: "",
      HomeGoal: null,
      awayGoal: null,
 dialog: false,
    };
  },
  mounted() {
    this.getGuesses();
    console.log(this.guesses);
  },

  computed: {
    users() {
      return this.$store.state.users;
    },
    guesses() {
      return this.$store.state.guesses;
    },
    clientInfo() {
      return this.$store.state.clientInfo;
    },
  },
  methods: {
    getGuesses() {
      fetch(`${process.env.VUE_APP_HOST}guesses/register`, {
        headers: {
          Authorization: "Bearer " + this.clientInfo.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.$store.commit("setGuesses", data);
        });
    },

    deleteUser(index) {
      console.log(this.guesses[index].id);
      fetch(`${process.env.VUE_APP_HOST}guesses/${this.guesses[index].id}`, {
        method: "delete",
        headers: {
          // Authorization: 'Bearer ' + this.clientInfo.token,
        },
      })
        .then((response) => response.json())
        .then((jsonObject) => {
          console.log("deleted");
          // location.reload();
        });
    },

    updateUser(index) {
      console.log(this.guesses[index].id);
   this.dialog = false
      //    fetch(`${process.env.VUE_APP_HOST}guesses/`, {
      //   method: "put",
      //   body: JSON.stringify({
      //     userID: this.clientInfo.id,
      //     gameID: this.games[i].fixture.id,
      //     home_team_goals: this.homeTeam[i],
      //     away_team_goals: this.awayTeam[i],
      //     // sum_points: this.sumPoints
      //   }),
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8",
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((jsonObject) => {
      //     console.log("put successfully");
      //     this.toastText = "נשמר בהצלחה";
      //   });
      // this.$router.push(`/admin/users/edit/${this.users[index].id}`);

    },
  },
};
</script>

<style scoped>
.simple-table-color {
  background-color: #272b30 !important;
}
.border {
  border: 1px solid black;
}

table th + th {
  border-right: 1px solid black;
}
table td + td {
  border-right: 1px solid black;
}

table td {
  border-top: 1px solid black;
}
tr:nth-child(even) {
  background-color: #32363b;
}
tr:hover {
  background-color: transparent !important;
}
.tr-color {
  background-color: #32363b;
}
</style>
