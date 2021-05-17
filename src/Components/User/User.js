import React from 'react'
import UserHeader from './UserHeader.js'
import {Routes, Route} from 'react-router-dom'
import Feed from '../Feed/Feed';
import UserPhotoPost from './UserPhotoPost.js'
import UserStats from './UserStats.js'
import { UserContext } from '../../UserContext.js';
import NotFound from '../NotFound.js';
const User = () => {
    const {data} = React.useContext(UserContext);
    return (
        <section className="container">
            <UserHeader />
            <Routes>
                <Route path="/" element={<Feed user={data.id}/>}/>
                <Route path="postar" element={<UserPhotoPost />}/>
                <Route path="estatisticas" element={<UserStats />}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </section>
    )
}

export default User
