<template>
  <div>
    <h2>Champions League Results</h2>
      <button @click="downloadGames">Download Games JSON</button>
    <h2>Champions League odds</h2>
      <button @click="downloadOdds">Download odds JSON</button>
    <ul>
      <li v-for="game in games" :key="game.fixture_id">
        {{ game.teams.away.name }} {{ game.goals.away }} - {{ game.teams.home.name }} {{ game.goals.home }}
      </li>
    </ul>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
        games: [],
      json: [],
      odds: [],
      mergedData: [],
           fixturesData: [],
    }
  },
  mounted() {
// this.jsonFunc()
// this.fixtures()
// this.oddsfunc()
// this.fixturesPrem()
// this.merge()
    },

    methods: {


// הורדה של לוח משחקים
 async downloadGames() {
   await this.fixtures()
      const jsonString = JSON.stringify(this.games);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "games.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  // הורדה של בטים
  downloadOdds() {
    this.oddsfunc()
      const jsonString = JSON.stringify(this.odds);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "odds.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

        fixtures() {
          console.log('test')
                fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?league=2&season=2022", {
                // fetch("https://v3.football.api-sports.io/odds?league=2&season=2022", {
                
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "a93678359bmshec209499c207ebep1758d1jsn22a0484dd70e",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    
      }
    })
    .then(response => response.json())
    .then(data => {
        this.games = data.response;
   
      console.log(this.games)
    })
    .catch(error => {
      console.log(error);
    });

      },
      oddsfunc() {

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a93678359bmshec209499c207ebep1758d1jsn22a0484dd70e',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};

fetch('https://api-football-v1.p.rapidapi.com/v3/odds?league=2&season=2022', options)
	.then(response => response.json())
	// .then(response => console.log(response))
  .then(data => {
        this.odds = data.response;
   
      console.log(this.odds)
    })
	.catch(err => console.error(err));

  
      },

   // Function to merge fixtures and odds data
    mergeData(fixturesData, oddsData) {
            const fixturesMap = new Map(
        fixturesData.response.map((fixture) => [fixture.fixture.id, fixture])
      );
      
      // Merge odds data into fixtures data based on fixture ID
      const merg = oddsData.data.reduce((acc, odds) => {
        const fixture = fixturesMap.get(odds.fixture.id);
        if (fixture) {
          // Add odds data to fixture object
          fixture.odds = odds.bookmakers;
          // Add merged data to accumulator
          acc.push(fixture);
        }
        return acc;
      }, []);
      return this.merg;
    },

      merge() {
        const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a93678359bmshec209499c207ebep1758d1jsn22a0484dd70e',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};
       
           fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2022", options)
    .then(response => response.json())
             .then(fixturesData => {
          this.fixturesData = fixturesData;
fetch('https://api-football-v1.p.rapidapi.com/v3/odds?league=39&season=2022', options)
	.then(response => response.json())
	// .then(response => console.log(response))
  .then(oddsData => {
    this.odds = oddsData;
      console.log(this.odds)
 this.mergedData = this.mergeData(this.fixturesData, this.odds);
    console.log(this.mergedData);
    })
	.catch(err => console.error(err));
    })
    .catch(error => {
      console.log(error);
    });
        
      },


      
        fixturesPrem() {
          console.log('test')
                fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2022/odds?league=39&season=2022", {
                
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "a93678359bmshec209499c207ebep1758d1jsn22a0484dd70e",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(data => {
        this.games = data.response;
      console.log(this.games)
    })
    .catch(error => {
      console.log(error);
    });

        },

        jsonFunc() {
                       
              fetch("../games.json")
  .then((response) => {
                return response.json();
              })
    .then(data => {
        console.log(data)
        this.json = data;
      console.log(this.json)
    })
    .catch(error => {
      console.log(error);
    });
        }
    }
}
</script>
