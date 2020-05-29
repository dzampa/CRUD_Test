import React, {useEffect, useState} from 'react';
import {FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import Menu from '../Menu/Menu';
import './styles.css';

export default function Functionalities(){

    const [functionalities, setFunctionalities] = useState([]);

    const [type, setType] = useState(''); 
    

    useEffect(()=>{
        api.get('Functionalities').then(response => {
            setFunctionalities(response.data);
        });
    },[]);

    async function handleDeleteFunctionalities(id){
        try {
            await api.delete(`Functionalities/${id}`);

            setFunctionalities(functionalities.filter(functionalitie => functionalitie.idFunctionalities !== id))
        } catch (error) {
            alert('Erro ao deletar funcionalidade, tente novamente.')
        }
    }

    async function handleRegister(e){
        e.preventDefault();
        const Functionalitie = ({
            'Type': type
        })      
                
        try{
            const response = await api.post('/Functionalities',Functionalitie);
    
            alert(`ID de funcionalidade:: ${response.data.idFunctionalities}`)

        }catch (err){
            alert('Erro no cadastro, tente novemente.' + err);
        }
        
    }

    return(
        <div>
            <Menu/>
            <form class="col s12" onSubmit={handleRegister}>
                <div class="row">                
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <input 
                                    id="type" 
                                    type="text" 
                                    class="validate"                            
                                    value={type}
                                    onChange={e=>setType(e.target.value)}
                                />
                                <label for="profile">Functionalities</label>
                            </div>                     
                        </div>
                        <button class="waves-effect waves-light btn" type="submit">Save</button>
                    </form>              
                </div>   
            </form>
            <ul class="collection">
                {functionalities.map(functionalitie => (
                    <li class="collection-item" key={functionalitie.idFunctionalities}>
                        <strong>Type:</strong>
                        <p>{functionalitie.type}</p>
                        
                        <button onClick={() => handleDeleteFunctionalities(functionalitie.idFunctionalities)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>                           
        </div>
    )
}