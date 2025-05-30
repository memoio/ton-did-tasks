export function base64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return decodeURIComponent(escape(atob(base64)));
}

export function base64UrlEncode(str) {
    const base64 = btoa(unescape(encodeURIComponent(str)));
    return base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export function decodeStartParams() {
    const startParam = window.Telegram?.WebApp?.initDataUnsafe?.start_param;
    const params = {};
    if (startParam) {
        try {
            const paramsStr = base64UrlDecode(startParam || '{}');
            paramsStr.split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                if (key && value) params[key] = value;
            });
        } catch (e) {
            return {};
        }
    }

    return params;
}