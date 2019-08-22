export interface  OrdersInterface {

    Clientname: string;

    Clientcontacts: number;

    Clientemail?: string;


    BakersBussinessName?: string;

    imageUrl?: string;

    orderdate?: Date;

    deliveryDate: string;

    cakeType: string;

    cakeColor: string;

    Cakeshape: string;

    CakeInscription: string;

    Cakeweight: number;

    NumberOfCakes: number;

    SpecialInstruction?: string;

    totalcost: number;

    deposit: number;

    balance: number;

    bakerycontacts?: [
        {name: string},
        {contacts: number},
        {email?: string}
                ];


    }