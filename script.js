// Run when key is down
function keyDownCheck(event) {
    if(!deadVar){
        // Up Arrow
        if (event.which == 38) {
            if (moveUpWorkeId == 0 && flyWorkerId != 0) {
                moveUpWorkeId = setInterval(moveUp, 100);
            }

        }
        // Down Arrow
        if (event.which == 40 && flyWorkerId != 0) {
            if (moveDownWorkeId == 0) {
                moveDownWorkeId = setInterval(moveDown, 100);
            }

        }
        // Space bar
        if (event.which == 32) {


        }
    }
}

// help button
function helpButton(){
    document.getElementById("helpPage").style.visibility = 'visible';
}

// help-back button 
function helpBack(){
    document.getElementById("helpPage").style.visibility = 'hidden';
}

// Run when Key is up
function keyUpCheck(event) {
    if(!deadVar){
        // Enter key
        if (event.which == 13) {
            startGame();            
        }
        // Up Arrow
        if (event.which == 38) {
            clearInterval(moveUpWorkeId);
            moveUpWorkeId = 0;

        }
        // Down Arrow
        if (event.which == 40) {
            clearInterval(moveDownWorkeId);
            moveDownWorkeId = 0;

        }
        // Space bar
        if (event.which == 32) {
            if (shootImageWorkerId == 0 && flyWorkerId != 0) {
                clearInterval(flyWorkerId);
                flyWorkerId = 0;
                shootImageWorkerId = setInterval(shoot, 200)
                createBullet();
                shootSound.play();
                setTimeout(function(){
                    shootSound.pause();
                    shootSound.currentTime = 0;
                }, 300);
            }

        }
    }
}

// Play Button
function playButton(){
    startGame();
}


// Start Game
function startGame(){
    if (flyWorkerId == 0) {
        startThemeSound.pause();
        startThemeSound.currentTime = 0;
        document.getElementById('startPage').style.visibility = 'hidden';
        flyWorkerId = setInterval(fly, 100);
        planeflySound.play();
        updateHealthBarWorkerId = setInterval(updateHealthBar,100);
        moveBackgroundWorkerId = setInterval(moveBackground, 100);
        createMissilesWorkerId = setInterval(createMissiles, 1000);
        updateMissilesWorkerId = setInterval(updateMissiles, 100);
        updateBulletWorkerId = setInterval(updateBullets, 100);
        scoreUpdateWokerId = setInterval(scoreUpdate, 500);
        createHealsWorkerId = setInterval(createHeals, 1000);
        updateHealWorkerId = setInterval(updateHeal, 100);
    }
}

var shootImageId = 1;
var shootImageWorkerId = 0;

// Shoot
function shoot() {
    plane.src = "Shoot (" + shootImageId + ").png"
    shootImageId++;
    if (shootImageId == 6) {
        shootImageId = 1;
        clearInterval(shootImageWorkerId);
        shootImageWorkerId = 0;
        flyWorkerId = setInterval(fly, 100);
    }
}

var bulletId = 1;
var bulletMarginLeft = 1000;

// Create bullets
function createBullet() {
    var bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.id = "bullet" + bulletId;
    bulletId++;

    bullet.style.marginLeft = "225px";
    bullet.style.marginTop = (currentMarginTop + 70) + "px";


    background.appendChild(bullet);
}

var updateBulletWorkerId = 0;

// Update bullets
function updateBullets() {
    for (var i = 1; i < bulletId; i++) {
        var currentBullet = document.getElementById("bullet" + i);
        var currentBulletMarginLeft = currentBullet.style.marginLeft;

        var newMarginLeft = parseInt(currentBulletMarginLeft) + 60;
        currentBullet.style.marginLeft = newMarginLeft + "px";

        var currentBulletMarginTop = parseInt(currentBullet.style.marginTop);
        for (var y = 1; y < missileId; y++) {
            var currentMissile = document.getElementById("missile" + y);
            var currentMisssileMarginLeft = currentMissile.style.marginLeft;
            currentMisssileMarginLeftInt = parseInt(currentMisssileMarginLeft);

            var currentMisssileMarginTop = parseInt(currentMissile.style.marginTop);

            if (currentMisssileMarginLeftInt < 1300 && currentMisssileMarginLeftInt > -100) {
                if (newMarginLeft >= currentMisssileMarginLeftInt && newMarginLeft <= currentMisssileMarginLeftInt + 100) {
                    if (currentBulletMarginTop >= currentMisssileMarginTop && currentBulletMarginTop <= currentMisssileMarginTop + 100) {
                        getShot(currentBullet, currentMissile);
                    }
                }
            }
        }

    }
}


// Missile get shot
function getShot(bullet, missile) {
    if (bullet.style.visibility != 'hidden' && missile.className!='missileDistroyed') {
        score = score + 10;
        bullet.style.visibility = 'hidden';
        distroyMissile(missile);       
        
    }
}


// Distroy  missile
function distroyMissile(missile){
    boomSound.play();
    setTimeout(function(){
        boomSound.pause();
        boomSound.currentTime = 0;
    },500);
    missile.className = 'missileDistroyed';
    setTimeout(function(){
        missile.style.visibility = 'hidden';
    }, 1300);
    
}




