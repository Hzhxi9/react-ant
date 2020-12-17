export interface FootTypeData {
    description: string;
    icon_url: string;
    id: number;
    image_url: string;
    is_in_serving: boolean;
    link: string;
    title: string;
    title_color: string;
    __v: string;
}

export interface CityGuessData {
    abbr: string;
    area_code: string;
    id: number;
    is_map: boolean;
    latitude: string;
    longitude: string;
    name: string;
    pinyin: string;
    sort: number;
}

export interface ShopData {
    activities: ActivitiesData[];
    address: string;
    category: string;
    delivery_mode: { color: string; id: number; is_solid: boolean; text: string };
    description: string;
    distance: string;
    float_delivery_fee: number;
    float_minimum_order_amount: number;
    id: number;
    identification: IdentificationData;
    image_path: string;
    is_new: boolean;
    is_premium: boolean;
    latitude: number;
    license: { business_license_image: string; catering_service_license_image: string };
    location: number[];
    longitude: number;
    name: string;
    opening_hours: string[];
    order_lead_time: string;
    phone: string;
    piecewise_agent_fee: { tips: string };
    promotion_info: string;
    rating: number;
    rating_count: number;
    recent_order_num: number;
    status: number;
    supports: SupportsData[];
    num: number;
    qty: number;
    _id: string;
    specfoods: SpecfoodsData[];
}

export interface SpecfoodsData {
    checkout_mode: number;
    food_id: number;
    is_essential: boolean;
    item_id: number;
    name: string;
    original_price: number;
    packing_fee: number;
    pinyin_name: string;
    price: number;
    promotion_stock: number;
    recent_popularity: number;
    recent_rating: number;
    restaurant_id: number;
    sku_id: number;
    sold_out: boolean;
}
export interface ActivitiesData {
    description: string;
    icon_color: string;
    icon_name: string;
    id: number;
    name: string;
    _id: string;
}

export interface IdentificationData {
    company_name: string;
    identificate_agency: string;
    identificate_date: string | null;
    legal_person: string;
    licenses_date: string;
    licenses_number: string;
    licenses_scope: string;
    operation_period: string;
    registered_address: string;
    registered_number: string;
}

export interface SupportsData {
    description: string;
    icon_color: string;
    icon_name: string;
    id: number;
    name: string;
    _id: string;
}

export interface LoginData {
    avatar: string;
    balance: number;
    brand_member_new: number;
    city: string;
    current_address_id: number;
    current_invoice_id: number;
    delivery_card_expire_days: number;
    email: string;
    gift_amount: number;
    id: number;
    is_active: number;
    is_email_valid: boolean;
    is_mobile_valid: boolean;
    mobile: string;
    point: number;
    registe_time: string;
    user_id: string;
    username: string;
    _id: string;
    status: number;
    message: string;
    imgpath: string;
}

export interface MenuData {
    description: string;
    icon_url: string;
    id: number;
    is_selected: boolean;
    name: string;
    restaurant_id: number;
    type: number;
    __v: number;
    foods: ShopData[];
}
