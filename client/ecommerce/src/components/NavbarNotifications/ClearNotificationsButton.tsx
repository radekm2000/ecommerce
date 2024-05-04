import { Button } from '@mui/material';

type Props = {
    onClick(): void 
}

export const ClearNotificationsButton = ({onClick}: Props) => {
  return (
    <Button
    component="span"
    onClick={onClick}
    variant="outlined"
    sx={{
      textTransform: "none",
      color: "#007782",
      width: "100%",
      padding: "16px",
      border: "none",
      "&: hover": {
        backgroundColor: "rgba(23, 23, 23, 0.05)",
        border: "none",
      },
    }}
  >
    Clear notifications
  </Button>
  )
}
