import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Dialog, DialogContent, Typography, Divider, IconButton, DialogActions, TextField, DialogContentText, DialogTitle, Button, useTheme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import CloseIcon from '@mui/icons-material/Close';
import PageviewIcon from '@mui/icons-material/Pageview';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
    dialog: {
        zIndex: "10 !important",
        width: '100vw',
        height: '100vh',
    },
    DialogTitle: {
        backgroundColor: theme => theme.palette.blueGrey["5"],
        color: theme => theme.palette.primary.contrastText,
    },
    DialogContent: {
        backgroundColor: theme => theme.palette.blueGrey["5"]
    },
    DialogActions: {
        backgroundColor: theme => theme.palette.blueGrey["5"],

    },
    closeButton: {
        position: 'absolute',
        right: theme => theme.spacing(1),
        top: theme => theme.spacing(1),
        color: theme => theme.palette.primary.contrastText,
    },
    AccordionSummary: {
        backgroundColor: theme => theme.palette.blueGrey["5"]
    },
    AccordionDetails: {
        backgroundColor: theme => theme.palette.blueGrey["5"]
    },
    heading: {
        fontSize: theme => theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme => theme.typography.pxToRem(15),
        color: theme => theme.palette.text.secondary,
    },
    icon: {
        color: theme => theme.palette.primary.contrastText,
    },
    IconButton: {
        color: theme => theme.palette.primary.contrastText,
    },
    divider: {
        backgroundColor: theme => theme.palette.primary.contrastText,
    }
}));

const DialogReports = inject('store')(observer(({ packageId, openDialogReports, setOpenDialogReports, store }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const aсcordion = [
        { user: "Ξ Effect", theme: "Тема", message: "Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения " },
        { user: "Ξ Effect", theme: "Тема", message: "Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения " },
        { user: "Ξ Effect", theme: "Тема", message: "Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения Текст сообщения " },

    ]

    return (
        <Dialog className={classes.dialog} open={openDialogReports} onClose={() => setOpenDialogReports(false)} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.DialogTitle} id="form-dialog-title">
                <Typography variant="h6">Список жалоб</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpenDialogReports(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.DialogContent}>
                <DialogContentText>
                    Ниже представлены все жалобы, отправленные пользователями на конкретную единицу контента
                </DialogContentText>
                {
                    aсcordion.map((item, index) => (
                        <Accordion elevation={0} key={index} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                className={classes.AccordionSummary}
                                expandIcon={<ExpandMoreIcon className={classes.icon} />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>{item.user}</Typography>
                                <Typography className={classes.secondaryHeading}>{item.theme}</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                className={classes.AccordionDetails}
                            >
                                <Typography>
                                    {item.message}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }

            </DialogContent>
            <DialogActions className={classes.DialogActions}>
                <Tooltip title="Посмотреть контент">
                    <IconButton className={classes.IconButton} onClick={() => setOpenDialogReports(false)} color="primary">
                        <PageviewIcon />
                    </IconButton>
                </Tooltip>
                <Divider className={classes.divider} orientation="vertical" flexItem />
                <Tooltip title="Отклонить жалобы">
                    <IconButton className={classes.IconButton} onClick={() => setOpenDialogReports(false)} color="primary">
                        <ClearAllIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Отправить на модерацию, оставив в открытом доступе">
                    <IconButton className={classes.IconButton} onClick={() => setOpenDialogReports(false)} color="primary">
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Отправить на модерацию, убрав из открытого доступа">
                    <IconButton className={classes.IconButton} onClick={() => setOpenDialogReports(false)} color="primary">
                        <VisibilityOffIcon />
                    </IconButton>
                </Tooltip>
            </DialogActions>
        </Dialog>
    );
}))

export default DialogReports