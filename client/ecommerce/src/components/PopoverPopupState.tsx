import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { ProductNotification } from "../types/types";
import {
  Badge,
  Card,
  IconButton,
  Popover,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDeleteProductNotificationsMutation } from "../hooks/useDeleteProductNotificationsMutation";
import { NotificationsList } from "./NavbarNotifications/NotificationsList";
import { ClearNotificationsButton } from "./NavbarNotifications/ClearNotificationsButton";

export default function PopoverPopupState({
  productNotifications,
}: {
  productNotifications: ProductNotification[];
}) {
  const mutation = useDeleteProductNotificationsMutation();
  const { mutate: deleteProductNotifications } = mutation;
  const handleClearNotificationsClick = () => {
    deleteProductNotifications();
  };
  const notReadProductNotifications = productNotifications.filter(
    (n) => !n.isRead
  );
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <>
          <IconButton
            component="span"
            {...bindTrigger(popupState)}
            aria-label="show new notifications"
            color="primary"
          >
            <Badge
              color="error"
              badgeContent={
                notReadProductNotifications.length >= 1
                  ? notReadProductNotifications.length
                  : null
              }
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Card
              sx={{ display: "flex", flexDirection: "column", width: "300px" }}
            >
              <NotificationsList productNotifications={productNotifications} />

              {productNotifications.length >= 1 && (
                <ClearNotificationsButton
                  onClick={() => {
                    handleClearNotificationsClick();
                    popupState.close();
                  }}
                />
              )}
            </Card>
          </Popover>
        </>
      )}
    </PopupState>
  );
}
