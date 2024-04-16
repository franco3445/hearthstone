import * as React from 'react';
import axios from "axios";

import { styled } from '@mui/material/styles';

import {
    Button,
    FormControl,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';

import './HomePage.css';

import { DisplayTable } from './DisplayTable'

function HomePage() {
    const [apiResults, setApiResults] = React.useState([]);
    const [classValue, setClass]= React.useState('');
    const [locale, setLocale] = React.useState('');
    const [health,setHealth] = React.useState('');
    const [durability,setDurability] = React.useState('');
    const [cost,setCost] = React.useState('');
    const [attack,setAttack] = React.useState('');
    const [callback,setCallback] = React.useState('');
    const [collectible,setCollectible] = React.useState('');
    const [params, setParams] = React.useState({});

    const handleClassChange = (event) => {
        setClass(event.target.value);
    };

    const handleHealthChange = (event) => {
        setHealth(event.target.value);
        if(event.target.value === ''){
            delete params['health']
        } else {
            const healthParam = {'health': event.target.value}
            setParams({
                ...healthParam,
                ...params
            });
        }
    };

    const handleDurabilityChange = (event) => {
        setDurability(event.target.value);
        if(event.target.value === ''){
            delete params['durability']
        } else {
            const durabilityParam = {'durability': event.target.value}
            setParams({
                ...durabilityParam,
                ...params
            });
        }
    };

    const handleCostChange = (event) => {
        setCost(event.target.value);
        if(event.target.value === ''){
            delete params['cost']
        } else {
            const costParam = {'cost': event.target.value}
            setParams({
                ...costParam,
                ...params
            });
        }
    };

    const handleAttackChange = (event) => {
        setAttack(event.target.value);
        if(event.target.value === ''){
            delete params['attack']
        } else {
            const attackParam = {'attack': event.target.value}
            setParams({
                ...attackParam,
                ...params
            });
        }
    };

    const handleCallbackChange = (event) => {
        setCallback(event.target.value);
        if(event.target.value === ''){
            delete params['callback']
        } else {
            const callbackParam = {'callback': event.target.value}
            setParams({
                ...callbackParam,
                ...params
            });
        }
    };

    const handleCollectibleChange = (event) => {
        setCollectible(event.target.value);
        if(event.target.value === ''){
            delete params['collectible']
        } else {
            const collectibleParam = {'collectible': event.target.value}
            setParams({
                ...collectibleParam,
                ...params
            });
        }
    };

    const handleLocaleChange = (event) => {
        setLocale(event.target.value);
        if(event.target.value === ''){
            delete params['locale']
        } else {
            const localeParam = {'locale': event.target.value}
            setParams({
                ...localeParam,
                ...params
            });
        }
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

    const locales = [
        'enUS',
        'enGB',
        'deDE',
        'esES',
        'esMX',
        'frFR',
        'itIT',
        'koKR',
        'plPL',
        'ptBR',
        'ruRU',
        'zhCN',
        'zhTW',
        'jaJP',
        'thTH',
    ];

    const lookupValues = [
        {endpoint: `cards/classes/${classValue}`,   title: 'Search'},
    ];

    const reachHearthStoneEndpoint = async function (endpoint) {
        console.log('Sending request...')
        const options = {
            method: 'GET',
            url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/${endpoint}`,
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
            },
            params
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

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
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
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }));

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

    const localeDropDownMenuItems = locales.map(locale => {
        return (
            <MenuItem value={locale}>
                {locale}
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
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="select-label">
                        Select Class
                    </InputLabel>
                    <Select
                            input={<BootstrapInput />}
                            onChange={handleClassChange}
                            value={classValue}
                    >
                        {classDropDownMenuItems}
                    </Select>
                </FormControl>
                <TextField
                    id="outlined-health-input"
                    input={<BootstrapInput />}
                    label="Health"
                    onChange={handleHealthChange}
                    type="health"
                    value={health}
                />
                <TextField
                    id="outlined-durability-input"
                    label="Durability"
                    onChange={handleDurabilityChange}
                    type="durability"
                    value={durability}
                />
                <TextField
                    id="outlined-cost-input"
                    label="Cost"
                    onChange={handleCostChange}
                    type="cost"
                    value={cost}
                />
                <TextField
                    id="outlined-attack-input"
                    label="Attack"
                    onChange={handleAttackChange}
                    type="attack"
                    value={attack}
                />
                <TextField
                    id="outlined-callback-input"
                    label="Callback"
                    onChange={handleCallbackChange}
                    type="callback"
                    value={callback}
                />
                <TextField
                    id="outlined-collectible-input"
                    label="Collectible"
                    onChange={handleCollectibleChange}
                    type="collectible"
                    value={collectible}
                />
                <Select
                    input={<BootstrapInput />}
                    label="Locale"
                    onChange={handleLocaleChange}
                    value={locale}
                >
                    {localeDropDownMenuItems}
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
