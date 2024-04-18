import Image from "next/image";
import NotificationBell from "../../../public/icons/notifications-outline.svg";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Notifications = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);

  async function getNotifications() {
    const notifications = await fetch("/api/notifications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    return notifications;
  }

  useEffect(() => {
    if (user) {
      getNotifications()
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setNotifications(data.data);
          }
        });
    }
  }, [user]);

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="m-1">
        {/* // TODO Make white in dark mode */}
        <Image
          src={NotificationBell}
          height={40}
          width={40}
          alt="Notification Bell"
        />

        <div className="badge badge-sm badge-danger absolute bottom-0 right-0 bg-red-600 aspect-square"></div>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] card card-compact w-72 p-2 shadow bg-primary text-primary-content"
      >
        {notifications.map((n, i) => (
          <div key={i} className="card-body">
            <h4 className="card-title">Movie found in cinema!</h4>
            <p>
              <b>{n.title}</b> is playing in a theater near you.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
