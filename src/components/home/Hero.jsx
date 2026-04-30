import corkboard from "../../assets/Cork-board.jpg.avif";
import "./Hero.css";

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${corkboard})` }}
    >
      <div className="home-content">
        <div className="pin"></div>
        <h1>WarriorFind</h1>
        <p>
          Helping students reconnect with their lost belongings across campus.
        </p>
      </div>
    </section>
  );
}