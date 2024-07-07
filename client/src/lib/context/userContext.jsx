import { createContext, useContext, useState, useEffect } from 'react';
import requestUsers from '../request';
import { MESSAGE } from '../message';

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUsers() {
    try {
      const data = await requestUsers();
      setUsers(data);
    } catch (error) {
      throw new Error(MESSAGE.FAILED_TO_FETCH_USERS, error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <UsersContext.Provider value={{ users, loading, selectedUser, selectUser, getUsers}}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}


