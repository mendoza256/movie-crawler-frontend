import Image from "next/image";
import NotificationBell from "../../../public/icons/notifications-outline.svg";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { MovieNotificationType } from "@/lib/baseTypes";
import Link from "next/link";

const Notifications = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<MovieNotificationType[]>(
    []
  );
  const hasNotifications = notifications.length > 0;

  async function getNotifications() {
    const data = await fetch("/api/notifications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const notifications = await data.json();
    setNotifications(notifications?.data as unknown as MovieNotificationType[]);
  }

  useEffect(() => {
    if (user) {
      getNotifications();
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

        {hasNotifications && (
          <div className="badge badge-sm badge-danger absolute bottom-0 right-0 bg-red-600 aspect-square"></div>
        )}
      </div>
      {hasNotifications && (
        <div
          tabIndex={0}
          className="dropdown-content z-[1] card card-compact w-72 p-2 shadow bg-primary text-primary-content"
        >
          {notifications?.map((n, i) => (
            <div key={i} className="card-body">
              <h4 className="card-title">{n.title}</h4>
              <p dangerouslySetInnerHTML={{ __html: n.message }} />
              <Link
                href={n.movieLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                See Movie
              </Link>
              <Link
                href={n.cinemaLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                See Cinema
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
