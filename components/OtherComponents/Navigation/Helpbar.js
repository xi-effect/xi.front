import React from 'react';
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { makeStyles } from '@mui/styles';
import { SwipeableDrawer, useTheme, Accordion, AccordionSummary, AccordionDetails, Typography, Divider, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme => theme.typography.pxToRem(15),
        flexBasis: '20.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme => theme.typography.pxToRem(15),
        color: theme => theme.palette.text.secondary,
    },
}));

const Helpbar = inject('store')(observer(({ store, openHelpMenu, setOpenHelpMenu }) => {
    const theme = useTheme();
    const classes = useStyles(theme);


    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <SwipeableDrawer
            anchor="left"
            open={openHelpMenu}
            onClose={() => setOpenHelpMenu(false)}
            onOpen={() => setOpenHelpMenu(true)}
        >
            <div className={classes.root}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>General settings</Typography>
                        <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                            maximus est, id dignissim quam.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography className={classes.heading}>Users</Typography>
                        <Typography className={classes.secondaryHeading}>
                            You are currently not an owner
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                            diam eros in elit. Pellentesque convallis laoreet laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography className={classes.heading}>Advanced settings</Typography>
                        <Typography className={classes.secondaryHeading}>
                            Filtering has been entirely disabled for whole web server
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.heading}>Personal data</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </SwipeableDrawer >
    );
}));

export default Helpbar