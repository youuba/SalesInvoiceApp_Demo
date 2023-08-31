import { Customer } from "./customer";
import { InvoiceItems } from "./invoiceItems"

export interface Invoice {
    invoiceID: number;
    customer?: Customer;
    invoiceDate: Date ;
    totalAmount: number;
    invoiceItems?: InvoiceItems[];
}