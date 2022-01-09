import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { Box, Paper,Grid, useMediaQuery } from '@mui/material'
import {questions} from "/texts/support/FAQ"
import { motion } from 'framer-motion'

function FAQ(){
    const mobile = useMediaQuery(theme => theme.breakpoints.down('gx'));
    /*primary: {
        main: '#5F85D8',
        light: '#7f9ddf',
        dark: '#425d97',*/
if ( questions && questions.length){
    return <Box>
        <Typography
            component={"p"}
            variant="IBMPlexSans700WhyLabel"
            sx={{
                cursor: 'default',
                textAlign: 'center',
                maxWidth: '912px',
                fontSize: {
                    xs: '28px',
                    sm: '30px',
                    md: '36px',
                    lg: '40px',
                },
                ml:"10px",
                mr:"10px"
            }}
        >
            {'Список часто задаваемых вопросов'}
        </Typography>
        { questions.map((question,index)=>(
            <Paper
                
                key={index.toString()}
                elevation={24}
                sx={{
                    textAlign:"center",
                    zIndex: 10,
                    ml: 2,
                    mr: 2,
                    mt: 2,
                    mb: 2,
                    p:2,
                    maxWidth: '500px',
                    minwidth: '300px',
                   // height: '500px',
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
                sx={{
                }}
            >
                <Accordion 
                  sx={{
                    width: '100%',
                    bgcolor: "primary.main",
                    borderRadius: "20px",
                }}
                
              >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id={`panela-header ${index}`}>
                            <Typography
                                component={"p"}
                                variant='IBMPlexSans700WhyLabel'
                                sx={{
                                    cursor: 'default',
                                    textAlign: 'center',
                                    fontSize: {
                                        xs: '28px',
                                        sm: '30px',
                                        md: '36px',
                                        lg: '40px',
                                    },
                                }}
                            >
                                {question.question}
                            </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography
                        component={"p"}
                        variant='OpenSans400WhyLabel'
                        sx={{
                            cursor: 'default',
                            color: 'text.secondary',
                            fontSize: {
                                xs: '16px',
                                sm: '16px',
                                md: '22px',
                                lg: '22px',
                            },
                        }}
                    >
                            {question.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>  
            </Grid>
        </Paper>

            ))
        }
      
    </Box>
}
else{
    return <Box> 
        <Typography>
                    Нет часто задаваемых вопросов...
        </Typography>
         </Box>
}
}
export default FAQ