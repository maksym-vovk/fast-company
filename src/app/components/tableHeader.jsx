import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort((selectedSort) => ({
                path: selectedSort.path,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            }));
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const renderHeaderTitle = (column) => {
        if (column.path === selectedSort.path) {
            if (selectedSort.order === "asc") {
                return (
                    <>
                        {column.name}
                        <i className="bi bi-caret-up-fill" />
                    </>
                );
            } else {
                return (
                    <>
                        {column.name}
                        <i className="bi bi-caret-down-fill" />
                    </>
                );
            }
        }
        return column.name;
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={() =>
                            columns[column].path
                                ? handleSort(columns[column].path)
                                : undefined
                        }
                        scope="col"
                        {...{ role: columns[column].path && "button" }}
                    >
                        {renderHeaderTitle(columns[column])}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
