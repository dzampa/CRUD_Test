import React, {useEffect, useState} from 'react';
import {FiTrash2,FiEdit2} from 'react-icons/fi';

import api from '../../services/api';
import Menu from '../Menu/Menu';
import './styles.css';

export default function Functionalities(){

    const [functionalities, setFunctionalities] = useState([]);

    const [type, setType] = useState(''); 
    const [idFunctionalities, setidFunctionalities] = useState(0); 
    

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

        if(type === '') 
        {
            alert(`Type is required!`)
            return;
        }

        if(type.length < 6 || type.length > 100){
            alert(`The type must be more than 6 and less than 100 characters long`)
            return;
        }
                
        try{
            if(idFunctionalities===0)
            {
                
                const Functionalitie = ({
                    'Type': type
                })  

                const response = await api.post('/Functionalities',Functionalitie);
        
                alert(`ID de funcionalidade:: ${response.data.idFunctionalities}`)
    
                api.get('Functionalities').then(response => {
                    setFunctionalities(response.data);
                });
            }
            else if(idFunctionalities!==0)
            {
                
                const Functionalitie = ({
                    'idFunctionalities': parseInt(idFunctionalities),
                    'Type': type
                })  

               await api.put(`/Functionalities/${idFunctionalities}`,Functionalitie);
        
                alert(`ID de funcionalidade:: ${idFunctionalities}`)
    
                api.get('Functionalities').then(response => {
                    setFunctionalities(response.data);
                });
            }

            setType('');
            setidFunctionalities(0);  

        }catch (err){
            alert('Erro no cadastro, tente novemente.' + err);
        }
        
    }

    async function handleUpdateFunctionalities(idFunctionalities,type){
        try{
            setType(type);
            setidFunctionalities(idFunctionalities);            
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
                        <button onClick={() => handleUpdateFunctionalities(functionalitie.idFunctionalities,functionalitie.type)} type="button">
                            <FiEdit2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>                           
        </div>
    )
}