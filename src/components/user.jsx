import React from 'react'

const User = (props) => {
    return (
        <tr key={props._id}>
            <td>{props.name}</td>
            <td>{props.qualities.map(item =>
                <span key={item.id} className={'badge m-1 bg-'+item.color}>{item.name}</span>
            )}</td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate}</td>
            <td>
                <button className={'btn btn-danger'} onClick={() => props.onDelete(props._id)}>Delete</button>
            </td>
        </tr>
    )
}

export default User