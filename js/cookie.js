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
    let autoPrice = 50;

    // --- 2. THE VIEW (DOM Elements) ---
    const scoreDisplay = document.getElementById("score1");
    const upgradeBtn = document.getElementById("shop1");
    const upgradeBtn2 = document.getElementById("shop3");
    const upgradeBtn3 = document.getElementById("shop4");
    const upgradeBtn4 = document.getElementById("shop5");
    const upgradeBtn5 = document.getElementById("shop6");
    const autoBtn = document.getElementById("shop2");
    const rewardArea = document.getElementById("reward-list");
    const messageBar = document.getElementById("message-bar");

    // --- 3. HELPER FUNCTIONS ---

    function updateUI() {
        scoreDisplay.textContent = Math.floor(count);
        upgradeBtn.innerHTML = `Upgrade Sword (+1) <br> Cost: ${upgradePrice}`;
        upgradeBtn.disabled = (count < upgradePrice);

        autoBtn.innerHTML = `Hire Mercenary (+1/s) <cite: 8> <br> Cost: ${autoPrice}`;
        autoBtn.disabled = (count < autoPrice);

        upgradeBtn2.innerHTML = `Upgrade Staff (+1) <br> Cost: ${upgradePrice2}`;
        upgradeBtn2.disabled = (count < upgradePrice2);

         upgradeBtn3.innerHTML = `Upgrade Dagger (+1) <br> Cost: ${upgradePrice3}`;
        upgradeBtn3.disabled = (count < upgradePrice3);

        upgradeBtn4.innerHTML = `Upgrade Potions (+1) <br> Cost: ${upgradePrice4}`;
        upgradeBtn4.disabled = (count < upgradePrice4);

        upgradeBtn5.innerHTML = `Upgrade Bow (+1) <br> Cost: ${upgradePrice5}`;
        upgradeBtn5.disabled = (count < upgradePrice5);
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
        if (autoStrength >= 9 && !document.getElementById('reward-11')) {
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
    });

        autoBtn.addEventListener("click", function () {
        if (count >= autoPrice) {
            count -= autoPrice;
            autoStrength += 1;
            autoPrice = Math.round(autoPrice * 2);

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
        if (!allies[1].hidden){
            upgradeBtn2.disabled = false;
        }
        if (count >= upgradePrice2) {
            count -= upgradePrice2;
            clickVal += 1;
            upgradePrice2 = Math.round(upgradePrice2 * 1.8);
            updateUI();
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

        upgradeBtn4.addEventListener("click", function () {
        if (count >= upgradePrice4) {
            count -= upgradePrice4;
            clickVal += 1;
            upgradePrice4 = Math.round(upgradePrice4 * 1.8);
            updateUI();
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

    document.getElementById("help-btn").addEventListener("click", function () {
        const helpText = document.getElementById("help-text");
        helpText.style.display = (helpText.style.display === "none") ? "block" : "none";
    });

    // --- 5. THE MASTER TIMER ---
    setInterval(function () {
        if (autoStrength > 0) {
            count += autoStrength;
            checkMilestones();
            updateUI();
        }
    }, 1000);

    updateUI();
});
