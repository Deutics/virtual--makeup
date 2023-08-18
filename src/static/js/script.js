// geting races elements
var black_race = {}
var brown_race = {}
var white_race = {}

var default_race = 'white'
var suggested_race = null

// function to convert to rgb
String.prototype.convertToRGB = function () {
    var aRgbHex = this.match(/.{1,2}/g)
    return `(${parseInt(aRgbHex[0], 16)}, ${parseInt(
        aRgbHex[1],
        16
    )}, ${parseInt(aRgbHex[2], 16)})`
}

// recommended products for ai
let colorShadesAiRec = [
    {
        heading: 'foundation',
        colors: ['#FD0000'],
    },
    {
        heading: 'eye shadow',
        colors: ['#FE007A'],
    },
    {
        heading: 'concealer',
        colors: ['#FD0000'],
    },
    {
        heading: 'blush',
        colors: ['#FD0000'],
    },
    {
        heading: 'lipstick',
        colors: ['#FE007A'],
    },
]

// removal values
const resetValues = [
    'lipstick_color=(0, 0, 0)',
    'concealer_color=(0, 0, 0)',
    'foundation_color=(0, 0, 0)',
    'blush_color=(0, 0, 0)',
    'eyeshadow_color=(0, 0, 0)',
]

// function to remove all colors
const reset = () => {
    resetValues.forEach((item) => {
        var xhttp = new XMLHttpRequest()
        xhttp.open('POST', '/recommendation_data', true)
        xhttp.setRequestHeader(
            'Content-type',
            'application/x-www-form-urlencoded'
        )
        xhttp.send(item)
    })
    document
        .querySelectorAll('#color')
        .forEach((item) => item.classList.remove('addborder'))
}

//all shades
const shades = [
    'matte',
    'glossy',
    'frosted',
    'satin/Sheer',
    'lip Glass',
    'Lip Pamper',
    'pearl',
    'creamy',
]

const productsForRaces = {
    white: [
        {
            src: '../static/img/lipstik/lipstick_img1.png',
            color: '#C08C80',
            productType: 'lipstick',
            title: 'Powermatte Long Lasting ',
            type: 'matte',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img1.png',
            color: '#EDA96A',
            productType: 'eye shadow',

            title: 'Powermatte Long Lasting ',
            type: 'matte',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
        },
        {
            src: '../static/img/foundation/foundation_img1.png',
            color: '#E6BF9E',
            productType: 'foundation',

            title: 'Powermatte Long Lasting ',
            type: 'matte',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
        },
        {
            src: '../static/img/blush/blush_img1.png',
            color: '#EDC3B6',
            productType: 'blush',

            title: 'Powermatte Long Lasting ',
            type: 'matte',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
        },
        {
            src: '../static/img/concealer/concealer_img1.png',
            color: '#996C52',
            productType: 'concealer',

            title: 'Powermatte Long Lasting ',
            type: 'matte',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
        },
    ],
    brown: [
        {
            src: '../static/img/lipstik/lipstick_img2.png',
            color: '#B8050F',
            type: 'matte',
            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img2.png',
            color: '#CEA598',
            type: 'matte',
            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
        },
        {
            src: '../static/img/foundation/foundation_img2.png',
            color: '#EDCDB8',
            type: 'matte',
            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
        },
        {
            src: '../static/img/blush/blush_img2.png',
            color: '#C57A67',
            type: 'matte',
            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
        },
        {
            src: '../static/img/concealer/concealer_img2.png',
            color: '#EDC0A7',
            type: 'matte',
            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
        },
    ],
    black: [
        {
            src: '../static/img/lipstik/lipstick_img3.png',
            color: '#C45251',
            type: 'matte',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img3.png',
            color: '#E2AD9B',
            type: 'matte',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
        },
        {
            src: '../static/img/foundation/foundation_img3.png',
            color: '#E3BF9E',
            type: 'matte',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
        },
        {
            src: '../static/img/blush/blush_img3.png',
            color: '#FFBBBB',
            type: 'matte',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
        },
        {
            src: '../static/img/concealer/concealer_img3.png',
            color: '#F4D0AE',
            type: 'matte',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
        },
    ],
}

var cartItems = {}

