//Create variables here
var gameState = "";
var dog, happyDog, database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var sadDog;
var changeState, readState;
var bedroomImg, gardenImg, washroomImg;

function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
  sadDog = loadImage("images/deadDog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database;

  readState = database.ref("gameState");
  readState.on("value", function(data){
    gameState = data.val;
  })



  var dogs = createSprite(200, 200, 20, 20);
  dogs.addImage(dog);

  foodObj = new Food(foodStock, lastfed);

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock = database.ref("Food");
  foodStock.on("value, readstock");
}


function draw() {  

  background(46, 139, 87);

  fedTime = database.ref("Feed Time");
  fedTime.on("value", function(data){
    lastFed = data.val;
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: " +lastfed%12+"PM", 350,30);
  }
  else if(lastFed===0){
    text("Last Feed: 12 AM",350,30);
  }
  else{
    text("Last Feed: "+lastFed+"AM",350,30);
  }

  if(gameStata!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  currentTime = hour();
  if(currentTime === (lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  elseif(currentTime === (lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  elseif(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }

  foodObj.display();

  drawSprites();

  //add styles here
  textSize(25);
  fill("red");
  text(foodStock, 180, 70)
  stroke();
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock,
    FeedTime:hour()
  })
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function update(state){
  database.ref('/').update({
      gameState:state
  })
}