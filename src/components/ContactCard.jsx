const ContactCard = ({ contactName, contactEmail, contactPhone, contactAddress, onEdit, onDelete }) => {
    
    return (
        <div className="card shadow-sm" style={{ width: "18rem", margin: "10px" }}>
            <div className="card-body text-center">
                <h5 className="card-title">{contactName}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Email:</strong> {contactEmail}</li>
                <li className="list-group-item"><strong>Phone:</strong> {contactPhone}</li>
                <li className="list-group-item"><strong>Address:</strong> {contactAddress}</li>
            </ul>
            <div className="card-body d-flex justify-content-around">
                <button onClick={onEdit} className="btn btn-outline-primary">Editar</button>
                <button onClick={onDelete} className="btn btn-outline-danger">Eliminar</button>
            </div>
        </div>

    )
}

export default ContactCard