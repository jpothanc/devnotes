import { MdViewer } from "react-jp-ui";

const height = 600;
const MarkdownView = () => {
  return (
    <>
      <div className="notes-container">
        <MdViewer content="" height={height} />
      </div>
    </>
  );
};

export default MarkdownView;
