import React, {useEffect, useState} from 'react';
import {FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import Menu from '../Menu/Menu';
import './styles.css';

export default function Profile(){

    const [profiles, setProfiles] = useState([]);
    const [functionalities, setFunctionalities] = useState([]);

    const [type, setType] = useState('');     

    useEffect(()=>{
        api.get('Profile_Functionalities/profilefunc').then(response => {
            setProfiles(response.data);
        });
    },[]);

    useEffect(()=>{
        api.get('Functionalities').then(response => {
            setFunctionalities(response.data);
        });
    },[]);

    async function handleDeleteProfile(id){
        try {
            await api.delete(`Profiles/${id}`);

            setProfiles(profiles.filter(profile => profile.idProfile !== id))
        } catch (error) {
            alert('Erro ao deletar perfil, tente novamente.')
        }
    }

    return(
        <div>
            <Menu/>
            <div class="row">                
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="profile" type="text" class="validate"/>
                            <label for="profile">Profile</label>
                        </div>  
                        <div class="input-field col s3">
                            {functionalities.map(functionalitie => (
                                <p>
                                    <label>
                                        <input type="checkbox" class="filled-in" key={functionalitie.idFunctionalities}/>
                                        <span>{functionalitie.type}</span>
                                    </label>
                                </p>                           
                            ))}                            
                        </div>  
                        <div class="input-field col s3">
                            <a class="waves-effect waves-light btn">Save</a> 
                        </div>                        
                    </div>  
                </form>              
            </div>      
            <ul class="collection">
                {profiles.map(({idProfile, functionalities, type}) => (
                    <li class="collection-item" key={idProfile}>
                        <strong>Type:</strong>
                        <p>{type}</p>   
                        
                        <strong>Functionalities:</strong>       
                        {functionalities.map(({idFunctionalities, type}) => 
                            <p>{type}</p> 
                        )}  
                        <button onClick={() => handleDeleteProfile(idProfile)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>                    
                    </li>  
                               
                ))}
            </ul>          
        </div>
    )
}