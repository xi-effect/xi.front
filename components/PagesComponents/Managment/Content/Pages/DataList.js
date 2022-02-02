import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/material"
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { inject, observer } from "mobx-react"
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import { useRouter } from "next/router";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don"t
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Название",
    },
    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Статус",
    },
    {
        id: "views",
        numeric: false,
        disablePadding: false,
        label: "Просмотры",
    },
    {
        id: "kind",
        numeric: false,
        disablePadding: false,
        label: "Вид",
    },
    {
        id: "theme",
        numeric: false,
        disablePadding: false,
        label: "Тематика",
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { managmentStore, rows, selected, numSelected, deletePages } = props;
    const router = useRouter();

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} выбрано
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Ваши страницы
                </Typography>
            )}
            {numSelected === 1 &&
                <Tooltip title="Редактировать">
                    <IconButton onClick={() => {
                        managmentStore.changeOldPageList(rows[selected[0]].id)
                        router.push(`/knowledge/createpage`)
                    }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>}
            {numSelected > 0 &&
                <Tooltip title="Удалить">
                    <IconButton onClick={deletePages}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const DataList = inject("rootStore", "managmentStore")(observer(({ rootStore, managmentStore }) => {

    const [rows, setRows] = React.useState([])
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    React.useEffect(() => {
        rootStore.fetchDataScr(`${rootStore.url}/wip/pages/index/`, "POST", { "counter": 0 }).then(
            (data) => {
                console.log("log", data.results)
                setRows(data.results)
            })
    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n, index) => index);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, index) => {
        console.log("clkc")
        let newSelected = [...selected]
        if (selected.includes(index)) {
            newSelected = newSelected.filter((el) => el !== index)
        }
        if (!(selected.includes(index))) {
            newSelected.push(index)
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const deletePages = () => {
        console.log("selected", selected)
        let newRows = rows.filter((el, index) => !(selected.includes(index)))
        selected.forEach((item, index) => {
            rootStore.fetchDataScr(`${rootStore.url}/wip/pages/${rows[item].id}/`, "DELETE").then(
                (data) => {
                    console.log("data", data)
                }
            )
        })
        setSelected([])
        setRows(newRows)
        console.log("rows", rows)
    }

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar managmentStore={managmentStore} rows={rows} selected={selected} deletePages={deletePages} numSelected={selected.length} />
                <TableContainer>
                    {rows.length === 0 && <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{ width: "100%", height: 400 }}
                    >
                        <Image
                            alt="alt"
                            src={"/app/NoData.svg"}
                            quality={100}
                            width={256}
                            height={232}
                        />
                        <Typography sx={{ cursor: "default" }} variant="h6">
                            У вас нет ни одной Страницы
                        </Typography>
                    </Stack>}
                    {rows.length != 0 && <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don"t need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, index)}
                                            role="checkbox"
                                            aria-checked={selected.includes(index)}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={selected.includes(index)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={selected.includes(index)}
                                                    inputProps={{
                                                        "aria-labelledby": labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.status}</TableCell>
                                            <TableCell align="left">{row.views}</TableCell>
                                            <TableCell align="left">{row.kind}</TableCell>
                                            <TableCell align="left">{row.theme}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>}
                </TableContainer>
                {rows.length != 0 && <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage={"Строк на странице"}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />}
            </Paper>
        </Box>
    )
}));

export default DataList