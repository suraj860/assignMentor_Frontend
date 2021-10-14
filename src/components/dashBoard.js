
import axios from "axios";
import { AppContext } from "./context";
import React from "react";
import Allstudents from "./allstudents";
import ChangeMentor from "./changeMentor";

function Dash(){
      //all the states from the context
    const {blur ,setBlur} = React.useContext(AppContext)
    const {allMent , setAllMent} = React.useContext(AppContext)
    const{PopUp , setPopUp} =  React.useContext(AppContext)
    const { setMent_id} =  React.useContext(AppContext)
    const{deletePopup , setDelete} = React.useContext(AppContext)
    const{setEditInfo} = React.useContext(AppContext)

    // initially getting all the mentor data
   
        async function getData(){
            const response = await axios("https://assignmentor68.herokuapp.com/mentors")
            setAllMent(response.data)
        }
        getData()
    

    function assignStudent(value){
        setMent_id(value._id)
    }
    
    function edit(value){
        setEditInfo(value)
    }

    return(
        <div>
        <div className = "container-fluid" style={{filter: blur===true ?"blur(2px)" : "none"}}>
            <div className="row">
                <div className="col-lg-2">
                    <button className="btn btn-primary btn-lg btn-block" style = {{marginTop:"20px"}}>Total Mentors : {allMent.length}</button><br/>
                    <button className="btn btn-primary btn-lg btn-block">Students</button>
                </div>
                <div className="col-lg-10">
                  <table  className="table table-hover">
                      <tbody>
                          {
                              allMent.map((item)=>{
                                  return(
                                    <tr key={item._id}>
                                    <td>
                                        <p>Mentor Name : {item.name}</p>
                                        <p>Email_Id : {item.email}</p>
                                        <p>Contact : {item.contact}</p>
                                        <p> <span style={item.students.length > 0 ? {color:"green"}:{color:"red"}}>
                                            Total Student Assigned : {item.students.length}</span></p>
                                        <button className="btn btn-info"  style={{margin:"8px 20px 8px 0"}}
                                        onClick={()=>{
                                            
                                            setPopUp(!PopUp)
                                            setBlur(!blur)
                                            assignStudent(item)
                                        }}

                                        >Add Student</button>
                                        <button className="btn btn-warning"
                                         onClick={()=>{
                                           
                                            edit(item)
                                             setDelete(!deletePopup)
                                             setBlur(!blur)
                                        }}
                                        >Edit/change_mentor</button>
                                    </td>
                                    </tr> 
                                  )
                              })
                            }
                      </tbody>
                  </table>
                </div>
               
            </div>
           
        </div>
        {
            PopUp === true? <Allstudents /> :null
         }
         {
             deletePopup === true ? <ChangeMentor/> : null
         }
        </div>
    )
}

export default Dash;