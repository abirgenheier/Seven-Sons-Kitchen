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

$('.modal').hide()

$('.submit').click(() => {
    var name = toTitleCase($('#name').val().trim()).replace(/\s+/g, '-')
    var phone_number = formatPhoneNumber($('#phone_number').val().trim())
    var _order = $('#order').val().trim()
    console.log(name)
    if (name !== '' || name !== null || phone_number !== '' || phone_number !== null || _order !== '' || _order !== null) {
        $('.modal-text').text(`${name}, you ordered ${_order}... and ${phone_number} is a good number to reach you at incase if there are any issues? Is that correct?`)
        var order = {
            name: name,
            phone_number: phone_number,
            order: _order
        }
        $.post("/api/user/order", order)
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
$('.confirm').click(() => {
    $('.modal').hide()
})