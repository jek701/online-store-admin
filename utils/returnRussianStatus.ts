export const russianStatus = (status: string) => {
    switch (status) {
        case "waiting":
            return "Сборка"
        case "cancelled":
            return "Отменен"
        case "delivered":
            return "Доставлен"
        case "readyForDelivery":
            return "Готов к доставке"
        case "readyForPickup":
            return "Готов к самовывозу"
        case "closed":
            return "Закрыт"
        default:
            return "Неизвестно"
    }
}