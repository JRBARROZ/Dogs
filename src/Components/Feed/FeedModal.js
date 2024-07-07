import React from "react";
import styles from "./FeedModal.module.css";
import Error from "../Helper/Error.js";
import Loading from "../Helper/Loading.js";
import PhotoContent from "../Photo/PhotoContent.js";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../Store/ui.js";
const FeedModal = () => {
  const dispatch = useDispatch();
  const { error, loading, data } = useSelector((state) => state.photo);
  const { modal } = useSelector((state) => state.ui);
  React.useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);
  if (!modal) return null;
  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent />}
    </div>
  );
};

export default FeedModal;
