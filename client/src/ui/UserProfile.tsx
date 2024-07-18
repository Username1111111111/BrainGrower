import React, { useState } from 'react';
import { userApi } from '../redux/userApi';
import { useTranslation } from 'react-i18next';
import formatDate from '../lib/formatDate';
import { MESSAGE } from '../lib/message';
import { ActivityLogList } from './ActivityLogList';
import ExportUserData from './ExportUserData';

interface UserId {
  userId?: string;
}

export default function UserProfile({ userId }: UserId) {
  const { t } = useTranslation();
  const id: number = +localStorage.getItem('id');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [updateUserImage] = userApi.useUpdateUserImageMutation();

  const { data: user, error, isLoading } = userId ? userApi.useFetchUserQuery(+userId) : userApi.useFetchUserQuery(id);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Based on the fetched user, which are fetched conditionaly from useFetchQuery, I am updating image by id
        await updateUserImage({ id: user!.id, formData });
      } catch (error) {
        throw new Error(`${MESSAGE.FAILED_UPLOAD_IMAGE}: ${error}`);
      } finally {
        setUploading(false);
      }
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error fetching user</div>;

  const fc = 'bg-body-secondary flex-column border border-secondary rounded p-2 d-flex';
  const fc2 = 'justify-content-center p-0 m-0 mt-1 d-flex justify-content-center align-items-center';

  return (
    <div>
      <h4 className="text-center">{t('profile')}</h4>
      <div className="d-flex justify-content-center align-items-center">
        {user?.profileImage && <img src={user.profileImage} alt="Profile" width={100} />}
      </div>
      <div className={`${fc} ${fc2}`}>
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
        <div className="d-flex flex-row justify-content-between align-items-center w-100 px-1">
          <div className="p-0 m-0">
            <label className="btn btn-secondary" htmlFor="customFile">
              {file ? file.name : 'Choose file'}
            </label>
            <input className="d-none" type="file" id="customFile" onChange={handleFileChange} />
          </div>
          <button className="btn btn-primary text-nowrap" onClick={handleUpload} disabled={uploading || !file}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        <ExportUserData userId={user!.id} />
        <ActivityLogList userId={user!.id} />
      </div>
    </div>
  );
}
