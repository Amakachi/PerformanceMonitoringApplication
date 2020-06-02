export interface IDashResponse {
    partner?: string;
    transactionPartner?: string;
    transactionCount?: number;
    successCount?: number;
    failedCount?: number;
    pendingCount?: number;
    totalCount?: number;
    transactionAmount?: string;
    successAmount?: string;
    failedAmount?: string;
    pendingAmount?: string;
    successAmount_?: number;
    failedAmount_?: number;
    pendingAmount_?: number;
    percentageSuccess?: number;
    percentageFailed?: number;
    percentagePending?: number;
    percSuccessAmount?: number;
    percFailedAmount?: number;
    percPendingAmount?: number;
    totalPercentageCount?: number;
    totalPercentageAmount?: number;
    transactionChannel?: string;
    channels?: string;
    daily?: string;
    transactionDate?: string;
    daily_?: Date;
    channelCode?: string;

}
