import { WindowMd, WindowMdRef } from "react-jp-ui";
import config from "../config/config.json";
import { useEffect, useRef, useState } from "react";
import { GoShare } from "react-icons/go";
import { IoMenu } from "react-icons/io5";
const NavBar = () => {
  const [about, setAbout] = useState<string>("");
  const modalRef = useRef<WindowMdRef | null>(null);
  const handleOpenModal = () => {
    modalRef.current?.open();
  };

  useEffect(() => {
    fetch(config.app.readme)
      .then((response) => response.text())
      .then((text) => setAbout(text));

    return () => {};
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar__logo">{config.app.appName}</div>
        {/* <div className="navbar__logo1">remembers everything</div> */}
        <div className="navbar__menu">
          <div>
            <GoShare className="navbar__menu-item" />
          </div>
          <div onClick={handleOpenModal}>
            <IoMenu size="24" className="navbar__menu-item" />
          </div>
        </div>

        <WindowMd title="" content={about} bgcolor="#212121" ref={modalRef} />
      </div>
    </>
  );
};

export default NavBar;
