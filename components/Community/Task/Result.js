
import React from "react";
import {
    Stack,
    Typography,
} from "@mui/material";

import { inject, observer } from "mobx-react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { motion } from "framer-motion";

const arrowVariants = {
    open: {
        rotate: 90,
        x: -15,
    },
    closed: {
        rotate: 0,
    }
};

const Result = inject()(
    observer(() => {
        const [result, setResult] = React.useState(false);

        return (
            <>
                <Stack
                    onClick={() => setResult(!result)}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        width: "100%",
                        pl: 0,
                        pr: 1,
                        cursor: "pointer",
                        color: "text.secondary",
                        "&:hover": {
                            color: "text.primary",
                        },
                        zIndex: 1
                    }}
                >
                    <ArrowForwardIosIcon
                        component={motion.svg}
                        variants={arrowVariants}
                        animate={result ? "open" : "closed"}
                        transition={{ type: "ease", duration: 0.2 }}
                        sx={{ fontSize: 8 }}
                    />
                    <Typography
                        variant="subtitle2"
                        sx={{
                            ml: 1,
                            fontSize: 14,
                        }}
                    >
                        результат
                    </Typography>
                </Stack>
                {result && <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        width: "100%"
                    }}
                >
                    результат
                </Stack>}
            </>
        );
    })
);

export default Result;
