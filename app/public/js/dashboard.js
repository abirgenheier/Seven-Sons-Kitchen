$(document).ready(() => {
    $.get('/all_current_orders', response => {
        console.log(response)
        response.map(order => {
            console.log()
            document.querySelector('.container').innerHTML +=
                `
            <div class="row" id="${order.id}">
                <div class="col-12">
                    <div class="card" onClick="finished()">
                        <div class="card-header">
                            <p id="order_id">Order Number: ${order.id}</p>
                            <p id="order_time" id="${(order.createdAt).substring(11)}">${(order.createdAt).substring(11)}</p>       
                        </div>
                    <div class="card-body">
                        <div class="swiper" title="complete" id="${order.id}"><i class="fas fa-angle-double-left fa-2x"></i></div>
                        <blockquote class="blockquote mb-0">
                            <p class="order-body" id="order">${order.order}</p>
                        <footer class="blockquote-footer">
                                <p id="order_name">${order.name}</p>
                                <p id="phone_number">${order.phone_number}</p>
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

var fifteen_minutes = 15 * 60 * 1000;
$(document).ready(() => {
    console.log($('.order_time').attr('id'))
})
