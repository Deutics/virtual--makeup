// New
var lipstick_data = {
    landmarks: [
        [
            61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 308, 415, 310, 311,
            312, 13, 82, 81, 80, 191, 78,
        ],
        [
            61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 324, 318, 402,
            317, 14, 87, 178, 88, 95, 78,
        ],
    ],
    beta_value: 0.35,
    color: [0, 0, 0],
    blur : 'blur(3px) opacity(90%)',
}

var concealer_data = {
    landmarks: [
        [
            133, 243, 244, 128, 121, 120, 119, 118, 117, 111, 35, 226, 130, 163,
            144, 145, 153, 154, 155,
        ],
        [
            362, 463, 464, 357, 350, 349, 348, 347, 346, 340, 265, 263, 446,
            359, 263, 249, 390, 373, 374, 380, 381, 382,
        ],
    ],
    beta_value: 0.15,
    color: [0, 0, 0],
    blur : 'blur(4px) opacity(90%)',
}

var foundation_data = {
    landmarks: [
        [
            251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377,
            152, 148, 176, 149, 150, 136, 172, 58, 132, 127, 162, 21, 54, 103,
            67, 109, 10, 338, 297, 332, 284,
        ],
        [
            251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377,
            152, 148, 176, 149, 150, 136, 172, 58, 132, 127, 162, 21, 54, 103,
            67, 109, 10, 338, 297, 332, 284,
        ],
    ],
    beta_value: 0.07,
    color: [0, 0, 0],
    blur : 'blur(5px) opacity(80%)',
}

var blush_data = {
    landmarks: [
        [101, 117, 34, 227, 137, 207],
        [330, 264, 366, 427],
    ],
    beta_value: 0.1,
    color: [0, 0, 0],
    blur : 'blur(5px) opacity(90%)',
}

var eyeshade_data = {
    landmarks: [
        [
            226, 113, 225, 224, 223, 222, 221, 189, 244, 243, 173, 157, 158,
            159, 160, 161, 246, 130,
        ],
        [
            464, 413, 441, 442, 443, 444, 445, 342, 446, 263, 466, 388, 387,
            386, 384, 398, 362, 463,
        ],
    ],
    beta_value: 0.3,
    color: [0, 0, 0],
    blur : 'blur(5px) opacity(90%)',
}

////////////////////////////

var aiColorsRecommendations = {
    white: {
        lipstick: [224, 17, 95],
        eye_shade: [255, 192, 203],
        blush: [244, 194, 194],
        foundation: [248, 224, 212],
        concealer: [255, 229, 180],
    },
    black: {
        lipstick: [150, 25, 25],
        eye_shade: [174, 86, 28],
        blush: [205, 141, 107],
        foundation: [199, 166, 134],
        concealer: [199, 166, 134],
    },
    brown: {
        lipstick: [210, 4, 45],
        eye_shade: [187, 42, 107],
        blush: [219, 54, 86],
        foundation: [233, 211, 199],
        concealer: [210, 165, 140],
    },
}

/***********************************************************************************************
 **************************************************************************************************/

// For lipstick
function setLipstickColor(color) {
    lipstick_data = { ...lipstick_data, color: color }
}

// For Concealer
function setConcealerColor(color) {
    concealer_data = { ...concealer_data, color: color }
}

// For Foundation
function setFoundationColor(color) {
    foundation_data = { ...foundation_data, color: color }
}

// For Blush
function setBlushColor(color) {
    blush_data = { ...blush_data, color: color }
}

// For Eyeshade
function setEyeshadeColor(color) {
    eyeshade_data = { ...eyeshade_data, color: color }
}

/***********************************************************************************************
 **************************************************************************************************/

function createMakeupMask(faceLandmarks, makeup_data) {
    // if makeup is applied
    if (
        makeup_data.color[0] !== 0 ||
        makeup_data.color[1] !== 0 ||
        makeup_data.color[2] !== 0
    ) {
        // setting color in rgba format
        color =
            'rgba(' +
            makeup_data.color[0].toString() +
            ', ' +
            makeup_data.color[1].toString() +
            ', ' +
            makeup_data.color[2].toString() +
            ', ' +
            makeup_data.beta_value.toString() +
            ')'
        var canvas = document.getElementById('canvas')
        const video = document.getElementById('videoElement')
        var ctx = canvas.getContext('2d')

        for (let i = 0; i < makeup_data.landmarks.length; i++) {
            const landmark = makeup_data.landmarks[i]
            const points = []
            for (let j = 0; j < landmark.length; j++) {
                const idx = landmark[j]
                const x = faceLandmarks[idx][0]
                const y = faceLandmarks[idx][1]
                points.push({ x: x, y: y })
            }
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)
            for (let k = 1; k < points.length; k++) {
                ctx.lineTo(points[k].x, points[k].y)
            }
            ctx.filter = makeup_data.blur
            ctx.closePath()
            ctx.fill()
        }
    }
}

