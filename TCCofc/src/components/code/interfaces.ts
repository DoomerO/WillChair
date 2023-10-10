interface Offer {
    ofr_id?: number,
    ofr_name?: string,
    ofr_type?: string,
    ofr_desc?: string,
    ofr_value?: number,
    ofr_status?: string,
    ofr_city?: string,
    ofr_user_name?: string,
    ofr_parcelas?: number,
    ofr_postDate?: string,
    user_comp_id?: number,
    ofr_env_conf?: number,
    ofr_rec_conf?: number,
    User_user_id?: number,
    Product_prod_id?: number,
    prod_id?: number,
    prod_img?: string,
    prod_key?: string,
    prod_status?: string,
    prod_height?: number,
    prod_type?: string,
    prod_weight?: number,
    prod_composition?: string
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

interface ChatProps {
    Offer_ofr_id? : number,
    User_user_id? : number,
    chat_id? : number
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

export type {Offer, Comments, User, UserToken, ChatProps};