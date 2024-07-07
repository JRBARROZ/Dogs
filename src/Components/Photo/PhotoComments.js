import React from "react";
import PhotoCommentsForm from "./PhotoCommentsForm.js";
import styles from "./PhotoComments.module.css";
import { useSelector } from "react-redux";
const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const { data } = useSelector((state) => state.user);
  const commentSection = React.useRef(null);
  React.useEffect(() => {
    commentSection.current.scrollTop = commentSection.current.scrollHeight;
  }, [comments]);
  return (
    <>
      <ul
        ref={commentSection}
        className={`${styles.comments} ${props.single ? styles.single : ""}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}:</b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {data && (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;
