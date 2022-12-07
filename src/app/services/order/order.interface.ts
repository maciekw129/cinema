export interface TicketTypes {
    id: string,
    name: string,
    price: number
}

export interface FinalizeForm {
    firstName: string,
    lastName: string,
    phone?: string,
    email: string
}