import React from "react";
import styles from "./FeedPhotosItem.module.css";
import Image from "../Helper/Image.js";
import { useDispatch } from "react-redux";
import { openModal } from "../../Store/ui.js";
import { fetchPhoto } from "../../Store/photo.js";
function FeedPhotosItem({ photo }) {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(openModal());
    dispatch(fetchPhoto(photo.id));
  }
  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span>{photo.acessos}</span>
    </li>
  );
}

export default FeedPhotosItem;
