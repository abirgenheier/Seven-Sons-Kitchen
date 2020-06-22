var swiper = new Swiper('.swiper-container', {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    pagination: {
        el: '.swiper-pagination',
    },
});


// document.querySelector(".contact").style.visibility = "hidden";
// document.querySelector("location").style.visibility = "hidden";
// document.querySelector(".about").style.visibility = "hidden";
// document.querySelector(".swiper-container").style.visibility = "hidden";


// window.addEventListener('scroll', () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//     console.log(scrollTop)
//     if (+scrollTop >= 1064 && +scrollTop <= 1400) {
//         document.querySelector(".contact").style.visibility = "visible";
//         $('.contact').addClass('animate__animated')
//         $('.contact').addClass('animate__backInDown')
//         $('.location').show()
//         $('.location').addClass('animate__animated')
//         $('.location').addClass('animate__backInDown')
//         setTimeout(() => {
//             $('.contact').removeClass('animate__animated')
//             $('.contact').removeClass('animate__backInDown')
//             $('.location').removeClass('animate__animated')
//             $('.location').removeClass('animate__backInDown')
//         }, 2000)
//     }
//     if (+scrollTop >= 1400) {
//         $('.contact').show()
//         $('.location').show()
//     }
// });

// window.addEventListener('scroll', () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//     console.log(scrollTop)
//     if (+scrollTop >= 1532 && +scrollTop <= 1700) {
//         $('.about swiper-container').addClass('animate__animated animate__bounceInLeft')
//     }
// }, 2000)
// if (+scrollTop >= 1700) {
//     $('.about swiper-container').show()

// }

var toTitleCase = function (str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
};

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
}

var total_order = []
var customer_order = []

$('.modal').hide()

$('.submit').click(() => {
    var name = toTitleCase($('#name').val().trim()).replace(/\s+/g, '-')
    var phone_number = formatPhoneNumber($('#phone_number').val().trim())
    var _order = (customer_order.toString()).replace(/,/g, ', ');
    var sub_total = total_order.reduce(function (a, b) {
        return a + b;
    }, 0);
    console.log(name.length)
    var total = "$" + ((sub_total * 1.06).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    if (name.length > 1 || phone_number > 1 || _order > 1) {
        $('.submit').removeClass('disabled')
        $('.confirm').prop('disabled', false);
        $('.modal-text').text(`${name}, you ordered ${_order}... and ${phone_number} is a good number to reach you at incase if there are any issues? If that is correct, then with tax, the total comes out to ${total}.
        Please press 'Continue' to pay.`)
        var send_order = {
            name: name,
            phone_number: phone_number,
            order: _order,
            total: total
        }
        $.post("/api/user/order", send_order)
        $('.modal').show()
        fetch('/', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ number: $('#phone_number').val().trim(), text: _order })
        }).then((response) => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }
})

$('.close').click(() => {
    $('.modal').hide()
})
$('#close-alert').click(() => {
    $('.alert').hide()
})
$('.edit').click(() => {
    $('.modal').hide()
})
$('.confirm').click(() => {
    $('.modal').hide()
})

$('.submit').on('click', function (e) {
    if ($(this).hasClass('disabled')) {
        $('.alert').show()
    }
});


function AddToOrder() {
    $('.orderAbove').empty()
    var item = "#" + (event.target.id).replace(/_/g, ' ');

    document.querySelector('.textarea').innerHTML +=
        `
        <a><p class="ordered_items" id="${event.target.id}">${item}    <i class="fa fa-trash delete" aria-hidden="true" onClick="deleteOrder()"></i></a></p>
    `
    total_order.push(+event.target.value)
    customer_order.push(item.substring(3))

}



function deleteOrder() {
    event.target.parentNode.style.display = 'none'
}

