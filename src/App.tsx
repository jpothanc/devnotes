import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import DevNotesPage from "./pages/DevNotesPage";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<DevNotesPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
