import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import requestUsers from '../request';
import { MESSAGE } from '../message';

interface User {
  id: number;
  name: string;
  email: string;
  lastLogin: Date;
  signupDate: Date;
  role: string;
}

interface UsersContextState {
  users: User[];
  loading: boolean;
  selectedUser: User | null;
  selectUser: (user: User) => void;
  getUsers: () => Promise<void>;
}

const UsersContext = createContext<UsersContextState | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
}

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function getUsers() {
    try {
      const data = await requestUsers();
      setUsers(data);
    } catch (error) {
      throw new Error(`${MESSAGE.FAILED_TO_FETCH_USERS}: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const selectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <UsersContext.Provider value={{ users, loading, selectedUser, selectUser, getUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error(MESSAGE.USERS_MUST_BE_WITH_PROVIDER);
  }
  return context;
}