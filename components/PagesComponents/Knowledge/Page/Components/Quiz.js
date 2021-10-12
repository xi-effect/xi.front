import React, { useState } from 'react';
import { useTheme, Button, Input, Grid, Radio, Checkbox, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { inject, observer } from 'mobx-react'


const useStyles = makeStyles((theme) => ({
    gridTextWrapper: {
        //textAlign: "center !important",
        width: "100%",
    },
    text: {
        width: "100%",
        color: props => props.palette.primary.contrastText,
        fontSize: props => props.fontSize,
        fontStyle: props => props.fontStyle,
        textAlign: props => props.textAlign,
        fontWeight: props => props.fontWeight,
        textDecoration: props => props.textDecoration,
        lineHeight: "normal",
    }
}));


const Quiz = inject('rootStore', 'knowledgeStore')(observer(({ rootStore, knowledgeStore, index }) => {
    const value = knowledgeStore.page.components[index]
    // Simulated props for the purpose of the example
    const props = { fontSize: value.fontSize, textAlign: value.textAlign, fontStyle: value.fontStyle, fontWeight: value.fontWeight, textDecoration: value.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    console.log("props", props)
    const theme = useTheme();
    const classes = useStyles({ ...props, ...theme });

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid className={classes.gridTextWrapper}>
                {
                    value.content.map((item, indexA) => (
                        <Input
                            key={indexA.toString()}
                            classes={{
                                input: classes.text
                            }}
                            placeholder="Добавить текст ответа"
                            className={classes.text}
                            type="text"
                            disableUnderline
                            multiline
                            fullWidth
                            readOnly
                            value={item.label}
                            startAdornment={
                                <>
                                    {value.quizType === 'single' && <Radio
                                        sx={{
                                            color: theme => theme.palette.primary.contrastText,
                                            '&.Mui-checked': {
                                                color: theme => theme.palette.primary.contrastText,
                                            },
                                        }}
                                        //color="primary"
                                        checked={item.userAnswer}
                                        onChange={() => knowledgeStore.setSingleQuiz(index, indexA)}

                                    />}
                                    {value.quizType === 'multiple' && <Checkbox
                                        sx={{
                                            color: theme => theme.palette.primary.contrastText,
                                            '&.Mui-checked': {
                                                color: theme => theme.palette.primary.contrastText,
                                            },
                                        }}
                                        //color="primary"
                                        checked={item.userAnswer}
                                        onChange={() => knowledgeStore.setComponentsContent(index, indexA, "userAnswer", !item.userAnswer)}
                                    //onChange={handleChange}
                                    />}

                                </>
                            }
                        />
                    ))
                }
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Button
                    sx={{
                        ml: 2,
                        mt: 1,
                        color: theme => theme.palette.primary.contrastText,
                    }}
                    variant="text"
                    onClick={() => knowledgeStore.isAnswerRight(index)}
                >
                    Проверить
                </Button>
                {value.successAnswer != null && <Typography
                    //color="success"
                    sx={{
                        ml: 2,
                        mt: 1,
                        color: theme => theme.palette.primary.contrastText,
                    }}
                >
                    {value.successAnswer ? `Ответ Верный!` : `Ответ Неправильный!`}
                </Typography>}
            </Grid>

        </Grid>
    );
}));

export default Quiz