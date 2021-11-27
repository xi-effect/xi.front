/* eslint-disable react-hooks/exhaustive-deps */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import ClearAllIcon from '@mui/icons-material/ClearAll';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RedoIcon from '@mui/icons-material/Redo';
import ReorderIcon from '@mui/icons-material/Reorder';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import TuneIcon from '@mui/icons-material/Tune';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, ClickAwayListener, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputBase, MenuItem, MenuList, Paper, Popper, Radio, RadioGroup, SpeedDial, SpeedDialAction, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { inject, observer } from 'mobx-react';
import React from 'react';




const Chipper = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();
    const knowledgeUI = uiStore.knowledgeUI
    const [open, setOpen] = React.useState(false);
    const [mobileSearch, setMobileSearch] = React.useState(false);
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));

    return (
        <Grid container direction="column"
            sx={{
                margin: 0,
                marginLeft: 4,
                marginRight: 4,
                width: "calc(100% - 64px)",
                borderRadius: 2,
                backgroundColor: 'background.1',
            }}
        >
            <Accordion elevation={0}
                sx={{
                    width: "100%",
                    backgroundColor: 'background.1',
                    color: 'text.main',
                }}
                expanded={open}>
                <AccordionSummary
                    sx={{ width: "100%", }}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        {(!mobileSearch || !mobile) && <Tooltip title="Фильтры">
                            <span>
                                <IconButton onClick={() => setOpen(!open)} size="large">
                                    <ExpandMoreIcon
                                        sx={{
                                            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
                                            transition: "0.2s",
                                        }}
                                    />
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {(!mobileSearch || !mobile) && <Tooltip title={gridTypeLabel(knowledgeUI.gridTypeOnPage)}>
                            <span>
                                <IconButton
                                    onClick={() => setGridType(knowledgeUI.gridTypeOnPage)}
                                    color="inherit"
                                    size="large">
                                    {gridTypeIcon(knowledgeUI.gridTypeOnPage)}
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {(!mobileSearch || !mobile) && <Tooltip title={cardContentLabel(knowledgeUI.contentTypeOnPage)}>
                            <span>
                                <IconButton
                                    color="inherit"
                                    onClick={() => setContentType(knowledgeUI.contentTypeOnPage)}
                                    size="large">
                                    {cardContentIcon(knowledgeUI.contentTypeOnPage)}
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {/* Поиск в десктоп */}
                        

                        {mobileSearch && mobile && <InputBase
                            value={knowledgeStore.pageList.search}
                            onChange={(event) => knowledgeStore.setPageListData("search", event.target.value)}
                            sx={{
                                color: 'text.main',
                                flex: 1,
                                maxWidth: "500px",
                                marginLeft: "auto",
                            }}
                            placeholder="Поиск страниц"
                            inputProps={{ 'aria-label': 'Поиск страниц' }}
                        />}
                        <Grid sx={{ marginLeft: "auto", }}>

                        </Grid>
                        {mobileSearch && mobile && <Tooltip title="Очистить поиск">
                            <span>
                                <IconButton
                                    onClick={knowledgeStore.clearSearchInPages}
                                    disabled={knowledgeStore.pageList.search.length === 0}
                                    type="submit"
                                    aria-label="search"
                                    size="large">
                                    <ClearIcon />
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {!mobileSearch && mobile && <Tooltip title="Очистить поиск">
                            <span>
                                <IconButton
                                    onClick={() => setMobileSearch(true)}
                                    disabled={mobile ? false : knowledgeStore.pageList.search.length < 3}
                                    aria-label="search"
                                    size="large">
                                    <SearchIcon />
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {mobileSearch && mobile && <Tooltip title="Найти">
                            <span>
                                <IconButton
                                    onClick={() => knowledgeStore.goSearchInPages()}
                                    disabled={mobile ? false : knowledgeStore.pageList.search.length < 3}
                                    aria-label="search"
                                    size="large">
                                    <SearchIcon />
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {mobileSearch && mobile && <Tooltip title="Назад">
                            <span>
                                <IconButton
                                    onClick={() => setMobileSearch(false)}
                                    disabled={mobile ? false : knowledgeStore.pageList.search.length < 3}
                                    aria-label="search"
                                    size="large">
                                    <RedoIcon />
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {(!mobileSearch || !mobile) && <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                width: "130px",
                                marginRight: 0,
                                marginLeft: 0,
                            }}
                        >
                            
                        </Grid>}
                    </Grid>
                </AccordionSummary>
                <AccordionDetails sx={{
                    marginTop: 0,
                    paddingTop: 0,
                }}>

                </AccordionDetails>
            </Accordion>
            <Divider sx={{
                width: "100%",
                height: "1px",
                backgroundColor: 'text.main',
            }} />
        </Grid >
    );
}));

export default Chipper;