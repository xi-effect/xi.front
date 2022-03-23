/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-absolute-path */
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Box, Paper, Stack } from "@mui/material";
import questions from "../../../texts/support/FAQ";

function FAQ() {
  if (questions && questions.length) {
    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          maxWidth: 1520,
          height: "100%",
        }}
      >
        <Typography
          component="p"
          variant="IBMPlexSans700WhyLabel"
          sx={{
            cursor: "default",
            // textAlign: "center",
            // maxWidth: "912px",
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
          Список часто задаваемых вопросов
        </Typography>

        <Paper
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
            pt: "10px",
            pb: "10px",
          }}
        >
          <Stack direction="column">
            {questions.map((question, index) => (
              <Accordion
                key={index.toString()}
                id={`accordion ${index}`}
                sx={{
                  width: "100%",
                  bgcolor: "primary.main",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`panela-header ${index}`}
                >
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      component="div"
                      sx={{
                        cursor: "default",
                        fontSize: {
                          xs: "15px",
                          sm: "18px",
                          md: "20px",
                          lg: "25px",
                        },
                        textAlign: "left",
                      }}
                    >
                      {question.question}
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      component="p"
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
                        textAlign: "left",
                      }}
                    >
                      {question.answer}
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Paper>
      </Stack>
    );
  }
  return (
    <Box>
      <Typography>Нет часто задаваемых вопросов...</Typography>
    </Box>
  );
}
export default FAQ;
