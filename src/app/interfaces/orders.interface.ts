export interface OrdersInterface {

    ClientContacts: [
        {name: string},
        {contacts: number},
        {email?: string}
                ];

    BakersBussinessName: string;

    imageUrl?: string;

    orderdate: Date;

    deliveryDate: Date;

    cakeType: string;

    cakeColor: string;

    Cakeshape: string;

    Cakedescription: string;

    CakeInscription: string;

    Cakeweight: number;

    CakeQuantity: number;

    totalcost: number;

    downpayment: number;

    balance: number;

    bakerycontacts: [
        {name: string},
        {contacts: number},
        {email?: string}
                ];


    }