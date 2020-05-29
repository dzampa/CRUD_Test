import React, {useEffect, useState} from 'react';
import {FiTrash2} from 'react-icons/fi';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';
import Menu from '../Menu/Menu';
import './styles.css';

export default function User(){

    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);

    const [Name, setName] = useState('');
    const [CPF, setCpf] = useState('');
    const [idProfile, setidProfile] = useState('');    
    
    const history = useHistory();

    useEffect(()=>{
        api.get('User_Profile/userprofile').then(response => {
            setUsers(response.data);
        });
    },[]);

    useEffect(()=>{        
        api.get('Profiles').then(response => {
            setProfiles(response.data);
        });
    },[]);

    async function handleRegister(e){
        e.preventDefault();
        const User = ({
            'Name': Name,
            'CPF': parseInt(CPF)
        })      
                
        try{
            const response = await api.post('Users',User);

            const data2 = {   
                'idUser': parseInt(response.data.idUser),         
                'idProfile': parseInt(idProfile)
            };

           await api.post('User_Profile',data2);
    
            alert(`ID de usuário:: ${response.data.idUser}`)

           /* var data = ({
                "idUser": parseInt(response.data.idUser),
                "name": Name,
                "cpf": parseInt(CPF),
                "type": null
            })
            
            setUsers(data);*/

        }catch (err){
            alert('Erro no cadastro, tente novemente.' + err);
        }
        
    }

    async function handleDeleteUser(id){
        try {
            await api.delete(`Users/${id}`);

            setUsers(users.filter(user => user.idUser !== id))
        } catch (error) {
            alert('Erro ao deletar usuario, tente novamente.')
        }
    }

    return(    
        <div>
            <Menu/>            
            <div class="row">                
                <form class="col s18" onSubmit={handleRegister}>
                    <div class="row">
                        <div class="input-field col s6">
                            <input 
                                id="name" 
                                type="text" 
                                class="validate"                            
                                value={Name}
                                onChange={e=>setName(e.target.value)}
                            />
                            <label for="name">Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input 
                                id="cpf" 
                                type="number" 
                                class="validate"                            
                                value={CPF}
                                onChange={e=>setCpf(e.target.value)}
                            />
                            <label for="cpf">CPF</label>
                        </div>
                    </div>             
                    <div class="row">
                        <div class="input-field col s6">
                            <select class="browser-default" value={idProfile} onChange={e => setidProfile(e.target.value)}>
                                <option value="" >Choose the profile</option>
                                {profiles.map(profile =>(
                                    <option 
                                        value={profile.idProfile} >
                                            {profile.type}
                                    </option>
                                ))}
                            </select>
                        </div>                        
                    </div>
                    <button class="waves-effect waves-light btn" type="submit">Save</button>
                </form>              
            </div>   
            <ul class="collection">
                {users.map(user => (
                    <li class="collection-item" key={user.idUser}>
                        <strong>Name:</strong>
                        <p>{user.name}</p>
                        
                        <strong>CPF:</strong>
                        <p>{user.cpf}</p>

                        <strong>Profile:</strong>
                        <p>{user.type}</p>
                        
                        <button onClick={() => handleDeleteUser(user.idUser)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>                  
        </div>
        
    )
}