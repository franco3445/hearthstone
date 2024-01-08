import axios from "axios";
import * as React from 'react';
import './HomePage.css';

function HomePage() {

    const [inputValue, setInputValue] = React.useState('')

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
                <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={'info'}>Get Patch Notes</button>
                <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={'cards'}>Get All Cards</button>
                <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={`cards/search/${inputValue}`}>Search Card</button>
                <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={`cards/classes/${inputValue}`}>Search by Class</button>
                <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={`cards/races/${inputValue}`}>Search by Race</button>
                <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={`cards/sets/${inputValue}`}>Search by Set</button>
                <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={`cards/qualities/${inputValue}`}>Search by Qualities</button>
                <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={`cards/factions/${inputValue}`}>Search by Faction</button>
                <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={`cards/types/${inputValue}`}>Search by Type</button>
                <button onClick={e => reachHearthStoneEndpoint(e.target.value)} value={`cardbacks`}>Get CardBacks</button>
            </header>
        </div>
    );
}

export default HomePage;
