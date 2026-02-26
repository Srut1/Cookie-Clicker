window.addEventListener('load', function () {

    // --- 1. THE MODEL (State Variables) ---
    let count = 0;
    let clickVal = 1;
    let autoStrength = 0;
    let upgradePrice = 10;
    let upgradePrice2 = 10;
    let upgradePrice3 = 10;
    let upgradePrice4 = 10;
    let upgradePrice5 = 10;
    let upgradePrice6 = 10;
    let autoPrice = 50;
    let sfxEnabled = true;

    // --- 2. THE VIEW (DOM Elements) ---
    const scoreDisplay = document.getElementById("score1");
    const upgradeBtn = document.getElementById("shop1");
    const upgradeBtn2 = document.getElementById("shop3");
    const upgradeBtn3 = document.getElementById("shop4");
    const upgradeBtn4 = document.getElementById("shop5");
    const upgradeBtn5 = document.getElementById("shop6");
    const upgradeBtn6 = document.getElementById("shop7");
    const autoBtn = document.getElementById("shop2");
    const rewardArea = document.getElementById("reward-list");
    const messageBar = document.getElementById("message-bar");
    const counter = document.getElementById("count");
    const clickDisplay = document.getElementById("click-display");

    // --- 3. HELPER FUNCTIONS ---

    function updateUI() {
        scoreDisplay.textContent = Math.floor(count);
        upgradeBtn.innerHTML = `Upgrade Sword (+1) <br> Cost: ${upgradePrice}`;
        upgradeBtn.disabled = (count < upgradePrice);

        autoBtn.innerHTML = `Hire Mercenary (+1/s) <cite: 8> <br> Cost: ${autoPrice}`;
        autoBtn.disabled = (count < autoPrice);

        upgradeBtn2.innerHTML = `Upgrade Staff (+1) <br> Cost: ${upgradePrice2}`;
        upgradeBtn2.disabled = (autoStrength < 1) || (count < upgradePrice2);

        upgradeBtn3.innerHTML = `Upgrade Dagger (+1) <br> Cost: ${upgradePrice3}`;
        upgradeBtn3.disabled = (autoStrength < 2) || (count < upgradePrice3);

        upgradeBtn4.innerHTML = `Upgrade Potions (+1) <br> Cost: ${upgradePrice4}`;
        upgradeBtn4.disabled = (autoStrength < 3) || (count < upgradePrice4);

        upgradeBtn5.innerHTML = `Upgrade Bow (+1) <br> Cost: ${upgradePrice5}`;
        upgradeBtn5.disabled = (autoStrength < 4) || (count < upgradePrice5);

        upgradeBtn6.innerHTML = `Upgrade Lyre (+1) <br> Cost: ${upgradePrice6}`;
        upgradeBtn6.disabled = (autoStrength < 5) || (count < upgradePrice6);

        counter.innerHTML = `Gold earned per second: ${autoStrength}`;
        clickDisplay.innerHTML = `Gold earned per click: ${clickVal}`;
    }
    function saveGame() {
        const gameState = {
            count: count,
            clickVal: clickVal,
            autoStrength: autoStrength,
            upgradePrice: upgradePrice,
            upgradePrice2: upgradePrice2,
            upgradePrice3: upgradePrice3,
            upgradePrice4: upgradePrice4,
            upgradePrice5: upgradePrice5,
            upgradePrice6: upgradePrice6,
            autoPrice: autoPrice
        };
        localStorage.setItem("questClickerSave", JSON.stringify(gameState));
    }

    function loadGame() {
        const savedData = localStorage.getItem("questClickerSave");
        if (savedData) {
            const gameState = JSON.parse(savedData);
            
            count = gameState.count || 0;
            clickVal = gameState.clickVal || 1;
            autoStrength = gameState.autoStrength || 0;
            upgradePrice = gameState.upgradePrice || 10;
            upgradePrice2 = gameState.upgradePrice2 || 10;
            upgradePrice3 = gameState.upgradePrice3 || 10;
            upgradePrice4 = gameState.upgradePrice4 || 10;
            upgradePrice5 = gameState.upgradePrice5 || 10;
            upgradePrice6 = gameState.upgradePrice6 || 10;
            autoPrice = gameState.autoPrice || 50;

            // Unlock hero images based on loaded autoStrength
            const allies = document.querySelectorAll("#heroes img");
            allies.forEach((img, index) => {
                if (index <= autoStrength) img.hidden = false;
            });

            updateUI();
        }
    }


    function showAchievement(text) {
        messageBar.textContent = text;
        messageBar.style.display = "block";
        setTimeout(() => { messageBar.style.display = "none"; }, 3000);
    }

    function checkMilestones() {
        // Milestone 1: 100 Gold
        if (count >= 100 && !document.getElementById('reward-100')) {
            addReward("🏆 100 Gold!", "reward-100");
            showAchievement("Congrats! You hit 100 gold!");
        }
        // Milestone 2: 500 Gold
        if (count >= 500 && !document.getElementById('reward-500')) {
            addReward("🌟 500 Gold!", "reward-500");
            showAchievement("Incredible! 500 reached!");
        }
        // Milestone 3: 3 Allies
        if (autoStrength >= 3 && !document.getElementById('reward-4')) {
            addReward("🤝 Small Party", "reward-4");
            showAchievement("The Power of Friendship!");
        }
        // Milestone 4: 9 Allies
        if (autoStrength >= 12 && !document.getElementById('reward-11')) {
            addReward("⚔️ Full Party", "reward-11");
            showAchievement("The squad is complete!");
        }
        // Milestone 5: Weapon Power (Added for Rubric)
        if (clickVal >= 5 && !document.getElementById('reward-weapon')) {
            addReward("🔥 Master Smith", "reward-weapon");
            showAchievement("Your sword is legendary!");
        }
    }

    function addReward(text, id) {
        const badge = document.createElement("p");
        badge.id = id;
        badge.className = "badge";
        badge.textContent = text;
        rewardArea.appendChild(badge);
    }

    // --- 4. EVENT LISTENERS ---

    document.getElementById("countbutton").addEventListener("click", function () {
        count += clickVal;
        checkMilestones();
        updateUI();
    }); // the gold count

    autoBtn.addEventListener("click", function () {
        if (count >= autoPrice) {
            count -= autoPrice;
            autoStrength += 1;
            autoPrice = Math.round(autoPrice * 1.4);

            // Unlocks hero images from the Gallery
            const allies = document.querySelectorAll("#heroes img");
            if (allies[autoStrength]) {
                allies[autoStrength].hidden = false;
            }
            updateUI();
        }
    });

    upgradeBtn.addEventListener("click", function () {
        if (count >= upgradePrice) {
            count -= upgradePrice;
            clickVal += 1;
            upgradePrice = Math.round(upgradePrice * 1.8);
            updateUI();
        }
    });

    upgradeBtn2.addEventListener("click", function () {
        if (count >= upgradePrice2) {
            count -= upgradePrice2;
            clickVal += 1;
            upgradePrice2 = Math.round(upgradePrice2 * 1.8);
            updateUI();
        }
    });

    upgradeBtn2.addEventListener("mouseover", function () {
        if (autoStrength < 1) {
            upgradeBtn2.innerHTML = "Only avaliable after hiring the wizard";
        }
    });
    upgradeBtn2.addEventListener("mouseout", function () {
        if (autoStrength < 1) {
            upgradeBtn2.innerHTML = "Upgrade Staff (+1) <br> Cost: " + upgradePrice2;
        }
    });

    upgradeBtn3.addEventListener("click", function () {
        if (count >= upgradePrice3) {
            count -= upgradePrice3;
            clickVal += 1;
            upgradePrice3 = Math.round(upgradePrice3 * 1.8);
            updateUI();
        }
    });

    upgradeBtn3.addEventListener("mouseover", function () {
        if (autoStrength < 2) {
            upgradeBtn3.innerHTML = "Only avaliable after hiring the rouge";
        }
    });
    upgradeBtn3.addEventListener("mouseout", function () {
        if (autoStrength < 2) {
            upgradeBtn3.innerHTML = "Upgrade Dagger (+1) <br> Cost: " + upgradePrice3;
        }
    });


    upgradeBtn4.addEventListener("click", function () {
        if (count >= upgradePrice4) {
            count -= upgradePrice4;
            clickVal += 1;
            upgradePrice4 = Math.round(upgradePrice4 * 1.8);
            updateUI();
        }
    });

    upgradeBtn4.addEventListener("mouseover", function () {
        if (autoStrength < 3) {
            upgradeBtn4.innerHTML = "Only avaliable after hiring the alchemist";
        }
    });
    upgradeBtn4.addEventListener("mouseout", function () {
        if (autoStrength < 3) {
            upgradeBtn4.innerHTML = "Upgrade Potion (+1) <br> Cost: " + upgradePrice4;
        }
    });


    upgradeBtn5.addEventListener("click", function () {
        if (count >= upgradePrice5) {
            count -= upgradePrice5;
            clickVal += 1;
            upgradePrice5 = Math.round(upgradePrice5 * 1.8);
            updateUI();
        }
    });

    upgradeBtn5.addEventListener("mouseover", function () {
        if (autoStrength < 4) {
            upgradeBtn5.innerHTML = "Only avaliable after hiring the archer";
        }
    });
    upgradeBtn5.addEventListener("mouseout", function () {
        if (autoStrength < 4) {
            upgradeBtn5.innerHTML = "Upgrade bow (+1) <br> Cost: " + upgradePrice5;
        }
    });

    upgradeBtn6.addEventListener("click", function () {
        if (count >= upgradePrice6) {
            count -= upgradePrice6;
            clickVal += 1;
            upgradePrice6 = Math.round(upgradePrice6 * 1.8);
            updateUI();
        }
    });

    upgradeBtn6.addEventListener("mouseover", function () {
        if (autoStrength < 5) {
            upgradeBtn6.innerHTML = "Only avaliable after hirirng the bard";
        }
    });
    upgradeBtn6.addEventListener("mouseout", function () {
        if (autoStrength < 5) {
            upgradeBtn6.innerHTML = "Upgrade Lyre (+1) <br> Cost: " + upgradePrice6;
        }
    });

    document.getElementById("help-btn").addEventListener("click", function () {
        const helpText = document.getElementById("help-text");
        helpText.style.display = (helpText.style.display === "none") ? "block" : "none";
    });

    // --- 5. MUSIC ---
    // background music (optional for player)
    const bgm = document.getElementById("bgm-player");

    // Start music automatically on the very first click anywhere
    document.addEventListener('click', function() {
        bgm.play();
    }, { once: true });

    // Link the HTML buttons to the music
    window.playMusic = function() {
        bgm.play();
    }
    window.pauseMusic = function() {
        bgm.pause();
    }

    // a sound effect whenever you click the treasure chest
    const ping = new Audio("music/coin.wav");
    const muteSfxBtn = document.getElementById("mute-sfx-btn");
    document.getElementById("countbutton").addEventListener("click", function(){
        if (sfxEnabled) { // Only play if sfxEnabled is true
            ping.currentTime = 0;
            ping.play();
        }
    });

    // Toggle button logic
    muteSfxBtn.addEventListener("click", function() {
        sfxEnabled = !sfxEnabled; // Flips true to false, or false to true
        
        // Optional: Change the button text so the player knows what happened
        if (sfxEnabled) {
            muteSfxBtn.textContent = "Mute Chest Sound";
        } else {
            muteSfxBtn.textContent = "Unmute Chest Sound";
        }
    });

    // Reset Game
    window.showResetWarning = function() {
        document.getElementById("reset-modal").style.display = "block";
    };
    window.closeResetWarning = function() { // Hide Modal
        document.getElementById("reset-modal").style.display = "none";
    };
    window.confirmReset = function() {
        // Stop the auto saver
        let id = window.setInterval(function() {}, 0);
        while (id--) {
            window.clearInterval(id);
        }
        localStorage.removeItem("questClickerSave");
        location.reload(); 
    };

    // --- 6. THE MASTER TIMER ---
    setInterval(function () {
        if (autoStrength > 0) {
            count += autoStrength;
            checkMilestones();
            updateUI();
        }
        saveGame();
    }, 1000);

    loadGame();
    updateUI();
});
