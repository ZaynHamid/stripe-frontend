export default async function signup(formData) {
    const postData = await fetch("https://Zayndev.pythonanywhere.com/submit_creds", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    if(postData.status !== 201) {
        return {
            error: "An error occurred while processing your request.",
            status: postData.status,
        }
    }
    return postData.json();
}