import React from "react";
import { Input, Grid, Typography, Button, } from "@mui/material";
import { inject, observer } from "mobx-react"

const NumberAnswer = inject("managmentSt", "knowledgeSt")(observer(({ managmentSt, knowledgeSt, index }) => {
    // Simulated props for the purpose of the example
    const values = managmentSt.pageCreation.components[index]
    // Simulated props for the purpose of the example
    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mt: 2, mb: 2, }}
        >
            <Input
                sx={{
                    "& .MuiInput-input": {
                        width: "100%",
                        color: "text.main",
                        lineHeight: "normal",
                    }
                }}
                type="number"
                disableUnderline
                multiline
                fullWidth
                placeholder="Ваш ответ (число)"
                value={values.userAnswer}
                onChange={(event) => {
                    if ("1234567890.,".includes(event.nativeEvent.data) || event.nativeEvent.data === null) knowledgeSt.setPageComponentsData(index, "userAnswer", event.target.value)
                }}
            />
            {knowledgeSt.module.type !== "test" && <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Button
                    sx={{
                        ml: 2,
                        mt: 1,
                        color: "text.main",
                    }}
                    variant="text"
                    onClick={() => knowledgeSt.isAnswerRight(index, "numanswer")}
                >
                    Проверить
                </Button>
                {values.successAnswer != null && <Typography
                    // color="success"
                    sx={{
                        ml: 2,
                        mt: 1,
                        color: "text.main",
                    }}
                >
                    {values.successAnswer ? `Ответ Верный!` : `Ответ Неправильный!`}
                </Typography>}
            </Grid>}
        </Grid>
    );
}));

export default NumberAnswer

