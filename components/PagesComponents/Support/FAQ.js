import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Box, Paper, Grid } from "@mui/material";
import { questions } from "/texts/support/FAQ";

function FAQ() {
  if (questions && questions.length) {
    return (
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        xs={12}
        sm={12}
        md={12}
        dl={12}
        lg={12}
        gx={6}
        xl={4}
      >
        <Typography
          component={"p"}
          variant="IBMPlexSans700WhyLabel"
          sx={{
            cursor: "default",
            textAlign: "center",
            maxWidth: "912px",
            fontSize: {
              xs: "28px",
              sm: "30px",
              md: "36px",
              lg: "40px",
            },
            ml: "10px",
            mr: "10px",
          }}
        >
          {"Список часто задаваемых вопросов"}
        </Typography>
        <Box>
          {questions.map((question, index) => (
            <Paper
              key={index.toString()}
              elevation={24}
              sx={{
                textAlign: "center",
                zIndex: 10,
                ml: 2,
                mr: 2,
                mt: 2,
                mb: 2,
                p: 2,
                minwidth: "300px",
                bgcolor: "grey.400",
                borderRadius: "20px",
              }}
            >
              <Grid
                item
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Accordion
                  sx={{
                    width: "100%",
                    bgcolor: "primary.main",
                    borderRadius: "20px",
                  }}
                >
                 <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id={`panela-header ${index}`}
                  >
                    <Typography
                      component={"p"}
                      variant="IBMPlexSans700WhyLabel"
                      sx={{
                        cursor: "default",
                        textAlign: "center",
                        fontSize: {
                          xs: "28px",
                          sm: "30px",
                          md: "36px",
                          lg: "40px",
                        },
                      }}
                    >
                      {question.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      component={"p"}
                      variant="OpenSans400WhyLabel"
                      sx={{
                        cursor: "default",
                        color: "text.secondary",
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "22px",
                          lg: "22px",
                        },
                      }}
                    >
                      {question.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Paper>
          ))}
        </Box>
      </Grid>
    );
  } else {
    return (
      <Box>
        <Typography>Нет часто задаваемых вопросов...</Typography>
      </Box>
    );
  }
}
export default FAQ;
