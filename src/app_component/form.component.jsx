import React from 'react';
import './form.style.css';

const Form = (props) =>{
return(
    <div className="container">
            <div>{props.error? error():null}</div>
       <form onSubmit={props.loadweather}>
       <div className="row mt-4">
            <div className="col-md-3 py-2">
                <input type="text" className="form-control" name= "city" autoComplete="on" placeholder='City'/> 
            </div>

            <div className="col-md-3 py-2">
                <input type="text" className="form-control " name= "country" autoComplete="on" placeholder = 'Country'/>
            </div>

            <div className="col-md-3 py-4">
                <button className = "btn btn-warning">Get Weather</button>
            </div>
        </div>

       </form>
    </div>

    
);

};

function error(){
    return(
        <div className="alert alert-danger" role="alert">Please Enter City and Country</div>
    );
}

export default Form;
