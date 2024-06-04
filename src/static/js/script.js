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
    blur: 'blur(3px) opacity(90%)',
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
    blur: 'blur(4px) opacity(90%)',
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
    blur: 'blur(5px) opacity(80%)',
}

var blush_data = {
    landmarks: [
        [101, 117, 34, 227, 137, 207],
        [330, 264, 366, 427],
    ],
    beta_value: 0.1,
    color: [0, 0, 0],
    blur: 'blur(5px) opacity(90%)',
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
    blur: 'blur(5px) opacity(90%)',
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

function createMakeupMask(faceLandmarks, makeup_data, frame) {
    try {
        if (
            makeup_data.color[0] !== 0 ||
            makeup_data.color[1] !== 0 ||
            makeup_data.color[2] !== 0
        ) {
            // setting color in RGBA format
            const color = new cv.Scalar(
                makeup_data.color[0],
                makeup_data.color[1],
                makeup_data.color[2],
                makeup_data.beta_value * 255 // OpenCV expects alpha to be between 0-255
            )

            for (let i = 0; i < makeup_data.landmarks.length; i++) {
                const landmark = makeup_data.landmarks[i]
                const points = []
                for (let j = 0; j < landmark.length; j++) {
                    const idx = landmark[j]
                    const x = Math.floor(faceLandmarks[idx][0])
                    const y = Math.floor(faceLandmarks[idx][1])
                    points.push(x, y)
                }

                const mask = new cv.Mat.zeros(
                    frame.rows,
                    frame.cols,
                    cv.CV_8UC4
                )
                const counterMat = cv.matFromArray(
                    points.length / 2,
                    1,
                    cv.CV_32SC2,
                    points
                )
                const contour = new cv.MatVector()
                contour.push_back(counterMat)
                cv.fillPoly(mask, contour, color)

                // Apply blur if specified
                if (makeup_data.blur) {
                    const ksize = new cv.Size(5, 5) // You can adjust the kernel size
                    cv.GaussianBlur(mask, mask, ksize, 0)
                }

                // Overlay the mask on the frame
                cv.addWeighted(
                    frame,
                    1.0,
                    mask,
                    makeup_data.beta_value,
                    0,
                    frame
                )

                mask.delete()
                counterMat.delete()
                contour.delete()
            }
        }
    } catch (err) {
        console.log('Processing Makeup: ', err)
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

//all shades
const shades = {
    'lipstick': [
        'matte',
        'glossy',
        'frosted',
        'satin/Sheer',
        'lip Glass',
        'Lip Pamper',
        'pearl',
        'creamy',
    ],
    'eye shadow': [
        'matte',
        'satin',
        'metallic',
        'shimmer',
        'glitter',
        'frost',
        'luster',
        'neon',
    ],
    'foundation': [
        'liquid',
        'powder',
        'cream',
        'stick',
        'mineral',
        'tinted',
        'serum',
    ],
    'blush': [
        'pressed',
        'mineral',
        'cream',
        'cheek tint',
        'blush stick',
        'Liquid',
    ],
    'concealer': ['liquid', 'cream', 'stick', 'balm'],
}

const toolTipTextObj = {
    'lipstick':
        'Matte lipsticks are great for any occasion for its long-lasting and bold colours. Its typically the ideal addition to any formal or professional setting.',
    'eye shadow':
        'Matte eyeshadow is a non-shiny, velvety eye color. Use it for a sophisticated, no-gloss look.',
    'foundation':
        'Liquid foundation is used to even out skin tone and provide a smooth base for makeup application. It should be used when you want a seamless, natural-looking complexion.',
    'blush':
        'Pressed blush is a compact powder blush that gives off a more long-lasting finish. Use it for any occasion to add a pop of color to your cheeks.',
    'concealer':
        'Liquid concealer is a fluid-based formula for light to medium coverage, ideal for under-eye circles and minor imperfections.',
}

//races
var races = ['A', 'B', 'C']

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
    Object.keys(productsForRaces).forEach(key => {
        let selectedRace = suggested_race ? suggested_race : default_race
        if (selectedRace === key) {
            productsForRaces[key].forEach(item => {
                cartItems[item.productType] = item
            })
        }
    })
}

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
            type: 'matte',
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
            type: 'matte',
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
            type: 'matte',
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
            type: 'matte',
            title: 'Powermatte Long Lasting',

            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img2.png',
            color: '#B8050F',
            title: 'Kind Words Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img3.png',
            color: '#C45251',
            title: 'Velvet Matte Lipstick',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img4.png',
            color: '#972833',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte lipstick',
            type: 'matte',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img5.png',
            color: '#904740',
            title: 'Matte Lipstick',
            type: 'matte',
            content: 'Rich lipstick with high color payoff',
            price: '$200',
            productType: 'lipstick',
        },
        {
            src: '../static/img/lipstik/lipstick_img6.png',
            color: '#A53D38',
            type: 'matte',
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
            type: 'matte',
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
            content: 'Transfer-resistant, matte eye shadow',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img2.png',
            color: '#CEA598',
            type: 'matte',
            title: 'Matte eye shadow',
            content: 'Rich eye shadow with high color payoff',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img3.png',
            color: '#E2AD9B',
            type: 'matte',
            title: 'Matte Refillable eye shadow ',
            content: 'Transfer-resistant, matte eye shadow ',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img4.png',
            color: '#F5AC94',
            type: 'matte',
            title: 'Velvet Matte eye shadow',
            content: 'Transfer-resistant, matte eye shadow',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img5.png',
            color: '#E08459',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte eye shadow',
            type: 'matte',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img6.png',
            color: '#714851',
            type: 'matte',
            title: 'Kind Words Matte eye shadow',
            content: 'Transfer-resistant, matte eye shadow',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img1.png',
            color: '#EDA96A',
            type: 'matte',

            title: 'Powermatte Long Lasting ',

            content: 'Transfer-resistant, matte eye shadow',

            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img2.png',
            color: '#CEA598',
            type: 'matte',

            title: 'Matte eye shadow',
            content: 'Rich eye shadow with high color payoff',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img3.png',
            color: '#E2AD9B',
            type: 'matte',
            title: 'Matte Refillable eye shadow ',
            content: 'Transfer-resistant, matte eye shadow ',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img4.png',
            color: '#F5AC94',
            title: 'Velvet Matte eye shadow',
            content: 'Transfer-resistant, matte eye shadow',
            type: 'matte',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img5.png',
            color: '#E08459',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte eye shadow',
            type: 'matte',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img6.png',
            color: '#714851',
            title: 'Kind Words Matte eye shadow',
            content: 'Transfer-resistant, matte eye shadow',
            type: 'matte',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img1.png',
            color: '#EDA96A',
            type: 'matte',
            title: 'Powermatte Long Lasting',

            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img2.png',
            color: '#CEA598',
            title: 'Kind Words Matte eye shadow',
            content: 'Transfer-resistant, matte eye shadow',
            type: 'matte',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img3.png',
            color: '#E2AD9B',
            title: 'Velvet Matte eye shadow',
            content: 'Transfer-resistant, matte eye shadow',
            type: 'matte',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img4.png',
            color: '#F5AC94',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte eye shadow',
            type: 'matte',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img5.png',
            color: '#E08459',
            title: 'Matte eye shadow',
            type: 'matte',
            content: 'Rich eye shadow with high color payoff',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img6.png',
            color: '#714851',
            type: 'matte',
            title: 'Matte Refillable eye shadow ',
            content: 'Transfer-resistant, matte eye shadow ',
            price: '$200',
            productType: 'eye shadow',
        },
        {
            src: '../static/img/eyeshadow/eyeshadow_img1.png',
            color: '#EDA96A',
            title: 'Velvet Matte eye shadow',
            content: 'Transfer-resistant, matte eye shadow',
            type: 'matte',
            price: '$200',
            productType: 'eye shadow',
        },
    ],
    'foundation': [
        {
            src: '../static/img/foundation/foundation_img1.png',
            color: '#E6BF9E',
            title: 'Powermatte Long Lasting ',
            type: 'liquid',
            content: 'Transfer-resistant, matte foundation',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img2.png',
            color: '#EDCDB8',
            type: 'liquid',
            title: 'Matte foundation',
            content: 'Rich foundation with high color payoff',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img3.png',
            color: '#E3BF9E',
            type: 'liquid',
            title: 'Matte Refillable foundation ',
            content: 'Transfer-resistant, matte foundation ',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img4.png',
            color: '#BA8255',
            type: 'liquid',
            title: 'Velvet Matte foundation',
            content: 'Transfer-resistant, matte foundation',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img5.png',
            color: '#BA8255',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte foundation',
            type: 'liquid',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img6.png',
            color: '#D7B085',
            type: 'liquid',
            title: 'Kind Words Matte foundation',
            content: 'Transfer-resistant, matte foundation',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img1.png',
            color: '#E6BF9E',
            type: 'liquid',

            title: 'Powermatte Long Lasting ',

            content: 'Transfer-resistant, matte foundation',

            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img2.png',
            color: '#EDCDB8',
            type: 'liquid',

            title: 'Matte foundation',
            content: 'Rich foundation with high color payoff',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img3.png',
            color: '#E3BF9E',
            type: 'liquid',
            title: 'Matte Refillable foundation ',
            content: 'Transfer-resistant, matte foundation ',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img4.png',
            color: '#BA8255',
            title: 'Velvet Matte foundation',
            content: 'Transfer-resistant, matte foundation',
            type: 'liquid',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img5.png',
            color: '#BA8255',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte foundation',
            type: 'liquid',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img6.png',
            color: '#D7B085',
            title: 'Kind Words Matte foundation',
            content: 'Transfer-resistant, matte foundation',
            type: 'liquid',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img1.png',
            color: '#E6BF9E',
            type: 'liquid',
            title: 'Powermatte Long Lasting',

            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img2.png',
            color: '#EDCDB8',
            title: 'Kind Words Matte foundation',
            content: 'Transfer-resistant, matte foundation',
            type: 'liquid',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img3.png',
            color: '#E3BF9E',
            title: 'Velvet Matte foundation',
            content: 'Transfer-resistant, matte foundation',
            type: 'liquid',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img4.png',
            color: '#BA8255',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte foundation',
            type: 'liquid',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img5.png',
            color: '#BA8255',
            title: 'Matte foundation',
            type: 'liquid',
            content: 'Rich foundation with high color payoff',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img6.png',
            color: '#D7B085',
            type: 'liquid',
            title: 'Matte Refillable foundation ',
            content: 'Transfer-resistant, matte foundation ',
            price: '$200',
            productType: 'foundation',
        },
        {
            src: '../static/img/foundation/foundation_img1.png',
            color: '#E6BF9E',
            title: 'Velvet Matte foundation',
            content: 'Transfer-resistant, matte foundation',
            type: 'liquid',
            price: '$200',
            productType: 'foundation',
        },
    ],
    'blush': [
        {
            src: '../static/img/blush/blush_img1.png',
            color: '#EDC3B6',
            title: 'Powermatte Long Lasting ',
            type: 'pressed',
            content: 'Transfer-resistant, matte blush',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img2.png',
            color: '#C57A67',
            type: 'pressed',
            title: 'Matte blush',
            content: 'Rich blush with high color payoff',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img3.png',
            color: '#FFBBBB',
            type: 'pressed',
            title: 'Matte Refillable blush ',
            content: 'Transfer-resistant, matte blush ',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img4.png',
            color: '#FAAB92',
            type: 'pressed',
            title: 'Velvet Matte blush',
            content: 'Transfer-resistant, matte blush',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img5.png',
            color: '#F18F8F',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte blush',
            type: 'pressed',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img6.png',
            color: '#DBACA1',
            type: 'pressed',
            title: 'Kind Words Matte blush',
            content: 'Transfer-resistant, matte blush',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img1.png',
            color: '#EDC3B6',
            type: 'pressed',

            title: 'Powermatte Long Lasting ',

            content: 'Transfer-resistant, matte blush',

            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img2.png',
            color: '#C57A67',
            type: 'pressed',

            title: 'Matte blush',
            content: 'Rich blush with high color payoff',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img3.png',
            color: '#FFBBBB',
            type: 'pressed',
            title: 'Matte Refillable blush ',
            content: 'Transfer-resistant, matte blush ',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img4.png',
            color: '#FAAB92',
            title: 'Velvet Matte blush',
            content: 'Transfer-resistant, matte blush',
            type: 'pressed',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img5.png',
            color: '#F18F8F',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte blush',
            type: 'pressed',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img6.png',
            color: '#DBACA1',
            title: 'Kind Words Matte blush',
            content: 'Transfer-resistant, matte blush',
            type: 'pressed',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img1.png',
            color: '#EDC3B6',
            type: 'pressed',
            title: 'Powermatte Long Lasting',

            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img2.png',
            color: '#C57A67',
            title: 'Kind Words Matte blush',
            content: 'Transfer-resistant, matte blush',
            type: 'pressed',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img3.png',
            color: '#FFBBBB',
            title: 'Velvet Matte blush',
            content: 'Transfer-resistant, matte blush',
            type: 'pressed',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img4.png',
            color: '#FAAB92',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte blush',
            type: 'pressed',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img5.png',
            color: '#F18F8F',
            title: 'Matte blush',
            type: 'pressed',
            content: 'Rich blush with high color payoff',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img6.png',
            color: '#DBACA1',
            type: 'pressed',
            title: 'Matte Refillable blush ',
            content: 'Transfer-resistant, matte blush ',
            price: '$200',
            productType: 'blush',
        },
        {
            src: '../static/img/blush/blush_img1.png',
            color: '#EDC3B6',
            title: 'Velvet Matte blush',
            content: 'Transfer-resistant, matte blush',
            type: 'pressed',
            price: '$200',
            productType: 'blush',
        },
    ],
    'concealer': [
        {
            src: '../static/img/concealer/concealer_img1.png',
            color: '#996C52',
            title: 'Powermatte Long Lasting ',
            type: 'liquid',
            content: 'Transfer-resistant, matte concealer',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img2.png',
            color: '#EDC0A7',
            type: 'liquid',
            title: 'Matte concealer',
            content: 'Rich concealer with high color payoff',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img3.png',
            color: '#F4D0AE',
            type: 'liquid',
            title: 'Matte Refillable concealer ',
            content: 'Transfer-resistant, matte concealer ',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img4.png',
            color: '#FADDCD',
            type: 'liquid',
            title: 'Velvet Matte concealer',
            content: 'Transfer-resistant, matte concealer',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img5.png',
            color: '#FFF0E5',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte concealer',
            type: 'liquid',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img6.png',
            color: '#7D492A',
            type: 'liquid',
            title: 'Kind Words Matte concealer',
            content: 'Transfer-resistant, matte concealer',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img1.png',
            color: '#996C52',
            type: 'liquid',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte concealer',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img2.png',
            color: '#EDC0A7',
            type: 'liquid',

            title: 'Matte concealer',
            content: 'Rich concealer with high color payoff',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img3.png',
            color: '#F4D0AE',
            type: 'liquid',
            title: 'Matte Refillable concealer ',
            content: 'Transfer-resistant, matte concealer ',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img4.png',
            color: '#FADDCD',
            title: 'Velvet Matte concealer',
            content: 'Transfer-resistant, matte concealer',
            type: 'liquid',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img5.png',
            color: '#FFF0E5',
            title: 'Powermatte Long Lasting',
            content: 'Transfer-resistant, matte concealer',
            type: 'liquid',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img6.png',
            color: '#7D492A',
            title: 'Kind Words Matte concealer',
            content: 'Transfer-resistant, matte concealer',
            type: 'liquid',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img1.png',
            color: '#996C52',
            type: 'liquid',
            title: 'Powermatte Long Lasting',

            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img2.png',
            color: '#EDC0A7',
            title: 'Kind Words Matte concealer',
            content: 'Transfer-resistant, matte concealer',
            type: 'liquid',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img3.png',
            color: '#F4D0AE',
            title: 'Velvet Matte concealer',
            content: 'Transfer-resistant, matte concealer',
            type: 'liquid',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img4.png',
            color: '#FADDCD',
            title: 'Powermatte Long Lasting ',
            content: 'Transfer-resistant, matte concealer',
            type: 'liquid',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img5.png',
            color: '#FFF0E5',
            title: 'Matte concealer',
            type: 'liquid',
            content: 'Rich concealer with high color payoff',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img6.png',
            color: '#7D492A',
            type: 'liquid',
            title: 'Matte Refillable concealer ',
            content: 'Transfer-resistant, matte concealer ',
            price: '$200',
            productType: 'concealer',
        },
        {
            src: '../static/img/concealer/concealer_img1.png',
            color: '#996C52',
            title: 'Velvet Matte concealer',
            content: 'Transfer-resistant, matte concealer',
            type: 'liquid',
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
        document.getElementById('cart').innerHTML = 'No product is selected.'
    } else {
        Object.keys(cartItems).forEach(item => {
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
                    .querySelectorAll(`#shade`)
                    .forEach(item => item.classList.remove('productBorder'))

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
const listAllProducts = shade => {
    let headerValue = document.getElementById('header').innerHTML

    if (!shade) {
        if (headerValue === 'foundation') {
            shade = 'liquid'
        } else if (headerValue === 'blush') {
            shade = 'pressed'
        } else if (headerValue === 'concealer') {
            shade = 'liquid'
        } else if (headerValue === 'lipstick') {
            shade = 'matte'
        } else if (headerValue === 'eye shadow') {
            shade = 'matte'
        } else if (headerValue === 'ai beauty') {
            shade = 'matte'
        }
    }

    document.getElementById('products').innerHTML = ''

    // checking if that particular product has any element in the array
    if (products[headerValue].length !== 0) {
        document.getElementById('products').classList.remove('comingSoonToggle')
        if (products[headerValue].find(i => i.type === shade)) {
            products[headerValue].forEach((item, i) => {
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

                        listItemsInCart()

                        i > 6 && product.scrollIntoView()

                        if (window.innerWidth < 786) {
                            handleCloseSideBar()
                        }
                        if (product.classList.contains('productBorder')) {
                            product.classList.remove('productBorder')
                            document
                                .querySelectorAll('#product')
                                .forEach(item =>
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
                                .forEach(item =>
                                    item.classList.remove('productBorder')
                                )
                            product.classList.add('productBorder')

                            if (item.productType === 'lipstick') {
                                setLipstickColor(item.color.convertToRGB())
                            } else if (item.productType === 'eye shadow') {
                                setEyeshadeColor(item.color.convertToRGB())
                            } else if (item.productType === 'foundation') {
                                setFoundationColor(item.color.convertToRGB())
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
            })
        } else {
            comingsoonImage()
        }
    } else {
        // showing coming soon image if products not found
        comingsoonImage()
    }
}

function getPersonRace(race) {
    suggested_race = race
    if (document.getElementById('header').innerHTML === 'ai beauty') {
        setAiRecommendations(race)
        renderShadesOrRaces()

        updateCartItems()
        listItemsInCart()
        listAllProducts()
    }
}

function setAiRecommendations(race) {
    if (race) {
        ai_colors = aiColorsRecommendations[race]
        setLipstickColor(ai_colors.lipstick)
        setBlushColor(ai_colors.blush)
        setConcealerColor(ai_colors.concealer)
        setFoundationColor(ai_colors.foundation)
        setEyeshadeColor(ai_colors.eye_shade)
    }
}

// sidebar items click handler
const sideBarItemClick = item => {
    // closing sidebar if in mobile view
    if (sideBar.style.display === 'block' && window.innerWidth < 786) {
        handleCloseSideBar()
    }

    // listing cart items if it's ai beauty

    if (item === 'ai beauty') {
        listItemsInCart()
        getPersonRace()
        updateCartItems()
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

    if (document.getElementById('header').innerHTML === 'ai beauty') {
        // rendering all shades
        races.forEach(item => {
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
        shades[document.getElementById('header').innerHTML].forEach(
            (item, i) => {
                let shadeContainer = document.createElement('div')
                shadeContainer.addEventListener('click', onClickShadeHandler)
                let shade = document.createElement('div')
                shade.myParam = item
                shade.innerHTML = item
                shadeContainer.appendChild(shade)
                if (i === 0) {
                    shadeContainer.classList.add('selectedShade')
                    let tooltip = document.createElement('div')

                    let toolTipText = document.createElement('span')
                    toolTipText.classList.add('tooltiptext')
                    toolTipText.innerHTML =
                        toolTipTextObj[
                            document.getElementById('header').innerHTML
                        ]
                    tooltip.appendChild(toolTipText)
                    tooltip.classList.add('tooltip')

                    let img = document.createElement('img')
                    img.src = '../static/img/i.svg'

                    tooltip.append(img)
                    shadeContainer.appendChild(tooltip)
                }
                shadeContainer.classList.add('shade')
                shadeContainer.setAttribute('id', item)
                document.getElementById('shades').appendChild(shadeContainer)
            }
        )
    }
}

const onClickShadeHandler = shade => {
    let element = document.getElementById(shade.target.myParam)

    if (element && !element.classList.contains('selectedShade')) {
        // showing respected products
        listAllProducts(shade.target.myParam)
        // updating Ui
        document
            .querySelectorAll('.shade')
            .forEach(item => item.classList.remove('selectedShade'))
        element.classList.add('selectedShade')
    }
}

// function to go to app

const handleOnClickcategory = val => {
    // hiding landing page and showing app
    document.getElementById('app').style.display = 'flex'
    document.getElementById('landingPage').style.display = 'none'

    document.getElementById('header').innerHTML = val
    document.getElementById(val).classList.add('borderForSidebar')

    listAllProducts()
    renderShadesOrRaces()
}

function onOpenCvReady() {
    window.onload = function () {
        page.addEventListener('click', () => {
            if (sideBar.style.display === 'block' && window.innerWidth < 786) {
                handleCloseSideBar()
            }
        })

        function myFunction(x) {
            handleOpenSideBar()
        }

        var x = window.matchMedia('(max-width: 786px)')
        myFunction(x) // Call listener function at run time
        // Attach listener function on state changes
        x.addEventListener('change', function (e) {
            myFunction(e.target)
        })

        // showing header only
        document.getElementById('app').style.display = 'none'

        // handling sidebar for mobile version
        if (window.innerWidth < 786) {
            handleCloseSideBar()
        }

        //listAllProducts();
        //renderShadesOrRaces();

        // Periodically update the race every 30 seconds
        setInterval(getPersonRace, 30000)
        var socket = io.connect(
            window.location.protocol +
                '//' +
                document.domain +
                ':' +
                location.port,
            {
                transports: ['websocket'],
            }
        )

        // Recieve race
        socket.on('race', function (race) {
            getPersonRace(race)
        })

        const video = document.getElementById('videoInput')

        console.log(video.videoWidth, video.videoHeight)

        console.log(video.width, video.height)

        var canvas = document.getElementById('canvasOutput')
        var ctx = canvas.getContext('2d')
        console.log(canvas.width, canvas.height)
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Load OpenCV asynchronously to avoid blocking the page load
        cv['onRuntimeInitialized'] = () => {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then(async stream => {
                    video.srcObject = stream
                    // await video.play()
                    video.addEventListener('loadedmetadata', async () => {
                        console.log(
                            'Loaded Video Metadata Dimensions:',
                            video.videoWidth,
                            video.videoHeight
                        )
                        //Ensure video is playing to get correct video dimensions
                        await video.play()

                        const model = await facemesh.load()

                        // Ensure we have correct dimensions
                        const videoWidth = video.videoWidth
                        const videoHeight = video.videoHeight

                        // Update canvas size to match video dimensions if needed
                        // canvas.width = videoWidth
                        // canvas.height = videoHeight

                        const cap = new cv.VideoCapture(video)
                        const src = new cv.Mat(
                            video.height,
                            video.width,
                            cv.CV_8UC4
                        )

                        async function processFrame() {
                            try {
                                cap.read(src)
                                const faces = await model.estimateFaces(video)

                                if (faces.length > 0) {
                                    const keypoints = faces[0].scaledMesh
                                    console.log('Keypoints:', keypoints)

                                    // Create and draw masks
                                    createMakeupMask(
                                        keypoints,
                                        foundation_data,
                                        src
                                    )
                                    createMakeupMask(
                                        keypoints,
                                        lipstick_data,
                                        src
                                    )
                                    createMakeupMask(
                                        keypoints,
                                        concealer_data,
                                        src
                                    )
                                    createMakeupMask(
                                        keypoints,
                                        eyeshade_data,
                                        src
                                    )
                                    createMakeupMask(keypoints, blush_data, src)
                                }

                                cv.imshow('canvasOutput', src)
                            } catch (err) {
                                console.error('Error processing frame', err)
                            }
                        }

                        setInterval(processFrame, 100)
                    })
                })
                .catch(err => {
                    console.error('Error accessing webcam: ', err)
                })
        }
    }
}