let photo = document.get

async function get_facemesh() {
    // load HTML canvas
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')

    // get video stream
    const video = document.getElementById('videoElement')

    // load facemesh model
    const model = await facemesh.load((maxFaces = 1))

    let photo = document.getElementById('photo')
    photo.style.display = 'block'

    let loader = document.getElementById('loader')
    loader.style.display = 'none'

    // process input stream frame by frame
    while (1) {
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        ctx.drawImage(video, 0, 0)

        // detect faces
        const faces = await model.estimateFaces(video)

        if (faces.length != 0) {
            // loop through faces array to capture multiple faces
            var keypoints = faces[0].scaledMesh

            createMakeupMask(keypoints, foundation_data)
            createMakeupMask(keypoints, lipstick_data)
            createMakeupMask(keypoints, concealer_data)
            createMakeupMask(keypoints, eyeshade_data)
            createMakeupMask(keypoints, blush_data)
        }

        var dataURL = canvas.toDataURL()
        ctx.clearRect(0, 0, video.videoWidth, video.videoHeight)

        // Set data URL as the src attribute of the img tag

        document.getElementById('photo').src = dataURL

        // loop to process the next frame
        await tf.nextFrame()
    }
}
function rgbToList(rgbString) {
    var valuesString = rgbString.replace('rgb(', '').replace(')', '')

    // Split the values string by commas
    var valuesArray = valuesString.split(',')

    // Convert the array elements to numbers
    var rgbValues = valuesArray.map(function (value) {
        return parseInt(value.trim())
    })
    // Return the RGB values as an array
    return rgbValues
}

// geting races elements
var black_race = {}
var brown_race = {}
var white_race = {}

var default_race = 'white'
var suggested_race = null

