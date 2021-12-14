import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ user, onToggleBookmark }) => {
    return (
        <button onClick={() => onToggleBookmark(user._id)}>
            <i
                className={
                    "bi " + (user.bookmark ? "bi-bookmark-fill" : "bi-bookmark")
                }
            />
        </button>
    );
};

Bookmark.propTypes = {
    user: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
