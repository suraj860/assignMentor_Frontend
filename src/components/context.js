
import React from "react";
export const AppContext = React.createContext()

 export const Form = (props) => {
     //required all the states
     
    const[forms , setForms] = React.useState(false)
    const [stud_Form , setStudForm] = React.useState(false)
    const [ info , setInfo] = React.useState({
        name :"",
        email : "",
        contact :"",
        city : ""
    })
    const [ studInfo , setStudInfo] = React.useState({
        name :"",
        email : "",
        contact :"",
        address : ""
    })
    const[allMent , setAllMent] = React.useState([])
    const[getStud , setStud] = React.useState([])
    const[PopUp , setPopUp] =  React.useState(false)
    const[ment_id , setMent_id] = React.useState("")
    const[deletePopup , setDelete] = React.useState(false)
    const[editInfo , setEditInfo] = React.useState([])
    const [blur ,setBlur] = React.useState(false)
    return(
        <AppContext.Provider value = {{forms , setForms , info , 
        setInfo , stud_Form, setStudForm ,studInfo,setStudInfo,
        allMent , setAllMent , getStud , setStud ,PopUp ,setPopUp,
        ment_id , setMent_id,deletePopup , setDelete,editInfo , setEditInfo,
        blur ,setBlur}}>
            {props.children}
        </AppContext.Provider>
    )
}

