'use strict';

var plugin = {},
    http = new XMLHttpRequest(),
    inf,
    loadingdiv,
    waitforload;

window.onload = function () {

    inf = document.getElementById('inf');
    loadingdiv = document.getElementById('loadingdiv');
    waitforload = document.getElementById('waitforload');

    rutoken.ready.then(function () {
        return rutokenBrowserCheck.ifCompatible();
    }).then(function (result) {
        return result.noCheckExtension || rutoken.isExtensionInstalled();
    }).then(function (result) {
        return result ? rutoken.isPluginInstalled() : rutokenBrowserCheck.noExtension();
    }).then(function (result) {
        return result ? rutoken.loadPlugin() : rutokenBrowserCheck.noPlugin();        
    }).then(function (pluginObject) {
        plugin = new CryptoPlugin(pluginObject, $pinResolver);
        if (typeof onPluginLoaded === 'function') {
            onPluginLoaded();
        }
        waitforload.style.display = 'block';
        loadingdiv.style.display = 'none';
    }).then(undefined, function (reason) {
        console.log(reason);
        inf.innerHTML = reason.description || reason;
    });
}