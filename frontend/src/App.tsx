import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
