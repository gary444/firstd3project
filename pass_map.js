//create pitch
const pitch_width = 800;
const pitch_length = 500;
let svgContainer = d3.select("body").append("svg")
  .attr("width", pitch_width)
  .attr("height", pitch_length);
let pitch = svgContainer.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", pitch_width)
  .attr("height", pitch_length)
  .style("fill", "green");

//abs pitch values: x [0 120] y [0 80]
let pitchXScale = d3.scaleLinear()
  .domain([0,120])
  .range([0, pitch_width]);
let pitchYScale = d3.scaleLinear()
  .domain([0,80])
  .range([0, pitch_length]);
//gives line correct colour
function lineColor(d){

  if (d.team.id === teams[0].id) {return teams[0].color;} //man city
  else if (d.team.id === teams[1].id) {return teams[1].color;} //chelsea

}

//globals - avoid?
let passes = [];
let teams = [];
let team1_players = [];
let team2_players = [];

//load player list / teams
d3.json("data/lineups_7298.json")
.then(function (data) {


  //for each player in each team
  for (let team=0; team < data.length; team++){
    for (let p = 0; p < data[team].lineup.length; p++){
        // console.log(data[team].lineup[player].player_name);+
        let this_player = data[team].lineup[p];
        //add some fields
        this_player.mins_played = 90;
        // this_player.passes_played = 0;

        if (team === 0) {team1_players.push(this_player);}
        else if (team === 1) {team2_players.push(this_player);}
    }
    //create team entry
    let new_team = {};
    new_team.id = data[team].team_id;
    new_team.name = data[team].team_name;
    teams.push(new_team);
  }

  //set colours manually
  teams[0].color = "#1a26ce";
  teams[1].color = "#5de2ce";



  buildPassMatrices();

});

//load passes
d3.json("data/events_7298.json")
.then(function(data) {

  for (var i = 0; i < data.length; i++) {
    //create shorter array from only passes
    if (data[i].type.name === "Pass"){
      passes.push(data[i]);
    }
  }
  //draw passes as lines on the pitch
  svgContainer.selectAll("line")
    .data(passes)
    .enter().append("line")
    .attr("x1", function(d) {return pitchXScale(d.location[0]);})
    .attr("y1", function(d) {return pitchYScale(d.location[1]);})
    .attr("x2", function(d) {return pitchXScale(d.pass.end_location[0]);})
    .attr("y2", function(d) {return pitchYScale(d.pass.end_location[1]);})
    .attr("stroke-width", 2)
    .attr("stroke", lineColor);

  buildPassMatrices();

});



function buildPassMatrices(){
  // check matrices are ready
  if (team1_players.length === 0
      || team2_players.length === 0
      || passes.length === 0) {
    return;
  }

  let team1PassMatrix = buildPassMatrix(team1_players, passes, teams[0]);
  let team2PassMatrix = buildPassMatrix(team2_players, passes, teams[1]);

  console.log("finished building matrices");

};

// computes a matrix of number of passes between members of a team
// includes number of incomplete passes as last column 
function buildPassMatrix(players, passes, team){

  //create empty matrix
  //each player has extra row for incomplete passes
  let matrix = new Array(players.length);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(players.length + 1).fill(0);
  }
  //filter pass Array
  const team_passes = passes.filter(pass => pass.team.id === team.id);

  for (let i = 0; i < team_passes.length; i++) {
    let passer_idx = -1, recipient_idx = -1;
    for (let j = 0; j < players.length; j++) {

      //check if this player is passer
      if (players[j].player_id === team_passes[i].player.id) { passer_idx = j; }
      //check if this player is recipient - if no recipient, set recipient id to last element of array
      try {
        if (players[j].player_id === team_passes[i].pass.recipient.id) { recipient_idx = j; }
      } catch (e) {
        if (typeof team_passes[i].pass.recipient === "undefined") { recipient_idx = players.length; }
      }
      // if both passer and recipient found, break out
      if (passer_idx >= 0 && recipient_idx >= 0) { break; }
    }

    //add entry for this pass in matrix
    matrix[passer_idx][recipient_idx]++;
  }

  console.log(matrix);

  return matrix;
}
