import React from "react";
import Qualities from "./qualities";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, handlers }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((item) => (
                    <Qualities key={item._id} {...item} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td className="align-middle text-center">
                <Bookmark
                    user={user}
                    onToggleBookmark={handlers.onToggleBookmark}
                />
            </td>
            <td>
                <button
                    className={"btn btn-danger"}
                    onClick={() => handlers.onDelete(user._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    handlers: PropTypes.object.isRequired
};

export default User;
