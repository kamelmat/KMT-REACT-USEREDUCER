const baseUrl = "https://playground.4geeks.com/contact/agendas/"


const contactListService = {
    createAgenda: async (slug) => {
        try {
            const request = await fetch(`${baseUrl}${slug}`, {
                method: "POST",
                headers: {
                    accept: application/json
                },
                body: JSON.stringify()
            })

            if (!request.ok) throw new Error("Error creando agenda");
            const response = await request.json();
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    createContact: async (slug) => {
        try {
            const contactInfo = {
                name: "",
                phone: "",
                email: "",
                address: ""
            };
            const request = await fetch(`${baseUrl}${slug}/contacts`, {
                method: "POST",
                headers: {
                    accept: application/json
                },
                body: JSON.stringify(contactInfo)
            })

            if (!request.ok) throw new Error("Error creando contacto");
            const response = await request.json();
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    deleteContact: async(slug, contactId) => {
        try {
            const request = await fetch(`${baseUrl}${slug}/contacts/${contactId}`,{
                method: "DELETE",
                headers: {
                    accept: application/json
                }
            })

            if (!request.ok) throw new Error("Error eliminando contacto");
            return true;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}