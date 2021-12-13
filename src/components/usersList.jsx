import React from "react";
import User from './user'

const UsersList = (props) => {
    const users = props.users

    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1))

        if (number > 4 && number < 15) return 'человек тусанет'
        if ([2, 3, 4].includes(lastOne)) return 'человек тусанут'
        if (lastOne === 1) return 'человек тусанет'
    }

    return (
        <>
            <h2>
                <span className={'badge bg-'+(users.length > 0 ? 'primary' : 'danger')}>
                    {users.length > 0
                        ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня`
                        : 'Никто с тобой не тусанет'}
                </span>
            </h2>

            {users.length > 0 &&
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                    </tr>
                    </thead>
                    <tbody>

                    {users.map(user => (
                        <User key={user._id} {...user} onDelete={props.onDelete}/>
                    ))}

                    </tbody>
                </table>
            }
        </>
    )
}

export default UsersList