const updateCartItems = () => {
    Object.keys(productsForRaces).forEach((key) => {
        let selectedRace = suggested_race ? suggested_race : default_race
        if (selectedRace === key) {
            productsForRaces[key].forEach((item) => {
                cartItems[item.productType] = item
            })
        }
    })
}

updateCartItems()

// all products
const products = {
    'lipstick': [
        {
            src: '../static/img/lipstik/lipstick_img1.png',
            color: '#C08C80',
            productType: 'lipstick',
            title: 'Powermatte Long Lasting ',
            type: 'matte',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img2.png',
            color: '#B8050F',
            type: 'matte',
            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img3.png',
            color: '#C45251',
            type: 'matte',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img4.png',
            color: '#972833',
            type: 'matte',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img5.png',
            color: '#904740',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte lipstick',
            type: 'frosted',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img6.png',
            color: '#A53D38',
            type: 'matte',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img1.png',
            color: '#C08C80',
            type: 'matte',

            title: 'Powermatte Long Lasting ',

            content: 'Transfer-resistant, matte lipstick',

            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img2.png',
            color: '#B8050F',
            type: 'matte',

            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img3.png',
            color: '#C45251',
            type: 'frosted',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img4.png',
            color: '#972833',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img5.png',
            color: '#904740',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte lipstick',
            type: 'frosted',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img6.png',
            color: '#A53D38',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img1.png',
            color: '#C08C80',
            type: 'frosted',
            title: 'Powermatte Long Lasting',

            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img2.png',
            color: '#B8050F',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img3.png',
            color: '#C45251',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img4.png',
            color: '#972833',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img5.png',
            color: '#904740',
            title: 'Matte Lipstick',
            type: 'frosted',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img6.png',
            color: '#A53D38',
            type: 'frosted',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img1.png',
            color: '#C08C80',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'lipstick',
        },
    ],
    'eye shadow': [
        {
            src: '../static/img/eyeshadow/eyeshadow_img1.png',
            color: '#EDA96A',
            title: 'Powermatte Long Lasting ',
            type: 'matte',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img2.png',
            color: '#CEA598',
            type: 'matte',
            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img3.png',
            color: '#E2AD9B',
            type: 'matte',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img4.png',
            color: '#F5AC94',
            type: 'matte',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img5.png',
            color: '#E08459',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte lipstick',
            type: 'frosted',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img6.png',
            color: '#714851',
            type: 'matte',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img1.png',
            color: '#EDA96A',
            type: 'matte',

            title: 'Powermatte Long Lasting ',

            content: 'Transfer-resistant, matte lipstick',

            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img2.png',
            color: '#CEA598',
            type: 'matte',

            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img3.png',
            color: '#E2AD9B',
            type: 'frosted',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img4.png',
            color: '#F5AC94',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img5.png',
            color: '#E08459',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte lipstick',
            type: 'frosted',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img6.png',
            color: '#714851',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img1.png',
            color: '#EDA96A',
            type: 'frosted',
            title: 'Powermatte Long Lasting',

            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img2.png',
            color: '#CEA598',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img3.png',
            color: '#E2AD9B',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img4.png',
            color: '#F5AC94',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img5.png',
            color: '#E08459',
            title: 'Matte Lipstick',
            type: 'frosted',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img6.png',
            color: '#714851',
            type: 'frosted',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img1.png',
            color: '#EDA96A',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'eye shadow',
        },
    ],
    'foundation': [
        {
            src: '../static/img/foundation/foundation_img1.png',
            color: '#E6BF9E',
            title: 'Powermatte Long Lasting ',
            type: 'matte',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img2.png',
            color: '#EDCDB8',
            type: 'matte',
            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img3.png',
            color: '#E3BF9E',
            type: 'matte',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img4.png',
            color: '#BA8255',
            type: 'matte',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img5.png',
            color: '#BA8255',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte lipstick',
            type: 'frosted',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img6.png',
            color: '#D7B085',
            type: 'matte',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img1.png',
            color: '#E6BF9E',
            type: 'matte',

            title: 'Powermatte Long Lasting ',

            content: 'Transfer-resistant, matte lipstick',

            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img2.png',
            color: '#EDCDB8',
            type: 'matte',

            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img3.png',
            color: '#E3BF9E',
            type: 'frosted',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img4.png',
            color: '#BA8255',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img5.png',
            color: '#BA8255',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte lipstick',
            type: 'frosted',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img6.png',
            color: '#D7B085',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img1.png',
            color: '#E6BF9E',
            type: 'frosted',
            title: 'Powermatte Long Lasting',

            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img2.png',
            color: '#EDCDB8',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img3.png',
            color: '#E3BF9E',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img4.png',
            color: '#BA8255',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img5.png',
            color: '#BA8255',
            title: 'Matte Lipstick',
            type: 'frosted',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img6.png',
            color: '#D7B085',
            type: 'frosted',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img1.png',
            color: '#E6BF9E',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'foundation',
        },
    ],
    'blush': [
        {
            src: '../static/img/blush/blush_img1.png',
            color: '#EDC3B6',
            title: 'Powermatte Long Lasting ',
            type: 'matte',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img2.png',
            color: '#C57A67',
            type: 'matte',
            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img3.png',
            color: '#FFBBBB',
            type: 'matte',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img4.png',
            color: '#FAAB92',
            type: 'matte',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img5.png',
            color: '#F18F8F',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte lipstick',
            type: 'frosted',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img6.png',
            color: '#DBACA1',
            type: 'matte',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img1.png',
            color: '#EDC3B6',
            type: 'matte',

            title: 'Powermatte Long Lasting ',

            content: 'Transfer-resistant, matte lipstick',

            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img2.png',
            color: '#C57A67',
            type: 'matte',

            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img3.png',
            color: '#FFBBBB',
            type: 'frosted',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img4.png',
            color: '#FAAB92',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img5.png',
            color: '#F18F8F',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte lipstick',
            type: 'frosted',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img6.png',
            color: '#DBACA1',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img1.png',
            color: '#EDC3B6',
            type: 'frosted',
            title: 'Powermatte Long Lasting',

            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img2.png',
            color: '#C57A67',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img3.png',
            color: '#FFBBBB',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img4.png',
            color: '#FAAB92',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img5.png',
            color: '#F18F8F',
            title: 'Matte Lipstick',
            type: 'frosted',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img6.png',
            color: '#DBACA1',
            type: 'frosted',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img1.png',
            color: '#EDC3B6',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'blush',
        },
    ],
    'concealer': [
        {
            src: '../static/img/concealer/concealer_img1.png',
            color: '#996C52',
            title: 'Powermatte Long Lasting ',
            type: 'matte',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img2.png',
            color: '#EDC0A7',
            type: 'matte',
            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img3.png',
            color: '#F4D0AE',
            type: 'matte',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img4.png',
            color: '#FADDCD',
            type: 'matte',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img5.png',
            color: '#FFF0E5',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte lipstick',
            type: 'frosted',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img6.png',
            color: '#7D492A',
            type: 'matte',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img1.png',
            color: '#996C52',
            type: 'matte',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte lipstick',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img2.png',
            color: '#EDC0A7',
            type: 'matte',

            title: 'Matte Lipstick',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img3.png',
            color: '#F4D0AE',
            type: 'frosted',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img4.png',
            color: '#FADDCD',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img5.png',
            color: '#FFF0E5',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte lipstick',
            type: 'frosted',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img6.png',
            color: '#7D492A',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img1.png',
            color: '#996C52',
            type: 'frosted',
            title: 'Powermatte Long Lasting',

            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img2.png',
            color: '#EDC0A7',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img3.png',
            color: '#F4D0AE',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img4.png',
            color: '#FADDCD',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img5.png',
            color: '#FFF0E5',
            title: 'Matte Lipstick',
            type: 'frosted',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img6.png',
            color: '#7D492A',
            type: 'frosted',
            title: 'Matte Refillable Lipstick ',
            content: 'Transfer-resistant, matte lipstick ',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img1.png',
            color: '#996C52',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'glossy',
            price: '$200',
            productType: 'concealer',
        },
    ],
    'contour': [],
    'mascara': [],
    'eye brow pencil': [],
    'hair color': [],
}

