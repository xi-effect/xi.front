import * as React from 'react';
import { Box, Stack, Typography, Paper, Tooltip, IconButton, TableHead, Toolbar, TableRow, TableSortLabel, Table, TableBody, TableCell, TableContainer, } from '@mui/material';
import { inject, observer } from 'mobx-react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Image from "next/image";

const headCells = [
    {
        id: 'pageName',
        numeric: false,
        disablePadding: false,
        label: 'Название страницы',
    },
    {
        id: 'right-answers',
        numeric: false,
        disablePadding: false,
        label: 'Правильных ответов',
    },
    {
        id: 'total-answers',
        numeric: false,
        disablePadding: false,
        label: 'Вопросов',
    },
];

function EnhancedTableHead(props) {

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = (props) => {

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                // bgcolor: 'primary.main',
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Результаты теста
            </Typography>
        </Toolbar>
    );
};

const Results = inject('rootStore', 'knowledgeStore')(observer(({ rootStore, knowledgeStore }) => {


    if (knowledgeStore.moduleCompleted.results.length === 0) {
        return (
            <Box sx={{ width: '100%', minHeight: 400, p: 3 }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Image
                        alt="alt"
                        src={"/svg/No.svg"}
                        quality={100}
                        width={256}
                        height={232}
                    />
                    <Typography sx={{ cursor: "default" }} variant="h6">
                        Здесь пусто, чтобы результаты появились нужно Завершить тест
                    </Typography>
                </Stack>
            </Box>
        )
    }

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {knowledgeStore.moduleCompleted.results.map((result, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={null}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={index.toString()}
                                    >
                                        <TableCell padding="checkbox">
                                            <Tooltip title="перейти к странице">
                                                <IconButton>
                                                    <ArrowCircleRightIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {result.answers.pageName}
                                        </TableCell>
                                        <TableCell align="left">{result["right-answers"]}</TableCell>
                                        <TableCell align="left">{result["total-answers"]}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {/* {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )

}));

export default Results