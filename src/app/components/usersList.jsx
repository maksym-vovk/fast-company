import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import GroupList from "./groupList";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import SearchResults from "./searchResults";

const UsersList = ({ users, ...rest }) => {
    const pageSize = 2;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState({});
    const [selectedProf, setSelectedProf] = useState({});

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

    const filteredUsers =
        selectedProf && selectedProf._id
            ? users.filter((user) => user.profession === selectedProf)
            : users;
    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
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
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User
                                    key={user._id}
                                    user={user}
                                    handlers={rest}
                                />
                            ))}
                        </tbody>
                    </table>
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
};

UsersList.propTypes = {
    users: PropTypes.array.isRequired
};

export default UsersList;
