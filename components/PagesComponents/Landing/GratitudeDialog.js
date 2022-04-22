/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { Button, Dialog, DialogActions, IconButton, Chip, useMediaQuery, TableBody, Table, TableContainer, TableHead, TableRow, TableCell, DialogContent, DialogTitle, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";

function createData(user, help) {
    return {
        user,
        help,
    };
}

const rows = [
    createData('Нестеров Н.К.', ['Разработка',]),
    createData('Букшев И.В.', ['Разработка']),
    createData('Федосова Н.А.', ['Тестирование', 'CustDev']),
];

const headCells = [
    {
        id: 'user',
        numeric: false,
        disablePadding: true,
        label: 'Пользователь',
    },
    {
        id: 'help',
        numeric: false,
        disablePadding: false,
        label: 'Помощь',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount, onRequestSort } =
        props;

    return (
        <TableHead>
            <TableRow >
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding='normal'
                        sx={{ bgcolor: 'primary.main' }}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

function GratitudeDialog({ open, setOpen, type }) {
    const router = useRouter();

    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    return (
        <Dialog
            open={open}
            onClose={() => {
                router.push(`/`);
                setOpen(false);
            }}
            fullWidth
            fullScreen={!!mobile}
            maxWidth='md'
        >
            <DialogTitle id="dialog-title">
                Благодарности
            </DialogTitle>
            <Typography variant='subtitle2' sx={{ pl: 3, pb: 2, pr: 3, }}>
                Команда разработки выражает благодарность за вклад в развитие проекта
            </Typography>
            <TableContainer>
                <Table
                    stickyHeader
                    sx={{ minWidth: 550 }}
                    aria-labelledby="tableTitle"
                    size="small"
                >
                    <EnhancedTableHead
                    />
                    <TableBody>
                        {rows.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.deadline}
                                >
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                    >
                                        {row.user}
                                    </TableCell>
                                    <TableCell align="left"> {row.help.map((item, indexChip) => <Chip sx={{ ml: 1 }} key={indexChip.toString()} label={item} />)} </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)}>Закрыть</Button>
            </DialogActions>
        </Dialog >
    );
}

export default GratitudeDialog;
