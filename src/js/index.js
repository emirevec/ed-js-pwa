import { navigate } from './navigate.js';
import { getData } from './getData.js';
import { renderApp } from './renderApp.js';
import { cart } from './cart.js'

$(window).on('popstate', () => {
    navigate(location.pathname)
});

$(function () {
    getData("https://6596bb636bb4ec36ca033d52.mockapi.io/articles")
        .then( v => {
            cart.catalogue = v;
            renderApp();
    });
});