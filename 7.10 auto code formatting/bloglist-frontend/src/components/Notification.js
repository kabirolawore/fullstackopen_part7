import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const alert = useSelector((state) => state.notification.showAlert);
  const className = useSelector((state) => state.notification.className);

  console.log(className, alert, message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  if (!message) return null;

  return <div className={className}>{message}</div>;
};

export default Notification;
