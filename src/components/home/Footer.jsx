import "./Footer.css";

export default function  Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <p className="footer-text">
          Wayne State University Lost &amp; Found • Go Warriors! 
        </p>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} WarriorFind</span>
        </div>
      </div>
    </footer>
  );
};