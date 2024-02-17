import * as React from 'react';
import axios from "axios";
import PropTypes from 'prop-types';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import {
    useTheme,
    Box,
    Button,
    IconButton,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';

import './HomePage.css';

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

function HomePage() {
    const [apiResults, setApiResults] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const classes = [
        'Death Knight',
        'Demon Hunter',
        'Dream',
        'Druid',
        'Hunter',
        'Mage',
        'Neutral',
        'Paladin',
        'Priest',
        'Rogue',
        'Shaman',
        'Warlock',
        'Warrior',
    ];

    const lookupValues = [
        // {endpoint: 'cardback',                      title: 'Get CardBacks'},
        // {endpoint: 'cards',                         title: 'Get All Cards'},
        {endpoint: `cards/classes/${inputValue}`,   title: 'Search by Class'},
        // {endpoint: `cards/factions/${inputValue}`,  title: 'Search by Faction'},
        // {endpoint: `cards/qualities/${inputValue}`, title: 'Search by Qualities'},
        // {endpoint: `cards/races/${inputValue}`,     title: 'Search by Race'},
        // {endpoint: `cards/search/${inputValue}`,    title: 'Search Card'},
        // {endpoint: `cards/sets/${inputValue}`,      title: 'Search by Set'},
        // {endpoint: `cards/types/${inputValue}`,     title: 'Search by Type'},
        // {endpoint: 'info',                          title: 'Get Patch Notes'},
    ];

    const tableHeaderLabels = [
        'Name',
        'Card Set',
        'Type',
        'Class',
        'Cost',
    ]

    const reachHearthStoneEndpoint = async function (endpoint) {
        console.log('Sending request...')
        const options = {
            method: 'GET',
            url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/${endpoint}`,
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
            }
        };

        try {
            console.log('In Try Block...');
            const response = await axios.request(options);

            console.log('Setting Request Results...');
            setApiResults(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const emptyRows = page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - apiResults.length)
        : 0;

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

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

    const displayTable = (
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

    const requestButtonHtml = lookupValues.map(button => {
        return (
            <Button
                onClick={e => reachHearthStoneEndpoint(e.target.value)}
                value={button.endpoint}
                variant="outlined"
            >
                {button.title}
            </Button>
        )
    });

    const classDropDownMenuItems = classes.map(classs => {
        return (
            <MenuItem value={classs}>
                {classs}
            </MenuItem>
        )
    });

    return (
        <div className="HomePage">
            <header className="HomePage-header">
                <Typography variant="h3">
                    HearthStone Data Finder
                </Typography>
                <Typography variant="h4">
                    Enter Card Information
                </Typography>
                <Select
                    label="Select Class"
                    onChange={handleChange}
                    value={inputValue}
                >
                    {classDropDownMenuItems}
                </Select>
                {requestButtonHtml}
                {displayTable}
            </header>
        </div>
    );
}

export default HomePage;
