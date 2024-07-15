import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    navigate('/');
  };

  // < 120 per line. Perfect :)
  const ulC = 'd-flex flex-row flex-wrap justify-content-between w-100';
  const ulC2 = 'm-0 p-0 border border-secondary border-top-0 bg-body-secondary';

  const homeC = 'p-0 m-2 btn btn-secondary';

  const uC = 'p-0 m-2 btn btn-secondary';
  const uC2 = 'bg-transparent text-white p-2';

  const usernameC = 'p-0 m-2 btn btn-secondary';
  const usernameC2 = 'bg-transparent text-white p-2';

  const nusernameC = 'p-0 m-2 btn btn-secondary';
  const nusernameC2 = 'bg-transparent text-white p-2';

  const signupC = 'p-0 m-2 btn btn-primary';
  const signupC2 = 'bg-primary rounded text-white p-2';

  return (
    <nav id={'navbar'} className="w-100">
      <ul className={`${ulC} ${ulC2}`}>
        <div>
          <Link className={homeC} to="/">
            <li className="bg-transparent text-white p-2">{t('home')}</li>
          </Link>
          {token && role == 'admin' && (
            <Link className={uC} to="/users">
              <li className={uC2}>{t('users')}</li>
            </Link>
          )}
        </div>

        <div className="d-flex flex-row justify-content-center align-items-center">
          {token && (
            <Link className={usernameC} to="/profile">
              <li className={usernameC2}>{t('profile')}</li>
            </Link>
          )}
          {!token && (
            <Link className={nusernameC} to="/login">
              <li className={nusernameC2}>{t('login')}</li>
            </Link>
          )}

          {token && (
            <button onClick={handleLogout} className="btn btn-primary m-2 p-2">
              {t('logout')}
            </button>
          )}
          {!token && (
            <Link className={signupC} to="/signup">
              <li className={signupC2}>{t('signup')}</li>
            </Link>
          )}
        </div>
      </ul>
    </nav>
  );
}
