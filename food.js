class Food{
    constructor(foodStock,lastFed){
        this.foodStock:foodStock,
        this.lastFed:lastFed
    }
    milk = loadImage("images/Milk.png");
}

display(){
    var x=80, y=100;

    imageMode(CENTER);
    image(this.image,720,220,70,70);

    if(this.foodstck!=0){
        for(var i=0; i<this.foodStock; i++){
            if(i%10===0){
                x+80;
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
}

function getFoodStock()

function updateFoodStock()

function deductFood()

function bedroom(){
    background(bedroomImg,550,500);
}

function garden(){
    background(gardenImg,550,500);
}

function washroom(){
    background(washroomImg,550,500);
}