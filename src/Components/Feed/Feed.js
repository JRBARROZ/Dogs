import React from 'react'
import FeedModal from './FeedModal.js'
import FeedPhotos from './FeedPhotos.js'
import PropTypes from 'prop-types'
const Feed = ({user}) => {
    const [modalPhoto, setModalPhoto] = React.useState(null)
    const [pages, setPages] = React.useState([1])
    const [infinite, setInfinite] = React.useState(true);
    React.useEffect(()=>{
      let wait = false;
      function infiniteScroll(event){
        if(infinite){
          const scroll = window.scrollY;
          const height = document.body.offsetHeight - window.innerHeight;
          if(scroll > height * 0.75 && !wait){
            setPages((pages) => [...pages, pages.length + 1]) 
            wait = true;
            setTimeout(()=>{
              wait = false;
            }, 1000)       
          }
        }
      }
      window.addEventListener('wheel', infiniteScroll)
      window.addEventListener('scroll', infiniteScroll)
      return () =>{
        window.removeEventListener('wheel', infiniteScroll)
        window.removeEventListener('scroll', infiniteScroll)
      }
    },[infinite])
    return (
        <div>
          {modalPhoto && <FeedModal setModalPhoto = {setModalPhoto} photo={modalPhoto}/>}

          {pages.map((pages, index)=>{
            return <FeedPhotos key={index} user={user} page={pages} setInfinite={setInfinite} setModalPhoto = {setModalPhoto}/>
          })}
        </div>
    )
}
Feed.defaultProps = {
  user: 0,
}
Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ])
}

export default Feed
