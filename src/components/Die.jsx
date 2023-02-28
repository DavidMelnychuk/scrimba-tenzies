import "../App.css";

export default function Die({ id, value, isHeld, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#59e391" : "white",
  };

  return (
    <div className="die" style={styles} onClick={holdDice}>
      <h2>{value}</h2>
    </div>
  );
}
