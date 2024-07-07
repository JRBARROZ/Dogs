import React from "react";
import FeedModal from "./FeedModal.js";
import FeedPhotos from "./FeedPhotos.js";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadNewPhotos, resetPhotosState } from "../../Store/feed.js";
import Loading from "../Helper/Loading.js";
import Error from "../Helper/Error.js";
const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const { list, infinite, loading, error } = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetPhotosState());
    dispatch(loadNewPhotos({ user }));
  }, [dispatch, user]);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll(event) {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          dispatch(loadNewPhotos({ user }));
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 1000);
        }
      }
    }
    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite, dispatch, user]);
  return (
    <div>
      <FeedModal />
      {loading && <Loading />}
      {!!error && <Error error={error} />}
      {list?.length > 0 && <FeedPhotos setModalPhoto={setModalPhoto} />}
      {!infinite && "Não existem mais publicações"}
    </div>
  );
};
Feed.defaultProps = {
  user: 0,
};
Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
