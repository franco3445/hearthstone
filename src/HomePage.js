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

import { DisplayTable } from './DisplayTable'

function HomePage() {
    const [apiResults, setApiResults] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

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
            setPage(0);
            setApiResults(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const requestButtonHtml = lookupValues.map(button => {
        return (
            <Button
                onClick={e => reachHearthStoneEndpoint(e.target.value)}
                value={button.endpoint}
                variant="contained"
            >
                {button.title}
            </Button>
        )
    });

    const classDropDownMenuItems = classes.map(classs => {
        return (
            <MenuItem value={classs} >
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
                    Select a class below to get information
                </Typography>
                <Select
                    label="Select Class"
                    onChange={handleChange}
                    value={inputValue}
                >
                    {classDropDownMenuItems}
                </Select>
                {requestButtonHtml}
                <DisplayTable
                    results={apiResults}
                ></DisplayTable>
            </header>
        </div>
    );
}

export default HomePage;
