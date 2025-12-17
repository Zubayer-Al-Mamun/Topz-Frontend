export function pushDataLayer(payload) {
    console.log("set Datalayer..");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
}
