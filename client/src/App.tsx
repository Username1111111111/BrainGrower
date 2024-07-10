import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import UpdateUserPage from "./pages/UpdateUserPage";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/user/create" element={<CreateUser />} />
                    <Route path="/user/update/" element={<UpdateUserPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
