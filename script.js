const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const vragAva=new Image()
vragAva.src='i.webp'

const playerAva=new Image()
playerAva.src='cola.png'
playerAva.width=50
playerAva.height=50
let player = { x: 50, y: 50, width: 50, height: 50, speed: 7, img:playerAva};
let vrag = { x: 650, y: 50, width: 80, height: 80, speed: 15, img:vragAva};
let vragys = 0
let vragxs = 0
function update() {
    if (keys['KeyW']) player.y -= player.speed;
    if (keys['KeyS']) player.y += player.speed;
    if (keys['KeyA']) player.x -= player.speed;
    if (keys['KeyD']) player.x += player.speed;
    // if (keys['KeyI']) vrag.y -= vrag.speed;
    // if (keys['KeyK']) vrag.y += vrag.speed;
    // if (keys['KeyJ']) vrag.x -= vrag.speed;
    // if (keys['KeyL']) vrag.x += vrag.speed;

    // Границы поля
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
    if (vrag.x < 0) vrag.x = 0;
    if (vrag.x + vrag.width > canvas.width) vrag.x = canvas.width - vrag.width;
    if (vrag.y < 0) vrag.y = 0;
    if (vrag.y + vrag.height > canvas.height) vrag.y = canvas.height - vrag.height;
    checkPosition(player.x,player.y,vrag.x,vrag.y)
    vrag.y+=vragys
    vrag.x+=vragxs
}
// Рисование игрока 
function draw() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.drawImage(player.img, player.x, player.y, player.width, player.height)
    ctx.drawImage(vrag.img,  vrag.x, vrag.y, vrag.width, vrag.height)
    if(isCollision(player,vrag)){
        player.x=50
        player.y=50
        vrag.x=650
        vrag.y=50
        ctx.fillText('УДАР!',50,50)
    }
}
// Основной игровой цикл 
function gameLoop() { 
    update(); draw(); requestAnimationFrame(gameLoop); 
}
// Управление клавишами 
let keys = {}; 
window.addEventListener('keydown', function (e) { keys[e.code] = true; });
window.addEventListener('keyup', function (e) { keys[e.code] = false; });
// Запуск игры 
playerAva.onload=function(){
    player.width=playerAva.width
    player.height=playerAva.height
    gameLoop();
}
function isCollision(player,vrag){
    return (
        player.x<vrag.x+vrag.width&&
        player.x+player.width>vrag.x&&
        player.y<vrag.y+vrag.height&&
        player.y+player.height>vrag.y
    )
}
function checkPosition(playerx,playery,vragx,vragy){
    if(player.y<vrag.y){
        vragys=-3.5
    }else if(player.y>vrag.y){
        vragys=3.5
    }else{
        vragys=0
    }
    if(player.x<vrag.x){
        vragxs=-3.5
    }else if(player.x>vrag.x){
        vragxs=3.5
    }else{
        vragxs=0
    }

}