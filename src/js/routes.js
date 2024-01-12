import { renderApp } from './renderApp.js'
import articlePage from './articlePage.js'
import  cartPage from './cartPage.js'

export const routes = {
    '/': renderApp,
    '/article': articlePage,
    '/cart': cartPage,
};