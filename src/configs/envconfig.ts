// 全局配置

let baseUrl: string = '';
let imgUrl: string = '';
if (process.env.NODE_ENV === 'development') {
    imgUrl = '//elm.cangdu.org/img/';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '//elm.cangdu.org';
    imgUrl = '//elm.cangdu.org/img/';
}

export { baseUrl, imgUrl };
