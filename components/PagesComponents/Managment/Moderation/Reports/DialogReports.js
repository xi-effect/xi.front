import React from 'react';
import { styled } from '@mui/material/styles';
import { Accordion, AccordionSummary, AccordionDetails, Dialog, DialogContent, Typography, Divider, IconButton, DialogActions, TextField, DialogContentText, DialogTitle, Button, useTheme, Tooltip } from '@mui/material';


import CloseIcon from '@mui/icons-material/Close';
import PageviewIcon from '@mui/icons-material/Pageview';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { inject, observer } from 'mobx-react'

const PREFIX = 'DialogReports';

const classes = {
    dialog: `${PREFIX}-dialog`,
    DialogTitle: `${PREFIX}-DialogTitle`,
    DialogContent: `${PREFIX}-DialogContent`,
    DialogActions: `${PREFIX}-DialogActions`,
    closeButton: `${PREFIX}-closeButton`,
    AccordionSummary: `${PREFIX}-AccordionSummary`,
    AccordionDetails: `${PREFIX}-AccordionDetails`,
    heading: `${PREFIX}-heading`,
    secondaryHeading: `${PREFIX}-secondaryHeading`,
    icon: `${PREFIX}-icon`,
    IconButton: `${PREFIX}-IconButton`,
    divider: `${PREFIX}-divider`
};

const StyledDialog = styled(Dialog)((
    {
        theme
    }
) => ({
    [`&.${classes.dialog}`]: {
        zIndex: "10 !important",
        width: '100vw',
        height: '100vh',
    },

    [`& .${classes.DialogTitle}`]: {
        backgroundColor: theme => theme.palette.blueGrey["5"],
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.DialogContent}`]: {
        backgroundColor: theme => theme.palette.blueGrey["5"]
    },

    [`& .${classes.DialogActions}`]: {
        backgroundColor: theme => theme.palette.blueGrey["5"],

    },

    [`& .${classes.closeButton}`]: {
        position: 'absolute',
        right: theme => theme.spacing(1),
        top: theme => theme.spacing(1),
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.AccordionSummary}`]: {
        backgroundColor: theme => theme.palette.blueGrey["5"]
    },

    [`& .${classes.AccordionDetails}`]: {
        backgroundColor: theme => theme.palette.blueGrey["5"]
    },

    [`& .${classes.heading}`]: {
        fontSize: theme => theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },

    [`& .${classes.secondaryHeading}`]: {
        fontSize: theme => theme.typography.pxToRem(15),
        color: theme => theme.palette.text.secondary,
    },

    [`& .${classes.icon}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.IconButton}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.divider}`]: {
        backgroundColor: theme => theme.palette.primary.contrastText,
    }
}));

const DialogReports = inject('store')(observer(({ packageId, openDialogReports, setOpenDialogReports, store }) => {
    const theme = useTheme();


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
        <StyledDialog className={classes.dialog} open={openDialogReports} onClose={() => setOpenDialogReports(false)} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.DialogTitle} id="form-dialog-title">
                <Typography variant="h6">Список жалоб</Typography>
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={() => setOpenDialogReports(false)}
                    size="large">
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
                    <IconButton
                        className={classes.IconButton}
                        onClick={() => setOpenDialogReports(false)}
                        color="primary"
                        size="large">
                        <PageviewIcon />
                    </IconButton>
                </Tooltip>
                <Divider className={classes.divider} orientation="vertical" flexItem />
                <Tooltip title="Отклонить жалобы">
                    <IconButton
                        className={classes.IconButton}
                        onClick={() => setOpenDialogReports(false)}
                        color="primary"
                        size="large">
                        <ClearAllIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Отправить на модерацию, оставив в открытом доступе">
                    <IconButton
                        className={classes.IconButton}
                        onClick={() => setOpenDialogReports(false)}
                        color="primary"
                        size="large">
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Отправить на модерацию, убрав из открытого доступа">
                    <IconButton
                        className={classes.IconButton}
                        onClick={() => setOpenDialogReports(false)}
                        color="primary"
                        size="large">
                        <VisibilityOffIcon />
                    </IconButton>
                </Tooltip>
            </DialogActions>
        </StyledDialog>
    );
}))

export default DialogReports