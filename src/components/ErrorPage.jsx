import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <div className="container d-flex justify-content-center">
            < div className="error-page" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} >
                <h1>404</h1>
                <p>Oops! La página que buscas no existe.</p>
                <Link to="/">Volver al inicio</Link>
            </div >
        </div>
    )
}

export default ErrorPage;