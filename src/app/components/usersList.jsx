import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import GroupList from "./groupList";
import { paginate } from "../utils/paginate";
import api from "../api";
import SearchResults from "./searchResults";
import UsersTable from "./usersTable.jsx";
import _ from "lodash";

const UsersList = () => {
    const pageSize = 4;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState({});
    const [selectedProf, setSelectedProf] = useState({});
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

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

    useEffect(() => {
        api.professions.fetchAll().then((data) =>
            setProfessions(
                Object.assign(data, {
                    allProfession: { name: "Все професии" }
                })
            )
        );
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    if (users.length) {
        const filteredUsers = selectedProf?._id
            ? users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            )
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf({});
        };

        const handleSort = (item) => {
            setCurrentPage(1);
            setSortBy(item);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchResults length={count} />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookMark}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

export default UsersList;
