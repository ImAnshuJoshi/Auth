import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EditUser.module.css'
import swal from "sweetalert2";

function EditUser() {
    const location = useLocation();
    const [user , setUser] = useState({});
    const [loading , setLoading] = useState(false);
    const [name , setName] = useState(location.state.user.name);
    const [oldPass , setOldPass] = useState("");
    const [newPass , setNewPass] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(location.state.user)
        setUser(location.state.user)
        console.log(user)
    },[])

    const handleClick = async (e) =>{
        setLoading(true);
        e.preventDefault();
        try{
            const userEmail = location.state.user.email;
            let body
            if(!name && (!oldPass || !newPass)){
                swal.fire({
                    position: "middle",
                    icon: "error",
                    title: "Please try again!",
                    text: "Provide details to edit",
                    showConfirmButton: false,
                    timer: 1500,
                  });
            }
            if(name && oldPass && newPass){
                body ={
                    email:userEmail,
                    name:name,
                    prevPassword:oldPass,
                    newPassword:newPass
                }
            }
            if(name && (!oldPass && !newPass)){
                body ={
                    email:userEmail,
                    name:name
                }
            }
            if(!name && (oldPass && newPass)){
                body ={
                    email:userEmail,
                    prevPassword:oldPass,
                    newPassword:newPass
                }
            }
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`api/users/user/edit`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            const data = await response.json();
            const {status , message} = data;
            navigate(`/user/${location.state.user._id}`)
            if (status === "Success") {
                navigate(`/user/${user._id}`);
                swal.fire({
                  position: "top-end",
                  icon: "success",
                  text: data.message,
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Please try again!",
                  text: message.errorMessage,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
        }
        catch(err){
            const { status, message } = err.response.data;
      swal.fire({
        position: "middle",
        icon: "error",
        title: "Please try again!",
        text: message.errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
        }
        finally{
            setLoading(false);
        }
    }
    const handleBack = async ()=>{
        navigate(-1);
    }

    // if (loading) {
    //     return <div>Loading...</div>; 
    // }
  return (
    <div className={styles.detailsContainer}>
    <h1>Personal Details</h1>
    <div className={styles.details}>
        <div className={styles.value}>
            <div className={styles.label}>Name:</div>
            <input type="text" value={name} onChange={(e)=>{
                setName(e.target.value)
            }} />
            <div className={styles.label}>Old password:</div>
            <input type="text" value={oldPass} onChange={(e)=>{
                setOldPass(e.target.value)
            }} />
            <div className={styles.label}>New password:</div>
            <input type="text" value={newPass} onChange={(e)=>{
                setNewPass(e.target.value)
            }} />
        </div>
    <button onClick={handleClick}>{
        loading ? "Loading..." : "Edit details"
    }</button>
    <button onClick={handleBack}>Go back</button>
    </div>
</div>
  )
}

export default EditUser