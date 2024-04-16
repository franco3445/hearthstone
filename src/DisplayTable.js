import * as React from 'react';
import PropTypes from 'prop-types';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import {
    useTheme,
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                aria-label="first page"
                disabled={page === 0}
                onClick={handleFirstPageButtonClick}
            >
                {theme.direction === 'rtl'
                    ? <LastPageIcon />
                    : <FirstPageIcon />
                }
            </IconButton>
            <IconButton
                aria-label="previous page"
                disabled={page === 0}
                onClick={handleBackButtonClick}
            >
                {theme.direction === 'rtl'
                    ? <KeyboardArrowRight />
                    : <KeyboardArrowLeft />
                }
            </IconButton>
            <IconButton
                aria-label="next page"
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                onClick={handleNextButtonClick}
            >
                {theme.direction === 'rtl'
                    ? <KeyboardArrowLeft />
                    : <KeyboardArrowRight />
                }
            </IconButton>
            <IconButton
                aria-label="last page"
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                onClick={handleLastPageButtonClick}
            >
                {theme.direction === 'rtl'
                    ? <FirstPageIcon />
                    : <LastPageIcon />
                }
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export function DisplayTable(props) {
    const [apiResults, setApiResults] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    const {
        results
    } = props;

    React.useEffect(() => {
        setApiResults(results);
    }, [results]);

    const tableHeaderLabels = [
        'Name',
        'Card Set',
        'Type',
        'Class',
        'Cost',
    ]
    
    const emptyRows = page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - apiResults.length)
        : 0;
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const tableHeader = (
        <TableHead>
            <TableRow>
                {tableHeaderLabels.map(label => {
                    return (
                        <TableCell align="center">
                            {label}
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    );
    
    const tableFooter = (
        <TableFooter>
            <TableRow>
                <TablePagination
                    colSpan={3}
                    count={apiResults.length}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    ActionsComponent={TablePaginationActions}
                    SelectProps={{
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                />
            </TableRow>
        </TableFooter>
    );
    
    const emptyTableResults = (
        <TableRow style={{ height: 53 }}>
            <TableCell align="center" colSpan={5}  >
                Nothing to report...
            </TableCell>
        </TableRow>
    );
    const tableWithResults = (rowsPerPage > 0
            ? apiResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : apiResults
    ).map((row) => (
        <TableRow
            key={row.dbfId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell
                align="center"
                component="th"
                scope="row"
            >
                {row.name}
            </TableCell>
            <TableCell align="center">
                {row.cardSet}
            </TableCell>
            <TableCell align="center">
                {row.type}</TableCell>
            <TableCell align="center">
                {row.playerClass}
            </TableCell>
            <TableCell align="center">
                {row.cost}
            </TableCell>
        </TableRow>
    ));
    
    return (
        <TableContainer component={Paper} sx={{maxHeight: 500}}>
            <Table
                aria-label="simple table"
                size="small"
                sx={{ minWidth: 650 }}
                stickyHeader
            >
                {tableHeader}
                <TableBody>
                    {apiResults.length === 0
                        ? emptyTableResults
                        : tableWithResults}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                {tableFooter}
            </Table>
        </TableContainer>
    );
}
