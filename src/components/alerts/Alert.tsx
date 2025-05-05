const Alert = ({ message, type, textCenter }: {message: string, type: 'error' | 'info' | 'warning',  textCenter?: boolean}) => {
    return <div style={{wordBreak: 'break-word'}} className={`alert ${textCenter ? 'text-center': ''} ${type === 'error' ? 'alert-danger' : type === 'info' ? 'alert-info' : 'alert-warning' }`} role="alert">
       {message}
</div>
}

export default Alert;