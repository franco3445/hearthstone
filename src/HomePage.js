import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './HomePage.css';

function HomePage() {

    const [inputValue, setInputValue] = React.useState('');
    const [apiResults, setApiResults] = React.useState([]);

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
        
        const options = {
            method: 'GET',
            url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/${endpoint}`,
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setApiResults(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const displayTable = (
        <TableContainer component={Paper} sx={{maxHeight: 500}}>
            <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Card Set</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Class</TableCell>
                        <TableCell align="right">Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {apiResults.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.cardSet}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.playerClass}</TableCell>
                            <TableCell align="right">{row.cost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    const requestButtonHtml = lookupValues.map(button => {
        return <Button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={button.endpoint} variant="outlined">{button.title}</Button>
    });

    const classDropDownMenuItems = classes.map(classs => {
        return <MenuItem value={classs}>{classs}</MenuItem>
    })

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
