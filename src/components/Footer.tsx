import config from "../config/config.json";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <p>
          &copy; 2023 {config.app.developerName}
          All Rights Reserved. | Dream, Code, Inspire and Innovate.
        </p>
      </div>
    </>
  );
};

export default Footer;
