import React, {useEffect, useState} from 'react';
import {FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import Menu from '../Menu/Menu';
import './styles.css';

export default function Profile(){

    const [profiles, setProfiles] = useState([]);

    const [type, setType] = useState('');     

    useEffect(()=>{
        api.get('Profile_Functionalities/profilefunc').then(response => {
            setProfiles(response.data);
        });
    },[]);

    async function handleDeleteFunctionalities(id){
        try {
            await api.delete(`Functionalities/${id}`);

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
                            <p>
                                <label>
                                    <input type="checkbox" class="filled-in"/>
                                    <span>Filled in</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" class="filled-in"/>
                                    <span>Filled in</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" class="filled-in"/>
                                    <span>Filled in</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" class="filled-in"/>
                                    <span>Filled in</span>
                                </label>
                            </p>
                        </div>  
                        <div class="input-field col s3">
                            <a class="waves-effect waves-light btn">Save</a> 
                        </div>                        
                    </div>  
                </form>              
            </div>      
            <ul class="collection">
                {profiles.map(profile => (
                    <li class="collection-item" key={profile.idProfile}>
                        <strong>Type:</strong>
                        <p>{profile.type}</p>
                    </li>    
                                      
                    /*{functionalities.map(functionalitie => (
                        <li class="collection-item" key={functionalitie.idFunctionalities}>
                            <strong>Functionalitie Type:</strong>
                            <p>{functionalitie.functionalities.type}</p> 
                        </li> 
                    ))}    */            
                ))}
            </ul>                 
        </div>
    )
}