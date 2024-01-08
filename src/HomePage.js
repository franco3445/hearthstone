import axios from "axios";
import * as React from 'react';
import './HomePage.css';

function HomePage() {

    const [inputValue, setInputValue] = React.useState('')

    const lookupValues = [
        { endpoint :'info',  title: 'Get Patch Notes'},
        { endpoint :'cards',  title: 'Get All Cards'},
        { endpoint :`cards/search/${inputValue}`,  title: 'Search Card'},
        { endpoint :`cards/classes/${inputValue}`,  title: 'Search by Class'},
        { endpoint :`cards/races/${inputValue}`,  title: 'Search by Race'},
        { endpoint :`cards/sets/${inputValue}`,  title: 'Search by Set'},
        { endpoint :`cards/qualities/${inputValue}`,  title: 'Search by Qualities'},
        { endpoint :`cards/factions/${inputValue}`,  title: 'Search by Faction'},
        { endpoint :`cards/types/${inputValue}`,  title: 'Search by Type'},
        { endpoint :'cardback', title: 'Get CardBacks'},
    ];

    const reachHearthStoneEndpoint = async function (endpoint) {
        console.log(inputValue);
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
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="HomePage">
            <header className="HomePage-header">
                <h1>HearthStone Data Finder</h1>
                <p>Enter card information</p>
                <input value={inputValue} onInput={e => setInputValue(e.target.value)}/>
                {lookupValues.map(button => {
                    return <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={button.endpoint}>{button.title}</button>
                })}
            </header>
        </div>
    );
}

export default HomePage;
