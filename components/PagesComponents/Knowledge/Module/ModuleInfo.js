/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Pagination,
  Link,
  Box,
  Accordion,
  Tabs,
  Tab,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Grid,
  Typography,
  Tooltip,
} from "@mui/material";

import { inject, observer } from "mobx-react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const categoryList = {
  "middle-school": "Средняя школа",
  "main-school": "Основная школа",
  "high-school": "Высшая школа",
  university: "Высшее образование",
  clubs: "Кружки",
  hobby: "Хобби",
  bne: "ОГЭ",
  une: "ЕГЭ",
  "prof-skills": "Профессиональные навыки",
};

const themeList = {
  math: "Математика",
  algebra: "Алгебра",
  geometry: "Геометрия",
  languages: "Языки",
  physics: "Физика",
  chemistry: "Химия",
  biology: "Биология",
  geography: "География",
  history: "История",
  "social-science": "Обществознание",
  arts: "Искусства",
  informatics: "Информатика",
  literature: "Литература",
  philosophy: "Философия",
};

const difficultyList = {
  review: "Обзорный",
  newbie: "Новичок",
  amateur: "Любитель",
  enthusiast: "Энтузиаст",
  professional: "Профи",
  expert: "Эксперт",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DialogEndTestResults = inject()(
  observer(({ openTestResults, setOpenTestResults }) => (
    <Dialog
      open={openTestResults}
      onClose={() => setOpenTestResults(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Результаты теста
      </DialogTitle>
      <DialogContent />
      <DialogActions>
        <Button sx={{ color: "text.main" }} onClick={() => setOpenTestResults(false)} autoFocus>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  ))
);

const DialogEndTestApply = inject()(
  observer(({ openTestApply, setOpenTestApply, setOpenTestResults }) => (
    <Dialog
      open={openTestApply}
      onClose={() => setOpenTestApply(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Завершить тестирование?
      </DialogTitle>
      <DialogContent>
        Вы уверены, что хотите завершить тест?
        После этого вы не сможете изменить ответы и увидете результаты
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "text.main" }} onClick={() => setOpenTestApply(false)}>Отмена</Button>
        <Button
          sx={{ color: "text.main" }}
          onClick={() => {
            setOpenTestApply(false)
            setOpenTestResults(true)
          }}
          autoFocus>
          Завершить тест
        </Button>
      </DialogActions>
    </Dialog>
  ))
);

const ModuleInfo = inject("knowledgeSt")(
  observer(({ knowledgeSt, children }) => {
    const [value, setValue] = React.useState(0);
    const mobile = true
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [openTestApply, setOpenTestApply] = React.useState(false);
    const [openTestResults, setOpenTestResults] = React.useState(false);
    const [paginationCounter, setPaginationCounter] = React.useState(1);

    const handleChangePagination = (event, v) => {
      setPaginationCounter(v);
    };

    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            zIndex: 2000,
            position: "fixed",
            top: 0,
            left: mobile ? 0 : "296px",
            width: mobile ? "100%" : "calc(100% - 296px)",
          }}
        >
          <Accordion
            elevation={24}
            sx={{
              zIndex: 2000,
              width: "100%",
              backgroundColor: "background.1",
              color: "text.main",
            }}
            expanded={
              knowledgeSt.module.openAccordion === undefined
                ? false
                : knowledgeSt.module.openAccordion
            }
          >
            <AccordionSummary
              sx={{
                height: 4,
                marginLeft: -1,
              }}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container direction="row" alignItems="center">
                    <Tooltip title="Фильтры">
                      <span>
                        <IconButton
                          onClick={() =>
                            knowledgeSt.setModuleData(
                              "openAccordion",
                              !knowledgeSt.module.openAccordion
                            )
                          }
                          size="large"
                        >
                          <ExpandMoreIcon
                            sx={{
                              transform: knowledgeSt.module.openAccordion
                                ? "rotate(0deg)"
                                : "rotate(-90deg)",
                              transition: "0.2s",
                            }}
                          />
                        </IconButton>
                      </span>
                    </Tooltip>

                  </Grid>
                </Grid>
                <Grid item />
                <Grid item>
                  {knowledgeSt.module.type === "test" && <Tooltip title="Завершить тест">
                    <span>
                      <Button
                        onClick={() =>
                          setOpenTestApply(true)
                        }
                        size="large"
                        sx={{ color: "text.main" }}
                      >
                        Завершить
                      </Button>
                    </span>
                  </Tooltip>}
                  {<DialogEndTestApply openTestApply={openTestApply} setOpenTestApply={setOpenTestApply} setOpenTestResults={setOpenTestResults} />}
                  {<DialogEndTestResults openTestResults={openTestResults} setOpenTestResults={setOpenTestResults} />}
                  <Tooltip title="Вперёд">
                    <span>
                      <IconButton
                        onClick={() =>
                          knowledgeSt.loadPageInModule(
                            knowledgeSt.module.activeIdInMap + 1
                          )
                        }
                        size="large"
                      >
                        <DoubleArrowIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                marginTop: 0,
                paddingTop: 0,
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid sx={{ width: "100%" }}>
                  {!mobile && (
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      aria-label="full width tabs example"
                    // variant="fullWidth"
                    // centered
                    >
                      <Tab
                        label={
                          <Typography sx={{ color: "text.main" }}>
                            Описание
                          </Typography>
                        }
                        {...a11yProps(0)}
                      />
                      {knowledgeSt.module.map !== undefined && (
                        <Tab
                          label={
                            <Typography sx={{ color: "text.main" }}>
                              Навигация
                            </Typography>
                          }
                          {...a11yProps(1)}
                        />
                      )}
                    </Tabs>
                  )}
                  {mobile && (
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      aria-label="full width tabs example"
                      // variant="fullWidth"
                      centered
                    >
                      <Tab label={<DescriptionIcon />} {...a11yProps(0)} />
                      {knowledgeSt.module.map !== undefined && (
                        <Tab label={<MenuIcon />} {...a11yProps(1)} />
                      )}
                      <Tab label={<AnalyticsIcon />} {...a11yProps(2)} />
                      <Tab label={<AccountBoxIcon />} {...a11yProps(3)} />
                    </Tabs>
                  )}
                  <TabPanel value={value} index={0}>
                    <Typography variant="h6">
                      {knowledgeSt.module.name}
                    </Typography>
                    <Typography variant="h6">
                      {knowledgeSt.page.name}
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      sx={{
                        mt: 1,
                      }}
                    >
                      <Typography variant="subtitle2">
                        {themeList[knowledgeSt.module.theme]}
                      </Typography>
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        -
                      </Typography>
                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        {categoryList[knowledgeSt.module.category]}
                      </Typography>
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        -
                      </Typography>
                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        {difficultyList[knowledgeSt.module.difficulty]}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      sx={{
                        mt: 1,
                      }}
                    >
                      <Typography variant="subtitle2">
                        {knowledgeSt.module.description !== undefined
                          ? knowledgeSt.module.description
                          : "Автор не оставил описания"}
                      </Typography>
                    </Grid>
                  </TabPanel>
                  {knowledgeSt.module.map !== undefined && (
                    <TabPanel value={value} index={1}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                          mt: 1,
                        }}
                      >
                        <Typography variant="subtitle2">
                          Навигация по страницам
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        {knowledgeSt.module.map
                          .slice(
                            0 + (paginationCounter - 1) * 10,
                            10 + (paginationCounter - 1) * 10
                          )
                          .map((name, index) => (
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="center"
                              key={index.toString()}
                            >
                              {knowledgeSt.module.activeIdInMap ===
                                index + (paginationCounter - 1) * 10 && (
                                  <ArrowRightIcon />
                                )}
                              {/* {knowledgeSt.module.activeIdInMap !== (index + (paginationCounter - 1) * 10) && <CircleIcon sx={{fontSize: "8px", m: 1}} />} */}
                              <Link
                                sx={{
                                  cursor:
                                    knowledgeSt.module.activeIdInMap ===
                                      index + (paginationCounter - 1) * 10
                                      ? "default"
                                      : "pointer",
                                  ml:
                                    knowledgeSt.module.activeIdInMap ===
                                      index + (paginationCounter - 1) * 10
                                      ? 0
                                      : 3,
                                }}
                                onClick={() =>
                                  knowledgeSt.loadPageInModule(
                                    index + (paginationCounter - 1) * 10
                                  )
                                }
                                color="inherit"
                                underline={
                                  knowledgeSt.module.activeIdInMap ===
                                    index + (paginationCounter - 1) * 10
                                    ? "none"
                                    : "hover"
                                }
                              >
                                {name}
                              </Link>
                              {/* <Typography>
                                                    {item.name}
                                                </Typography> */}
                            </Grid>
                          ))}
                        <Pagination
                          sx={{
                            "& .MuiPaginationItem-root": {
                              color: (theme) =>
                                theme.palette.primary.contrastText,
                            },
                          }}
                          count={Math.ceil(
                            knowledgeSt.module.map.length / 10
                          )}
                          color="primary"
                          onChange={handleChangePagination}
                        />
                      </Grid>
                    </TabPanel>
                  )}
                  {/* <TabPanel value={value} index={2}>
                                    Item Three
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    Item Three
                                </TabPanel> */}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ zIndex: 1, width: "100%" }}
        >
          {children}
        </Grid>
      </Grid>
    );
  })
);

export default ModuleInfo;