var plane = document.getElementById("plane");
var planeImageId = 1;
var flyWorkerId = 0;

// plane start to fly
function fly() {
    // check Horizontal status
    if (planeAngle > 0 && moveDownWorkeId == 0 && moveUpWorkeId == 0) {
        planeAngle = planeAngle - 4;
        plane.style.transform = 'rotate(' + planeAngle + 'deg)';
    }
    if (planeAngle < 0 && moveDownWorkeId == 0 && moveUpWorkeId == 0) {
        planeAngle = planeAngle + 4;
        plane.style.transform = 'rotate(' + planeAngle + 'deg)';
    }

    planeImageId++;
    if (planeImageId == 3) {
        planeImageId = 1;
    }
    plane.src = "Fly (" + planeImageId + ").png";
}

var currentMarginTop = 420;
var moveUpWorkeId = 0;

// set UP Down Move speed
var moveSpeed = 20;
var planeAngle = 0;

// Plane move Up
function moveUp() {
    if (currentMarginTop >= 20) {
        currentMarginTop = currentMarginTop - moveSpeed;
        plane.style.marginTop = currentMarginTop + "px";

        // rotate plane
        planeAngle = planeAngle - 2;
        plane.style.transform = 'rotate(' + planeAngle + 'deg)';

    }

}

var moveDownWorkeId = 0;

// Plane move Down
function moveDown() {
    if (currentMarginTop <= 400) {
        currentMarginTop = currentMarginTop + moveSpeed;
        plane.style.marginTop = currentMarginTop + "px";

        // rotate plane
        planeAngle = planeAngle + 2;
        plane.style.transform = 'rotate(' + planeAngle + 'deg)';
    }

}

var background = document.getElementById("background");
var backgroundPositionX = 0;
var moveBackgroundWorkerId = 0

//Speed Controle
var moveBackgroundSpeed = 20;
var moveMissileSpeed = 20;
 
// Move background
function moveBackground() {
    backgroundPositionX = backgroundPositionX - moveBackgroundSpeed;
    background.style.backgroundPositionX = backgroundPositionX + "px";
}

var missileId = 1;
var createMissilesWorkerId = 0;
var missileMarginLeft = 1000;

// Create missiles
function createMissiles() {
    var missile = document.createElement("div");
    missile.className = "missile";
    missile.id = "missile" + missileId;
    missileId++;

    var gap = Math.random() * (350 - 50) + 50;
    missileMarginLeft = missileMarginLeft + gap;
    missile.style.marginLeft = missileMarginLeft + "px";

    var missileMarginTop = Math.random() * (450 - 20) + 20;
    missile.style.marginTop = missileMarginTop + "px";


    background.appendChild(missile);
}

var updateMissilesWorkerId = 0;
var planeGettingHurt = false;

// Update missiles
function updateMissiles() {
    for (var i = 1; i < missileId; i++) {
        var currentMissile = document.getElementById("missile" + i);
        var currentMisssileMarginLeft = currentMissile.style.marginLeft;

        var newMarginLeft = parseInt(currentMisssileMarginLeft) - moveMissileSpeed;
        currentMissile.style.marginLeft = newMarginLeft + "px";

        var currentMisssileMarginTop = parseInt(currentMissile.style.marginTop);

        if (newMarginLeft < -100) {
            currentMissile.style.visibility = "hidden";
        }

        if (currentMarginTop <= currentMisssileMarginTop && currentMisssileMarginTop <= currentMarginTop + 100) {
            if (newMarginLeft + 20 < 270 && newMarginLeft + 20 > -10) {
                getDamage(currentMissile);

            } else {
                if (flyWorkerId == 0 && !planeGettingHurt) {
                    flyWorkerId = setInterval(fly, 100);
                }
            }

        }
        if (currentMarginTop > currentMisssileMarginTop && currentMarginTop < currentMisssileMarginTop + 65) {
            if (newMarginLeft + 20 < 240 && newMarginLeft + 20 > -10) {
                getDamage(currentMissile);

            } else {
                if (flyWorkerId == 0 && !planeGettingHurt) {
                    flyWorkerId = setInterval(fly, 100);
                }
            }
        }

        if(newMarginLeft<0 && currentMissile.className!='missileDistroyed'){
            distroyMissile(currentMissile);
            hearts--;
            damagedlayer.style.visibility = 'visible';
            setTimeout(function(){
                damagedlayer.style.visibility = 'hidden';
            }, 300);
            if(hearts==0){
                dead();
            }
        }
    }
}
var planeflySound = new Audio("plane sound.mp3");
planeflySound.loop = true;

var shootSound = new Audio("shoot.mp3");

var boomSound = new Audio("boom.mp3");

var startThemeSound = new Audio("start theme.mp3");
startThemeSound.volume = 0.5;
startThemeSound.loop = true;
startThemeSound.play();

var hearts = 5;
var lastDamagedMissileId = 0;
var blinkWorkerId = 0;

