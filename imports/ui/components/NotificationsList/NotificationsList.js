import React from "react";
import { Notification } from "../../../api/notification/notification";
import NotificationCard from "../NotificationCard/NotificationCard";
import { useTracker } from "meteor/react-meteor-data";
const NotificationsList = () => {
  const notifications = useTracker(() => {
    Meteor.subscribe("notification");
    const notifications = Notification.find({ recId: Meteor.userId() }).fetch();
    return notifications?.map((notif) => {
      Meteor.subscribe("allUsers");
      const user = Meteor.users.findOne(notif.sender);
      return {
        ...notif,
        name: user?.profile?.name,
        lastName: user?.profile?.lastName,
      };
    });
  });
  return (
    <div>
      <div class="content">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div>
                <h4 class="widget-title">Notifications</h4>
                <div class="notcenter">
                  {notifications.map((notif) => {
                    return (
                      <NotificationCard
                        key={notif._id}
                        to={`/service/${notif.serviceId}`}
                        notif={notif}
                      ></NotificationCard>
                    );
                  })}
                </div>

                {/* <div class="pagination">
                  <ul>
                    <li class="active">
                      <a href="javascript:void(0);">1</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">2</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">3</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">4</a>
                    </li>
                    <li class="arrow">
                      <a href="javascript:void(0);">
                        <i class="fas fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;
