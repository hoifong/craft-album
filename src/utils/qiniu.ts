/**
 * 七牛云存储
 * 
 */

import { Base64 } from 'js-base64';
import Crypto from 'crypto-js';

export const QINIU_CONFIG = {
    AccessKey: 'GWqrsytzpFJoeoDRq6BjoQaNj7blJtqUjHMwAiAc',
    SecretKey: 'rtsLMQidFJYkz3JHgYS2MDJ8rH21OkKckQpwnF7u',
    Bucket: 'craft-album',
    Port: 19110,
    UptokenUrl: '',
    Domain: 'pyfenxfkd.bkt.clouddn.com'
}

export const uploadStrategy = {
    scope: QINIU_CONFIG.Bucket
}

export const urlsafe_base_encode = (s: string) => {
    const wordArray = Crypto.enc.Utf8.parse(s);
    return Crypto.enc.Base64.stringify(wordArray);
}

/**
 * token
 */

export function createToken() {
    const putPolicy = JSON.stringify({
        scope: QINIU_CONFIG.Bucket
    });
    
    const encodePutPolicy = urlsafe_base_encode(putPolicy);

    console.log('url-safe-base64:', encodePutPolicy);

    const sign = Crypto.HmacSHA1(encodePutPolicy, QINIU_CONFIG.SecretKey) + '';

    console.log('sign:', sign);

    const encodeSign = Base64.encode(sign+'', true);
    return QINIU_CONFIG.AccessKey + ':' + encodeSign + ':' + encodePutPolicy;
}