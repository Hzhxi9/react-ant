export interface FoodTypeParams {
    geohash: string;
    'flag[]': string;
    group_type: number;
}

export interface loginParams {
    captcha_code: number;
    password: string;
    username: string;
}
