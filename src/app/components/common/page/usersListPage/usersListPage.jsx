import React, { useState, useEffect } from "react";
import Pagination from "../../pagination";
import GroupList from "../../groupList";
import { paginate } from "../../../../utils/paginate";
import api from "../../../../api";
import SearchResults from "../../../ui/searchResults";
import UsersTable from "../../../ui/usersTable.jsx";
import _ from "lodash";
import SearchField from "../../../ui/searchField";

const UsersListPage = () => {
    const pageSize = 4;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState({});
    const [selectedProf, setSelectedProf] = useState({});
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");

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
    }, [selectedProf, searchValue]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSearchValue("");
        setSelectedProf(item);
    };

    if (users.length) {
        const filteredUsers = selectedProf?._id
            ? users.filter((user) =>
                JSON.stringify(user.profession) === JSON.stringify(selectedProf) && user.name.includes(searchValue)
            )
            : users;

        const searchedUsers = searchValue.length
            ? users.filter((user) =>
                user.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            : filteredUsers;

        const count = searchedUsers.length;

        const sortedUsers = _.orderBy(
            searchedUsers,
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

        const handleSearch = (event) => {
            const { target } = event;

            setSearchValue(target.value);

            if (Object.keys(selectedProf).length) {
                clearFilter();
            }
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
                    <SearchField
                        handleSearch={handleSearch}
                        searchValue={searchValue}
                    />
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

export default UsersListPage;