// open side bar
const handleOpenSideBar = () => {
    document.getElementById('sideBar').style.display = 'block'
    document.getElementById('hamburger').style.display = 'none'
    document.getElementById('cross').style.display = 'block'
}

// close side bar
const handleCloseSideBar = () => {
    document.getElementById('sideBar').style.display = 'none'

    document.getElementById('cross').style.display = 'none'
    document.getElementById('hamburger').style.display = 'block'
}

// coming soon image function
const comingsoonImage = () => {
    let comingSoonImg = document.createElement('img')
    let comingSoonText = document.createElement('div')
    comingSoonText.innerHTML = 'Coming Soon!'

    let div = document.createElement('div')
    div.appendChild(comingSoonImg)

    div.classList.add('comingSoon')
    comingSoonImg.src = '../static/img/coming-soon.png'
    document.getElementById('products').appendChild(div)
    document.getElementById('products').appendChild(comingSoonText)

    document.getElementById('products').classList.add('comingSoonToggle')
}

// list Items in cart
const listItemsInCart = () => {
    document.getElementById('cart').innerHTML = ''
    if (Object.keys(cartItems).length === 0) {
        document.getElementById('cart').innerHTML = 'Your Cart is Empty.'
    } else {
        Object.keys(cartItems).forEach((item) => {
            let cart = document.getElementById('cart')
            let cartItem = document.createElement('div')
            cartItem.classList.add('cart__item')
            let itemImg = document.createElement('img')
            itemImg.classList.add('cart__item__img')
            itemImg.src = cartItems[item].src
            let itemColor = document.createElement('div')
            itemColor.classList.add('color')
            itemColor.style.background = cartItems[item].color
            let itemTitle = document.createElement('div')
            itemTitle.classList.add('cart__item__title')
            itemTitle.innerHTML = cartItems[item].title
            let itemPrice = document.createElement('div')
            itemPrice.innerHTML = cartItems[item].price
            itemPrice.classList.add('cart__item__price')

            cartItem.appendChild(itemImg)
            cartItem.appendChild(itemColor)
            cartItem.appendChild(itemTitle)
            cartItem.appendChild(itemPrice)
            let remove = document.createElement('img')
            remove.classList.add('remove')
            remove.addEventListener('click', () => {
                delete cartItems[cartItems[item].productType]
                listItemsInCart()
            })
            remove.src = '../static/img/remove.svg'
            cartItem.appendChild(remove)

            cart.appendChild(cartItem)
        })
    }
}
// list all product
const listAllProducts = (shade = 'matte') => {
    document.getElementById('products').innerHTML = ''

    // checking if that particular product has any element in the array
    if (products[document.getElementById('header').innerHTML].length !== 0) {
        document.getElementById('products').classList.remove('comingSoonToggle')
        if (
            products[document.getElementById('header').innerHTML].find(
                (i) => i.type === shade
            )
        ) {
            products[document.getElementById('header').innerHTML].forEach(
                (item, i) => {
                    if (item.type === shade) {
                        let product = document.createElement('div')
                        let productImage = document.createElement('img')
                        let productColor = document.createElement('div')
                        let productTitle = document.createElement('div')
                        let productContent = document.createElement('div')
                        product.setAttribute('id', 'product')

                        // add click event listener to each color div
                        product.addEventListener('click', function () {
                            //adding to cart
                            cartItems[item.productType] = item
                            console.log(cartItems)
                            listItemsInCart()

                            i > 6 && product.scrollIntoView()
                            document
                                .querySelectorAll('#product')
                                .forEach((item) =>
                                    item.classList.remove('productBorder')
                                )
                            if (window.innerWidth < 786) {
                                handleCloseSideBar()
                            }
                            if (product.classList.contains('productBorder')) {
                                product.classList.remove('productBorder')

                                data = 'rgb(0, 0, 0)'
                                data = data.split('rgb')
                                data =
                                    `${document
                                        .getElementById('header')
                                        .innerHTML.replace(/\s/g, '')}_color=` +
                                    data[1]

                                var xhttp = new XMLHttpRequest()
                                xhttp.open('POST', '/recommendation_data', true)
                                xhttp.setRequestHeader(
                                    'Content-type',
                                    'application/x-www-form-urlencoded'
                                )
                                xhttp.send(data)
                            } else {
                                product.classList.add('productBorder')

                                data =
                                    `${document
                                        .getElementById('header')
                                        .innerHTML.replace(/\s/g, '')}_color=` +
                                    item.color.slice(1).convertToRGB()

                                var xhttp = new XMLHttpRequest()
                                xhttp.open('POST', '/recommendation_data', true)
                                xhttp.setRequestHeader(
                                    'Content-type',
                                    'application/x-www-form-urlencoded'
                                )
                                xhttp.send(data)
                            }
                        })

                        productTitle.innerHTML = item.title
                        productTitle.classList.add('product__title')
                        productContent.classList.add('product__content')
                        productContent.innerHTML = item.content
                        productColor.style.backgroundColor = item.color
                        productColor.classList.add('color')
                        productImage.src = item.src
                        product.classList.add('product')
                        product.appendChild(productImage)
                        product.appendChild(productColor)
                        product.appendChild(productTitle)
                        product.appendChild(productContent)
                        document.getElementById('products').appendChild(product)
                    }
                }
            )
        } else {
            comingsoonImage()
        }
    } else {
        // showing coming soon image if products not found
        comingsoonImage()
    }
}

