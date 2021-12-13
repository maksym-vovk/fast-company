import React from "react";

const SearchResults = (props) => {
    const {users} = props

    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1))

        if (number > 4 && number < 15) return 'человек тусанет'
        if ([2, 3, 4].includes(lastOne)) return 'человек тусанут'
        if (lastOne === 1) return 'человек тусанет'
    }

    return (
        <h2>
            <span className={'badge bg-' + (users.length > 0 ? 'primary' : 'danger')}>
                {users.length > 0
                    ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня`
                    : 'Никто с тобой не тусанет'}
            </span>
        </h2>
    )
}

export default SearchResults