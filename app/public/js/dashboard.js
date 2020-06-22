$(document).ready(() => {
    $.get('/all_current_orders', response => {
        console.log(response)
        response.map(order => {
            console.log()
            document.querySelector('.container').innerHTML +=
                `
            <div class="row" id="${order.id}">
                <div class="col-12">
                    <div class="card" ondblclick="finished()">
                        <div class="card-header">
                            <p id="order_id">Order Number: ${order.id}</p>
                            <p id="order_time">${order.createdAt}</p>       
                        </div>
                    <div class="card-body">
                        <div class="swiper" id="${order.id}"><i class="fas fa-angle-double-left fa-2x"></i></div>
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
    console.log(event.target.id)
}