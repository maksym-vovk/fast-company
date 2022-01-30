import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/common/page/usersListPage/usersListPage";
import UserPage from "../components/common/page/userPage/userPage";
import EditUserPage from "../components/ui/editUserPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            {userId
                ? edit
                    ? <EditUserPage/>
                    : <UserPage userId={userId}/>
                : <UsersListPage/>}
        </>
    );
};

export default Users;
