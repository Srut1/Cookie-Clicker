/**
javascript file
 */

window.addEventListener('load', function () {

    // State Variables
    // Variables - can be changed to alter game difficulty
    let count = 0;            // Total resources
    let clickVal = 1;         // Manual click value
    let autoStrength = 0;     // Auto clicks per second
    let upgradePrice = 10;    // Price for the first upgrade type
    let autoPrice = 50;       // Price for the auto-clicker

    // DOM Elements
    const scoreDisplay = document.getElementById("score1");
    const upgradeBtn = document.getElementById("shop1");
    const autoBtn = document.getElementById("shop2");
    const rewardArea = document.getElementById("reward-list");
    const messageBar = document.getElementById("message-bar");

    // HELPER FUNCTIONS 

    // Updates the text on the screen to match our variables
    function updateUI() {
        scoreDisplay.textContent = Math.floor(count);

        // Update button text and disable them if user is too poor
        upgradeBtn.innerHTML = `Upgrade Sword (+1) <br> Cost: ${upgradePrice}`;
        upgradeBtn.disabled = (count < upgradePrice);

        autoBtn.innerHTML = `Hire Mercenary (+1/s) <br> Cost: ${autoPrice}`;
        autoBtn.disabled = (count < autoPrice);
    }

    // Displays a congratulations message that fades away
    function showAchievement(text) {
        messageBar.textContent = text;
        messageBar.style.display = "block";

        // Hide message after 3 seconds
        setTimeout(() => {
            messageBar.style.display = "none";
        }, 3000);
    }

    // Check for milestones (Rewards)
    function checkMilestones() {
        if (count >= 100 && !document.getElementById('reward-100')) {
            addReward("🏆 100 Collected!", "reward-100");
            showAchievement("Congrats! You hit 100!");
        }
        if (count >= 500 && !document.getElementById('reward-500')) {
            addReward("🌟 500 Collected!", "reward-500");
            showAchievement("Incredible! 500 reached!");
        }
        if (autoStrength >= 3 && !document.getElementById('reward-4')){
            addReward("4 Allies Gathered!", "reward-4");
            showAchievement("Power of Friendship!");
        }
        if (autoStrength >= 10 && !document.getElementById('reward-11')){
            addReward("All Allies Gathered!", "reward-11");
            showAchievement("Full Party");
        }
        
    }

    // Adds a visual badge to the rewards column
    function addReward(text, id) {
        const badge = document.createElement("p");
        badge.id = id;
        badge.className = "badge";
        badge.textContent = text;
        rewardArea.appendChild(badge);
    }

    // EVENT LISTENERS 

    // Manual Click Logic
    document.getElementById("countbutton").addEventListener("click", function () {
        count += clickVal;
        checkMilestones();
        updateUI();
    });

    // Buy Upgrade (Increases Click Power)
    upgradeBtn.addEventListener("click", function () {
        if (count >= upgradePrice) {
            count -= upgradePrice;
            clickVal += 1;
            upgradePrice = Math.round(upgradePrice * 1.8); // Increase price for next time
            updateUI();
        }
    });


    // Buy Autoclicker
    autoBtn.addEventListener("click", function () {
        if (count >= autoPrice) {
            count -= autoPrice;
            autoStrength += 1;
            autoPrice = Math.round(autoPrice * 2); // Increase price for next time
            const allies = document.querySelectorAll("#heroes img");
            const index = autoStrength;

            if (allies[index]) {
                allies[index].hidden = false;
            } // new image under under "Heroes" tab added for each upgrade

            updateUI();
        }
    });

    // Help Button Toggle
    document.getElementById("help-btn").addEventListener("click", function () {
        const helpText = document.getElementById("help-text");
        helpText.style.display = (helpText.style.display === "none") ? "block" : "none";
    });

    // THE MASTER TIMER 
    // Runs every second
    setInterval(function () {
        if (autoStrength > 0) {
            count += autoStrength;
            checkMilestones();
            updateUI();
        }
    }, 1000);

    // Run UI update once at start to set initial prices/text
    updateUI();
});
    }, 1000);

    // Run UI update once at start to set initial prices/text
    updateUI();
});
