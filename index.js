document.querySelector(".contact").style.visibility = "hidden";
document.querySelector("location").style.visibility = "hidden";
document.querySelector(".about").style.visibility = "hidden";
document.querySelector(".swiper-container").style.visibility = "hidden";

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

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollTop)
    if (+scrollTop >= 1064 && +scrollTop <= 1400) {
        document.querySelector(".contact").style.visibility = "visible";
        $('.contact').addClass('animate__animated')
        $('.contact').addClass('animate__backInDown')
        $('.location').show()
        $('.location').addClass('animate__animated')
        $('.location').addClass('animate__backInDown')
        setTimeout(() => {
            $('.contact').removeClass('animate__animated')
            $('.contact').removeClass('animate__backInDown')
            $('.location').removeClass('animate__animated')
            $('.location').removeClass('animate__backInDown')
        }, 2000)
    }
    if (+scrollTop >= 1400) {
        $('.contact').show()
        $('.location').show()
    }
});

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollTop)
    if (+scrollTop >= 1532 && +scrollTop <= 1700) {
        $('.about swiper-container').addClass('animate__animated animate__bounceInLeft')
    }
}, 2000)
if (+scrollTop >= 1700) {
    $('.about swiper-container').show()

}