// Get Damage
function getDamage(missile) {
    if(missile.className!='missileDistroyed'){
        planeGettingHurt = true;
        setTimeout(function(){
            planeGettingHurt = false;
        }, 200);
        clearInterval(flyWorkerId);
        flyWorkerId = 0;
        plane.src = "Dead (1).png";
        if (blinkWorkerId == 0) {
            blinkWorkerId = setInterval(blink, 100);
            setTimeout(function(){
                clearInterval(blinkWorkerId);
                blinkWorkerId = 0;
                plane.style.visibility = 'visible';
                damagedlayer.style.visibility = 'hidden';
            }, 1500)
        }
        if (lastDamagedMissileId != missile.id) {
            hearts--;
            distroyMissile(missile);
            if (hearts == 0) {
                dead();
            }

            lastDamagedMissileId = missile.id;
        }

    }
}

var damagedlayer = document.getElementById("damaged");

// blink plane
function blink() {
    if (plane.style.visibility == 'hidden') {
        plane.style.visibility = 'visible';
        damagedlayer.style.visibility = 'visible';

    } else {
        plane.style.visibility = 'hidden';
        damagedlayer.style.visibility = 'hidden';
    }
}
var deadVar = false;

// DEAD
function dead(){
    deadSound.play();
    deadVar = true;
    clearInterval(flyWorkerId);
    clearInterval(moveBackgroundWorkerId);
    clearInterval(updateBulletWorkerId);
    clearInterval(updateMissilesWorkerId);
    clearInterval(createMissilesWorkerId);
    clearInterval(moveDownWorkeId);
    clearInterval(moveUpWorkeId);
    planeflySound.pause();
    plane.src = "boom.gif";
    setTimeout(function(){
        plane.style.visibility = 'hidden'
    }, 1000)
    defeatMusic.play(); 
    document.getElementById("gameOver").style.visibility = 'visible';
    document.getElementById("gameOverscore").innerHTML = score;
}

var healthBar = document.getElementById("healthBar");
var updateHealthBarWorkerId = 0;

// Update Health Bar
function updateHealthBar(){
    healthBar.replaceChildren();
    for(var i=1; i<=hearts;i++){
        var heart = document.createElement("div");
        heart.className = "heart";
        healthBar.appendChild(heart);
    }

}

var score = 0;
var scoreUpdateWokerId = 0;

var level = 100;

// Score Update
function scoreUpdate(){
    document.getElementById("score").innerHTML = score;
    if(score>=level){
        moveBackgroundSpeed = moveBackgroundSpeed +2 ;
        moveMissileSpeed = moveMissileSpeed + 2;
        level=level+100;
    }

}

// Try Again
function tryAgain(){
    location.reload();
}


var healId = 1;
var createHealsWorkerId = 0;
var healMarginLeft = 3000;

// Heal Sound
var healSound = new Audio("healUp.mp3");


// Create Heats
function createHeals() {
    var heal = document.createElement("div");
    heal.className = "heal";
    heal.id = "heal" + healId;
    healId++;

    var gap = Math.random() * (4500 - 2500) + 2500;
    healMarginLeft = healMarginLeft + gap;
    heal.style.marginLeft = healMarginLeft + "px";

    var healMarginTop = Math.random() * (450 - 20) + 20;
    heal.style.marginTop = healMarginTop + "px";


    background.appendChild(heal);
}

var updateHealWorkerId = 0;
var laslHealId = 0;

function updateHeal() {
    for (var i = 1; i < healId; i++) {
        var currentHeal = document.getElementById("heal" + i);
        var currentHealLeft = currentHeal.style.marginLeft;

        var newMarginLeft = parseInt(currentHealLeft) - moveMissileSpeed;
        currentHeal.style.marginLeft = newMarginLeft + "px";

        var currentHealMarginTop = parseInt(currentHeal.style.marginTop);

        if (newMarginLeft < -100) {
            currentHeal.style.visibility = "hidden";
        }

        if (currentMarginTop <= currentHealMarginTop && currentHealMarginTop <= currentMarginTop + 100) {
            if (newMarginLeft + 20 < 270 && newMarginLeft + 20 > -10) {
                if(hearts<5 && laslHealId != currentHeal.id){
                    healSound.play();
                    hearts++;
                    currentHeal.className = "healed";
                    laslHealId = currentHeal.id;
                }

            } else {
                if (flyWorkerId == 0 && !planeGettingHurt) {
                    flyWorkerId = setInterval(fly, 100);
                }
            }

        }
        if (currentMarginTop > currentHealMarginTop && currentMarginTop < currentHealMarginTop + 65) {
            if (newMarginLeft + 20 < 240 && newMarginLeft + 20 > -10) {
                if(hearts<5 && laslHealId != currentHeal.id){
                    healSound.play();
                    hearts++;
                    currentHeal.className = "healed";
                    laslHealId = currentHeal.id;
                }

            } else {
                if (flyWorkerId == 0 && !planeGettingHurt) {
                    flyWorkerId = setInterval(fly, 100);
                }
            }
        }
    }
}


var deadSound = new Audio("dead.mp3");
var defeatMusic = new Audio("defeatBackground.mp3");
defeatMusic.loop =true;

var pauseVar = false;
