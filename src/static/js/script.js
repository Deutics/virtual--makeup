let colorShades = [
    {
        heading: 'MATTE',
        colors: [
            '#FD0000',
            '#FF3C3C',
            '#FF5C5C',
            '#FD0000',
            '#FCB9B9',
            '#FFD0D0',
        ],
    },
    {
        heading: ' ',
        colors: [
            '#FE007A',
            '#FF3A8D',
            '#FF66B9',
            '#FC6AFF',
            '#FF9DEF',
            '#FFD0F8',
        ],
    },
    {
        heading: ' ',
        colors: [
            '#BE6D92',
            '#F13784',
            '#E952BC',
            '#AC617F',
            '#BB2A6B',
            '#E52450',
        ],
    },
    {
        heading: ' ',
        colors: [
            '#E29B97',
            '#ED979E',
            '#D28E9F',
            '#E08999',
            '#B3898B',
            '#CA769A',
        ],
    },
    {
        heading: ' ',
        colors: [
            '#CD6F89',
            '#D36290',
            '#AE4560',
            '#BE6873',
            '#C98378',
            '#E5656A',
        ],
    },
    {
        heading: ' ',
        colors: [
            '#C07564',
            '#D56563',
            '#CF6260',
            '#BE444F',
            '#E32050',
            '#D91E21',
        ],
    },
    {
        heading: ' ',
        colors: [
            '#BF202A',
            '#DD3242',
            '#DD2A3F',
            '#A42C38',
            '#8E1D23',
            '#A37072',
        ],
    },
    {
        heading: ' ',
        colors: [
            '#854D4E',
            '#73374D',
            '#832C61',
            '#881D31',
            '#E951BA',
            '#DE9894',
        ],
    },
]

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

const resetValues = [
    'lipstick_color=(0, 0, 0)',
    'concealer_color=(0, 0, 0)',
    'foundation_color=(0, 0, 0)',
    'blush_color=(0, 0, 0)',
    'eyeshadow_color=(0, 0, 0)',
]

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

const handleOpenSideBar = () => {
    document.getElementById('sideBar').style.display = 'block'
    document.getElementById('hamburger').style.display = 'none'
    document.getElementById('cross').style.display = 'block'
}
const handleCloseSideBar = () => {
    document.getElementById('sideBar').style.display = 'none'

    document.getElementById('cross').style.display = 'none'
    document.getElementById('hamburger').style.display = 'block'
}

//geting races elements
var black_race = {}
var brown_race = {}
var white_race = {}

function getPersonRace() {
    fetch('/get_person_race', { method: 'POST' })
        .then((response) => response.json())
        .then((data) => {
            console.log('race from backend', data)
            white_race.classList.remove('race-selected')
            black_race.classList.remove('race-selected')
            brown_race.classList.remove('race-selected')

            if (data.race === 'white') {
                white_race.classList.add('race-selected')
            } else if (data.race === 'black') {
                black_race.classList.add('race-selected')
            } else {
                brown_race.classList.add('race-selected')
            }
        })
}

const sideBarItemClick = (item) => {
    document.getElementById('header').innerHTML = item

    Array.prototype.forEach.call(
        document.getElementsByClassName('closed'),
        function (el) {
            // Do stuff here
            el.classList.remove('borderForSidebar')
        }
    )

    // document
    //     .getElementsByClassName('closed')
    //     .forEach((item) => item.classList.remove('borderForSidebar'))
    document.getElementById(item).classList.add('borderForSidebar')
}

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

