export interface IEmailBody {
    subject?: string;
    message?: string;
    htmlTemplate: string;
    receiver: string;
}
