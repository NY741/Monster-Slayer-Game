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
  methods: {
    attackMonster() {
      console.log("Monster is attacked");
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound++;
      if (this.currentRound > 1 && !this.playerHealUsed) {
        this.mayHealPlayer = true;
      }
    },
    attackPlayer() {
      console.log("Player is attacked");
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
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
    checkWinningConditions() {
      // if (playerHealth)
    },
  },
});

app.mount("#game");
