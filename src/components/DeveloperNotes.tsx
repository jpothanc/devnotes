import { useEffect, useState } from "react";
import { ButtonMenuList, MdViewer, buttonItem } from "react-jp-ui";
import config from "../config/config.json";
import { getMenu, getSubMenu, getUrl, mdContent } from "../utils/helper";

const DeveloperNotes = () => {
  const [mdContent, setMdContent] = useState<mdContent>({
    url: getUrl(config.app.defaultSelection.submenu),
    content: "",
  });
  const [subMenu, setSubMenu] = useState<buttonItem[]>([]);
  const [menu, setMenu] = useState<buttonItem[]>([]);

  useEffect(() => {
    getMenu().then((data) => {
      setMenu(data);
    });
    getSubMenu({
      name: config.app.defaultSelection.menu,
      bgColor: config.app.defaultSelection.bgcolor,
    }).then((data) => {
      setSubMenu(data);
    });
  }, []);

  useEffect(() => {
    if (mdContent.url == undefined) return;

    fetch(mdContent.url)
      .then((response) => response.text())
      .then((text) => setMdContent({ ...mdContent, content: text }));
  }, [mdContent.url]);
  return (
    <>
      <div>
        <div className="notes-container">
          <ButtonMenuList
            items={menu}
            onClick={async (value) => {
              setSubMenu(await getSubMenu(value));
              setMdContent({ url: getUrl(value.link), content: "" });
            }}
          />

          <ButtonMenuList
            items={subMenu}
            onClick={(value) => {
              if (value.link == mdContent.url) return;
              setMdContent({ url: value.link, content: "" });
              console.log(value.link);
            }}
          />

          <MdViewer content={mdContent.content} />
        </div>
      </div>
    </>
  );
};

export default DeveloperNotes;
