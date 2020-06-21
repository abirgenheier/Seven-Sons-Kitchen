$(document).ready(() => {
    $.get('/all_current_orders', response => {
        console.log(response)
        response.map(order => {
            document.querySelector('.container').innerHTML +=
                `
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <p id="order_id">${order.id}</p>
                            <p id="order_time">${order.createdAt}</p>       
                        </div>
                    <div class="card-body">
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