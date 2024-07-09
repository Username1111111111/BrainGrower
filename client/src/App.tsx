import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import UpdateUserPage from "./pages/UpdateUserPage";
import { UsersProvider } from "./lib/context/userContext";

const App: React.FC = () => {
    return (
        <UsersProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/user/create" element={<CreateUser />} />
                    <Route path="/user/update/" element={<UpdateUserPage />} />
                </Routes>
            </Router>
        </UsersProvider>
    );
}

export default App;
