import { userApi } from '../redux/userApi';
import { User } from '../types/User';
import { setSelectedUser } from '../redux/selectedUserSlice';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function UserTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const pageParam = parseInt(params.get('page') || '1', 10);
  const [page, setPage] = useState(pageParam);
  const limit = 10;
  const { data, error, isLoading, refetch } = userApi.useFetchUsersQuery({ page, limit });
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { t } = useTranslation();
  const { data: users, total } = data || { data: [], total: 1 };
  const totalPages = Math.ceil(total / limit);

  const handleSelectUser = (user: User) => {
    dispatch(setSelectedUser(user));
  };

  useEffect(() => {
    if (updateSuccess) {
      refetch();
      setUpdateSuccess(false);
    }
  }, [updateSuccess, refetch]);

  useEffect(() => {
    if (pageParam > totalPages) {
      navigate(`/users?page=${totalPages}`);
    } else if (pageParam < 1) {
      navigate(`/users?page=1`);
    } else if (page !== pageParam) {
      setPage(pageParam);
    }
  }, [pageParam, totalPages, navigate]);

  const handlePageChange = (newPage: number) => {
    if (newPage <= totalPages && newPage >= 1) {
      navigate(`/users?page=${newPage}`);
    }
  };

  if (isLoading) return <div className="text-center">{t('loading')}...</div>;
  if (error) return <div className="text-center">{t('errorLoadingUsers')}</div>;

  const generatePagination = () => {
    const pagination = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    if (startPage > 1) {
      pagination.push(
        <button key="first" className="btn btn-link" onClick={() => handlePageChange(1)}>
          First
        </button>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <button
          key={i}
          className={`btn ${i === page ? 'btn-primary' : 'btn-link'}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      pagination.push(
        <button key="last" className="btn btn-link" onClick={() => handlePageChange(totalPages)}>
          Last
        </button>,
      );
    }

    return pagination;
  };

  const fc = 'bg-body-secondary flex-column border border-secondary rounded p-2 d-flex';
  const fc2 = 'justify-content-center p-0 m-0 mt-1 d-flex justify-content-center align-items-center';

  return (
    <div className={`${fc} ${fc2}`}>
      <h4 className="text-center">{`Users (${total})`}</h4>
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
              <td className="m-0 p-1 align-middle text-left">
                <Link to={`/profile/${user.id}`} className="text-black">
                  {user.id}
                </Link>
              </td>
              <td className="m-0 p-0 p-1 align-middle text-left">
                <Link to={`/profile/${user.id}`} className="text-black">
                  {user.name}
                </Link>
              </td>
              <td className="m-0 p-1 align-middle text-left">
                <Link to={`/profile/${user.id}`} className="text-black">
                  {user.email}
                </Link>
              </td>
              <td className="m-0 p-1 align-middle text-left">
                <button className="btn btn-transparent p-1" onClick={() => handleSelectUser(user)}>
                  ⚙️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center align-items-center mt-3">{generatePagination()}</div>
    </div>
  );
}
