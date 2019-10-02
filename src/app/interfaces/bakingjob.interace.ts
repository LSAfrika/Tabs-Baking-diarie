export interface BakingJobInterface {
    uid?: string;

    title: string;

    orderOwnerName: string;
    orderOwnerNameContacts: number;

    imageUrl?: string;

    deliveryDate?: Date;

    cakeType: string;

    cakeweight?: number;

    numberOfCakes?: number;

    jobDescription: string;


    }