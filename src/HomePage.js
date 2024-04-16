import * as React from 'react';
import axios from "axios";

import {
    Button,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';

import './HomePage.css';

import { DisplayTable } from './DisplayTable'

function HomePage() {
    const [apiResults, setApiResults] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');

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
        {endpoint: `cards/classes/${inputValue}`,   title: 'Search by Class'},
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
