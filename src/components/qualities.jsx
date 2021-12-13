import React from 'react'

const Qualities = (props) => {
    return <span key={props.id} className={'badge m-1 bg-'+props.color}>{props.name}</span>
}

export default Qualities