import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Main from "./pages/Main";
import ShareNotes from "./components/ShareNotes";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/devnotes" element={<ShareNotes />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