// function to convert to rgb
String.prototype.convertToRGB = function () {
    const r = parseInt(this.slice(1, 3), 16)
    const g = parseInt(this.slice(3, 5), 16)
    const b = parseInt(this.slice(5, 7), 16)
    console.log(r, g, b)

    return [r, g, b]
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

// // removal values
// const resetValues = [
//     'lipstick_color=(0, 0, 0)',
//     'concealer_color=(0, 0, 0)',
//     'foundation_color=(0, 0, 0)',
//     'blush_color=(0, 0, 0)',
//     'eyeshadow_color=(0, 0, 0)',
// ]

// // function to remove all colors
// const reset = () => {
//     resetValues.forEach((item) => {
//         var xhttp = new XMLHttpRequest()
//         xhttp.open('POST', '/recommendation_data', true)
//         xhttp.setRequestHeader(
//             'Content-type',
//             'application/x-www-form-urlencoded'
//         )
//         xhttp.send(item)
//     })
//     document
//         .querySelectorAll('#color')
//         .forEach((item) => item.classList.remove('addborder'))
// }

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

//races
const races = ['A', 'B', 'C']

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
    'ai beauty': suggested_race
        ? productsForRaces[suggested_race]
        : productsForRaces[default_race],

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
    console.log(Object.keys(cartItems))
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
                document
                    .querySelectorAll(`.${cartItems[item].productTypex}`)
                    .forEach((item) => item.classList.remove('productBorder'))

                if (cartItems[item].productType === 'lipstick') {
                    setLipstickColor([0, 0, 0])
                } else if (cartItems[item].productType === 'eye shadow') {
                    setEyeshadeColor([0, 0, 0])
                } else if (cartItems[item].productType === 'foundation') {
                    setFoundationColor([0, 0, 0])
                } else if (cartItems[item].productType === 'blush') {
                    setBlushColor([0, 0, 0])
                } else if (cartItems[item].productType === 'concealer') {
                    setConcealerColor([0, 0, 0])
                }

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
                        product.classList.add(item.productType)

                        // add click event listener to each color div
                        product.addEventListener('click', function () {
                            //adding to cart
                            cartItems[item.productType] = item

                            listItemsInCart()

                            i > 6 && product.scrollIntoView()

                            if (window.innerWidth < 786) {
                                handleCloseSideBar()
                            }
                            if (product.classList.contains('productBorder')) {
                                product.classList.remove('productBorder')
                                document
                                    .querySelectorAll('#product')
                                    .forEach((item) =>
                                        item.classList.remove('productBorder')
                                    )
                                if (item.productType === 'lipstick') {
                                    setLipstickColor([0, 0, 0])
                                } else if (item.productType === 'eye shadow') {
                                    setEyeshadeColor([0, 0, 0])
                                } else if (item.productType === 'foundation') {
                                    setFoundationColor([0, 0, 0])
                                } else if (item.productType === 'blush') {
                                    setBlushColor([0, 0, 0])
                                } else if (item.productType === 'concealer') {
                                    setConcealerColor([0, 0, 0])
                                }
                            } else {
                                document
                                    .querySelectorAll('#product')
                                    .forEach((item) =>
                                        item.classList.remove('productBorder')
                                    )
                                product.classList.add('productBorder')

                                if (item.productType === 'lipstick') {
                                    setLipstickColor(item.color.convertToRGB())
                                } else if (item.productType === 'eye shadow') {
                                    setEyeshadeColor(item.color.convertToRGB())
                                } else if (item.productType === 'foundation') {
                                    setFoundationColor(
                                        item.color.convertToRGB()
                                    )
                                } else if (item.productType === 'blush') {
                                    setBlushColor(item.color.convertToRGB())
                                } else if (item.productType === 'concealer') {
                                    setConcealerColor(item.color.convertToRGB())
                                }
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

function getPersonRace(race) {
    //console.log('race from backend', race)

    suggested_race = race
    // white_race.classList.remove('race-selected')
    // black_race.classList.remove('race-selected')
    // brown_race.classList.remove('race-selected')

    // if (race === 'white') {
    //     white_race.classList.add('race-selected')
    // } else if (race === 'black') {
    //     black_race.classList.add('race-selected')
    // } else {
    //     brown_race.classList.add('race-selected')
    // }

    if (document.getElementById('header').innerHTML === 'ai beauty') {
        setAiRecommendations(race)
        renderShadesOrRaces()
        listAllProducts()
    }
}

function setAiRecommendations(race) {
    if (race) {
        ai_colors = aiColorsRecommendations[race]
        //console.log(ai_colors)
        setLipstickColor(ai_colors.lipstick)
        setBlushColor(ai_colors.blush)
        setConcealerColor(ai_colors.concealer)
        setFoundationColor(ai_colors.foundation)
        setEyeshadeColor(ai_colors.eye_shade)
    }
}

// sidebar items click handler
const sideBarItemClick = (item) => {
    // listing cart items if it's ai beauty

    if (item === 'ai beauty') {
        listItemsInCart()
        getPersonRace()
    }

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

    // showing header
    renderShadesOrRaces()
}

const renderShadesOrRaces = () => {
    document.getElementById('shades').innerHTML = ''

    //console.log('suggested race', suggested_race)

    if (document.getElementById('header').innerHTML === 'ai beauty') {
        // rendering all shades
        races.forEach((item) => {
            let shade = document.createElement('div')

            if (suggested_race === 'white' && item === 'A') {
                shade.classList.add('selectedShade')
            } else if (suggested_race === 'brown' && item === 'B') {
                shade.classList.add('selectedShade')
            } else if (suggested_race === 'black' && item === 'C') {
                shade.classList.add('selectedShade')
            }
            shade.myParam = item
            shade.innerHTML = item
            shade.classList.add('raceHeader')

            shade.setAttribute('id', item)
            document.getElementById('shades').appendChild(shade)
        })
    } else {
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
    }
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
    // setting loader
    let photo = document.getElementById('photo')

    // setting the header value
    if (document.getElementById('header').innerHTML === 'Header') {
        document.getElementById('header').innerHTML = 'lipstick'
        document.getElementById('lipstick').classList.add('borderForSidebar')
    }

    // declaring races
    // black_race = document.getElementById('black_race')
    // brown_race = document.getElementById('brown_race')
    // white_race = document.getElementById('white_race')

    // handling sidebar for mobile version
    if (window.innerWidth < 786) {
        handleCloseSideBar()
    }

    listAllProducts()
    renderShadesOrRaces()
    listItemsInCart()

    // Periodically update the race every 30 seconds
    setInterval(getPersonRace, 30000)
    var socket = io.connect(
        window.location.protocol + '//' + document.domain + ':' + location.port,
        {
            transports: ['websocket'],
        }
    )

    async function sendFrame() {
        //console.log('Inside')
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = canvas.toDataURL('image/jpeg') // Convert the frame to base64-encoded JPEG image data

        socket.emit('image', imageData) // Send the frame to the Python server

        setTimeout(sendFrame, 30000) // Repeat every 30 seconds
    }

    // Recieve race
    socket.on('race', function (race) {
        getPersonRace(race)
    })

    video = document.getElementById('videoElement')

    // // setting width & height to 1 as we dont want to show the video, only want to capture frames from it
    video.width = '1'
    video.height = '1'
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream
            })
    }

    // run face-mesh model once the video is ready for processing
    main()

    function main() {
        // check if the video is loaded and ready for processing
        if (video.readyState == 4) {
            get_facemesh()
            sendFrame()
        } else {
            setTimeout(main, 1000 / 60)
        }
    }
}
