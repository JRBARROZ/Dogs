import React from 'react'
import {UserContext} from '../../UserContext.js'
import PhotoCommentsForm from './PhotoCommentsForm.js'
import styles from './PhotoComments.module.css'
const PhotoComments = (props) => {
    console.log(props);
    const [comments, setComments] = React.useState(()=> props.comments)
    const {login} = React.useContext(UserContext)
    const commentSection = React.useRef(null);
    React.useEffect(()=>{
        commentSection.current.scrollTop = commentSection.current.scrollHeight;
    }, [comments])
    return (
        <>
            
            <ul ref={commentSection} className={`${styles.comments} ${props.single ?styles.single : ''}`}>
                {comments.map((comment) => <li key={comment.comment_ID}>
                    <b>{comment.comment_author}:</b>
                    <span>{comment.comment_content}</span>
                </li>)}
            </ul>
            {login && <PhotoCommentsForm single={props.single} id={props.id} setComments={setComments}/>}
        </>
    )
}

export default PhotoComments