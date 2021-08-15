import React from 'react';
import Button from '../Button';
import style from './style.module.css';
import { Link} from 'react-router-dom';

function TodoDetails({match}) {
    console.log(match)
    return (<>
        <div>
           <p>Id of the selected to do: <span className={style["id-span"]}>{match.params.id}</span> </p> 
           <p>{match.params.text}</p>
        </div>
        <Link to='/todo'><Button children='<- Go Back'></Button></Link>
        
        </>
    );
}

export default TodoDetails;