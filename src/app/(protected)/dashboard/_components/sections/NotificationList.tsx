"user client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface Notification {
  id: number;
  message: string;
  time: string;
}

const notificationsData: Notification[] = [
  { id: 1, message: "Your call has been confirmed.", time: "5 min ago" },
  { id: 2, message: "You have a new message!", time: "1 min ago" },
  {
    id: 3,
    message: "Your subscription is expiring soon!",
    time: "2 hours ago",
  },
  { id: 4, message: "New comment on your post.", time: "10 min ago" },
  {
    id: 5,
    message: "Your password was changed successfully.",
    time: "30 min ago",
  },
  { id: 6, message: "New friend request received.", time: "15 min ago" },
  { id: 7, message: "Update available: Version 2.0.", time: "45 min ago" },
  { id: 8, message: "Reminder: Meeting at 3 PM.", time: "1 hour ago" },
  { id: 9, message: "Your order has been shipped.", time: "3 hours ago" },
  { id: 10, message: "Welcome to our community!", time: "5 hours ago" },
];

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAllAsRead = () => {
    // Implement your logic for marking all as read here
    setNotifications([]);
  };

  return (
    <div className="w-72 bg-white rounded-sm">
      <ul className="divide-y divide-slate-200">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="flex items-center p-3 hover:bg-slate-100 cursor-pointer"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            <div className="flex-grow">
              <p className="text-sm font-medium text-slate-800">
                {notification.message}
              </p>
              <p className="text-xs text-slate-500">{notification.time}</p>
            </div>
          </li>
        ))}
      </ul>
      <Button
        variant="ghost"
        onClick={markAllAsRead}
        className="w-full p-3 text-center text-sm text-slate-600 rounded-b-sm border hover:text-slate-100 hover:text-slate-600"
      >
        Mark All as Read
      </Button>
    </div>
  );
};

export default NotificationList;
