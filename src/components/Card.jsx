import React from "react";

const Card = (props) => {

    const { viewpoint, description } = props.content;

    return (
        <div className="card" onClick={props.onclick}>
            <div className="card-content">
                <div className="viewpoint">{viewpoint}</div>
                <div className="description">{description}</div>
            </div>
        </div>
    )
}

export default Card;