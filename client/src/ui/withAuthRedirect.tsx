import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthRedirect = (Component: React.FC, redirectTo: string, conditionFn  ) => {
  return (props: any) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(() => {
      if (conditionFn(token, role)) {
        navigate(redirectTo);
      }
    }, [token, role, navigate]);

    return conditionFn(token, role) ? null : <Component {...props}/>;
  };
};

export default withAuthRedirect;