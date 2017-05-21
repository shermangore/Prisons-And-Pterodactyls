// Create character object
//  - Properties
//  - Functions
// Create attack function
// Create startGame function
// Create resetGame function
let gameStarted = false;
let villain, hero;
let heroHasLife = true;
let villainHasLife = true;
let numberOfRounds = 0;
let numberOfAttacks = 0;
let wins = 0;
let losses = 0;
let fanfare = new Audio("assets/sounds/fanfare3.wav");

// Generic Character Object
function Character (name, breed, healthPoints, attackPower, counterAttackPower, isGood, picture, weapons) {
	this.name = name;
	this.breed = breed;
	this.healthPoints = healthPoints;
	this.attackPower = attackPower;
	this.counterAttackPower = counterAttackPower;
	this.isGood = isGood;
	this.picture = picture;
	this.weapons = [];
    this.weapons.push(weapons);
}

function attack(player1, player2, attacker) {
    gameStarted = true;
    numberOfAttacks++;

    $(".img-thumbnail").attr("disabled", "disabled");
    $("#btnNewGame").attr("disabled", "disabled");
    $("#btnReset").attr("disabled", "disabled");

    player2.healthPoints -= player1.attackPower * numberOfAttacks;
    player1.healthPoints -= player2.counterAttackPower;

    if (attacker === "h") {
        if (player1.healthPoints <= 0) {
            heroHasLife = false;
            
            $("#goodHealth").text(0);
            $("#evilHealth").text(player2.healthPoints);

            partyOn("villain");
        } else if (player2.healthPoints <= 0) {
            villainHasLife = false;

            $("#goodHealth").text(player1.healthPoints);
            $("#evilHealth").text(0);

            partyOn("hero");
        } else {
            $("#goodHealth").text(player1.healthPoints);
            $("#evilHealth").text(player2.healthPoints);
        }
    } else {
        if (player1.healthPoints <= 0) {
            villainHasLife = false;
            
            $("#evilHealth").text(0);
            $("#goodHealth").text(player2.healthPoints);

            partyOn("hero");
        } else if (player2.healthPoints <= 0) {
            heroHasLife = false;

            $("#evilHealth").text(player1.healthPoints);
            $("#goodHealth").text(0);

            partyOn("villain");
        } else {
            $("#evilHealth").text(player1.healthPoints);
            $("#goodHealth").text(player2.healthPoints);
        }
    }
}

// PartyOn essentially handles all of the functionality for letting the user know which side won
function partyOn(winner) {
    fanfare.play(); // Play a sound clip

    numberOfRounds++; // Increase the round count

    // Variables for winning images/overlays
    let winImage;
    let winOverlay;

    // Set different info depending on whether the winner was a hero or a villain (kept spelling it villian :facepalm:)
    if (winner === "hero") {
        wins++; // Increase the number of wins if the hero won

        winImage = $(".img-box-good");
        winOverlay = $(".good-winner");
    } else {
        losses++; // Increase the number of losses if the villain wins

        winImage = $(".img-box-evil");
        winOverlay = $(".evil-winner");
    }

    // Animate!!!
    for (let i = 0; i < 10; i++) {
        winImage.animate({
            borderColor: "red",
            opacity: 0.01,
            borderWidth: "10px"
        }, 250 )
        .animate({
            borderColor: "blue",
            opacity: 1,
            borderWidth: "1px"
        }, 250);

        if ((i + 1) % 2 !== 0) {
            winOverlay.hide();
        } else {
            winOverlay.show();
        }
    }   

    // Set leaderboard info
    $("#numRounds").text(numberOfRounds);
    $("#numWins").text(wins);
    $("#numLosses").text(losses);
    $("#btnAttack").attr("disabled", "disabled");

    // Re-enable NewGame and Reset buttons
    setTimeout(function() {
        $("#btnNewGame").removeAttr("disabled");
        $("#btnReset").removeAttr("disabled");
    }, 5000);
}

