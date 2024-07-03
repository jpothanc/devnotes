import { useEffect, useState } from "react";
import { MdViewer } from "react-jp-ui";
import { getContentUrl, getUrl, mdContent } from "../utils/helper";
import config from "../config/config.json";
import { useLocation } from "react-router-dom";
const height = 800;

const ShareNotes = () => {
  const [mdContent, setMdContent] = useState<mdContent>({
    url: getUrl(config.app.defaultSelection.submenu),
    content: "",
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topic = searchParams.get("topic");
  const subtopic = searchParams.get("subtopic");

  useEffect(() => {
    if (topic) {
      getContentUrl(topic, subtopic).then((url) => {
        fetch(url)
          .then((response) => response.text())
          .then((text) => setMdContent({ ...mdContent, content: text }));
      });
    }
  }, [mdContent.url]);

  return (
    <>
      <div className="notes-container">
        <MdViewer content={mdContent.content} height={height} />
      </div>
    </>
  );
};

export default ShareNotes;
