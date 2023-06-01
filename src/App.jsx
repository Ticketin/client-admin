import "./App.css";
import { Route, Routes } from "react-router";
import Landing from "./components/Landing/Landing";
import GeneratePage from "./pages/GeneratePage";
import ActivatedPage from "./pages/ActivatedPage";
import EventListPage from "./pages/EventListPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/generate-event" element={<GeneratePage />} />
                <Route path="/activated" element={<ActivatedPage />} />
                <Route path="/event-list" element={<EventListPage />} />
            </Routes>
        </>
    );
}

export default App;
