interface CardOfferRender {
    ofr_name: string;
    prod_composition: string;
    prod_status: string;
    prod_img: string;
    ofr_value: number;
    prod_type: string;
    ofr_id: number;
}

interface Comments {
    user_img : object,
    user_name : string,
    user_email : string,
    ava_content : string,
    ava_date : string,
    ava_value : number,
    ava_id : number
}

interface User {
    user_name?: string,
    user_phone?: string,
    user_img?: any,
    user_street?: string,
    user_district?: string,
    user_FU?: string,
    user_city?: string,
    user_CEP?: string,
    user_houseNum?: number,
    user_comp?: string,
    user_email? : string
    user_id? : number,
    user_nota? : number
}

interface UserToken {
    name? : string,
    email? : string
}

export type {CardOfferRender, Comments, User, UserToken};