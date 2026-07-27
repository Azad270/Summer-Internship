const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {

    const response = await fetch(`${API_URL}/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),

    });

    const data = await response.json();

    return data;
};

export const loginUser = async (formData) => {

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: "Server Error",
        };

    }

};