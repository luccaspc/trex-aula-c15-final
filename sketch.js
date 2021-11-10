//cria as variaveis
var t_rex,t_rexRunning,t_rexDead
var canvas;
var ground, ground_img, invisibleGround;
var cloud, cloud_img,cloud_gp;
var cacto, cacto_img01,cacto_img02,cacto_img03,cacto_img04,cacto_img05,cacto_img06,cacto_gp;
var score = 5;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var record = 1500
//carrega toda as midias
function preload(){
   t_rexRunning = loadAnimation("trex3.png","trex4.png");
   ground_img = loadImage("ground2.png");

   cloud_img = loadImage("cloud.png");
   t_rexDead = loadAnimation ("trex_collided.png");
   cacto_img01 = loadImage("obstacle1.png");
   cacto_img02 = loadImage("obstacle2.png");
   cacto_img03 = loadImage("obstacle3.png");
   cacto_img04 = loadImage("obstacle4.png");
   cacto_img05 = loadImage("obstacle5.png");
   cacto_img06 = loadImage("obstacle6.png");


}

//configuração do jogo
function setup(){
    canvas = createCanvas(600,200);

    t_rex = createSprite(50,150,20,30);
    t_rex.addAnimation("run",t_rexRunning);
    t_rex.scale = 0.5;
    t_rex.addAnimation("dead",t_rexDead);
    ground = createSprite(300,180,600,20);
    ground.addImage("solo", ground_img);
    

    invisibleGround = createSprite(300,190,600,10);
    invisibleGround.visible = false;

    cloud_gp = new Group();
    cacto_gp = new Group();

}


function draw(){
    background("white");
     
    if (t_rex.isTouching(cacto_gp)) {
        gameState = END;
    }

    //pontuação
    text("Score: "+score,500,20);
    //record
    text ("melhor: "+record,100,20);

    if (gameState === PLAY) {
        //pulo do trex
        if (keyDown("space") && t_rex.y >=150) {
            t_rex.velocityY = -10;
        }
        score =+ 5;
        //reiniciando o solo
        if(ground.x < 0){
            ground.x = ground.width/2;
        }

        ground.velocityX = -2;

        spawnClouds();
        spawnObs();

        
    }

    if (gameState === END) {
     text ("perdeu...",280,100)  
     cacto_gp.setVelocityXEach(0);
     ground.velocityX = 0;
     cloud_gp.setVelocityXEach(0);
     t_rex.changeAnimation("dead",t_rexDead);
    }
    gravity();
    console.log(gameState);
    
    //colisão do trex com o solo
    t_rex.collide(invisibleGround);
    

    drawSprites();
}

//funções

function gravity() {
    t_rex.velocityY = t_rex.velocityY+0.5;
}

function spawnClouds(){
    if(frameCount%90 === 0){
        cloud = createSprite(600,100,20,10);
        cloud.addImage(cloud_img);
        cloud.velocityX = -2;
        cloud.y = random(20,100);
        cloud.scale = random(0.2,1)
        cloud.lifetime = 300;
        cloud.depth = t_rex.depth -1;
        cloud_gp.add(cloud);
    }
}
function spawnObs(){
    if(frameCount%120 === 0){
        cacto = createSprite(600,170,10,30);

        var sorteio = Math.round(random(1,6));
        switch (sorteio) {
            case 1: cacto.addImage(cacto_img01);
                break;
            case 2: cacto.addImage(cacto_img02);
                break;
            case 3: cacto.addImage(cacto_img03);
                break;
            case 4: cacto.addImage(cacto_img04);
                break;
            case 5: cacto.addImage(cacto_img05);
                break;
            case 6: cacto.addImage(cacto_img06);
                break;
        }



        cacto.velocityX = -2;
        //cloud.y = random(20,100);
        cacto.scale = 0.3;
        cacto.lifetime = 300;
        cacto.depth = t_rex.depth -1;
        cacto_gp.add(cacto);
    }

}
































































































































































































































































