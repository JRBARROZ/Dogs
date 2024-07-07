import React from "react";
import { useParams } from "react-router-dom";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "./PhotoContent";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhoto } from "../../Store/photo";
const Photo = () => {
  const { id } = useParams();
  const { loading, error, data } = useSelector((state) => state.photo);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [id, dispatch]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <div className="container mainContainer">
        <PhotoContent single={true} />
      </div>
    );
  else return null;
};

export default Photo;
