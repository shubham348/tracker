import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import Repeat from "./pages/Repeat";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateTask />} />
      <Route path="/repeat" element={<Repeat />} />
      <Route path="/edit/:id" element={<EditTask />} />
    </Routes>
  );
}

export default App;
