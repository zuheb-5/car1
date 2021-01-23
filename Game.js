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
      var playRef = await database.ref("playerCount")
      var onces = playRef.once("value")
      if (onces.exists()) {
      playerCount = onces.val();
      player.getCount();
      }
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide()
    textSize(30)
    text("START RACE",120,100);
    Player.getPlayerInfo()

    if(allPlayers !==undefined){
     var displayPosition = 130

     for(var plr in allPlayers){
       if(plr === "player" + player.index){
       fill("red");
       }
       else{
       fill("blue")
       }
     }
     displayPosition += 20
     textSize(15)
     text(allPlayers[plr].name + ":"+allPlayers[plr].distance)
    }
  
    if (keyIsDown(UP_ARROW) && player.index !== null) {
    player.distance += 50
    player.update()
    }
}
}