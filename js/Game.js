class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
      player.getCount();
      }
      form = new Form();
      form.display();
    }
  }

  play() {
    form.hide();
    text("Game Starts", 120, 100);
    Player.getPlayerInfo();
    if(allPlayers != undefined) {
      var position = 140;
      for(var i in allPlayers){
        if(i === "player" + player.index){
          stroke("red");
        }
        else{
          stroke("black");
        }
        position += 5;
        text(allPlayers[i].name + "  " + allPlayers[i].distance, 120, 140);
      }
    }
    if (keyIsDown(UP_ARROW) && player.Index != null){
      player.distance += 5;
      player.update();
    }
  }
}
