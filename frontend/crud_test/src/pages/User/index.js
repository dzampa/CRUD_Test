import React, {useEffect, useState} from 'react';
import {FiTrash2,FiEdit2} from 'react-icons/fi';

import api from '../../services/api';
import Menu from '../Menu/Menu';
import './styles.css';

export default function User(){

    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    
    const [idUser, setidUser] = useState(0); 
    const [Name, setName] = useState('');
    const [CPF, setCpf] = useState('');
    const [idProfile, setidProfile] = useState(0); 
    const [type, setType] = useState(''); 
    const cpf = require('node-cpf');        

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

        if(Name === '' || CPF === '' || idProfile === 0)
        {
            alert(`Name CPF and Profile is required!`)
            return;
        }

        if(Name.length < 6 || Name.length > 100){
            alert(`The name must be more than 6 and less than 100 characters long`)
            return;
        }

        if(CPF.length !== 11){            
            alert(`The CPF is invalid!`)
            return;
        }

        if(!cpf.validate(CPF)){            
            alert(`The CPF is invalid!`)
            return;
        }
        
        const User = ({
            'Name': Name,
            'CPF': parseInt(CPF)
        })      
                
        try{

            if (idUser === 0)
            {
                const response = await api.post('Users',User);

                const data2 = {   
                    'idUser': parseInt(response.data.idUser),         
                    'idProfile': parseInt(idProfile)
                };

                await api.post('User_Profile',data2);
        
                alert(`ID de usuário:: ${response.data.idUser}`);

            }
            else if (idUser !== 0)
            {
                await api.delete(`/User_Profile/byuserid/${idUser}`);

                const User = ({
                    'idUser': parseInt(idUser),
                    'Name': Name,
                    'CPF': parseInt(CPF)
                })   

                await api.put(`/Users/${idUser}`,User)

                const data2 = {   
                    'idUser': parseInt(idUser),         
                    'idProfile': parseInt(idProfile)
                };

                await api.post('User_Profile',data2);
        
                alert(`ID de usuário:: ${idUser}`)
                                
            }

            api.get('User_Profile/userprofile').then(response => {
                setUsers(response.data);
            });

            api.get('Profiles').then(response => {
                setProfiles(response.data);
            });

            setidUser(0)
            setName('');
            setCpf('');
            setidProfile(0);
            setType('');

        }catch (err){
            alert('Erro no cadastro, tente novemente.' + err);
        }        
    }

    async function handleUpdateUser(idUser,name,cpf,type){
        try{
            setName(name);
            setCpf(cpf);
            setType(type);
            setidUser(idUser);
            
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
                                <option value="0" >Choose the profile</option>
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
                        <button onClick={() => handleUpdateUser(user.idUser,user.name,user.cpf,user.type)} type="button">
                            <FiEdit2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>                  
        </div>
        
    )
}