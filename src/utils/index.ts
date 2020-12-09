/**
 * 存储本地
 */
export const setStore = (name: string, value: string | object) => {
    if (!name) return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);
};

/**
 * 获取本地
 */
export const getStore = (name: string): string | null => {
    return name && window.localStorage.getItem(name);
};

/**
 * 删除本地
 */
export const removeStore = (name: string) => {
    if (!name) return;
    window.localStorage.removeItem(name);
};

/**
 * 清空本地
 */
export const clearStore = () => {
    window.localStorage.clear();
};

/**
 * 获取url参数
 */
export function getUrlParams(name: string, str: string): string | null {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = str.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/**
 * 处理图片路径
 */
export const getImgPath = (path?: string): string => {
    //传递过来的图片地址需要处理后才能正常使用(path) {
    let suffix;
    if (!path) {
        return '//elm.cangdu.org/img/default.jpg';
    }
    if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg';
    } else {
        suffix = '.png';
    }
    let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    return 'https://fuss10.elemecdn.com' + url;
};
