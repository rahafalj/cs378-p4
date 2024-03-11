import React from 'react';
import './Weather.css';


const WeatherInfo = (props) => {
    return (
        <div>
           {props["clickedCity"].length === 0 && <h1>No weather data to display!</h1>}
           <div className='parent'>
           {props["clickedCity"].length !== 0 && props["clickedCity"]["times"].slice(0, 24).map((props) => (
            <div className='time'><h1>{props.slice(-5)}</h1></div>
            ))}
            {props["clickedCity"].length !== 0 && props["clickedCity"]["temps"].slice(0,24).map((props) => (
                <div className='temp'><h1>{props + "C"}</h1></div>
            ))}
            </div>

        </div>
    );
};

export default WeatherInfo;
