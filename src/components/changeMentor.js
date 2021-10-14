
import React from "react";
import axios from "axios";
import"../css/changeMentor.css"
import { AppContext } from "./context";

function ChangeMentor(){
    //all the states from the context
    const{deletePopup , setDelete} = React.useContext(AppContext)
    const{editInfo , setEditInfo} = React.useContext(AppContext)
    const { getStud , setStud} = React.useContext(AppContext)
    const {allMent , setAllMent} = React.useContext(AppContext)
    const {blur ,setBlur} = React.useContext(AppContext)

    let sheet = editInfo.students.length


    // deleting or changeing the students mentor by remmoving 
    // him from the corresponding mentors list
    async function deleteStudent(value){   
        const response = await axios.put(`https://assignmentor68.herokuapp.com/change_mentor/${editInfo._id}/${value._id}`,{
            name: value.name,
            email: value.email,
            contact: value.contact
        })
        
        //correspondingly the data in UI
        let newStud = [...getStud , response.data ]
        setStud(newStud)
        let oldData = [...allMent]
        let result = oldData.map((item)=>{
            if(item._id === editInfo._id){
                 const filterData = item.students.filter((items)=>items._id !== response.data._id)
                 item.students = filterData
                 return item
            }else{
                return item
            }
        })
        
        setAllMent(result)

        const gear = editInfo.students.filter((item)=>item._id !== value._id)
        setEditInfo({...editInfo , students:gear})
     
    }


    return(
        <div className="chng">
        <div className="child2">
        <div className="title1">
            <h4>Mentor Information:</h4>
        </div>
        <div className="mentInfo">
            <p>Mentor Name : {editInfo.name}</p>
            <p>Email-Id : {editInfo.email}</p>
            <p>Contact: {editInfo.contact}</p>
            
        </div>
        <div className="title2">
            <h4>Remove Student To Change Mentor: </h4>
        </div>
        <div className="assignStud" style={sheet===0?{height:"100px"}:sheet===1?{height:"200px"}:{height:"340px"}}>
            
            <table className="table table-hover">
                <tbody>
                    {  sheet > 0 ?
                    
                        editInfo.students.map((item)=>{
                          
                            return(
                                <tr key = {item._id}>
                                <td>
                                <p>Student Name : {item.name}</p>
                                <p>Email-Id : {item.email}</p>
                                <p>Contact: {item.contact}</p>
                                <button className="btn btn-outline-danger" onClick={()=>{
                                    deleteStudent(item)
                                   
                                    }}>Remove</button>
                                </td>
                            </tr>
                            )
                           
                        }):
                        <tr>
                        <td  className="error">No Students Assigned To This Mentor Yet !!</td>
                      </tr> 
                    }
                </tbody>
            </table>
        </div>
        <div className="btnDiv">
        <button className="btns btn btn-outline-primary" onClick={()=>{
            setDelete(!deletePopup)
            setBlur(!blur)
        }}>Back</button>
        </div>
        </div>
        </div>
    )
}

export default ChangeMentor;
