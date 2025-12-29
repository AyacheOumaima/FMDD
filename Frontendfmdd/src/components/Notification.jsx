import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { notifications, removeNotification } = useNotification();

  const handleClose = (id) => {
    removeNotification(id);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center p-4 mb-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' :
            notification.type === 'error' ? 'bg-red-100 text-red-800' :
            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}
        >
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              {notification.type === 'success' && (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              )}
              {notification.type === 'error' && (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              )}
              {notification.type === 'warning' && (
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.365 2.127-1.356 2.877 0l3.935 6.83m-18.304 0l3.934 6.83c-.773 1.356-.307 2.876.771 2.876h1.934c1.023 0 1.94-1.056 1.94-2.073l3.934-6.83c-.773-1.355-2.127-1.355-2.877 0m0 0h-3.934a1.022 1.022 0 00-.77 1.733l-3.935 6.83a1.13 1.13 0 000 1.982l3.934 6.83a1.129 1.129 0 001.146 0l3.935-6.83a1.13 1.13 0 000-1.982l-3.934-6.83a1.129 1.129 0 00-1.146 0z" clipRule="evenodd" />
              )}
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => handleClose(notification.id)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
