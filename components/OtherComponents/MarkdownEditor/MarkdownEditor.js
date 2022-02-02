/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Stack,
    useTheme,
    TextField,
    Input,
} from "@mui/material";

import { inject, observer } from "mobx-react";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { motion } from "framer-motion";
import Upbar from "./Upbar";

const arrowVariants = {
    open: {
        rotate: 90,
        x: -15,
    },
    closed: {
        rotate: 0,
    }
}

const MarkdownEditor = inject(
    "rootStore",
)(
    observer(({ rootStore, content, setContent, isEdit = false, readOnly = true, }) => {
        const theme = useTheme();
        const router = useRouter();
        const input = React.useRef(null)
        const [edit, setEdit] = React.useState(false)
        const [selIndexs, setSelIndexs] = React.useState(null)

        const addBold = () => {
            if (selIndexs[0] && selIndexs[1]) {
                let newContet = content.split('')
                if (content[selIndexs[0] - 1] === '*' && content[selIndexs[0] - 2] === '*' && content[selIndexs[1] + 1] === '*' && content[selIndexs[1] + 2] === '*') {
                    newContet.splice(selIndexs[0] - 2, 2)
                    newContet.splice(selIndexs[1], 2)
                } else {
                    newContet.splice(selIndexs[0], 0, '**')
                    newContet.splice(selIndexs[1] + 1, 0, '**')
                }
                // console.log("selIndexs", selIndexs)
                setContent(newContet.join(''))
                setSelIndexs([selIndexs[0] + 2, selIndexs[1] + 2])
                console.log("input", input)
                input.current.setSelectionRange(selIndexs[0] + 2, selIndexs[1] + 2)
            }
        }

        const addItalic = () => {
            if (selIndexs[0] && selIndexs[1]) {
                let newContet = content.split('')
                if (content[selIndexs[0] - 1] === '_' && content[selIndexs[1] + 1] === '_') {
                    newContet.splice(selIndexs[0] - 2, 2)
                    newContet.splice(selIndexs[1], 2)
                } else {
                    newContet.splice(selIndexs[0], 0, '_')
                    newContet.splice(selIndexs[1] + 1, 0, '_')
                }
                // console.log("selIndexs", selIndexs)
                setContent(newContet.join(''))
            }
        }

        const addStrikethrough = () => {
            if (selIndexs[0] && selIndexs[1]) {
                let newContet = content.split('')
                if (content[selIndexs[0] - 1] === '~' && content[selIndexs[1] + 1] === '~') {
                    newContet.splice(selIndexs[0] - 2, 2)
                    newContet.splice(selIndexs[1], 2)
                } else {
                    newContet.splice(selIndexs[0], 0, '~')
                    newContet.splice(selIndexs[1] + 1, 0, '~')
                }
                // console.log("selIndexs", selIndexs)
                setContent(newContet.join(''))
            }
        }

        const addCode = () => {
            if (selIndexs[0] && selIndexs[1]) {
                let newContet = content.split('')
                if (content[selIndexs[0] - 1] === '`' && content[selIndexs[1] + 1] === '`') {
                    newContet.splice(selIndexs[0] - 2, 2)
                    newContet.splice(selIndexs[1], 2)
                } else {
                    newContet.splice(selIndexs[0], 0, '`')
                    newContet.splice(selIndexs[1] + 1, 0, '`')
                }
                // console.log("selIndexs", selIndexs)
                setContent(newContet.join(''))
            }
        }

        const addLink = () => {
            if (selIndexs[0]) {
                let newContet = content.split('')
                newContet.splice(selIndexs[0], 0, '[](url)')
                // console.log("selIndexs", selIndexs)
                setContent(newContet.join(''))
            }
        }

        return (
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                    width: '100%'
                }}
            >
                {!readOnly && <Upbar isEdit={isEdit} edit={edit} setEdit={setEdit} addBold={addBold} addItalic={addItalic} addStrikethrough={addStrikethrough} addCode={addCode} addLink={addLink}/>}
                {!readOnly && edit && <TextField
                    components={input}
                    inputRef={input}
                    autoFocus
                    multiline
                    minRows={4}
                    variant="outlined"
                    fullWidth
                    readOnly={readOnly}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onSelect={e => setSelIndexs([e.target.selectionStart, e.target.selectionEnd])}
                />}
                {readOnly || !edit && <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />}
            </Stack>

        );
    })
);

export default MarkdownEditor;
