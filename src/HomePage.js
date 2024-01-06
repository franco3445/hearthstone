import axios from "axios";
import './HomePage.css';

function HomePage() {

    const getCurrentPatchInformation = async function () {
        const options = {
            method: 'GET',
            url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/info',
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
    getCurrentPatchInformation();
      return (
        <div className="HomePage">
          <header className="HomePage-header">
            <h1>HearthStone Data Finder</h1>
              <p>Enter card information</p>
              <input/>
          </header>
        </div>
      );
}

export default HomePage;
