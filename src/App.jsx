import "./App.css";
import { Route, Routes } from "react-router";
import Landing from "./components/Landing/Landing";
import GeneratePage from "./pages/GeneratePage";
import ActiveEventPage from "./pages/ActiveEventPage";
import PastEventsListPage from "./pages/PastEventsListPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/generate-event" element={<GeneratePage />} />
                <Route path="/active-events" element={<ActiveEventPage />} />
                <Route path="/past-events" element={<PastEventsListPage />} />
            </Routes>
        </>
    );
}

export default App;
