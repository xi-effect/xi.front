import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Box, Stack } from "@mui/material";
import { questions } from "texts/support/FAQ";

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
          component="h6"
          variant="IBMPlexSans700WhyLabel"
          sx={{
            cursor: "default",
            fontSize: {
              xs: "20px",
              sm: "24px",
              md: "28px",
              lg: "32px",
            },
            ml: "10px",
            mr: "10px",
            p: 2,
          }}
        >
          Список часто задаваемых вопросов
        </Typography>
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
                    variant="h5"
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
