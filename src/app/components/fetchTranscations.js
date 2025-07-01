export default async function fetchTransactions(customerId, token) {
    if (!customerId || !token) {
        throw new Error("Customer ID is required to fetch transactions.");
    }
    
    try {
        const response = await fetch('https://Zayndev.pythonanywhere.com/get-all-customer-charges', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"customer_id": customerId }), 
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error; 
    }
}