// Create a bunch of new character objects
// I created nine because that's how many images I found initially
let wolfGirl =     new Character("Jennix",   "Necromancer", 210, 15, 10, true,  "assets/images/WolfGirl.png",     {"weaponName": "Bow", "damage": 20});
let magicianGirl = new Character("Zimara",   "Magician",    180, 15, 10, true,  "assets/images/MagicianGirl.png", {"weaponName": "Fireball", "damage": 25});
let magicianDude = new Character("Coelthen", "Magician",    195, 10, 8,  true,  "assets/images/MagicianDude.png", {"weaponName": "Skullstaff", "damage": 50});
let knightDude2 =  new Character("Roendal",  "Knight",      205, 15, 10, true,  "assets/images/KnightDude2.png",  {"weaponName": "Longsword", "damage": 30});
let thiefDude =    new Character("Arsenor",  "Thief",       225, 10, 8,  false, "assets/images/ThiefDude.png",    {"weaponName": "Dagger", "damage": 10});
let hornMageDude = new Character("Rhilo",    "Mage",        250, 15, 10, false, "assets/images/HornMageDude.png", {"weaponName": "Staff", "damage": 40});
let thiefGirl =    new Character("Wendalia", "Thief",       300, 15, 10, false, "assets/images/ThiefGirl.png",    {"weaponName": "Crossbow", "damage": 30});
let knightDude =   new Character("Elvalix",  "Knight",      305, 10, 8,  false, "assets/images/KnightDude.png",   {"weaponName": "Broadsword", "damage": 45});
let elfDude =      new Character("Mvrecic",  "Elf",         315, 10, 8,  false, "assets/images/ElfDude.png",      {"weaponName": "Longsword", "damage": 25});

wolfGirl.weapons.push({"weaponName": "dagger", "damage": 10});

// Create an array of available characters.  Limited it to four each because I like the balance
let arrCharacters = [wolfGirl, magicianGirl, magicianDude, knightDude2, thiefDude, hornMageDude, knightDude, elfDude];