// fetch person race
function getPersonRace() {
    fetch('/get_person_race', { method: 'POST' })
        .then((response) => response.json())
        .then((data) => {
            console.log('race from backend', data)
            white_race.classList.remove('race-selected')
            black_race.classList.remove('race-selected')
            brown_race.classList.remove('race-selected')
             suggested_race = data.race
            if (data.race === 'white') {
                white_race.classList.add('race-selected')
            } else if (data.race === 'black') {
                black_race.classList.add('race-selected')
            } else {
                brown_race.classList.add('race-selected')
            }
        })
}

// sidebar items click handler
const sideBarItemClick = (item) => {
    document.getElementById('header').innerHTML = item
    Array.prototype.forEach.call(
        document.getElementsByClassName('closed'),
        function (el) {
            el.classList.remove('borderForSidebar')
        }
    )
    // document
    //     .getElementsByClassName('closed')
    //     .forEach((item) => item.classList.remove('borderForSidebar'))
    document.getElementById(item).classList.add('borderForSidebar')
    listAllProducts()
}

const onClickShadeHandler = (shade) => {
    // showing respected products
    listAllProducts(shade.target.myParam)

    // updating Ui
    document
        .querySelectorAll('.shade')
        .forEach((item) => item.classList.remove('selectedShade'))
    document.getElementById(shade.target.myParam).classList.add('selectedShade')
}

