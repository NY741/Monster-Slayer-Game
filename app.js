function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    mayHealPlayer() {
      if (this.currentRound >= 1) return true;
      else return false;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.mayHealPlayer = false;
      this.logMessages = [];
    },
    attackMonster() {
      console.log("Monster is attacked");
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      if (this.monsterHealth < 0) this.monsterHealth = 0;
      this.currentRound++;
      if (this.currentRound > 1) {
        this.mayHealPlayer = true;
      }
      this.addLogMessage("Player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      console.log("Player is attacked");
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      if (this.playerHealth < 0) this.playerHealth = 0;
      this.addLogMessage("Monster", "attack", attackValue);
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound++;
      this.addLogMessage("Player", "special-attack", attackValue);
    },
    healPlayer() {
      const healValue = getRandomValue(10, 15);
      if (this.playerHealth + healValue > 100) this.playerHealth = 100;
      else this.playerHealth += healValue;
      this.attackPlayer();
      this.playerHealUsed = true;
      this.addLogMessage("Player", "heal", healValue);
    },
    surrender() {
      this.winner = "monster";
    },

    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionPerson: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
