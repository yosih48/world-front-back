import { merge } from 'lodash';
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plugins: [],
    table: [],
    resultarr: [],
    games: [],
    users: [],
    guesses: [],
    // שם וID של המשתמש
    clientInfo: {},
    items: [],
    localHost: process.env.VUE_APP_HOST,
    odds: [],
    mergedData: [],
  },
  getters: {},

  actions: {
    // LOCAL JSON odds
    async fetchOdds({commit}) {
      // console.log('render')
      try {
      const response = await fetch("../games.json"); // Replace with your actual URL
      // const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2022",
      //         {
      //           method: "GET",
      //           headers: {
      //             "x-rapidapi-key":
      //               "a93678359bmshec209499c207ebep1758d1jsn22a0484dd70e",
      //             "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      //           },
      //         })
      const games = await response.json();
      // console.log(games)

// לפי תאריך
// games .sort((p1, p2)=>{
// return      p1.fixture.date > p2.fixture.date
//           ? 1
//           : p1.fixture.date < p2.fixture.date
//           ? -1
//           : 0
// })

      games.forEach((object, key) => {
        object.fixture.original_id = object.fixture.id;
        object.fixture.id = key;
        object.fixture.time = object.fixture.date.substr(11, 5);
        object.fixture.datetoShow = object.fixture.date.substr(0, 10);
        object.fixture.time = "22:00";
        if (object.league.round === "Round of 16") {
          object.league.round = "שמינית גמר";
        } else if (object.league.round === "Quarter-finals") {
          object.league.round = "רבע גמר";
        }
      });

        const response1 = await fetch("../oddscl.json");
        const odd = await response1.json();
        // console.log(odd)
        // const mergedData = [...data, ...odd];
        const oddsObj = {};
for (let i = 0; i < odd.length; i++) {
  const odds = odd[i];
  const fixtureId = odds.fixture.id;
  if (!oddsObj[fixtureId]) {
    // oddsObj[fixtureId] = [];// ass array
    oddsObj[fixtureId] = {}; //ass object
  }
  // oddsObj[fixtureId].push(odds.bookmakers[0].bets[0].values[0].odd);// ass array
  oddsObj[fixtureId][odds.bookmakers[0].bets[0].values[0].value] =
    Math.round(odds.bookmakers[0].bets[0].values[0].odd * 2) / 2; //ass object
  oddsObj[fixtureId][odds.bookmakers[0].bets[0].values[1].value] =
    Math.round(odds.bookmakers[0].bets[0].values[1].odd * 2) / 2; //ass object
  oddsObj[fixtureId][odds.bookmakers[0].bets[0].values[2].value] =
    Math.round(odds.bookmakers[0].bets[0].values[2].odd * 2) / 2; //ass object
}
// Loop through fixtures data to add odds data based on fixture ID
const mergedData = [];
for (let i = 0; i < games.length; i++) {
  const fixture = games[i];
  // const odds = oddsObj[fixture.fixture.id];
  const odds = oddsObj[fixture.fixture.original_id];
  mergedData.push({
    ...fixture,
    odds,
  });
}
        // console.log(mergedData)
        commit("setMergedData", mergedData);
        return mergedData;
      }catch (error) {
        // Handle any errors that may occur
        console.error('Error fetching data from JSON 1:', error);
        throw error; // Rethrow the error to be caught by the caller
      }
      // games.forEach((object, key) => {
      //   object.fixture.original_id = object.fixture.id
      //   object.fixture.id = key;
      //   object.fixture.time = object.fixture.date.substr(11, 5);
      //   object.fixture.datetoShow = object.fixture.date.substr(0, 10);
      //   object.fixture.time = "22:00";
      //       if (object.league.round === "Round of 16") {
      //            object.league.round = "שמינית גמר"
      //               } else if (object.league.round === "Quarter-finals") {
      //               object.league.round = "רבע גמר"
      //   }

      // });

      // commit("setOdds", odd);
      // console.log(this.state.odds);
    },

    // LOCAL JSON games
    async fetchGames() {
      // console.log('render')

      const response = await fetch("../gamesPrem.json");
      const games = await response.json();
      return games
      games.forEach((object, key) => {
        object.fixture.original_id = object.fixture.id;
        object.fixture.id = key;
        object.fixture.time = object.fixture.date.substr(11, 5);
        object.fixture.datetoShow = object.fixture.date.substr(0, 10);
        object.fixture.time = "22:00";
        // if (object.league.round === "Round of 16") {
        //   object.league.round = "שמינית גמר";
        // } else if (object.league.round === "Quarter-finals") {
        //   object.league.round = "רבע גמר";
        // }
      });

      commit("setGames", games);
      // console.log(this.state.games);

     
    },
    // LOCAL JSON prem
    // async fetchGames({ commit }) {
    //   // console.log('render')
    //   const response = await fetch("../gamesPrem.json");
    //   const games = await response.json();
    //   // games.forEach((object, key) => {
    //   //   object.fixture.original_id = object.fixture.id;
    //   //   object.fixture.id = key;
    //   //   object.fixture.time = object.fixture.date.substr(11, 5);
    //   //   object.fixture.datetoShow = object.fixture.date.substr(0, 10);
    //   //   object.fixture.time = "22:00";
    //   //   if (object.league.round === "Round of 16") {
    //   //     object.league.round = "שמינית גמר";
    //   //   } else if (object.league.round === "Quarter-finals") {
    //   //     object.league.round = "רבע גמר";
    //   //   }
    //   // });

    //   commit("setGames", games);
    // },

    // REAL API
    //     async fetchGames({ commit }) {
    //       const response = await fetch(
    //         "https://api-football-v1.p.rapidapi.com/v3/fixtures?league=2&season=2022",
    //         {
    //           method: "GET",
    //           headers: {
    //             "x-rapidapi-key":
    //               "a93678359bmshec209499c207ebep1758d1jsn22a0484dd70e",
    //             "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    //           },
    //         }
    //       )
    //        .then(response => response.json())
    //     .then(data => {
    //        this.games =  data.response;

    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //       // const games = await response.json();
    //  this.games.forEach((object, key) => {
    //    object.fixture.id = key;
    // object.fixture.time = object.fixture.date.substr(11, 5);
    // object.fixture.datetoShow = object.fixture.date.substr(0, 10);
    // object.fixture.time = "22:00"
    //  });

    //       commit("setGames", this.games);
    //     },

    // async merge({ dispatch }) {
    //   try {
    //      const fixturesData = await fetchGames();
    //      const oddsData = await fetchOdds();

    //     const oddsObj = {};
    //     for (let i = 0; i < odds.length; i++) {
    //       const odds = odds[i];
    //       const fixtureId = odds.fixture.id;
    //       if (!oddsObj[fixtureId]) {
    //         // oddsObj[fixtureId] = [];// ass array
    //         oddsObj[fixtureId] = {}; //ass object
    //       }
    //       // oddsObj[fixtureId].push(odds.bookmakers[0].bets[0].values[0].odd);// ass array
    //       oddsObj[fixtureId][odds.bookmakers[0].bets[0].values[0].value] =
    //         Math.round(odds.bookmakers[0].bets[0].values[0].odd * 2) / 2; //ass object

    //       oddsObj[fixtureId][odds.bookmakers[0].bets[0].values[1].value] =
    //         Math.round(odds.bookmakers[0].bets[0].values[1].odd * 2) / 2; //ass object

    //       oddsObj[fixtureId][odds.bookmakers[0].bets[0].values[2].value] =
    //         Math.round(odds.bookmakers[0].bets[0].values[2].odd * 2) / 2; //ass object
    //     }

    //     // Loop through fixtures data to add odds data based on fixture ID
    //     const mergedData = [];
    //     for (let i = 0; i < games.length; i++) {
    //       const fixture = games[i];
    //       // const odds = oddsObj[fixture.fixture.id];
    //       const odds = oddsObj[fixture.fixture.original_id];
    //       mergedData.push({
    //         ...fixture,
    //         odds,
    //       });
    //     }
    //     commit("setMergedData", mergedData);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

//     async merge({ commit }) {

// //     const [fixturesData, oddsData] = await Promise.all([
// //       dispatch("fetchGames"),
// //       dispatch("fetchOdds"),
// //     ]);
// // console.log(fixturesData);

// try{
// const [data1, data2] = await Promise.all([

//   fetchOdds()
// ]);

// const oddsObj = {};
// for (let i = 0; i < odds.length; i++) {
//   const odds = odds[i];
//   const fixtureId = odds.fixture.id;
//   if (!oddsObj[fixtureId]) {
//     // oddsObj[fixtureId] = [];// ass array
//     oddsObj[fixtureId] = {}; //ass object
//   }
//   // oddsObj[fixtureId].push(odds.bookmakers[0].bets[0].values[0].odd);// ass array
//   oddsObj[fixtureId][odds.bookmakers[0].bets[0].values[0].value] =
//     Math.round(odds.bookmakers[0].bets[0].values[0].odd * 2) / 2; //ass object
//   oddsObj[fixtureId][odds.bookmakers[0].bets[0].values[1].value] =
//     Math.round(odds.bookmakers[0].bets[0].values[1].odd * 2) / 2; //ass object
//   oddsObj[fixtureId][odds.bookmakers[0].bets[0].values[2].value] =
//     Math.round(odds.bookmakers[0].bets[0].values[2].odd * 2) / 2; //ass object
// }
// // Loop through fixtures data to add odds data based on fixture ID
// const mergedData = [];
// for (let i = 0; i < games.length; i++) {
//   const fixture = games[i];
//   // const odds = oddsObj[fixture.fixture.id];
//   const odds = oddsObj[fixture.fixture.original_id];
//   mergedData.push({
//     ...fixture,
//     odds,
//   });
// }
// commit("setMergedData", mergedData);

// return mergedData
// }catch (error) {
//   // Handle any errors that may occur
//   console.error('Error fetching and merging data:', error);
// }

  
    
//     },
  },
  mutations: {
    increment(state, clientInfo) {
      state.clientInfo = clientInfo;
    },
    setGames(state, games) {
      state.games = games;
    },
    setItems(state, items) {
      state.items = items;
    },
    setOdds(state, odds) {
      state.odds = odds;
    },
    setMergedData(state, mergedData) {
      state.mergedData = mergedData;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setGuesses(state, guesses) {
      state.guesses = guesses;
    },
  },
  modules: {},
});
