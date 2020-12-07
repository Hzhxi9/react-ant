export interface FoodTypeParams {
    geohash: string;
    'flag[]': string;
    group_type: number;
}

export interface loginParams {
    captcha_code: string;
    password: string;
    username: string;
}
