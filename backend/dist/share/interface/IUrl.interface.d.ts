export interface visitHistory {
    timestamp: number;
}
export interface IUrlShort {
    shortUrl: string;
    redirectUrl: string;
    visitHistory: visitHistory[];
    createdAt: Date;
    updatedAt: Date;
}
export interface IUrlRequest {
    redirectUrl: string;
}
