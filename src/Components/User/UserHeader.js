import React from 'react'
import UserHeaderNav from './UserHeaderNav'
import styles from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';
const UserHeader = () => {
    const [title, setTitle] = React.useState('');
    const location = useLocation();
    React.useEffect(()=>{
        const {pathname} = location;
        switch (pathname) {
            case '/conta/postar':
                setTitle('Poste Sua Foto')
                break;
            case '/conta/estatisticas':
                setTitle('Estatísticas')
                break;
            default:
                setTitle('Minha Conta')
            break;
        }
        // if('/conta/estatisticas' === location.pathname) setTitle('Estatísticas')
        // else if('/conta' === location.pathname) setTitle('Feed')
        // else if('/conta/postar') setTitle('Postar')
        // else setTitle('');
    }, [location])
    return (
        <header className={styles.header}>
            <h1 className="title">{title}</h1>
            <UserHeaderNav />
        </header>
    )
}

export default UserHeader
