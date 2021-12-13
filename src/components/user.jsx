import React from 'react'
import Qualities from "./qualities";

const User = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>
                {props.qualities.map(item =>
                    <Qualities key={item._id} {...item}/>
                )}
            </td>
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