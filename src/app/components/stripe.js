export default async function genCheckoutUrl(priceId, isSub, customerId, token) {
    const url = await fetch('https://Zayndev.pythonanywhere.com/create-checkout-session', {
        method: 'POST',
        headers:{
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"price_id": priceId, "is_subscription": isSub, "customer_id": customerId}),
    });
    return await url.json();
}

export async function genUsageCheckoutUrl(priceId, units, customerId) {
    const url = await fetch('https://Zayndev.pythonanywhere.com/charge-user-on-usage', {
        method: 'POST',
        headers:{

            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"price_id": priceId, "customer_id": customerId, "units": units}),
    });
    return await url.json();
}