// when document is rendered
window.onload = function () {
    // setting the header value
    if (document.getElementById('header').innerHTML === 'Header') {
        document.getElementById('header').innerHTML = 'lipstick'
        document.getElementById('lipstick').classList.add('borderForSidebar')
    }

    // declaring races
    black_race = document.getElementById('black_race')
    brown_race = document.getElementById('brown_race')
    white_race = document.getElementById('white_race')

    // handling sidebar for mobile version
    if (window.innerWidth < 786) {
        handleCloseSideBar()
    }

    // fetch person's race & show all products
    getPersonRace()
    listAllProducts()
    listItemsInCart()

    // rendering all shades
    shades.forEach((item) => {
        let shade = document.createElement('div')
        shade.addEventListener('click', onClickShadeHandler)
        if (item === 'matte') {
            shade.classList.add('selectedShade')
        }
        shade.myParam = item
        shade.innerHTML = item
        shade.classList.add('shade')
        shade.setAttribute('id', item)
        document.getElementById('shades').appendChild(shade)
    })

    // Periodically update the race every 30 seconds
    setInterval(getPersonRace, 30000)

    // initializing socket
    var socket = io.connect(
        window.location.protocol + '//' + document.domain + ':' + location.port,
        {
            transports: ['websocket'],
        }
    )

    // socket stuff
    socket.on('connect', function () {
        console.log('Connected...!', socket.connected)
    })

    // getting canvas & context & video
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    const video = document.querySelector('#videoElement')

    // setting width & height to 1 as we dont want to show the video, only want to capture frames from it
    video.width = '1'
    video.height = '1'

    //setting src for video
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then(function (stream) {
                video.srcObject = stream
                video.play()
            })
            .catch(function (err) {
                console.log('error in media devices', err)
            })
    }

    // sending a frame after 100ms
    setInterval(() => {
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        context.drawImage(video, 0, 0)
        var data = canvas.toDataURL('image/jpeg', 0.3)
        context.clearRect(0, 0, video.videoWidth, video.videoHeight)
        socket.emit('image', data)
    }, 100)

    // getting image from backend & setting it to frontend
    socket.on('processed_image', function (image) {
        photo.setAttribute('src', image)
    })
}
