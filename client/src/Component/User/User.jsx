import React, { useEffect, useState } from 'react'
import styles from './User.module.css'
import { useNavigate, useParams } from 'react-router-dom';

function User() {
    const {id} = useParams();
    const [user , setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchUser();
    },[])

    const fetchUser = async () =>{
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`api/users/user/${id}`);
            const data = await response.json();
            setUser(data.message);
            setLoading(false);
        }
        catch(err){
            console.log(err);
        }
    }

    const handleClick = async () =>{
        navigate(`/user/${user._id}/edit` , {state: {user : user}});
    }
    const handleLogOut = async =>{
        navigate('/');
    }
    
    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className={styles.detailsContainer}>
            <h1>Personal Details</h1>
            <div className={styles.details}>
                <div className={styles.value}>
                    <div className={styles.label}>Email:</div>
                    <div className={styles.email}>{user.email}</div>
                </div>
                <div className={styles.value}>
                    <div className={styles.label}>Name:</div>
                    <div className={styles.name}>{user.name}</div>
                </div>
            <button onClick={handleClick}>Edit details</button>
            <button onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
    );
}

export default User
