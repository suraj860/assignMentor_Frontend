import axios from 'axios'
import React from "react";
import "../css/mentor_form.css"
import { AppContext } from "./context";


function Form(){

    //all the states from the context
    const {forms , setForms} = React.useContext(AppContext)
    const { info , setInfo } = React.useContext(AppContext)
    const {allMent , setAllMent} = React.useContext(AppContext)

    //api call for creating a new mentor
    async function createMen(){
        try{
            const response = await axios.post("https://assignmentor68.herokuapp.com/create_mentor",{
                name : info.name,
                email : info.email,
                contact : info.contact,
                students: []
            });
            setAllMent([...allMent , response.data])
        }
        catch(error){
            console.log(error)
        }   
    }

    // handle changes in the form
    function handleChange(event){
       
        switch(event.target.name){
            case "fullName":{
                setInfo({...info , name : event.target.value})
                break;
            }
            case "email":{
                setInfo({...info , email : event.target.value})
                break;
            }
            case "contact":{
                setInfo({...info , contact : event.target.value})
                break;
            }
            case "city":{
                setInfo({...info , city : event.target.value})
                break;
            }
            default:{
                return
            }
        }
    }

    //handle onsubmit form
    function handleSubmit(event){
       event.preventDefault()
       createMen()
       setForms(!forms)
       resetData()
    }

    function resetData(){
        setInfo(info.name = "")
    }
    // rendering the form
    return(
        <div className = "formDiv">
            <div className="form1">
        <form onSubmit={handleSubmit}>
            <label>Mentor Name :</label><br/>
            <input type="text" value = {info.name} name="fullName" onChange={handleChange} required></input><br/>
            <label>Email -Id :</label><br/>
            <input type="email" value = {info.email} name="email" onChange={handleChange} required></input><br/>
            <label>Contact :</label><br/>
            <input type="text" value = {info.contact} name="contact" onChange={handleChange} required></input><br/>
            <label>City :</label><br/>
            <input type="text" value = {info.city} name="city" onChange={handleChange} required></input><br/>
            <button type = "submit" className="btn btn-primary" style={{marginTop:"15px"}}>Sumit</button>
            <button className="btn btn-danger" style={{marginTop:"15px" , marginLeft:"10px"}} onClick={()=>{setForms(!forms)}}>Cancel</button>
        </form>
        </div>
        </div>
    )
}

export default Form;