import React, { useState, useEffect } from "react";
import api from "./api";

import UsersList from "./components/usersList";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    useEffect(() => {

    }, [])

    const handleDelete = (userID) => {
        setUsers(users.filter((user) => user._id !== userID));
    };

    const handleToggleBookMark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) user.bookmark = !user.bookmark;
            return user;
        });
        setUsers(newUsers);
    };

    return (
        <div>
            <UsersList
                users={users}
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookMark}
            />
        </div>
    );
};

export default App;
