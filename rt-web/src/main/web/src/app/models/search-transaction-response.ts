export interface SearchTransactionResponse {
    serial?: number;
    transactionId?: number;
    senderId?: string;
    receiverId?: string;
    transactionDate?: string;
    transactionChannel?: string;
    receiveChannel?: string;
    amount?: string;
    sourceCurrency?: string;
    destinationCurrency?: string;
    sourceAffiliate?: string;
    destinationAffiliate?: string;
    transactionStatus?: string;
    responseMessage?: string;
    referenceNo?: string;
   // partner?: string;
   // externalReferenceNo?: string;
    receiveDate?: string;
    sendAmount?: string;
    receiveAmount?: string;

}
