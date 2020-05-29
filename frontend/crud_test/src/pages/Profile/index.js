import React from 'react';

import api from '../../services/api';
import Menu from '../Menu/Menu';
import './styles.css';

export default function Profile(){
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
        </div>
    )
}