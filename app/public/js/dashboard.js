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
                                <p class="phone_number">${order.phone_number == '' ? '-No Phone Number Present-' : order.phone_number}</p>
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
        }, 600)
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

function template(a, b) {
    a.innerHTML += `         Due at <b>${b}</b>`
    a.parentNode.classList = ""
    a.parentNode.classList.add('order_time')
}

$(document).ready(() => {
    setTimeout(() => {
        now = time.split(':')
        console.log(now)
        NodeList.prototype.forEach = Array.prototype.forEach;
        var nodes = document.querySelectorAll('p.order_time').forEach(div_time => {
            _time = (div_time.id).split(":")
            var plus_fifteen = (+_time[1] + 15)
            var deadline = (_time[0] + ":" + plus_fifteen)
            if (_time[0] === now[0]) {
                if (now[1] - +_time[1] >= 0 && now[1] - +_time[1] <= 10) {
                    template(div_time, deadline)
                    div_time.parentNode.classList.add('green')
                } else if (now[1] - +_time[1] >= 11 && now[1] - +_time[1] <= 14) {
                    template(div_time, deadline)
                    div_time.parentNode.classList.add('yellow')
                } else if (now[1] - +_time[1] >= 15) {
                    template(div_time, deadline)
                    div_time.parentNode.classList.add('red')
                }
            } else {
                div_time.style.textDecoration = 'line-through'
            }
        })
    }, 200)
})

$('.search').click(() => {
    $('.search').attr("placeholder", "Order:")
})

$('.search').one("click", () => {
    console.log('sd')
    document.querySelector('.search').textContent += "Order:"
})
$('.search').keydown((e) => {
    text = String.fromCharCode(e.which)
    console.log(text)
    document.querySelector('.search').innerHTML += text
})
