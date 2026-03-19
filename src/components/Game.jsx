import React, { useState } from "react";
import Health from "./Health.jsx";
import GameResult from "./GameResult.jsx";
import Actions from "./Actions.jsx";
import BattleLog from "./BattleLog.jsx";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
  };
}

function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
  };
}

function Game() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [turn, setTurn] = useState(1);



  function attack() {
    const playerDamage = getRandomValue(5, 12);
    const monsterDamage = getRandomValue(5, 13);

    setMonsterHealth((prev) => Math.max(prev - playerDamage, 0));
    setPlayerHealth((prev) => Math.max(prev - monsterDamage, 0));

    setLogs((prev) => [
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
      ...prev,
    ]);

    setTurn((prev) => prev + 1);
  }

  function specialAttack() {
    const playerDamage = getRandomValue(10, 20);
    const monsterDamage = getRandomValue(5, 13);

    setMonsterHealth((prev) => Math.max(prev - playerDamage, 0));
    setPlayerHealth((prev) => Math.max(prev - monsterDamage, 0));

    setLogs((prev) => [
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
      ...prev,
    ]);

    setTurn((prev) => prev + 1);
  }

  function heal() {
    const healValue = getRandomValue(10, 20);
    const monsterDamage = getRandomValue(5, 13);

    setPlayerHealth((prev) => Math.min(prev + healValue, 100));

    setPlayerHealth((prev) => Math.max(prev - monsterDamage, 0));

    setLogs((prev) => [
      createLogHeal(healValue),
      createLogAttack(false, monsterDamage),
      ...prev,
    ]);

    setTurn((prev) => prev + 1);
  }

  function suicide() {
    setPlayerHealth(0);
  }

  function restartGameHandler() {
    setMonsterHealth(100);
    setPlayerHealth(100);
    setLogs([]);
    setTurn(1);
  }


  let gameResult = null;

  if (playerHealth <= 0 && monsterHealth <= 0) {
    gameResult = "Draw!";
  } else if (playerHealth <= 0) {
    gameResult = "You Lost!";
  } else if (monsterHealth <= 0) {
    gameResult = "You Won!";
  }

  const isSpecialAvailable = turn % 3 === 0;



  return (
    <>
      <Health name="Monster Health" health={monsterHealth} />
      <Health name="Player Health" health={playerHealth} />

      <Actions
        attack={attack}
        specialAttack={specialAttack}
        heal={heal}
        suicide={suicide}
        specialDisabled={!isSpecialAvailable}
      />

      {gameResult && (
        <GameResult title={gameResult} restartGame={restartGameHandler} />
      )}

      <BattleLog logs={logs} />
    </>
  );
}

export default Game;