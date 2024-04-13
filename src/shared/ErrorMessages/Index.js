import React from 'react'

const ErrorMessage = (message) => {
    return (
        <div style={{ color: "red", marginTop: "5px" }}>
            {message.message.message}
        </div>
    )
}

export default ErrorMessage