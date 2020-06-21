// document.addEventListener("DOMContentLoaded", function () {
//     fetch('/all_current_orders').then((response) => {
//         console.log(response)
//         console.log(JSON.stringify(response))
//     }).catch(error => {
//         console.log(error)
//     })
// });

$(document).ready(() => {
    $.get('/all_current_orders', response => {
        console.log(response)
    })
})