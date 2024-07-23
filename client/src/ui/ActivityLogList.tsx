import React from 'react';
import { useTranslation } from 'react-i18next';
import { activityLogApi } from '../redux/activityLogApi';
import formatDate from '../lib/formatDate';

interface ActivityLogProps {
  userId: number;
}

export const ActivityLogList: React.FC<ActivityLogProps> = ({ userId }) => {
  const { t } = useTranslation();
  const { data: logs, error, isLoading } = activityLogApi.useFetchActivityLogsQuery(userId);

  if (isLoading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('errorFetchingLogs')}</div>;

  return (
    <div className="w-100 px-1">
      <p className="text-center m-0 p-0">{t('activityLogs')}:</p>
      <table className="table">
        <tbody>
          {logs?.map((log) => (
            <tr className="p-0 m-0" key={log.id}>
              <td className="p-0 m-0 me-2">{log.activity}</td>
              <td className="p-0 m-0">{formatDate(log.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
