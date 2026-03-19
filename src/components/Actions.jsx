export default function Actions({
  attack,
  speacialAttack,
  heal,
  suicide,
  specialDisabled,
}) {
  return (
    <section id="controls">
      <button onClick={attack}>ATTACK</button>
      <button onClick={speacialAttack} disabled={specialDisabled}>
        SPECIAL !
      </button>
      <button onClick={heal}>HEAL</button>
      <button onClick={suicide}>KILL YOURSELF</button>
    </section>
  );
}