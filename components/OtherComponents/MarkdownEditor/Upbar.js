/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
    Stack,
    useTheme,
    TextField,
    IconButton,
    Button,
} from "@mui/material";

import { inject, observer } from "mobx-react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TitleIcon from "@mui/icons-material/Title";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import CodeIcon from "@mui/icons-material/Code";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const Upbar = inject(
    "rootStore",
)(
    observer(({ rootStore, isEdit = false, edit, setEdit, addBold, addItalic, addStrikethrough, addCode, addLink }) => {
        const theme = useTheme();
        const router = useRouter();

        return (
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    width: "100%",
                    height: "48px",
                    pl: 1,
                }}
            >
                <Button
                    variant="contained"
                    // color="inherit"
                    sx={{
                        borderRadius: 16,
                        bgcolor: edit ? "primary.dark" : "transparent",
                        "&:hover": {
                            bgcolor: edit ? "primary.dark" : "transparent",
                        }
                    }}
                    startIcon={<EditIcon />}
                    onClick={() => setEdit(true)}
                >
                    Редактирование
                </Button>
                <Button
                    variant="contained"
                    // color="inherit"
                    sx={{
                        ml: 1,
                        borderRadius: 16,
                        bgcolor: !edit ? "primary.dark" : "transparent",
                        "&:hover": {
                            bgcolor: !edit ? "primary.dark" : "transparent",
                        }
                    }}
                    startIcon={<VisibilityIcon />}
                    onClick={() => setEdit(false)}
                >
                    Просмотр
                </Button>
                <IconButton
                    sx={{
                        ml: "auto"
                    }}
                >
                    <TitleIcon />
                </IconButton>
                <IconButton
                    onClick={() => addBold()}
                >
                    <FormatBoldIcon />
                </IconButton>
                <IconButton
                    onClick={() => addItalic()}
                >
                    <FormatItalicIcon />
                </IconButton>
                <IconButton
                    onClick={() => addStrikethrough()}
                >
                    <FormatStrikethroughIcon />
                </IconButton>
                <IconButton
                    onClick={() => addCode()}
                >
                    <CodeIcon />
                </IconButton>
                <IconButton
                    onClick={() => addLink()}
                >
                    <InsertLinkIcon />
                </IconButton>
                <IconButton>
                    <FormatListBulletedIcon />
                </IconButton>
                <IconButton>
                    <FormatListNumberedIcon />
                </IconButton>
                <IconButton>
                    <CheckBoxIcon />
                </IconButton>
            </Stack>

        );
    })
);

export default Upbar;
