import React from "react";
import { Input, Grid, Typography, Button, } from "@mui/material";
import { inject, observer } from "mobx-react"

const NumberAnswer = inject("managmentStore", "knowledgeStore")(observer(({ managmentStore, knowledgeStore, index }) => {
    // Simulated props for the purpose of the example
    const values = managmentStore.pageCreation.components[index]
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
                    if ("1234567890.,".includes(event.nativeEvent.data) || event.nativeEvent.data === null) knowledgeStore.setPageComponentsData(index, "userAnswer", event.target.value)
                }}
            />
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
                        color: "text.main",
                    }}
                    variant="text"
                    onClick={() => knowledgeStore.isAnswerRight(index, "numanswer")}
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

