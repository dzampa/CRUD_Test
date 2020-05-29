import React, {useEffect, useState} from 'react';
import {FiTrash2,FiEdit2} from 'react-icons/fi';

import api from '../../services/api';
import Menu from '../Menu/Menu';
import './styles.css';

export default function Profile(){

    const [profiles, setProfiles] = useState([]);
    const [functionalities, setFunctionalities] = useState([]);

    const [idProfile, setidProfile] = useState(0);
    const [type, setType] = useState('');   
    const [idFunctionalities, setidFunctionalities] = useState([]);  

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

    async function handleRegister(e){
        e.preventDefault();

        if(type === '' || idFunctionalities.length <= 0)
        {
            alert(`Type and Functionalities is required!`)
            return;
        }  

        if(type.length < 6 || type.length > 100){
            alert(`The type must be more than 6 and less than 100 characters long`)
            return;
        }
               
        const Profile = ({
            'type': type
        }) 
       
        try{

            if (idProfile === 0)
            {
                const response = await api.post('Profiles',Profile);

                for (const idFunctionalitie of idFunctionalities)
                {
                    const data2 = {   
                        'idProfile': parseInt(response.data.idProfile),         
                        'idFunctionalities': parseInt(idFunctionalitie.idFunctionalities)
                    };
                    
                    await api.post('Profile_Functionalities',data2);
                }
        
                alert(`ID de profile:: ${response.data.idProfile}`);

            }
            else if (idProfile !== 0)
            {
                await api.delete(`/Profile_Functionalities/bytype/${idProfile}`);

                const Profile = ({
                    'idProfile': parseInt(idProfile),
                    'type': type
                })   

                await api.put(`/Profiles/${idProfile}`,Profile)

                for (const idFunctionalitie of idFunctionalities)
                {
                    const data2 = {   
                        'idProfile': parseInt(idProfile),         
                        'idFunctionalities': parseInt(idFunctionalitie.idFunctionalities)
                    };
                    
                    await api.post('Profile_Functionalities',data2);
                }
        
                alert(`ID de profile:: ${idProfile}`)
                                
            }

            api.get('Profile_Functionalities/profilefunc').then(response => {
                setProfiles(response.data);
            });
            
            setidProfile(0);
            setType('');
            setidFunctionalities([]);

        }catch (err){
            alert('Erro no cadastro, tente novemente.' + err);
        }        
    }

    async function handleDeleteProfile(id){
        try {
            await api.delete(`Profiles/${id}`);

            setProfiles(profiles.filter(profile => profile.idProfile !== id))
        } catch (error) {
            alert('Erro ao deletar perfil, tente novamente.')
        }
    }

    async function handleUpdateProfile(idProfile,type,functionalities){
        try{            

            setidProfile(idProfile);
            setType(type);
            setidFunctionalities([]);
            for (const Functionalitie of functionalities)
            {
                console.log(Functionalitie.idFunctionalities);
                idFunctionalities.push({idFunctionalities: Functionalitie.idFunctionalities});
            }    
            
            
        }catch (err){
            alert('Erro no cadastro, tente novemente.' + err);
        }
    }

    function handleInputChange(idFunctionalitie, checked) {       
        
        console.log(idFunctionalities.find(e=> e.idFunctionalitie = idFunctionalitie) == undefined);

        if(checked){
              idFunctionalities.push({idFunctionalities: idFunctionalitie});
        }
        else{
            idFunctionalities.pop({idFunctionalities: idFunctionalitie});
        }
        
    }

    return(
        <div>
            <Menu/>                           
            <form class="col s12" onSubmit={handleRegister}>
                <div class="row">
                    <div class="input-field col s6">
                        <input id="type" type="text" class="validate"
                            onChange={e=>setType(e.target.value)}/>
                        <label for="type">Profile</label>
                    </div>  
                    <div class="input-field col s3">
                        
                        {functionalities.map(functionalitie => (
                            <p>
                                <label>
                                    <input onChange={ e =>  handleInputChange(functionalitie.idFunctionalities, e.target.checked)} 
                                    type="checkbox" class="filled-in" key={functionalitie.idFunctionalities}/>
                                    <span>{functionalitie.type}</span>
                                </label>
                            </p>                           
                        ))}                            
                    </div>  
                    <div class="input-field col s3">
                        <button class="waves-effect waves-light btn" type="submit">Save</button>
                    </div>                        
                </div>  
            </form>      
            <ul class="collection">
                {profiles.map(({idProfile, functionalities, type}) => (
                    <li class="collection-item" key={idProfile}>
                        <strong>Type:</strong>
                        <p>{type}</p>   
                        
                        <strong>Functionalities:</strong>       
                        {functionalities.map(({idFunctionalities, type}) => 
                            <p key={idFunctionalities}>{type}</p> 
                        )}   
                        <button onClick={() => handleDeleteProfile(idProfile)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>     
                        <button onClick={() => handleUpdateProfile(idProfile,type,functionalities)} type="button">
                            <FiEdit2 size={20} color="#a8a8b3"/>
                        </button>              
                    </li>  
                               
                ))}
            </ul>          
        </div>
    )
}