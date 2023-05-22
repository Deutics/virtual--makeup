const arrExpanded = [
    "expanded1",
    "expanded2",
    "expanded3",
    "expanded4",
    "expanded5",
    "expanded6",
]

const arrClosed = [
    "closed1",
    "closed2",
    "closed3",
    "closed4",
    "closed5",
    "closed6",
]

const handlerClosed = async (val) => {
    arrExpanded.forEach((item, i) => {
        document.getElementById(item).style.display = "none"
    })

    arrClosed.forEach((item, i) => {
        document.getElementById(item).style.display = "flex"
        document.getElementById(item).style.height = "6vh"
        document.getElementById(item).style.fontSize = "15px"
    })

    document.getElementById(`closed${val}`).style.display = "none"

    document.getElementById(`expanded${val}`).style.display = "flex"

    if (val === 6) {
        console.log("starting ai")
        await fetch("/start_ai", { method: "POST" })
    }
}

const handleOpenSideBar = () => {
    document.getElementById("sideBar").style.display = "block"
    document.getElementById("hamburger").style.display = "none"
    document.getElementById("cross").style.display = "block"
}
const handleCloseSideBar = () => {
    document.getElementById("sideBar").style.display = "none"

    document.getElementById("cross").style.display = "none"
    document.getElementById("hamburger").style.display = "block"
}

let colorShades = [
    {
        heading: "MATTE",
        colors: [
            "#FD0000",
            "#FF3C3C",
            "#FF5C5C",
            "#FD0000",
            "#FCB9B9",
            "#FFD0D0",
        ],
    },
    {
        heading: " ",
        colors: [
            "#FE007A",
            "#FF3A8D",
            "#FF66B9",
            "#FC6AFF",
            "#FF9DEF",
            "#FFD0F8",
        ],
    },
    {
        heading: " ",
        colors: [
            "#BE6D92",
            "#F13784",
            "#E952BC",
            "#AC617F",
            "#BB2A6B",
            "#E52450",
        ],
    },
    {
        heading: " ",
        colors: [
            "#E29B97",
            "#ED979E",
            "#D28E9F",
            "#E08999",
            "#B3898B",
            "#CA769A",
        ],
    },
    {
        heading: " ",
        colors: [
            "#CD6F89",
            "#D36290",
            "#AE4560",
            "#BE6873",
            "#C98378",
            "#E5656A",
        ],
    },
    {
        heading: " ",
        colors: [
            "#C07564",
            "#D56563",
            "#CF6260",
            "#BE444F",
            "#E32050",
            "#D91E21",
        ],
    },
    {
        heading: " ",
        colors: [
            "#BF202A",
            "#DD3242",
            "#DD2A3F",
            "#A42C38",
            "#8E1D23",
            "#A37072",
        ],
    },
    {
        heading: " ",
        colors: [
            "#854D4E",
            "#73374D",
            "#832C61",
            "#881D31",
            "#E951BA",
            "#DE9894",
        ],
    },
]

let colorShadesAiRec = [
    {
        heading: "foundation",
        colors: ["#FD0000"],
    },
    {
        heading: "eye shadow",
        colors: ["#FE007A"],
    },
    {
        heading: "concealer",
        colors: ["#FD0000"],
    },
    {
        heading: "blush",
        colors: ["#FD0000"],
    },
    {
        heading: "lipstick",
        colors: ["#FE007A"],
    },
]

let selectedColorsArray = [
    { type: "lipstick", color: "#FD0000" },
    { type: "foundation", color: "#FD0000" },
    { type: "eyeShadow", color: "#FD0000" },
    { type: "blush", color: "#FD0000" },
    { type: "concealer", color: "#FD0000" },
]

const resetValues = [
    "lipstick_color=(0, 0, 0)",
    "concealer_color=(0, 0, 0)",
    "foundation_color=(0, 0, 0)",
    "blush_color=(0, 0, 0)",
    "eyeshadow_color=(0, 0, 0)",
]

const reset = () => {
    resetValues.forEach((item) => {
        var xhttp = new XMLHttpRequest()
        xhttp.open("POST", "/recommendation_data", true)
        xhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        )
        xhttp.send(item)
    })
    document
        .querySelectorAll("#color")
        .forEach((item) => item.classList.remove("addborder"))
}

//geting races elements
var black_race = {}
var brown_race = {}
var white_race = {}

// Wahab Edit

