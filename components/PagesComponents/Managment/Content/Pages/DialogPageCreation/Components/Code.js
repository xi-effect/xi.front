import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Fade, Input, FormControl, Select, MenuItem, InputLabel, IconButton, Grid, useTheme, Tooltip } from "@mui/material";


import clsx from "clsx";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import QueueIcon from "@mui/icons-material/Queue";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import { inject, observer } from "mobx-react"
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const languages = [
    "oneC(1c)",
    "abnf",
    "accesslog",
    "actionscript",
    "ada",
    "angelscript",
    "apache",
    "applescript",
    "arcade",
    "arduino",
    "armasm",
    "asciidoc",
    "aspectj",
    "autohotkey",
    "autoit",
    "avrasm",
    "awk",
    "axapta",
    "bash",
    "basic",
    "bnf",
    "brainfuck",
    "cLike(c - like)",
    "c",
    "cal",
    "capnproto",
    "ceylon",
    "clean",
    "clojureRepl(clojure - repl)",
    "clojure",
    "cmake",
    "coffeescript",
    "coq",
    "cos",
    "cpp",
    "crmsh",
    "crystal",
    "csharp",
    "csp",
    "css",
    "d",
    "dart",
    "delphi",
    "diff",
    "django",
    "dns",
    "dockerfile",
    "dos",
    "dsconfig",
    "dts",
    "dust",
    "ebnf",
    "elixir",
    "elm",
    "erb",
    "erlangRepl(erlang - repl)",
    "erlang",
    "excel",
    "fix",
    "flix",
    "fortran",
    "fsharp",
    "gams",
    "gauss",
    "gcode",
    "gherkin",
    "glsl",
    "gml",
    "go",
    "golo",
    "gradle",
    "groovy",
    "haml",
    "handlebars",
    "haskell",
    "haxe",
    "hsp",
    "htmlbars",
    "http",
    "hy",
    "inform7",
    "ini",
    "irpf90",
    "isbl",
    "java",
    "javascript",
    "jbossCli(jboss - cli)",
    "json",
    "juliaRepl(julia - repl)",
    "julia",
    "kotlin",
    "lasso",
    "latex",
    "ldif",
    "leaf",
    "less",
    "lisp",
    "livecodeserver",
    "livescript",
    "llvm",
    "lsl",
    "lua",
    "makefile",
    "markdown",
    "mathematica",
    "matlab",
    "maxima",
    "mel",
    "mercury",
    "mipsasm",
    "mizar",
    "mojolicious",
    "monkey",
    "moonscript",
    "n1ql",
    "nginx",
    "nim",
    "nix",
    "nodeRepl(node - repl)",
    "nsis",
    "objectivec",
    "ocaml",
    "openscad",
    "oxygene",
    "parser3",
    "perl",
    "pf",
    "pgsql",
    "phpTemplate(php - template)",
    "php",
    "plaintext",
    "pony",
    "powershell",
    "processing",
    "profile",
    "prolog",
    "properties",
    "protobuf",
    "puppet",
    "purebasic",
    "pythonRepl(python - repl)",
    "python",
    "q",
    "qml",
    "r",
    "reasonml",
    "rib",
    "roboconf",
    "routeros",
    "rsl",
    "ruby",
    "ruleslanguage",
    "rust",
    "sas",
    "scala",
    "scheme",
    "scilab",
    "scss",
    "shell",
    "smali",
    "smalltalk",
    "sml",
    "sqf",
    "sql",
    "stan",
    "stata",
    "step21",
    "stylus",
    "subunit",
    "swift",
    "taggerscript",
    "tap",
    "tcl",
    "thrift",
    "tp",
    "twig",
    "typescript",
    "vala",
    "vbnet",
    "vbscriptHtml(vbscript - html)",
    "vbscript",
    "verilog",
    "vhdl",
    "vim",
    "x86asm",
    "xl",
    "xml",
    "xquery",
    "yaml",
    "zephir",
]

const Code = inject("managmentStore")(observer(({ managmentStore, index }) => {
    // Simulated props for the purpose of the example
    const values = managmentStore.pageCreation.components[index]
    // Simulated props for the purpose of the example
    const props = { fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: "black", color: "white" };

    // console.log("props", props)


    const [hover, setHover] = React.useState(false)
    const [edit, setEdit] = React.useState(false)

    return (
        <Grid
            onFocus={() => setHover(true)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            onClick={() => managmentStore.setPageCreationList("selectId", index)}
        >
            <Grid sx={{ width: "calc(100% - 4px)", }}>
                {edit && <Input
                    sx={{
                        "& .MuiInput-input": {
                            width: "100%",
                            color: "text.main",
                            lineHeight: "normal",
                        }
                    }}
                    type="text"
                    disableUnderline
                    multiline
                    fullWidth
                    value={values.label}
                    onChange={(event) => managmentStore.setPageCreationComponents(index, "label", event.target.value)}
                />}
                {!edit && <SyntaxHighlighter language={languages[values.lang]} style={a11yDark} showLineNumbers>
                    {values.label}
                </SyntaxHighlighter>}
            </Grid>
            <Fade
                in={hover}
                style={{ transformOrigin: "0 0 0" }}
                {...(hover ? { timeout: 1000 } : {})}
            >
                <Grid
                    container
                    direction="row"
                >
                    {!edit && <Tooltip title="К Редактированию">
                        <IconButton
                            sx={{
                                ml: 1,
                            }}
                            onClick={() => setEdit(true)}
                            size="large">
                            <ModeEditOutlineIcon sx={{ color: "text.main" }} />
                        </IconButton>
                    </Tooltip>}
                    {edit && <Tooltip title="К Просмотру">
                        <IconButton
                            sx={{
                                ml: 1,
                            }}
                            onClick={() => setEdit(false)}
                            size="large">
                            <PreviewIcon sx={{ color: "text.main" }} />
                        </IconButton>
                    </Tooltip>}
                    <FormControl sx={{ color: "text.main" }} variant="standard">
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Язык
                        </InputLabel>
                        <Select
                            sx={{
                                color: "text.main",
                            }}
                            // defaultValue={"Не выбрано"}
                            value={values.lang}
                            onChange={(event) => managmentStore.setPageCreationComponents(index, "lang", event.target.value)}
                        >
                            {languages.map((item, index) => (
                                <MenuItem sx={{ color: "text.main" }} key={index.toString()} value={index}> {item} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Tooltip title="Удалить блок">
                        <IconButton
                            sx={{
                                marginLeft: "auto"
                            }}
                            onClick={() => managmentStore.deleteComponent(index)}
                            size="large">
                            <DeleteForeverIcon sx={{ color: "text.main" }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Перетащить блок">
                        <IconButton size="large">
                            <DragIndicatorIcon sx={{ color: "text.main" }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Fade>
        </Grid>
    );
}));

export default Code

