/* eslint-disable react/display-name */
import React from 'react';

import { CircularProgress, Pagination, PaginationItem, Grid, Button, Typography, useTheme } from '@mui/material';


import { inject, observer } from 'mobx-react'
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import { createTheme } from '@mui/material/styles';
import Image from 'next/image'
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

function customCheckbox(theme) {
    return {
        '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
                }`,
            borderRadius: 2,
        },
        '& .MuiCheckbox-root svg path': {
            display: 'none',
        },
        '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
        },
        '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
            position: 'absolute',
            display: 'table',
            border: '2px solid #fff',
            borderTop: 0,
            borderLeft: 0,
            transform: 'rotate(45deg) translate(-50%,-50%)',
            opacity: 1,
            transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
            content: '""',
            top: '50%',
            left: '39%',
            width: 5.71428571,
            height: 9.14285714,
        },
        '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
            width: 8,
            height: 8,
            backgroundColor: '#1890ff',
            transform: 'none',
            top: '39%',
            border: 0,
        },
    };
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
    (theme) => ({
        root: {
            border: 0,
            color: theme => theme.palette.primary.contrastText,
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            WebkitFontSmoothing: 'auto',
            letterSpacing: 'normal',
            '& .MuiDataGrid-columnsContainer': {
                backgroundColor: theme => theme.palette.primary.main,
            },
            '& .MuiDataGrid-iconSeparator': {
                display: 'none',
            },
            '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
                    }`,
            },
            '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
                    }`,
            },
            '& .MuiDataGrid-cell': {
                // color:
                //     theme.palette.mode === 'light'
                //         ? 'rgba(0,0,0,.85)'
                //         : 'rgba(255,255,255,0.65)',
            },
            '& .MuiPaginationItem-root': {
                borderRadius: 0,
            },
            ...customCheckbox(theme),
            '& .super-app-theme--rows': {
                backgroundColor: theme => theme.palette.blueGrey["5"],
                '&:hover': {
                    backgroundColor: theme => theme.palette.blueGrey["5"],
                },
                color: theme => theme.palette.primary.contrastText,
            },
        },
    }),
    { defaultTheme },
);


const DataList = inject('store')(observer(({ store }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [openDialog, setOpenDialog] = React.useState(null)
    const [selectId, setSelectId] = React.useState()

    const dialogOpen = (params) => {
        setOpenDialog(params)
        console.log(openDialog)
    }

    const columns = [
        {
            field: 'valueReports',
            headerName: 'Количество жалоб',
            type: 'number',
            width: 220,
            renderCell: (params) => (
                <strong>
                    {params.value}
                    <Button
                        onClick={() => dialogOpen(params)}
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16, marginTop: -2 }}
                    >
                        Открыть
                    </Button>
                </strong>
            ),
        },
        {
            field: 'reportType',
            headerName: 'Тема жалобы',
            width: 180,
        },
        {
            field: 'contentType',
            headerName: 'Тип контента',
            width: 200,
        },
        {
            field: 'contentAuthor',
            headerName: 'Автор контента',
            width: 210,
        },
        {
            field: 'reportValue',
            headerName: 'Содержание жалобы',
            flex: 1,
            minWidth: 150,
        },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
        //         }`,
        // },
    ];

    const rows = [
        { id: 1, valueReports: 1, reportType: 'Не исторично', contentType: 'Страница', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>', },
        { id: 2, valueReports: 2, reportType: 'Не исторично', contentType: 'Модуль', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 3, valueReports: 3, reportType: 'Не исторично', contentType: 'Страница', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 4, valueReports: 4, reportType: 'Не исторично', contentType: 'Модуль', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 5, valueReports: 5, reportType: 'Не исторично', contentType: 'Страница', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 6, valueReports: 6, reportType: 'Не исторично', contentType: 'Модуль', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 7, valueReports: 7, reportType: 'Не исторично', contentType: 'Модуль', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 8, valueReports: 8, reportType: 'Не исторично', contentType: 'Модуль', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 9, valueReports: 9, reportType: 'Не исторично', contentType: 'Страница', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
    ];

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%', marginTop: 16, }} className={classes.root}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    className={classes.root}
                    autoHeight
                    //checkboxSelection
                    autoPageSize
                    disableSelectionOnClick
                    getRowClassName={(params) =>
                        `super-app-theme--rows`
                    }
                // components={{
                //     Pagination: CustomPagination,
                // }}

                />
            </div>
        </div>
    )
}));


export default DataList;