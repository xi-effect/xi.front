/* eslint-disable react-hooks/exhaustive-deps */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
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
import SearchOffIcon from '@mui/icons-material/SearchOff';
import TuneIcon from '@mui/icons-material/Tune';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, ClickAwayListener, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputBase, MenuItem, MenuList, Paper, Popper, Radio, RadioGroup, SpeedDial, SpeedDialAction, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { inject, observer } from 'mobx-react';
import React from 'react';






const Chipper = inject('rootStore', 'knowledgeStore', 'uiStore')(observer(({ rootStore, knowledgeStore, uiStore }) => {
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));
    const [mobileSearch, setMobileSearch] = React.useState(false);
    const [openGlobalList, setOpenGlobalList] = React.useState(false);
    const [openСategoryList, setOpenСategoryList] = React.useState(false);
    const [openThemeList, setOpenThemeList] = React.useState(false);
    const [openDifficultyList, setOpenDifficultyList] = React.useState(false);
    const [openSortList, setOpenSortList] = React.useState(false);

    const globalList = [
        { key: 0, title: "Избранное", name: "starred" },
        { key: 1, title: "Закреплённое", name: "pinned" },
        { key: 2, title: "Начатое", name: "started" },
    ]

    const categoryList = [
        { key: 0, title: "Средняя школа", name: "middle-school" },
        { key: 1, title: "Основная школа", name: "main-school" },
        { key: 2, title: "Высшая школа", name: "high-school" },
        { key: 3, title: "Высшее образование", name: "university" },
        { key: 4, title: "Кружки", name: "clubs" },
        { key: 5, title: "Хобби", name: "hobby" },
        { key: 6, title: "ОГЭ", name: "bne" },
        { key: 7, title: "ЕГЭ", name: "une" },
        { key: 8, title: "Профессиональные навыки", name: "prof-skills" },
    ]

    const themeList = [
        { key: 0, title: "Математика", name: "math" },
        { key: 1, title: "Алгебра", name: "algebra" },
        { key: 2, title: "Геометрия", name: "geometry" },
        { key: 3, title: "Языки", name: "languages" },
        { key: 4, title: "Физика", name: "physics" },
        { key: 5, title: "Химия", name: "chemistry" },
        { key: 6, title: "Биология", name: "biology" },
        { key: 7, title: "География", name: "geography" },
        { key: 8, title: "История", name: "history" },
        { key: 9, title: "Обществознание", name: "social-science" },
        { key: 10, title: "Искусства", name: "arts" },
        { key: 11, title: "Информатика", name: "informatics" },
        { key: 12, title: "Литература", name: "literature" },
        { key: 13, title: "Философия", name: "philosophy" },
    ]

    const difficultyList = [
        { key: 0, title: "Обзорный", name: "review" },
        { key: 1, title: "Новичок", name: "newbie" },
        { key: 2, title: "Любитель", name: "amateur" },
        { key: 3, title: "Энтузиаст", name: "enthusiast" },
        { key: 4, title: "Профи", name: "professional" },
        { key: 5, title: "Эксперт", name: "expert" },
    ]

    const sortList = [
        { key: 0, title: "По популярности", clicked: true, name: "popularity" },
        { key: 1, title: "По дате посещения: сначала недавние", clicked: false, name: "visit-date" },
        { key: 2, title: "По дате создания: сначала новые", clicked: false, name: "creation-date" },
    ]

    React.useEffect(() => {
        rootStore.fetchDataScr(`${rootStore.url}/filters/`, "GET")
            .then((data) => {
                console.log("filtersI:", data)
                // if (data != undefined) {
                //     store.setFiltersGlobal(data)
                //     if (!store.allLoading) store.loadingMoreCourses()
                // }
            });

    }, []);




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
                        {(!mobileSearch || !mobile) && <Tooltip disableHoverListener={!open} title="Применить фильтры">
                            <span>
                                <IconButton
                                    color="inherit"
                                    disabled={!open}
                                    onClick={() => knowledgeStore.loadModuleList()}
                                    size="large">
                                    <SavedSearchIcon
                                    />
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {(!mobileSearch || !mobile) && <Tooltip disableHoverListener={!open} title="Удалить фильтры">
                            <span>
                                <IconButton
                                    color="inherit"
                                    disabled={!open}
                                    onClick={() => knowledgeStore.clearFilters()}
                                    size="large">
                                    <SearchOffIcon
                                    />
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {/* Поиск в десктоп */}
                        {!mobile && <InputBase
                            value={knowledgeStore.moduleList.search}
                            onChange={(event) => knowledgeStore.setModuleListData("search", event.target.value)}
                            sx={{
                                color: 'text.main',
                                flex: 1,
                                maxWidth: "500px",
                                marginLeft: "auto",
                            }}
                            placeholder="Поиск модулей"
                            inputProps={{ 'aria-label': 'Поиск страниц' }}
                        />}
                        {!mobile && <Tooltip title="Очистить поиск">
                            <span>
                                <IconButton
                                    onClick={() => knowledgeStore.clearSearchInModules()}
                                    disabled={knowledgeStore.moduleList.search.length === 0}
                                    type="submit"
                                    aria-label="search"
                                    size="large">
                                    <ClearIcon />
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {!mobile && <Tooltip title="Найти">
                            <span>
                                <IconButton
                                    onClick={() => knowledgeStore.goSearchInModules()}
                                    disabled={knowledgeStore.moduleList.search.length < 3}
                                    aria-label="search"
                                    size="large">
                                    <SearchIcon />
                                </IconButton>
                            </span>
                        </Tooltip>}

                        {mobileSearch && mobile && <InputBase
                            value={knowledgeStore.moduleList.search}
                            onChange={(event) => knowledgeStore.setModuleListData("search", event.target.value)}
                            sx={{
                                color: 'text.main',
                                flex: 1,
                                maxWidth: "500px",
                                marginLeft: "auto",
                            }}
                            placeholder="Поиск модулей"
                            inputProps={{ 'aria-label': 'Поиск страниц' }}
                        />}
                        <Grid sx={{ marginLeft: "auto", }}>

                        </Grid>
                        {mobileSearch && mobile && <Tooltip title="Очистить поиск">
                            <span>
                                <IconButton
                                    onClick={knowledgeStore.clearSearchInModules}
                                    disabled={knowledgeStore.moduleList.search.length === 0}
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
                                    disabled={mobile ? false : knowledgeStore.moduleList.search.length < 3}
                                    aria-label="search"
                                    size="large">
                                    <SearchIcon />
                                </IconButton>
                            </span>
                        </Tooltip>}
                        {mobileSearch && mobile && <Tooltip title="Найти">
                            <span>
                                <IconButton
                                    onClick={() => knowledgeStore.goSearchInModules()}
                                    disabled={mobile ? false : knowledgeStore.moduleList.search.length < 3}
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
                                    disabled={mobile ? false : knowledgeStore.moduleList.search.length < 3}
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
                                width: "110px",
                                marginRight: 0,
                                marginLeft: 0,
                            }}
                        >
                            <Tooltip title="Назад">
                                <span>
                                    <IconButton
                                        onClick={knowledgeStore.prevPageInModules}
                                        disabled={knowledgeStore.moduleList.counter === 0 ? true : false}
                                        size="large">
                                        <NavigateBeforeIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title="Страница">
                                <Typography> {`${knowledgeStore.moduleList.counter + 1}`} </Typography>
                            </Tooltip>
                            <Tooltip title="Вперёд">
                                <span>
                                    <IconButton
                                        onClick={knowledgeStore.nextPageInModules}
                                        disabled={knowledgeStore.moduleList.modules.length < 12 ? true : false}
                                        size="large">
                                        <NavigateNextIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Grid>}
                    </Grid>
                </AccordionSummary>
                <AccordionDetails sx={{
                    marginTop: 0,
                    paddingTop: 0,
                }}>
                    <Grid
                        item
                        sx={{ marginBottom: 1, }}
                        container
                        direction="row"
                    >
                        <Grid
                            item
                            sx={{
                                width: 'auto',
                                paddingLeft: 1,
                                paddingRight: 1,
                            }}
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Accordion elevation={0} sx={{
                                width: "100%",
                                backgroundColor: 'background.1',
                                color: 'text.main',
                            }} expanded={openGlobalList}>
                                <AccordionSummary
                                    onClick={() => setOpenGlobalList(!openGlobalList)}
                                    sx={{ width: "100%", }}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Tooltip title="Фильтры">
                                        <span>
                                            <IconButton size="large">
                                                <ArrowDropDownIcon
                                                    sx={{
                                                        transform: openGlobalList ? "rotate(0deg)" : "rotate(-90deg)",
                                                        transition: "0.2s",
                                                    }}
                                                />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                    <Typography sx={{
                                        marginTop: 1.5,
                                    }}> Глобальные </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{
                                    marginTop: 0,
                                    paddingTop: 0,
                                }}>
                                    {globalList.map((chip, index) => (
                                        <Grid sx={{
                                            marginLeft: '6px',
                                            marginTop: '8px',
                                            cursor: 'pointer',
                                        }} key={chip.key.toString()}>
                                            <Chip
                                                //clickable={false}
                                                sx={{
                                                    border: '2px solid',
                                                    borderColor: 'text.dark',
                                                    cursor: 'pointer',
                                                    backgroundColor: chip.name === knowledgeStore.moduleList.filters.global ? 'primary.main' : null,
                                                    borderColor: chip.name === knowledgeStore.moduleList.filters.global ? 'primary.main' : null,
                                                    '&:hover': {
                                                        backgroundColor: chip.name === knowledgeStore.moduleList.filters.global ? 'primary.main' : null,
                                                        borderColor: chip.name === knowledgeStore.moduleList.filters.global ? 'primary.main' : null,
                                                    }
                                                }}
                                                onClick={() => knowledgeStore.setModuleListDataSecondary("filters", "global", chip.name === knowledgeStore.moduleList.filters.global ? null : chip.name)}
                                                label={
                                                    <Typography >
                                                        {chip.title}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    ))}
                                </AccordionDetails>

                            </Accordion>

                        </Grid>
                        <Grid
                            item
                            sx={{
                                width: 'auto',
                                paddingLeft: 1,
                                paddingRight: 1,
                            }}
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Accordion elevation={0} sx={{
                                width: "100%",
                                backgroundColor: 'background.1',
                                color: 'text.main',
                            }} expanded={openСategoryList}>
                                <AccordionSummary
                                    onClick={() => setOpenСategoryList(!openСategoryList)}
                                    sx={{ width: "100%", }}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Tooltip title="Фильтры">
                                        <>
                                            <IconButton size="large">
                                                <ArrowDropDownIcon
                                                    sx={{
                                                        transform: openСategoryList ? "rotate(0deg)" : "rotate(-90deg)",
                                                        transition: "0.2s",
                                                    }}
                                                />
                                            </IconButton>
                                        </>
                                    </Tooltip>
                                    <Typography sx={{
                                        marginTop: 1.5,
                                    }}> По Категории </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{
                                    marginTop: 0,
                                    paddingTop: 0,
                                }}>
                                    {categoryList.map((chip) => (
                                        <Grid sx={{
                                            marginLeft: '6px',
                                            marginTop: '8px',
                                            cursor: 'pointer',
                                        }} key={chip.key.toString()}>
                                            <Chip
                                                clickable={false}
                                                sx={{
                                                    border: '2px solid',
                                                    borderColor: 'text.dark',
                                                    cursor: 'pointer',
                                                    backgroundColor: chip.name === knowledgeStore.moduleList.filters.global ? 'primary.main' : null,
                                                    borderColor: chip.name === knowledgeStore.moduleList.filters.global ? 'primary.main' : null,
                                                    '&:hover': {
                                                        backgroundColor: chip.name === knowledgeStore.moduleList.filters.global ? 'primary.main' : null,
                                                        borderColor: chip.name === knowledgeStore.moduleList.filters.global ? 'primary.main' : null,
                                                    }
                                                }}
                                                onClick={() => knowledgeStore.setModuleListDataSecondary("filters", "category", chip.name === knowledgeStore.moduleList.filters.category ? null : chip.name)}
                                                label={
                                                    <Typography>
                                                        {chip.title}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                width: 'auto',
                                paddingLeft: 1,
                                paddingRight: 1,
                            }}
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Accordion elevation={0} sx={{
                                width: "100%",
                                backgroundColor: 'background.1',
                                color: 'text.main',
                            }} expanded={openThemeList}>
                                <AccordionSummary
                                    onClick={() => setOpenThemeList(!openThemeList)}
                                    sx={{ width: "100%", }}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Tooltip title="Фильтры">
                                        <>
                                            <IconButton size="large">
                                                <ArrowDropDownIcon
                                                    sx={{
                                                        transform: openThemeList ? "rotate(0deg)" : "rotate(-90deg)",
                                                        transition: "0.2s",
                                                    }}
                                                />
                                            </IconButton>
                                        </>
                                    </Tooltip>
                                    <Typography sx={{
                                        marginTop: 1.5,
                                    }}> По Теме </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{
                                    marginTop: 0,
                                    paddingTop: 0,
                                }}>
                                    {themeList.map((chip) => (
                                        <Grid sx={{
                                            marginLeft: '6px',
                                            marginTop: '8px',
                                            cursor: 'pointer',
                                        }} key={chip.key.toString()}>
                                            <Chip
                                                clickable={false}
                                                sx={{
                                                    border: '2px solid',
                                                    borderColor: 'text.dark',
                                                    cursor: 'pointer',
                                                    backgroundColor: chip.name === knowledgeStore.moduleList.filters.theme ? 'primary.main' : null,
                                                    borderColor: chip.name === knowledgeStore.moduleList.filters.theme ? 'primary.main' : null,
                                                    '&:hover': {
                                                        backgroundColor: chip.name === knowledgeStore.moduleList.filters.theme ? 'primary.main' : null,
                                                        borderColor: chip.name === knowledgeStore.moduleList.filters.theme ? 'primary.main' : null,
                                                    }
                                                }}
                                                onClick={() => knowledgeStore.setModuleListDataSecondary("filters", "theme", chip.name === knowledgeStore.moduleList.filters.theme ? null : chip.name)}
                                                label={
                                                    <Typography>
                                                        {chip.title}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                width: 'auto',
                                paddingLeft: 1,
                                paddingRight: 1,
                            }}
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Accordion elevation={0} sx={{
                                width: "100%",
                                backgroundColor: 'background.1',
                                color: 'text.main',
                            }} expanded={openDifficultyList}>
                                <AccordionSummary
                                    onClick={() => setOpenDifficultyList(!openDifficultyList)}
                                    sx={{ width: "100%", }}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Tooltip title="Фильтры">
                                        <>
                                            <IconButton size="large">
                                                <ArrowDropDownIcon
                                                    sx={{
                                                        transform: openDifficultyList ? "rotate(0deg)" : "rotate(-90deg)",
                                                        transition: "0.2s",
                                                    }}
                                                />
                                            </IconButton>
                                        </>
                                    </Tooltip>
                                    <Typography sx={{
                                        marginTop: 1.5,
                                    }}> По Сложности </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{
                                    marginTop: 0,
                                    paddingTop: 0,
                                }}>
                                    {difficultyList.map((chip) => (
                                        <Grid sx={{
                                            marginLeft: '6px',
                                            marginTop: '8px',
                                            cursor: 'pointer',
                                        }} key={chip.key.toString()}>
                                            <Chip
                                                clickable={false}
                                                sx={{
                                                    border: '2px solid',
                                                    borderColor: 'text.dark',
                                                    cursor: 'pointer',
                                                    backgroundColor: chip.name === knowledgeStore.moduleList.filters.difficulty ? 'primary.main' : null,
                                                    borderColor: chip.name === knowledgeStore.moduleList.filters.difficulty ? 'primary.main' : null,
                                                    '&:hover': {
                                                        backgroundColor: chip.name === knowledgeStore.moduleList.filters.difficulty ? 'primary.main' : null,
                                                        borderColor: chip.name === knowledgeStore.moduleList.filters.difficulty ? 'primary.main' : null,
                                                    }
                                                }}
                                                onClick={() => knowledgeStore.setModuleListDataSecondary("filters", "difficulty", chip.name === knowledgeStore.moduleList.filters.difficulty ? null : chip.name)}
                                                label={
                                                    <Typography>
                                                        {chip.title}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                width: 'auto',
                                paddingLeft: 1,
                                paddingRight: 1,
                            }}
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Accordion elevation={0} sx={{
                                width: "100%",
                                backgroundColor: 'background.1',
                                color: 'text.main',
                            }} expanded={openSortList}>
                                <AccordionSummary
                                    onClick={() => setOpenSortList(!openSortList)}
                                    sx={{ width: "100%", }}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Tooltip title="Фильтры">
                                        <>
                                            <IconButton size="large">
                                                <ArrowDropDownIcon
                                                    sx={{
                                                        transform: openSortList ? "rotate(0deg)" : "rotate(-90deg)",
                                                        transition: "0.2s",
                                                    }}
                                                />
                                            </IconButton>
                                        </>
                                    </Tooltip>
                                    <Typography sx={{
                                        marginTop: 1.5,
                                    }}> Сортировка </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{
                                    marginTop: 0,
                                    paddingTop: 0,
                                }}>
                                    {sortList.map((chip) => (
                                        <Grid sx={{
                                            marginLeft: '6px',
                                            marginTop: '8px',
                                            cursor: 'pointer',
                                        }} key={chip.key.toString()}>
                                            <Chip
                                                clickable={false}
                                                sx={{
                                                    border: '2px solid',
                                                    borderColor: 'text.dark',
                                                    cursor: 'pointer',
                                                    backgroundColor: chip.name === knowledgeStore.moduleList.sort ? 'primary.main' : null,
                                                    borderColor: chip.name === knowledgeStore.moduleList.sort ? 'primary.main' : null,
                                                    '&:hover': {
                                                        backgroundColor: chip.name === knowledgeStore.moduleList.sort ? 'primary.main' : null,
                                                        borderColor: chip.name === knowledgeStore.moduleList.sort ? 'primary.main' : null,
                                                    }
                                                }}
                                                onClick={() => knowledgeStore.setModuleListData("sort", chip.name)}
                                                label={
                                                    <Typography>
                                                        {chip.title}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Divider sx={{
                width: "100%",
                height: "1px",
                backgroundColor: 'text.main',
            }} />
        </Grid>
    );
}));

export default Chipper;
