export interface OrdersInterface {
    title: string;
    bakerycontacts: [
        {name: string},
        {contacts: number},
        {email: string}
                ];

    orderOwnerContacts: [
        {name: string},
        {contacts: number}
                ];

    imageUrl?: string;

    deliveryDate: Date;

    cakeType: string;

    cakeweight: number;

    numberOfCakes: number;

    description: string;

    
    }