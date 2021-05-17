import React from 'react'
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../Hooks/useFetch';
import styles from './PhotoDelete.module.css' 
const PhotoDelete = (id) => {
    const {loading, request} = useFetch();
    async function handleClick(){
        const confirm = window.confirm('Broo, tu vai deletar mermo ?');
        if(confirm){

            const {url, options} = PHOTO_DELETE(id);
            const {response} = await request(url, options);
            if(response.ok) window.location.reload();
        }
    }
    return (
        <div>
            {loading ? <button onClick={handleClick} disabled className={styles.delete}>Deletando..</button>: <button onClick={handleClick} className={styles.delete}>Deletar</button>}
        </div>
    )
}
export default PhotoDelete
