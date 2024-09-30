import React from "react";

const Card = (props) => {
    const cardStyle = {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

    return (
        <div className="card" onClick={props.onclick} style={cardStyle}>
            <p>{props.content}</p>
        </div>
    )
}

export default Card;