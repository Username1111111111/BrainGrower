import { userApi } from '../redux/userApi';
import { User } from '../types/User';
import { setSelectedUser } from '../redux/selectedUserSlice';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

export default function UserTable() {
  const { data: users, error, isLoading, refetch } = userApi.useFetchUsersQuery();
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSelectUser = (user: User) => {
    dispatch(setSelectedUser(user));
  };

  useEffect(() => {
    if (updateSuccess) {
      refetch();
      setUpdateSuccess(false);
    }
  }, [updateSuccess, refetch]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error fetching users</div>;
  const fc = 'bg-body-secondary flex-column border border-secondary rounded p-2 d-flex';
  const fc2 = 'justify-content-center p-0 m-0 mt-1  d-flex justify-content-center align-items-center';

  return (
    <div className={`${fc}+${fc2}`}>
      <h4 className="text-center">Users</h4>
      <table className="table table-striped rounded">
        <thead className="rounded">
          <tr className="rounded m-0 p-0">
            <th className="m-0 p-1 text-left">
              <b>ID</b>
            </th>
            <th className="m-0 p-1 text-left">
              <b>Name</b>
            </th>
            <th className="m-0 p-1 text-left">
              <b>Email</b>
            </th>
            <th className="m-0 p-1 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User) => (
            <tr className="rounded m-0" key={user.id}>
              <td className="m-0 p-1 align-middle text-left">{user.id}</td>
              <td className="m-0 p-0 p-1 align-middle text-left">{user.name}</td>
              <td className="m-0 p-1 align-middle text-left">{user.email}</td>
              <td className="m-0 p-1 align-middle text-left">
                <button className="btn btn-transparent p-1" onClick={() => handleSelectUser(user)}>
                  ⚙️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
