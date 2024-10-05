export default function ensureHttps(url) {
    if (url.startsWith('http://')) {
        return url.replace('http://', 'https://');
    }
    return url;
}