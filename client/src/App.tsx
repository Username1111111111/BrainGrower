import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import ProfilePage from "./pages/ProfilePage";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login/" element={<LoginPage />} />
                    <Route path="/signup/" element={<SignupPage />} />
                    <Route path="/users/" element={<UpdateUserPage />} />
                    <Route path="/profile/" element={<ProfilePage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
