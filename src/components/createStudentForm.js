import axios from 'axios'
import React from "react";
import "../css/mentor_form.css"
import { AppContext } from "./context";


function StudForm(){
    const {stud_Form , setStudForm} = React.useContext(AppContext)
    const { studInfo , setStudInfo } = React.useContext(AppContext)
    const { getStud , setStud} = React.useContext(AppContext)
 
//creating a new sudent
    async function createStudent(){
        const response = await axios.post("https://assignmentor68.herokuapp.com/create_student",{
            name : studInfo.name,
            email : studInfo.email,
            contact : studInfo.contact
        });
        setStud([...getStud , response.data])
    }

    //handeling changes in form
    function handleChange(event){
       
        switch(event.target.name){
            case "fullName":{
                setStudInfo({...studInfo , name : event.target.value})
                break;
            }
            case "email":{
                setStudInfo({...studInfo , email : event.target.value})
                break;
            }
            case "contact":{
                setStudInfo({...studInfo , contact : event.target.value})
                break;
            }
            case "city":{
                setStudInfo({...studInfo , city : event.target.value})
                break;
            }
            default:{
                return
            }
        }
    }
//handle submit of form
    function handleSubmit(event){
       event.preventDefault()
       createStudent()
       setStudForm(!stud_Form)
       //reset the data to blank
       resetData()
   
    }
    function resetData(){
        setStudInfo(studInfo.name = "")
    }

   
    return(
        <div className = "formDiv">
             <div className="form1">
        <form onSubmit={handleSubmit}>
            <label>Student Name :</label><br/>
            <input type="text" value = {studInfo.name} name="fullName" onChange={handleChange} required></input><br/>
            <label>Email -Id :</label><br/>
            <input type="email" value = {studInfo.email} name="email" onChange={handleChange} required></input><br/>
            <label>Contact :</label><br/>
            <input type="text" value = {studInfo.contact} name="contact" onChange={handleChange} required></input><br/>
            <label>Address :</label><br/>
            <input type="text" value = {studInfo.city} name="city" onChange={handleChange} required></input><br/>
            <button type = "submit" className="btn btn-primary" style={{marginTop:"15px"}}>Sumit</button>
            <button className="btn btn-danger" style={{marginTop:"15px" , marginLeft:"10px"}} onClick={()=>{setStudForm(!stud_Form)}}>
                Cancel</button>
        </form>
        </div>
        </div>
    )
}

export default StudForm;