import { routes } from './routes.js'

export async function navigate (to) {
    history.pushState({},'',to);
    return routes[location.pathname]();
};