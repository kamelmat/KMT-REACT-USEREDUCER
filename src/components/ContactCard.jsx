const ContactCard = (contactName, contactEmail, contactPhone, contactAddress) => {
    return (
        <div >
            <div className="card" style={{width: "18rem"}} >
            <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{contactName}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{contactEmail}</li>
                    <li className="list-group-item">{contactPhone}</li>
                    <li className="list-group-item">{contactAddress}</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        </div >
    )
}

export default ContactCard