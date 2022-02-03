import React from 'react';

const Weather =(props) =>{
    return(
        <div className="container text-light">
            <div className="cards">
                <h1>{props.city}</h1> 
               
              <h5 className="py-4"> 
                  <i className={`wi ${props.weather_icon}  display-1`}></i>
              </h5>

              {props.temp_celsius?(<h1 className="py-2">{props.temp_celsius}&deg;</h1>
              ):null}

    

              {/**show min and max temp */}
              {minmaxTemp(props.temp_min, props.temp_max)}
    <h5 className='py-2'>{props.description}</h5>

            </div>
            
        </div>
    );
};

function minmaxTemp(min, max){
   if(min&&max){

    return (
        <h5>
            <span className="px-4">Low: {min}&deg;</span>
            <span className="px-4">High: {max}&deg;</span>
        </h5>

        

    );
   }
}

function designer(){
    return(
        <h6 className="py-20">uuyuyu</h6>
    );
}



export default Weather;