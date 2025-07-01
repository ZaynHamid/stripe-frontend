export default async function login(formData) {
    const loginData = await fetch("https://Zayndev.pythonanywhere.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    if(loginData.status !== 200) {
        return {
            error: "An error occurred while processing your request.",
            status: loginData.status,
        }
    }
    return loginData.json();
}