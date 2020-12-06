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
    activities: ActivitiesData[] | [];
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
