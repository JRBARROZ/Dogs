import React from "react";
import { Link } from "react-router-dom";
import Image from "../Helper/Image";
import styles from "../Photo/PhotoContent.module.css";
import PhotoComments from "./PhotoComments.js";
import PhotoDelete from "./PhotoDelete.js";
import { useSelector } from "react-redux";
const PhotoContent = ({ data, single }) => {
  const { data: user } = useSelector((state) => state.user);
  const { photo, comments } = useSelector((state) => state.photo.data);
  return (
    <div className={`${styles.photo} ${single ? styles.single : ""}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user.data && user.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} single={single} comments={comments} />
    </div>
  );
};

export default PhotoContent;
