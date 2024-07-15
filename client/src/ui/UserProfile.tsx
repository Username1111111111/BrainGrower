import React from 'react';
import { userApi } from '../redux/userApi';
import { useTranslation } from 'react-i18next';
import formatDate from '../lib/formatDate';

interface UserId {
  userId?: string;
}

export default function UserProfile({ userId }: UserId) {
  const { t } = useTranslation();
  const id: number = +localStorage.getItem('id');

  const { data: user, error, isLoading } = userId ? userApi.useFetchUserQuery(+userId) : userApi.useFetchUserQuery(id);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error fetching user</div>;

  const fc = 'bg-body-secondary flex-column border border-secondary rounded p-2 d-flex';
  const fc2 = 'justify-content-center p-0 m-0 mt-1 d-flex justify-content-center align-items-center';

  return (
    <div>
      <h4 className="text-center">{t('profile')}</h4>
      <div className={`${fc}+${fc2}`}>
        <table className="rounded m-0 p-0">
          <tbody>
            <tr>
              <td className="m-0 p-0 px-1 align-middle text-left fw-bold">Name: </td>
              <td className="m-0 p-0 px-1 align-middle text-left">{user?.name}</td>
            </tr>
            <tr>
              <td className="m-0 p-0 px-1 align-middle text-left fw-bold">Email: </td>
              <td className="m-0 p-0 px-1 align-middle text-left">{user?.email}</td>
            </tr>
            <tr>
              <td className="m-0 p-0 px-1 align-middle text-left fw-bold">Role:</td>
              <td className="m-0 p-0 px-1 align-middle text-left">{user?.role}</td>
            </tr>
            <tr>
              <td className="m-0 p-0 px-1 align-middle text-left fw-bold">Last login:</td>
              <td className="m-0 p-0 px-1 align-middle text-left">{formatDate(user?.lastLogin)}</td>
            </tr>
            <tr>
              <td className="m-0 p-0 px-1 align-middle text-left fw-bold">Signup date:</td>
              <td className="m-0 p-0 px-1 align-middle text-left">{formatDate(user?.signupDate)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
