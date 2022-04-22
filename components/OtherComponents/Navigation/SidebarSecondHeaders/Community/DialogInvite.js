import React from "react";
import { inject, observer } from "mobx-react";
import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  Tooltip,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CreateInvite from "kit/CreateInvite";

const DialogInvite = inject()(
  observer(
    ({ openDialogInvite, setOpenDialogInvite }) => {
      const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

      return (
        <Dialog
          fullScreen={fullScreen}
          open={openDialogInvite ?? false}
          onClose={() => setOpenDialogInvite(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: 64,
              width: "100%",
              p: 1,
            }}
          >
            <Typography sx={{ mt: 2, ml: 2, mr: "auto" }} variant="h5">
              Создать приглашение в сообщество
            </Typography>
            <Tooltip title="Закрыть">
              <IconButton
                sx={{ color: "text.secondary", ml: "auto", mt: 2, mr: 1 }}
                onClick={() => setOpenDialogInvite(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <DialogContent>
            <CreateInvite />
          </DialogContent>
        </Dialog>
      );
    }
  )
);

export default DialogInvite;
