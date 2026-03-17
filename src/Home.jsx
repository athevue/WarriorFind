import "./Home.css";
import corkboard from "./assets/cork-board.jpg.avif";

export default function Home() {
  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url(${corkboard})` }}
    >
        <div className="home-content">
            <div className="pin"></div>
          <h1>WarriorFind</h1>
          <p>
            Helping students reconnect with their lost belongings across campus.
          </p>
        </div>
      </div>

  );
}