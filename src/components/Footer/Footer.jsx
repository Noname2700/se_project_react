import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Developed by Yohan Encarnacion</p>
      <p className="footer__copyright">
        {`© ${new Date().getFullYear()}`}
      </p>
    </footer>
  );
}

export default Footer;