window.onload = function () {
    if (document.getElementById('header').innerHTML === 'Header') {
        document.getElementById('header').innerHTML = 'lipstick'
        document.getElementById('lipstick').classList.add('borderForSidebar')
    }

    // declaring races
    black_race = document.getElementById('black_race')
    brown_race = document.getElementById('brown_race')
    white_race = document.getElementById('white_race')

    if (window.innerWidth < 786) {
        handleCloseSideBar()
    }

    getPersonRace()

    shades.forEach((item) => {
        let shade = document.createElement('div')
        shade.innerHTML = item
        shade.classList.add('shade')
        document.getElementById('shades').appendChild(shade)
        console.log('s')
    })

    // Periodically update every 30 seconds
    setInterval(getPersonRace, 30000)

    // lipstick
    for (let i = 0; i < colorShades.length; i++) {
        let obj = colorShades[i]
        let line = document.createElement('div')
        line.classList.add('line')

        let heading = document.createElement('p')
        heading.textContent = obj.heading

        line.appendChild(heading)

        let colorsDiv = document.createElement('div')
        colorsDiv.classList.add('colors')

        for (let j = 0; j < obj.colors.length; j++) {
            let colorDiv = document.createElement('div')
            colorDiv.classList.add('color')
            colorDiv.setAttribute('id', 'lipstick_color')
            colorDiv.style.backgroundColor = obj.colors[j]

            // add click event listener to each color div
            colorDiv.addEventListener('click', function () {
                document
                    .querySelectorAll('#lipstick_color')
                    .forEach((item) => item.classList.remove('addborder'))

                if (window.innerWidth < 786) {
                    handleCloseSideBar()
                }
                if (colorDiv.classList.contains('addborder')) {
                    colorDiv.classList.remove('addborder')

                    data = 'rgb(0, 0, 0)'
                    data = data.split('rgb')
                    data = 'lipstick_color=' + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open('POST', '/recommendation_data', true)
                    xhttp.setRequestHeader(
                        'Content-type',
                        'application/x-www-form-urlencoded'
                    )
                    xhttp.send(data)
                } else {
                    colorDiv.classList.add('addborder')

                    data = colorDiv.style.backgroundColor
                    data = data.split('rgb')
                    data = 'lipstick_color=' + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open('POST', '/recommendation_data', true)
                    xhttp.setRequestHeader(
                        'Content-type',
                        'application/x-www-form-urlencoded'
                    )
                    xhttp.send(data)
                }
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement('div')
                row.classList.add('row')
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById('lipstickShades').appendChild(line)
    }

    //foundation
    for (let i = 0; i < colorShades.length; i++) {
        let obj = colorShades[i]
        let line = document.createElement('div')
        line.classList.add('line')

        let heading = document.createElement('p')
        heading.textContent = obj.heading
        line.appendChild(heading)

        let colorsDiv = document.createElement('div')
        colorsDiv.classList.add('colors')

        for (let j = 0; j < obj.colors.length; j++) {
            let colorDiv = document.createElement('div')
            colorDiv.classList.add('color')
            colorDiv.setAttribute('id', 'foundation_color')
            colorDiv.style.backgroundColor = obj.colors[j]

            // add click event listener to each color div
            colorDiv.addEventListener('click', function () {
                document
                    .querySelectorAll('#foundation_color')
                    .forEach((item) => item.classList.remove('addborder'))

                if (window.innerWidth < 786) {
                    handleCloseSideBar()
                }
                if (colorDiv.classList.contains('addborder')) {
                    colorDiv.classList.remove('addborder')

                    data = 'rgb(0, 0, 0)'
                    data = data.split('rgb')
                    data = 'lipstick_color=' + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open('POST', '/recommendation_data', true)
                    xhttp.setRequestHeader(
                        'Content-type',
                        'application/x-www-form-urlencoded'
                    )
                    xhttp.send(data)
                } else {
                    colorDiv.classList.add('addborder')
                }
                data = colorDiv.style.backgroundColor
                data = data.split('rgb')
                data = 'foundation_color=' + data[1]

                var xhttp = new XMLHttpRequest()
                xhttp.open('POST', '/recommendation_data', true)
                xhttp.setRequestHeader(
                    'Content-type',
                    'application/x-www-form-urlencoded'
                )
                xhttp.send(data)
                //
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement('div')
                row.classList.add('row')
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById('foundationShades').appendChild(line)
    }

    // blush
    for (let i = 0; i < colorShades.length; i++) {
        let obj = colorShades[i]
        let line = document.createElement('div')
        line.classList.add('line')

        let heading = document.createElement('p')
        heading.textContent = obj.heading
        line.appendChild(heading)

        let colorsDiv = document.createElement('div')
        colorsDiv.classList.add('colors')

        for (let j = 0; j < obj.colors.length; j++) {
            let colorDiv = document.createElement('div')
            colorDiv.classList.add('color')
            colorDiv.setAttribute('id', 'blush_color')
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener('click', function () {
                document
                    .querySelectorAll('#blush_color')
                    .forEach((item) => item.classList.remove('addborder'))

                if (window.innerWidth < 786) {
                    handleCloseSideBar()
                }
                if (colorDiv.classList.contains('addborder')) {
                    colorDiv.classList.remove('addborder')

                    data = 'rgb(0, 0, 0)'
                    data = data.split('rgb')
                    data = 'lipstick_color=' + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open('POST', '/recommendation_data', true)
                    xhttp.setRequestHeader(
                        'Content-type',
                        'application/x-www-form-urlencoded'
                    )
                    xhttp.send(data)
                } else {
                    colorDiv.classList.add('addborder')
                }
                data = colorDiv.style.backgroundColor
                data = data.split('rgb')
                data = 'blush_color=' + data[1]

                var xhttp = new XMLHttpRequest()
                xhttp.open('POST', '/recommendation_data', true)
                xhttp.setRequestHeader(
                    'Content-type',
                    'application/x-www-form-urlencoded'
                )
                xhttp.send(data)
                //
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement('div')
                row.classList.add('row')
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById('blushShades').appendChild(line)
    }

    //concealor
    for (let i = 0; i < colorShades.length; i++) {
        let obj = colorShades[i]
        let line = document.createElement('div')
        line.classList.add('line')

        let heading = document.createElement('p')
        heading.textContent = obj.heading
        line.appendChild(heading)

        let colorsDiv = document.createElement('div')
        colorsDiv.classList.add('colors')

        for (let j = 0; j < obj.colors.length; j++) {
            let colorDiv = document.createElement('div')
            colorDiv.classList.add('color')
            colorDiv.setAttribute('id', 'concealer_color')
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener('click', function () {
                document
                    .querySelectorAll('#concealer_color')
                    .forEach((item) => item.classList.remove('addborder'))

                if (window.innerWidth < 786) {
                    handleCloseSideBar()
                }
                if (colorDiv.classList.contains('addborder')) {
                    colorDiv.classList.remove('addborder')

                    data = 'rgb(0, 0, 0)'
                    data = data.split('rgb')
                    data = 'lipstick_color=' + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open('POST', '/recommendation_data', true)
                    xhttp.setRequestHeader(
                        'Content-type',
                        'application/x-www-form-urlencoded'
                    )
                    xhttp.send(data)
                } else {
                    colorDiv.classList.add('addborder')
                }
                data = colorDiv.style.backgroundColor
                data = data.split('rgb')
                data = 'concealer_color=' + data[1]

                var xhttp = new XMLHttpRequest()
                xhttp.open('POST', '/recommendation_data', true)
                xhttp.setRequestHeader(
                    'Content-type',
                    'application/x-www-form-urlencoded'
                )
                xhttp.send(data)
                //
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement('div')
                row.classList.add('row')
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById('concealerShades').appendChild(line)
    }

    //eyeshadow
    for (let i = 0; i < colorShades.length; i++) {
        let obj = colorShades[i]
        let line = document.createElement('div')
        line.classList.add('line')

        let heading = document.createElement('p')
        heading.textContent = obj.heading
        line.appendChild(heading)

        let colorsDiv = document.createElement('div')
        colorsDiv.classList.add('colors')

        for (let j = 0; j < obj.colors.length; j++) {
            let colorDiv = document.createElement('div')
            colorDiv.classList.add('color')
            colorDiv.setAttribute('id', 'eyeshadow_color')
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener('click', function () {
                document
                    .querySelectorAll('#eyeshadow_color')
                    .forEach((item) => item.classList.remove('addborder'))

                if (window.innerWidth < 786) {
                    handleCloseSideBar()
                }
                if (colorDiv.classList.contains('addborder')) {
                    colorDiv.classList.remove('addborder')

                    data = 'rgb(0, 0, 0)'
                    data = data.split('rgb')
                    data = 'lipstick_color=' + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open('POST', '/recommendation_data', true)
                    xhttp.setRequestHeader(
                        'Content-type',
                        'application/x-www-form-urlencoded'
                    )
                    xhttp.send(data)
                } else {
                    colorDiv.classList.add('addborder')
                }
                data = colorDiv.style.backgroundColor
                data = data.split('rgb')
                data = 'eyeshadow_color=' + data[1]

                var xhttp = new XMLHttpRequest()
                xhttp.open('POST', '/recommendation_data', true)
                xhttp.setRequestHeader(
                    'Content-type',
                    'application/x-www-form-urlencoded'
                )

                xhttp.send(data)
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement('div')
                row.classList.add('row')
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById('eyeShadowShades').appendChild(line)
    }
    var socket = io.connect(
        window.location.protocol + '//' + document.domain + ':' + location.port,
        {
            transports: ['websocket'],
        }
    )
    socket.on('connect', function () {
        console.log('Connected...!', socket.connected)
    })
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')

    const video = document.querySelector('#videoElement')

    video.width = '1'
    video.height = '1'

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

    setInterval(() => {
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        context.drawImage(video, 0, 0)
        var data = canvas.toDataURL('image/jpeg', 0.5)
        context.clearRect(0, 0, video.videoWidth, video.videoHeight)
        socket.emit('image', data)
    }, 100)

    socket.on('processed_image', function (image) {
        photo.setAttribute('src', image)
    })
}
