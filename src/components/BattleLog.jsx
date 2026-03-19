
export default function BattleLog({ logs }) {
  return (
    <section id="log" className="container">
      <ul>
        {logs.map((log, index) => (
          <li
            key={index}
            className={(log.isPlayer ? "log--player " : "log--monster ") +(log.isDamage ? "log--damage" : "log--heal")}>
            {log.isPlayer ? "Player" : "Monster"}
            {log.text}
          </li>
        ))}
      </ul>
    </section>
  );
}