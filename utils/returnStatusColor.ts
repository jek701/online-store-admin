export const returnStatusColor = (status: string) => {
    // "confirmed" || "waiting" || "cancelled" || "delivered" || "readyForDelivery" || "readyForPickup" || "closed"
    switch (status) {
        case "waiting":
            return "red"
        case "cancelled":
            return "lightgrey"
        case "delivered":
            return "green"
        case "readyForDelivery":
            return "orange"
        case "readyForPickup":
            return "orange"
        case "closed":
            return "green"
        default:
            return "lightgrey"
    }
}