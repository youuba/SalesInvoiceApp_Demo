import { Invoice } from "./invoice"

export interface Customer {
CustomerID :number
CustomerName: string
CustomerAddress: string
CustomerPhone: string
Invoices?: Invoice[]
}