function getPersonRace() {
    fetch("/get_person_race", { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
            console.log("race from backend", data)
            white_race.classList.remove("race-selected")
            black_race.classList.remove("race-selected")
            brown_race.classList.remove("race-selected")

            if (data.race === "white") {
                white_race.classList.add("race-selected")
            } else if (data.race === "black") {
                black_race.classList.add("race-selected")
            } else {
                brown_race.classList.add("race-selected")
            }
        })
}

window.onload = function () {
    // declaring races
    black_race = document.getElementById("black_race")
    brown_race = document.getElementById("brown_race")
    white_race = document.getElementById("white_race")

    if (window.innerWidth < 786) {
        handleCloseSideBar()
    }

    getPersonRace()

    // Periodically update every 30 seconds
    setInterval(getPersonRace, 30000)

    let selectedColors = document.getElementById("selectedColors")
    for (let i = 0; i < selectedColorsArray.length; i++) {
        let item = document.createElement("div")
        item.classList.add("selectedColors_item")

        let itemName = document.createElement("div")
        let itemColor = document.createElement("div")
        itemColor.style.backgroundColor = selectedColorsArray[i].color
        itemColor.classList.add("selectedColors_item_color")

        itemName.textContent = selectedColorsArray[i].type
        item.appendChild(itemName)
        item.appendChild(itemColor)

        selectedColors.appendChild(item)
    }

    // ai
    // for (let i = 0; i < colorShadesAiRec.length; i++) {
    //     let obj = colorShadesAiRec[i]
    //     let line = document.createElement("div")
    //     line.classList.add("line")

    //     let heading = document.createElement("p")
    //     heading.textContent = obj.heading
    //     line.appendChild(heading)

    //     let colorsDiv = document.createElement("div")
    //     colorsDiv.classList.add("colors")

    //     for (let j = 0; j < obj.colors.length; j++) {
    //         let colorDiv = document.createElement("div")
    //         colorDiv.classList.add("color")
    //         colorDiv.setAttribute("id", "color")
    //         colorDiv.style.backgroundColor = obj.colors[j]
    //         // add click event listener to each color div
    //         colorDiv.addEventListener("click", function () {
    //             if (window.innerWidth < 786) {
    //                 handleCloseSideBar()
    //             }
    //             if (colorDiv.classList.contains("addborder")) {
    //                 colorDiv.classList.remove("addborder")

    //                 data = "rgb(0, 0, 0)"
    //                 data = data.split("rgb")
    //                 data = "lipstick_color=" + data[1]

    //                 var xhttp = new XMLHttpRequest()
    //                 xhttp.open("POST", "/recommendation_data", true)
    //                 xhttp.setRequestHeader(
    //                     "Content-type",
    //                     "application/x-www-form-urlencoded"
    //                 )
    //                 xhttp.send(data)
    //                 if (obj.heading === "foundation") {
    //                     data = "rgb(0, 0, 0)"
    //                     data = data.split("rgb")
    //                     data = "foundation_color=" + data[1]

    //                     var xhttp = new XMLHttpRequest()
    //                     xhttp.open("POST", "/recommendation_data", true)
    //                     xhttp.setRequestHeader(
    //                         "Content-type",
    //                         "application/x-www-form-urlencoded"
    //                     )
    //                     xhttp.send(data)
    //                 } else if (obj.heading === "lipstick") {
    //                     data = "rgb(0, 0, 0)"
    //                     data = data.split("rgb")
    //                     data = "lipstick_color=" + data[1]

    //                     var xhttp = new XMLHttpRequest()
    //                     xhttp.open("POST", "/recommendation_data", true)
    //                     xhttp.setRequestHeader(
    //                         "Content-type",
    //                         "application/x-www-form-urlencoded"
    //                     )
    //                     xhttp.send(data)
    //                 } else if (obj.heading === "blush") {
    //                     data = "rgb(0, 0, 0)"
    //                     data = data.split("rgb")
    //                     data = "blush_color=" + data[1]

    //                     var xhttp = new XMLHttpRequest()
    //                     xhttp.open("POST", "/recommendation_data", true)
    //                     xhttp.setRequestHeader(
    //                         "Content-type",
    //                         "application/x-www-form-urlencoded"
    //                     )
    //                     xhttp.send(data)
    //                 } else if (obj.heading === "eye shadow") {
    //                     data = "rgb(0, 0, 0)"
    //                     data = data.split("rgb")
    //                     data = "eyeshadow_color=" + data[1]

    //                     var xhttp = new XMLHttpRequest()
    //                     xhttp.open("POST", "/recommendation_data", true)
    //                     xhttp.setRequestHeader(
    //                         "Content-type",
    //                         "application/x-www-form-urlencoded"
    //                     )
    //                     xhttp.send(data)
    //                 } else if (obj.heading === "concealer") {
    //                     data = "rgb(0, 0, 0)"
    //                     data = data.split("rgb")
    //                     data = "concealer_color=" + data[1]

    //                     var xhttp = new XMLHttpRequest()
    //                     xhttp.open("POST", "/recommendation_data", true)
    //                     xhttp.setRequestHeader(
    //                         "Content-type",
    //                         "application/x-www-form-urlencoded"
    //                     )
    //                     xhttp.send(data)
    //                 } else {
    //                 }

    //                 selectedColorsArray = selectedColorsArray.map((item) => {
    //                     if (item.type === "lipstick") {
    //                         return { type: "lipstick", color: "" }
    //                     } else {
    //                         return item
    //                     }
    //                 })
    //             } else {
    //                 colorDiv.classList.add("addborder")

    //                 if (obj.heading === "foundation") {
    //                     data = colorDiv.style.backgroundColor
    //                     data = data.split("rgb")
    //                     data = "foundation_color=" + data[1]

    //                     var xhttp = new XMLHttpRequest()
    //                     xhttp.open("POST", "/recommendation_data", true)
    //                     xhttp.setRequestHeader(
    //                         "Content-type",
    //                         "application/x-www-form-urlencoded"
    //                     )
    //                     xhttp.send(data)
    //                 } else if (obj.heading === "lipstick") {
    //                     data = colorDiv.style.backgroundColor
    //                     data = data.split("rgb")
    //                     data = "lipstick_color=" + data[1]

    //                     var xhttp = new XMLHttpRequest()
    //                     xhttp.open("POST", "/recommendation_data", true)
    //                     xhttp.setRequestHeader(
    //                         "Content-type",
    //                         "application/x-www-form-urlencoded"
    //                     )
    //                     xhttp.send(data)
    //                 } else if (obj.heading === "blush") {
    //                     data = colorDiv.style.backgroundColor
    //                     data = data.split("rgb")
    //                     data = "blush_color=" + data[1]

    //                     var xhttp = new XMLHttpRequest()
    //                     xhttp.open("POST", "/recommendation_data", true)
    //                     xhttp.setRequestHeader(
    //                         "Content-type",
    //                         "application/x-www-form-urlencoded"
    //                     )
    //                     xhttp.send(data)
    //                 } else if (obj.heading === "eye shadow") {
    //                     data = colorDiv.style.backgroundColor
    //                     data = data.split("rgb")
    //                     data = "eyeshadow_color=" + data[1]

    //                     var xhttp = new XMLHttpRequest()
    //                     xhttp.open("POST", "/recommendation_data", true)
    //                     xhttp.setRequestHeader(
    //                         "Content-type",
    //                         "application/x-www-form-urlencoded"
    //                     )
    //                     xhttp.send(data)
    //                 } else if (obj.heading === "concealer") {
    //                     data = colorDiv.style.backgroundColor
    //                     data = data.split("rgb")
    //                     data = "concealer_color=" + data[1]

    //                     var xhttp = new XMLHttpRequest()
    //                     xhttp.open("POST", "/recommendation_data", true)
    //                     xhttp.setRequestHeader(
    //                         "Content-type",
    //                         "application/x-www-form-urlencoded"
    //                     )
    //                     xhttp.send(data)
    //                 } else {
    //                 }

    //                 selectedColorsArray = selectedColorsArray.map((item) => {
    //                     if (item.type === "lipstick") {
    //                         return {
    //                             type: "lipstick",
    //                             color: colorDiv.style.backgroundColor,
    //                         }
    //                     } else {
    //                         return item
    //                     }
    //                 })
    //             }
    //         })
    //         colorsDiv.appendChild(colorDiv)

    //         if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
    //             let row = document.createElement("div")
    //             row.classList.add("row")
    //             colorsDiv.appendChild(row)
    //         }
    //     }
    //     line.appendChild(colorsDiv)

    //     document.getElementById("aiRec").appendChild(line)
    // }

    // lipstick
    for (let i = 0; i < colorShades.length; i++) {
        let obj = colorShades[i]
        let line = document.createElement("div")
        line.classList.add("line")

        let heading = document.createElement("p")
        heading.textContent = obj.heading

        line.appendChild(heading)

        let colorsDiv = document.createElement("div")
        colorsDiv.classList.add("colors")

        for (let j = 0; j < obj.colors.length; j++) {
            let colorDiv = document.createElement("div")
            colorDiv.classList.add("color")
            colorDiv.setAttribute("id", "lipstick_color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
                document
                    .querySelectorAll("#lipstick_color")
                    .forEach((item) => item.classList.remove("addborder"))

                if (window.innerWidth < 786) {
                    handleCloseSideBar()
                }
                if (colorDiv.classList.contains("addborder")) {
                    colorDiv.classList.remove("addborder")

                    data = "rgb(0, 0, 0)"
                    data = data.split("rgb")
                    data = "lipstick_color=" + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open("POST", "/recommendation_data", true)
                    xhttp.setRequestHeader(
                        "Content-type",
                        "application/x-www-form-urlencoded"
                    )
                    xhttp.send(data)
                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return { type: "lipstick", color: "" }
                        } else {
                            return item
                        }
                    })
                } else {
                    colorDiv.classList.add("addborder")
                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return {
                                type: "lipstick",
                                color: colorDiv.style.backgroundColor,
                            }
                        } else {
                            return item
                        }
                    })

                    data = colorDiv.style.backgroundColor
                    data = data.split("rgb")
                    data = "lipstick_color=" + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open("POST", "/recommendation_data", true)
                    xhttp.setRequestHeader(
                        "Content-type",
                        "application/x-www-form-urlencoded"
                    )
                    xhttp.send(data)
                }
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement("div")
                row.classList.add("row")
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById("lipstickShades").appendChild(line)
    }

    //foundation
    for (let i = 0; i < colorShades.length; i++) {
        let obj = colorShades[i]
        let line = document.createElement("div")
        line.classList.add("line")

        let heading = document.createElement("p")
        heading.textContent = obj.heading
        line.appendChild(heading)

        let colorsDiv = document.createElement("div")
        colorsDiv.classList.add("colors")

        for (let j = 0; j < obj.colors.length; j++) {
            let colorDiv = document.createElement("div")
            colorDiv.classList.add("color")
            colorDiv.setAttribute("id", "foundation_color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
                document
                    .querySelectorAll("#foundation_color")
                    .forEach((item) => item.classList.remove("addborder"))

                if (window.innerWidth < 786) {
                    handleCloseSideBar()
                }
                if (colorDiv.classList.contains("addborder")) {
                    colorDiv.classList.remove("addborder")

                    data = "rgb(0, 0, 0)"
                    data = data.split("rgb")
                    data = "lipstick_color=" + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open("POST", "/recommendation_data", true)
                    xhttp.setRequestHeader(
                        "Content-type",
                        "application/x-www-form-urlencoded"
                    )
                    xhttp.send(data)
                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return { type: "lipstick", color: "" }
                        } else {
                            return item
                        }
                    })
                } else {
                    colorDiv.classList.add("addborder")
                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return {
                                type: "lipstick",
                                color: colorDiv.style.backgroundColor,
                            }
                        } else {
                            return item
                        }
                    })
                }
                data = colorDiv.style.backgroundColor
                data = data.split("rgb")
                data = "foundation_color=" + data[1]

                var xhttp = new XMLHttpRequest()
                xhttp.open("POST", "/recommendation_data", true)
                xhttp.setRequestHeader(
                    "Content-type",
                    "application/x-www-form-urlencoded"
                )
                xhttp.send(data)
                //
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement("div")
                row.classList.add("row")
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById("foundationShades").appendChild(line)
    }

    // blush
    for (let i = 0; i < colorShades.length; i++) {
        let obj = colorShades[i]
        let line = document.createElement("div")
        line.classList.add("line")

        let heading = document.createElement("p")
        heading.textContent = obj.heading
        line.appendChild(heading)

        let colorsDiv = document.createElement("div")
        colorsDiv.classList.add("colors")

        for (let j = 0; j < obj.colors.length; j++) {
            let colorDiv = document.createElement("div")
            colorDiv.classList.add("color")
            colorDiv.setAttribute("id", "blush_color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
                document
                    .querySelectorAll("#blush_color§")
                    .forEach((item) => item.classList.remove("addborder"))

                if (window.innerWidth < 786) {
                    handleCloseSideBar()
                }
                if (colorDiv.classList.contains("addborder")) {
                    colorDiv.classList.remove("addborder")

                    data = "rgb(0, 0, 0)"
                    data = data.split("rgb")
                    data = "lipstick_color=" + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open("POST", "/recommendation_data", true)
                    xhttp.setRequestHeader(
                        "Content-type",
                        "application/x-www-form-urlencoded"
                    )
                    xhttp.send(data)
                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return { type: "lipstick", color: "" }
                        } else {
                            return item
                        }
                    })
                } else {
                    colorDiv.classList.add("addborder")
                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return {
                                type: "lipstick",
                                color: colorDiv.style.backgroundColor,
                            }
                        } else {
                            return item
                        }
                    })
                }
                data = colorDiv.style.backgroundColor
                data = data.split("rgb")
                data = "blush_color=" + data[1]

                var xhttp = new XMLHttpRequest()
                xhttp.open("POST", "/recommendation_data", true)
                xhttp.setRequestHeader(
                    "Content-type",
                    "application/x-www-form-urlencoded"
                )
                xhttp.send(data)
                //
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement("div")
                row.classList.add("row")
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById("blushShades").appendChild(line)
    }

    //concealor
    for (let i = 0; i < colorShades.length; i++) {
        let obj = colorShades[i]
        let line = document.createElement("div")
        line.classList.add("line")

        let heading = document.createElement("p")
        heading.textContent = obj.heading
        line.appendChild(heading)

        let colorsDiv = document.createElement("div")
        colorsDiv.classList.add("colors")

        for (let j = 0; j < obj.colors.length; j++) {
            let colorDiv = document.createElement("div")
            colorDiv.classList.add("color")
            colorDiv.setAttribute("id", "concealer_color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
                document
                    .querySelectorAll("#concealer_color")
                    .forEach((item) => item.classList.remove("addborder"))

                if (window.innerWidth < 786) {
                    handleCloseSideBar()
                }
                if (colorDiv.classList.contains("addborder")) {
                    colorDiv.classList.remove("addborder")

                    data = "rgb(0, 0, 0)"
                    data = data.split("rgb")
                    data = "lipstick_color=" + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open("POST", "/recommendation_data", true)
                    xhttp.setRequestHeader(
                        "Content-type",
                        "application/x-www-form-urlencoded"
                    )
                    xhttp.send(data)
                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return { type: "lipstick", color: "" }
                        } else {
                            return item
                        }
                    })
                } else {
                    colorDiv.classList.add("addborder")
                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return {
                                type: "lipstick",
                                color: colorDiv.style.backgroundColor,
                            }
                        } else {
                            return item
                        }
                    })
                }
                data = colorDiv.style.backgroundColor
                data = data.split("rgb")
                data = "concealer_color=" + data[1]

                var xhttp = new XMLHttpRequest()
                xhttp.open("POST", "/recommendation_data", true)
                xhttp.setRequestHeader(
                    "Content-type",
                    "application/x-www-form-urlencoded"
                )
                xhttp.send(data)
                //
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement("div")
                row.classList.add("row")
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById("concealerShades").appendChild(line)
    }

    //eyeshadow
    for (let i = 0; i < colorShades.length; i++) {
        let obj = colorShades[i]
        let line = document.createElement("div")
        line.classList.add("line")

        let heading = document.createElement("p")
        heading.textContent = obj.heading
        line.appendChild(heading)

        let colorsDiv = document.createElement("div")
        colorsDiv.classList.add("colors")

        for (let j = 0; j < obj.colors.length; j++) {
            let colorDiv = document.createElement("div")
            colorDiv.classList.add("color")
            colorDiv.setAttribute("id", "eyeshadow_color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
                document
                    .querySelectorAll("#eyeshadow_color")
                    .forEach((item) => item.classList.remove("addborder"))

                if (window.innerWidth < 786) {
                    handleCloseSideBar()
                }
                if (colorDiv.classList.contains("addborder")) {
                    colorDiv.classList.remove("addborder")

                    data = "rgb(0, 0, 0)"
                    data = data.split("rgb")
                    data = "lipstick_color=" + data[1]

                    var xhttp = new XMLHttpRequest()
                    xhttp.open("POST", "/recommendation_data", true)
                    xhttp.setRequestHeader(
                        "Content-type",
                        "application/x-www-form-urlencoded"
                    )
                    xhttp.send(data)
                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return { type: "lipstick", color: "" }
                        } else {
                            return item
                        }
                    })
                } else {
                    colorDiv.classList.add("addborder")
                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return {
                                type: "lipstick",
                                color: colorDiv.style.backgroundColor,
                            }
                        } else {
                            return item
                        }
                    })
                }
                data = colorDiv.style.backgroundColor
                data = data.split("rgb")
                data = "eyeshadow_color=" + data[1]

                var xhttp = new XMLHttpRequest()
                xhttp.open("POST", "/recommendation_data", true)
                xhttp.setRequestHeader(
                    "Content-type",
                    "application/x-www-form-urlencoded"
                )

                xhttp.send(data)
                // 4. This will be called after the response is received

                //
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement("div")
                row.classList.add("row")
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById("eyeShadowShades").appendChild(line)
    }
}
