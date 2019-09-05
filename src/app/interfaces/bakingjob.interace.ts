export interface BakingJobInterface {
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