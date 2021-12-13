import React, {useState} from "react";
import button from "bootstrap/js/src/button";

const Bookmark = (props) => {
    const {user} = props
    const [bookmark, setBookmark] = useState(user.bookmark)
    const handleBookmarkStatus = () => setBookmark(!bookmark)

    return (
        <>
            {
                bookmark
                    ? <button onClick={handleBookmarkStatus}><i className="bi bi-bookmark-fill"/></button>
                    : <button onClick={handleBookmarkStatus}><i className="bi bi-bookmark"/></button>
            }
        </>

    )
}

export default Bookmark