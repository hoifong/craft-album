import qs from 'querystring';

export function getUrlQuery(key: string) : any {
    const querys = window.location.search;
    if (!querys) {
        return undefined;
    }

    const parse: any = qs.parse(querys.slice(1));

    return parse[key];
}

export function setUrlQuery(key: string, value: any) {
    const querys = window.location.search;
    let obj: any = {};
    if (querys) {
        obj = qs.parse(querys.slice(1));
    }

    obj[key] = value;

    window.history.pushState(undefined, document.title, '?' + qs.stringify(obj));
}