import React from 'react'

const Conditions = ({conditions}) => (
    <div className="container">
        <h1>Conditions</h1>
        <ul>
            <p>Probability</p>
            {
                conditions.map((condition, index) => (
                    <li key={condition.id}
                        className={` list-group-item
                            ${0 !== index ? '' : 'active'}`}>
                        {condition.name}
                        <span>{condition.probability}</span>
                    </li>
				))
            }
        </ul>
    </div>
)

export default Conditions 