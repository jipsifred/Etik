import PocketBase from 'pocketbase';

// If in production (served by Nginx with proxy), use relative path
// Otherwise use the env var or default localhost
const url = import.meta.env.PROD
    ? '/'
    : (import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

export const pb = new PocketBase(url);
