export interface SearchTransactionRequest {
    senderId?: string;
    receiverId?: string;
    transId?: number;
    partner: string;
    startDate: string;
    endDate: string;
    recordLimit: number;
    searchText?: string;
    referenceNo?: string;
    transactionChannel?: string;
    status?: string;
    sendOrReceive: string;
}

