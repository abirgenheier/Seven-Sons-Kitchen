var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

console.log(date)
console.log(time)

$(document).ready(() => {
    $.get('/all_current_orders', response => {
        response.map(order => {
            document.querySelector('.container').innerHTML +=
                `
            <div class="row" id="${order.id}">
                <div class="col-12">
                    <div class="card" onClick="finished()">
                        <div class="card-header">
                            <p class="order_id">Order Number: ${order.id}</p>
                            <p class="order_time" id="${(order.createdAt).substring(11)}">${(order.createdAt).substring(11)}</p>       
                        </div>
                    <div class="card-body">
                        <div class="swiper" title="complete" id="${order.id}"><i class="fas fa-angle-double-left fa-2x"></i></div>
                        <blockquote class="blockquote mb-0">
                            <p class="order-body" id="order">${order.order}</p>
                        <footer class="blockquote-footer">
                                <p class="order_name">${order.name}</p>
                                <p class="phone_number">${order.phone_number}</p>
                        </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
            `
        })
    })
})

function finished() {
    var _id = event.target.id
    if ((+event.target.id) > 1) {
        event.target.classList.add('extend')
        console.log(event.target.classList)
        setTimeout(() => {
            $(`#${_id}`).empty()
        }, 400)
        var complete = {
            complete: 1
        }
        $.ajax("/api/order_update/" + _id, {
            type: "PUT",
            data: complete
        }).then(
            function () {
                console.log('Done');
                // Reload the page to get the updated list
                location.reload();
            }
        );
    }

}

var fifteen_minutes = 15 * 60 * 1000;
$(document).ready(() => {
    now = time.split(':')
    console.log(now)

})

$(document).click(() => {
    (document.querySelectorAll('p.order_time')).map(item => {
        console.log(item.id)
    })
})