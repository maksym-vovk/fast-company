import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/common/page/usersListPage/usersListPage";
import UserPage from "../components/common/page/userPage/userPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;
