import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { userApi } from '../redux/userApi';
import { User } from '../types/User';
import { setSelectedUser } from '../redux/selectedUserSlice';

export default function UserTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const pageParam = parseInt(params.get('page') || '1', 10);
  const searchParam = params.get('search') || '';
  const [page, setPage] = useState(pageParam);
  const [search, setSearch] = useState(searchParam);
  const [debouncedSearch, setDebouncedSearch] = useState(searchParam);
  const limit = 10;
  const { data, error, isLoading, refetch } = userApi.useFetchUsersQuery({ page, limit, search: debouncedSearch });
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
    if (pageParam !== page) {
      setPage(pageParam);
    }
    if (searchParam !== debouncedSearch) {
      setDebouncedSearch(searchParam);
    }
  }, [pageParam, searchParam, debouncedSearch, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage <= totalPages && newPage >= 1) {
      navigate(`/users?page=${newPage}&search=${debouncedSearch}`);
    }
  };

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
      navigate(`/users?page=1&search=${value}`);
    }, 300),
    [],
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    debouncedSetSearch(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/users?page=1&search=${debouncedSearch}`);
  };

  if (isLoading) return <div className="text-center">{t('loading')}...</div>;
  if (error) return <div className="text-center">{t('errorLoadingUsers')}</div>;

  const generatePagination = () => {
    const pagination = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    if (startPage > 1) {
      pagination.push(
        <button key="first" className="btn " onClick={() => handlePageChange(1)}>
          First
        </button>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <button key={i} className={`btn ${i === page ? 'btn-primary' : ''}`} onClick={() => handlePageChange(i)}>
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      pagination.push(
        <button key="last" className="btn" onClick={() => handlePageChange(totalPages)}>
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
      <form onSubmit={handleSearchSubmit} className="mb-3">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="form-control"
          placeholder="Search by name or email"
        />
      </form>
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
                <button
                  id={`btn-${user.id}`}
                  className="btn btn-transparent p-1"
                  onClick={() => handleSelectUser(user)}
                >
                  ⚙️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination d-flex justify-content-center">{generatePagination()}</div>
    </div>
  );
}
