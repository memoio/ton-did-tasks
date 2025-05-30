export function decodeStartParams() {
    const startParam = window.Telegram?.WebApp?.initDataUnsafe?.start_param;
    if (startParam) {
        try {
            const params = JSON.parse(decodeURIComponent(startParam || '{}'));
            return params;
        } catch (e) {
            return {};
        }
    }
}