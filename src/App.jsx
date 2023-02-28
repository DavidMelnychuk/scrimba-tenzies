import "./App.css";
import Die from "./components/Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "./components/Confetti";

export default function App() {
  const [tenzies, setTenzies] = useState(false);
  const [numRolls, setNumRolls] = useState(0);
  const [dice, setDice] = useState(() => allNewDice());

  useEffect(() => {
    const firstDieValue = dice[0].value;
    const hasWon = dice.every(
      (die) => die.isHeld && die.value === firstDieValue
    );

    if (hasWon) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    return Array.from({ length: 10 }, () => ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function rollNewDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
      setNumRolls(0);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
      setNumRolls((rolls) => rolls + 1);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      {tenzies && (
        <h2 className="roll-counter">You won in {numRolls} rolls! </h2>
      )}
      <button className="roll-button" onClick={rollNewDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
