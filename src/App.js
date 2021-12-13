import React, {useState} from 'react'
import api from "./api";

import UsersList from "./components/usersList";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userID) => {
        setUsers(users.filter(user => user._id !== userID))
    }

    // const handleToggleBookMark = (id) => {}

    return (
        <div>
            <UsersList users={users} onDelete={handleDelete}/>
        </div>
    )
}

export default App