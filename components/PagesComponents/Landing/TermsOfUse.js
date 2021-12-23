import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {IconButton} from "@mui/material";
import {useState} from "react";
import {useCopyToClipboard} from "react-use-copy-to-clipboard";



const TermsOfUse = ({ handleClose, open}) => {

    const [text, setText] = React.useState('');
    const [state, copyToClipboard] = useCopyToClipboard();

    const textLisence = "Cras mattis consectetur purus sit amet fermentum.\n" +
        "Cras justo odio, dapibus ac facilisis in, egestas eget quam.\n" +
        "Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\n" +
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur et."

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="dialog-title"><IconButton type="button" onClick={() => copyToClipboard(text)}><ContentCopyIcon/></IconButton>Subscribe</DialogTitle>
            <DialogContent dividers={'paper'}>

                <DialogContentText value={text} onChange={e => setText(e.target.value)}>
                    {textLisence}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TermsOfUse
