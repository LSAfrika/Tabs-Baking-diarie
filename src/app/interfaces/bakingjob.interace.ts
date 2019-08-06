export interface BakingJobInterface {
    title: string;

    orderOwnerContacts: [
        {name: string},
        {contacts: number}
                ];

    imageUrl?: string;

    deliveryDate: Date;

    cakeType: string;

    cakeweight: number;

    numberOfCakes: number;

    jobDescription: string;


    }