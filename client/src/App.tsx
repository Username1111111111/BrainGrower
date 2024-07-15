import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UpdateUserPage from './pages/UpdateUserPage';
import ProfilePage from './pages/ProfilePage';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import i18n from '../src/i18n';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/signup/" element={<SignupPage />} />
            <Route path="/users/" element={<UpdateUserPage />} />
            <Route path="/profile/" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        </Router>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
