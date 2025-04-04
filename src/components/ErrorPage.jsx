import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="display-1 text-danger"> Error 404</h1>
                <p className="lead">Oops! This page does not exist.</p>
                <Link to="/" className="btn btn-primary mt-3">Get back</Link>
            </div>
        </div>

    )
}

export default ErrorPage;