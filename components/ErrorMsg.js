const ErrorMsg = ({ message, size = 'large' }) => {
    return (
        <div className="p-4 text-muted text-center">
            {size === 'large' ? (
                <h3>{message}</h3>
            ) : size === 'medium' ? (
                <h5>{message}</h5>
            ) : (
                <p>{message}</p>
            )}
        </div>
    )
}

export default ErrorMsg
