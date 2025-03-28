const ContactForm = () => (
    <div className="container d-flex flex-column w-25 border text-start">
        <div className="mb-3 mt-3">
            <label
                for="FormControlInput2"
                className="form-label"
            >
                Full Name
            </label>
            <input
                class="form-control form-control-sm"
                id="FormControlInput2"
                type="text"
                placeholder="Full Name"
                aria-label=".form-control-sm example"
            />
        </div>
        <div className="mb-3 mt-3">
            <label
                for="FormControlInput1"
                className="form-label"
            >
                Email address
            </label>
            <input
                type="email"
                className="form-control"
                id="FormControlInput1"
                placeholder="name@example.com" />
        </div>
        <div className="mb-3 mt-3">
            <label
                for="exampleFormControlInput3"
                className="form-label"
            >
                Phone

            </label>
            <input
                class="form-control form-control-sm"
                id="FormControlInput3"
                type="text"
                placeholder="Phone"
                aria-label=".form-control-sm example"
            />
        </div>
        <div className="mb-3 mt-3">
            <label
                for="exampleFormControlInput4"
                className="form-label"
            >
                Address

            </label>
            <input
                class="form-control form-control-sm"
                id="FormControlInput4"
                type="text"
                placeholder="Address"
                aria-label=".form-control-sm example"
            />
        </div>
        <button>
            Save Contact
        </button>
    </div>
);

export default ContactForm;