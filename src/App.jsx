import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import Repeat from "./pages/Repeat";
import EditTask from "./pages/EditTask";
import AppLayout from "./components/AppLayout";
function App() {
  return (
    <AppLayout title="Rituals">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </AppLayout>

  );
}

export default App;
