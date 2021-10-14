import React from "react";
import"../css/allstudents.css"
import axios from "axios";
import { AppContext } from "./context";

function Allstudents(){
  //all the states from the context
  const {blur ,setBlur} = React.useContext(AppContext)
    const { getStud , setStud} = React.useContext(AppContext)
    const {ment_id } =  React.useContext(AppContext)
    const {allMent , setAllMent} = React.useContext(AppContext)
    const{PopUp , setPopUp} =  React.useContext(AppContext)

    const number = getStud.length;
    //getting all the student information with this api call
    async function getStudent(){
      try{
        const {data} = await axios.get("https://assignmentor68.herokuapp.com/students");
        setStud(data)
      }
      catch(error){
        console.log(error)
      }
    }
   
        getStudent()
   

    //assigneing a student to the mentor with this put api call
    async function giveMentor(value){
        const response = await axios.put(`https://assignmentor68.herokuapp.com/assign_student/${ment_id}/${value._id}`,{
            name :value.name,
            email: value.email,
            contact:value.contact
        })
        // console.log(response.data)
        let prevData = [...getStud]
        let newData = prevData.filter((item)=> item._id !== value._id)
        setStud(newData);

        let menPrev =[...allMent];
        let index = menPrev.findIndex((item)=>item._id === response.data._id)
        menPrev[index] = response.data
        setAllMent(menPrev)


    }
    return (
      
    <div className = "parent">

      {/* returning students data having no mentors in form of table */}
      <div className = "child">
        <div className ="title">
          <h5>Students List Having No Mentors Assigned :</h5>
        </div>
        <div className="scroll" style={getStud.length===0?{height:"100px"}:getStud.length===1?{height:"200px"}:{height:"340px"}}>
      
        <table className="table table-hover">
          <tbody>
            { number > 0 ?
            getStud.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <p>Name : {item.name}</p>
                    <p>Email_Id : {item.email}</p>
                    <p>Contact : {item.contact}</p>
                    <button className="btn btn-outline-primary" onClick={()=>{giveMentor(item)}}>Add</button>
                  </td>
                </tr>
              );
            }): 
            <tr>
              <td  className="error">No Students available !!</td>
            </tr>
            }
          </tbody>
        </table>
        </div>
        <div>
            <button className="btns btn btn-outline-primary" onClick={()=>{
              setPopUp(!PopUp)
              setBlur(!blur)
            }}>Back</button>
            
        </div>
      </div>
     
     
      </div>
    );
}

export default Allstudents;