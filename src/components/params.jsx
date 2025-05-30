export function decodeStartParams() {
    const startParam = window.Telegram?.WebApp?.initDataUnsafe?.start_param;
    const params = {};
    if (startParam) {
        try {
            startParam.split('|').forEach(pair => {
                const [key, value] = pair.split(':');
                if (key && value) params[key] = value;
            });
        } catch (err) {
            return {};
        }
    }

    return params;
}