$(document).ready(function() {
    $("#btnAttack").on("click", function() {
        // If both warriors have life left, continue fighting
        if (heroHasLife && villainHasLife) {
            // Hero attacks villain
            attack(hero, villain, "h");
        }

        if (heroHasLife && villainHasLife) {
            // Villain attacks hero
            attack(villain, hero, "v");
        }
    });

     $("#btnNewGame").on("click", function() {
        // Clear all of the variables, images, and stats
        hero = null;
        villain = null;
        gameStarted = false;
        heroHasLife = true;
        villainHasLife = true;

        $("#evil-image").attr("src", "assets/images/empty-villain-3.png");
        $("#evilName").html("");
        $("#evilBreed").html("");
        $("#evilWeapon").html("");
        $("#evilStartHealth").html("");
        $("#evilHealth").html("0");

        $("#good-image").attr("src", "assets/images/empty-hero.png");
        $("#goodName").html("");
        $("#goodBreed").html("");
        $("#goodWeapon").html("");
        $("#goodStartHealth").html("");
        $("#goodHealth").html("0");

        $(".img-thumbnail").removeAttr("disabled");
        $("#btnAttack").removeAttr("disabled");
        $(".evil-winner").hide();
        $(".good-winner").hide();
     });

     $("#btnReset").on("click", function() {
        // Clear all of the variables, images, and stats
        hero = null;
        villain = null;
        gameStarted = false;
        heroHasLife = true;
        villainHasLife = true;
        numberOfRounds = 0;
        wins = 0;
        losses = 0;

        $("#evil-image").attr("src", "assets/images/empty-villain-3.png");
        $("#evilName").html("");
        $("#evilBreed").html("");
        $("#evilWeapon").html("");
        $("#evilStartHealth").html("");
        $("#evilHealth").html("0");

        $("#good-image").attr("src", "assets/images/empty-hero.png");
        $("#goodName").html("");
        $("#goodBreed").html("");
        $("#goodWeapon").html("");
        $("#goodStartHealth").html("");
        $("#goodHealth").html("0");

        $(".img-thumbnail").removeAttr("disabled");
        $("#btnAttack").removeAttr("disabled");
        $(".evil-winner").hide();
        $(".good-winner").hide();

        $("#numRounds").text(numberOfRounds);
        $("#numWins").text(wins);
        $("#numLosses").text(losses);
     });

    // Just a couple of variables to store the image index 
    let idxV = 0;
    let idxH = 0;
    
    // Add characters to sidebars
    for (let i = 0; i < arrCharacters.length; i++) {
        if (arrCharacters[i].isGood !== true) {
            let divName = "#villain_" + idxV;

            $(divName).append("<img src='" + arrCharacters[i].picture + "' alt='" + arrCharacters[i].name + "' class='img-thumbnail' />");

            idxV++;
        } else if (arrCharacters[i].isGood === true) {
            let divName = "#hero_" + idxH;

            $(divName).append("<img src='" + arrCharacters[i].picture + "' alt='" + arrCharacters[i].name + "' class='img-thumbnail' />");

            idxH++;
        }
    }

    // Set the stats, the battle images, and the healthpoints for each opponent
    // This is a long way of doing it, but it works
    $(".img-thumbnail").on("click", function(evt) {
        switch (this.alt) {
            case "Arsenor":
                thiefDude.healthPoints = 225;

                $("#evil-image").attr("src", thiefDude.picture);
                $("#evil-image").attr("alt", thiefDude.name);
                $("#evilName").html(thiefDude.name);
                $("#evilBreed").html(thiefDude.breed);
                $("#evilWeapon").html(thiefDude.weapons[0].weaponName);
                $("#evilStartHealth").html(thiefDude.healthPoints);
                $("#evilHealth").html(thiefDude.healthPoints);
                
                villain = thiefDude;

                break;
            case "Rhilo":
                hornMageDude.healthPoints = 250;

                $("#evil-image").attr("src", hornMageDude.picture);
                $("#evil-image").attr("alt", hornMageDude.name);
                $("#evilName").html(hornMageDude.name);
                $("#evilBreed").html(hornMageDude.breed);
                $("#evilWeapon").html(hornMageDude.weapons[0].weaponName);
                $("#evilStartHealth").html(hornMageDude.healthPoints);
                $("#evilHealth").html(hornMageDude.healthPoints);

                villain = hornMageDude;

                break;
            case "Elvalix":
                knightDude.healthPoints = 305;

                $("#evil-image").attr("src", knightDude.picture);
                $("#evil-image").attr("alt", knightDude.name);
                $("#evilName").html(knightDude.name);
                $("#evilBreed").html(knightDude.breed);
                $("#evilWeapon").html(knightDude.weapons[0].weaponName);
                $("#evilStartHealth").html(knightDude.healthPoints);
                $("#evilHealth").html(knightDude.healthPoints);

                villain = knightDude;

                break;
            case "Mvrecic":
                elfDude.healthPoints = 315;

                $("#evil-image").attr("src", elfDude.picture);
                $("#evil-image").attr("alt", elfDude.name);
                $("#evilName").html(elfDude.name);
                $("#evilBreed").html(elfDude.breed);
                $("#evilWeapon").html(elfDude.weapons[0].weaponName);
                $("#evilStartHealth").html(elfDude.healthPoints);
                $("#evilHealth").html(elfDude.healthPoints);

                villain = elfDude;

                break;
            case "Jennix":
                wolfGirl.healthPoints = 210;

                $("#good-image").attr("src", wolfGirl.picture);
                $("#good-image").attr("alt", thiefDude.name);
                $("#goodName").html(wolfGirl.name);
                $("#goodBreed").html(wolfGirl.breed);
                $("#goodWeapon").html(wolfGirl.weapons[0].weaponName);
                $("#goodStartHealth").html(wolfGirl.healthPoints);
                $("#goodHealth").html(wolfGirl.healthPoints);
                
                hero = wolfGirl;

                break;
            case "Zimara":
                magicianGirl.healthPoints = 180;
                
                $("#good-image").attr("src", magicianGirl.picture);
                $("#good-image").attr("alt", magicianGirl.name);
                $("#goodName").html(magicianGirl.name);
                $("#goodBreed").html(magicianGirl.breed);
                $("#goodWeapon").html(magicianGirl.weapons[0].weaponName);
                $("#goodStartHealth").html(magicianGirl.healthPoints);
                $("#goodHealth").html(magicianGirl.healthPoints);

                hero = magicianGirl;

                break;
            case "Coelthen":
                magicianDude.healthPoints = 195;

                $("#good-image").attr("src", magicianDude.picture);
                $("#good-image").attr("alt", magicianDude.name);
                $("#goodName").html(magicianDude.name);
                $("#goodBreed").html(magicianDude.breed);
                $("#goodWeapon").html(magicianDude.weapons[0].weaponName);
                $("#goodStartHealth").html(magicianDude.healthPoints);
                $("#goodHealth").html(magicianDude.healthPoints);

                hero = magicianDude;

                break;
            case "Roendal":
                knightDude2.healthPoints = 205;

                $("#good-image").attr("src", knightDude2.picture);
                $("#good-image").attr("alt", knightDude2.name);
                $("#goodName").html(knightDude2.name);
                $("#goodBreed").html(knightDude2.breed);
                $("#goodWeapon").html(knightDude2.weapons[0].weaponName);
                $("#goodStartHealth").html(knightDude2.healthPoints);
                $("#goodHealth").html(knightDude2.healthPoints);

                hero = knightDude2;

                break;
        }
    });
});