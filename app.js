function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      mayHealPlayer: false,
      playerHealUsed: false,
      winner: null,
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
    attackMonster() {
      console.log("Monster is attacked");
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      if (this.monsterHealth < 0) this.monsterHealth = 0;
      this.attackPlayer();
      this.currentRound++;
      if (this.currentRound > 1 && !this.playerHealUsed) {
        this.mayHealPlayer = true;
      }
      console.log(this.checkWinningConditions);
    },
    attackPlayer() {
      console.log("Player is attacked");
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      if (this.playerHealth < 0) this.playerHealth = 0;
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound++;
    },
    healPlayer() {
      const healValue = getRandomValue(10, 15);
      if (this.playerHealth + healValue > 100) this.playerHealth = 100;
      this.playerHealth += healValue;
      this.attackPlayer();
      this.playerHealUsed = true;
    },
  },
});

app.mount("#game");
