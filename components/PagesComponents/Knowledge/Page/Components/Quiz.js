import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useTheme, Button, Input, Grid, Radio, Checkbox, Typography, useMediaQuery } from '@mui/material';

import { inject, observer } from 'mobx-react'

const Quiz = inject('rootStore', 'knowledgeStore')(observer(({ rootStore, knowledgeStore, index }) => {
    const value = knowledgeStore.page.components[index]
    // Simulated props for the purpose of the example
    const props = { fontSize: value.fontSize, textAlign: value.textAlign, fontStyle: value.fontStyle, fontWeight: value.fontWeight, textDecoration: value.textDecoration, backgroundColor: 'black', color: 'white' };

    console.log("props", props)
    const theme = useTheme();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{mt: 2, mb: 2,}}
        >
            <Grid sx={{ width: "100%" }}>
                {value.content.map((item, indexA) => (
                        <Input
                            key={indexA.toString()}
                            sx={{
                                '& .MuiInput-input': {
                                    width: "100%",
                                    color: 'text.main',
                                    fontSize: mobile ? value.fontSize * 0.8 : value.fontSize,
                                    fontStyle: value.fontStyle,
                                    textAlign: value.textAlign,
                                    fontWeight: value.fontWeight,
                                    textDecoration: value.textDecoration,
                                    lineHeight: "normal",
                                    cursor: "default",
                                }
                            }}
                            placeholder="Добавить текст ответа"
                            type="text"
                            disableUnderline
                            multiline
                            fullWidth
                            readOnly
                            onClick={() => {
                                // if (value.quizType === 'single') knowledgeStore.setSingleQuiz(index, indexA)
                                // if (value.quizType === 'multiple') knowledgeStore.setComponentsContent(index, indexA, "userAnswer", !item.userAnswer)
                                knowledgeStore.setAnswer(value.quizType, index, indexA)
                            }}
                            value={item.label}
                            startAdornment={
                                <>
                                    {value.quizType === 'single' && <Radio
                                        sx={{
                                            color: 'text.main',
                                            '&.Mui-checked': {
                                                color: 'text.main',
                                            },
                                        }}
                                        //color="primary"
                                        checked={index in knowledgeStore.module.answers ? knowledgeStore.module.answers[index] === indexA : false}
                                    />}
                                    {value.quizType === 'multiple' && <Checkbox
                                        sx={{
                                            color: 'text.main',
                                            '&.Mui-checked': {
                                                color: 'text.main',
                                            },
                                        }}
                                        //color="primary"
                                        checked={index in knowledgeStore.module.answers ? knowledgeStore.module.answers[index].includes(indexA) : false}
                                    //onChange={handleChange}
                                    />}

                                </>
                            }
                        />
                    ))}
            </Grid>
            {knowledgeStore.module.type !== "test" && <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Button
                    sx={{
                        ml: 2,
                        mt: 1,
                        color: 'text.main',
                    }}
                    variant="text"
                    onClick={() => knowledgeStore.isAnswerRight(value.quizType, index)}
                >
                    Проверить
                </Button>
                {value.successAnswer != null && <Typography
                    //color="success"
                    sx={{
                        ml: 2,
                        mt: 1,
                        color: 'text.main',
                    }}
                >
                    {value.successAnswer ? `Ответ Верный!` : `Ответ Неправильный!`}
                </Typography>}
            </Grid>}
            {/* <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Button
                    sx={{
                        ml: 2,
                        mt: 1,
                        color: 'text.main',
                    }}
                    variant="text"
                    onClick={() => knowledgeStore.isAnswerRight(index)}
                >
                    
                </Button>
                {value.successAnswer != null && <Typography
                    //color="success"
                    sx={{
                        ml: 2,
                        mt: 1,
                        color: 'text.main',
                    }}
                >
                    {value.successAnswer ? `Ответ Верный!` : `Ответ Неправильный!`}
                </Typography>}
            </Grid> */}
        </Grid>
    );
}));

export default Quiz