import React from 'react'

const Conditions = ({conditions}) => (
    <div className="container">
        <h1>Conditions</h1>
        <ul className="list-group">
            <p><span>Probability</span></p>
            {
                conditions.map((condition, index) => (
                    <li key={condition.id}
                        className={`${0 !== index ? '' : 'active'}`}>
                        <h4>Condition: </h4>
                        {condition.name} || 
                        <h4>Probability: </h4>
                        <span>{condition.probability}</span>
                    </li>
				))
            }
        </ul>
    </div>
)

export default Conditions 