import CreateEmployeeForm from "../components/CreateEmployeeForm";
import ListEmployees from "../components/ListEmployees";
import { useState } from "react";

const Dashboard= ()=>{

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm,setShowEditForm] =useState(false)
    
    const handleCreateEmployee= ()=>{
      setShowCreateForm((prev)=>!prev)
    }

    

    return(
     <>
     {showCreateForm?null:(<div><button onClick={()=>{handleCreateEmployee()}}>CreateEmployee</button></div>)}

     {showCreateForm?<CreateEmployeeForm showCreateForm={showCreateForm} setShowCreateForm={setShowCreateForm} />:null}
     {!showCreateForm && !showEditForm?<ListEmployees showEditForm={showEditForm} setShowEditForm={setShowEditForm}  />:null}
     
     </>







    )
     

}

export default Dashboard;