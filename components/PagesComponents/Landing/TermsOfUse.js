/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useCopyToClipboard } from "react-use";


function TermsOfUse({ open, setOpen, type }) {
    const [state, copyToClipboard] = useCopyToClipboard();


    const textTermsOfUse = "Cras mattis consectetur purus sit amet fermentum.\n" +
        "Cras justo odio, dapibus ac facilisis in, egestas eget quam.\n" +
        "Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\n" +
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur et."

    const textLicense = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
        "Scelerisque eleifend donec pretium vulputate sapien nec sagittis. " +
        "Pellentesque massa placerat duis ultricies lacus sed. Congue quisque " +
        "Vel eros donec ac odio."



    return (
        <Dialog
            open={open}
        // onClose={handleClose}
        >
            <DialogTitle id="dialog-title">
                {type === 0 ? "Пользовательское соглашение" : "Лицензионное соглашение"}
                <IconButton sx={{ ml: "auto" }} onClick={() => copyToClipboard(type === 0 ? textTermsOfUse : textLicense)}>
                    <ContentCopyIcon />
                </IconButton>
                <IconButton>
                    <DownloadIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText
                    id="dialog-content"
                >
                    {type === 0 ? textTermsOfUse : textLicense}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TermsOfUse
