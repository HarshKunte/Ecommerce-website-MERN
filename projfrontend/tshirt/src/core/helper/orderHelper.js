import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/create/${userId}`,
        {
            method: "POST",
            headers: {
                Accepr: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ order: orderData })
        }
    ).then(response => {
        console.log(response.json())
        return response.json()
    })
        .catch(err => console.log(err))
}