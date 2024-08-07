import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import styles from "./FeedPhotos.module.css";
import { useSelector } from "react-redux";
const FeedPhotos = () => {
  const { list, loading, error } = useSelector((state) => state.feed);
  return (
    <ul className={`${styles.feed} animeLeft `}>
      {list.map((photo) => (
        <FeedPhotosItem key={photo.id} photo={photo} />
      ))}
    </ul>
  );
};

export default FeedPhotos;
