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

const handlerClosed = (val) => {
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
        heading: "SHEER",
        colors: [
            "#FD0000",
            "#FF3B3B",
            "#FF5C5C",
            "#FD0000",
            "#FCB9B9",
            "#FFD0D0",
        ],
    },
    {
        heading: "MATTE",
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
        heading: "GLOSSY",
        colors: [
            "#FD0000",
            "#FF3B3B",
            "#FF5C5C",
            "#FD0000",
            "#FCB9B9",
            "#FFD0D0",
        ],
    },
    {
        heading: "SHEER",
        colors: [
            "#FD0000",
            "#FF3B3B",
            "#FF5C5C",
            "#FD0000",
            "#FCB9B9",
            "#FFD0D0",
        ],
    },
    {
        heading: "MATTE",
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
        heading: "GLOSSY",
        colors: [
            "#FD0000",
            "#FF3B3B",
            "#FF5C5C",
            "#FD0000",
            "#FCB9B9",
            "#FFD0D0",
        ],
    },
    {
        heading: "SHEER",
        colors: [
            "#FD0000",
            "#FF3B3B",
            "#FF5C5C",
            "#FD0000",
            "#FCB9B9",
            "#FFD0D0",
        ],
    },
    {
        heading: "MATTE",
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
        heading: "GLOSSY",
        colors: [
            "#FD0000",
            "#FF3B3B",
            "#FF5C5C",
            "#FD0000",
            "#FCB9B9",
            "#FFD0D0",
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

window.addEventListener('beforeunload', function () {
    // Send a request to stop the camera stream when the tab is being closed
    fetch('/stop_camera', { method: 'POST' });
  });

window.onload = function () {
    if (window.innerWidth < 786) {
        handleCloseSideBar()
    }

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
    for (let i = 0; i < colorShadesAiRec.length; i++) {
        let obj = colorShadesAiRec[i]
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
            colorDiv.setAttribute("id", "color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
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
                    if (obj.heading === "foundation") {
                        data = "rgb(0, 0, 0)"
                        data = data.split("rgb")
                        data = "foundation_color=" + data[1]

                        var xhttp = new XMLHttpRequest()
                        xhttp.open("POST", "/recommendation_data", true)
                        xhttp.setRequestHeader(
                            "Content-type",
                            "application/x-www-form-urlencoded"
                        )
                        xhttp.send(data)
                    } else if (obj.heading === "lipstick") {
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
                    } else if (obj.heading === "blush") {
                        data = "rgb(0, 0, 0)"
                        data = data.split("rgb")
                        data = "blush_color=" + data[1]

                        var xhttp = new XMLHttpRequest()
                        xhttp.open("POST", "/recommendation_data", true)
                        xhttp.setRequestHeader(
                            "Content-type",
                            "application/x-www-form-urlencoded"
                        )
                        xhttp.send(data)
                    } else if (obj.heading === "eye shadow") {
                        data = "rgb(0, 0, 0)"
                        data = data.split("rgb")
                        data = "eyeshadow_color=" + data[1]

                        var xhttp = new XMLHttpRequest()
                        xhttp.open("POST", "/recommendation_data", true)
                        xhttp.setRequestHeader(
                            "Content-type",
                            "application/x-www-form-urlencoded"
                        )
                        xhttp.send(data)
                    } else if (obj.heading === "concealer") {
                        data = "rgb(0, 0, 0)"
                        data = data.split("rgb")
                        data = "concealer_color=" + data[1]

                        var xhttp = new XMLHttpRequest()
                        xhttp.open("POST", "/recommendation_data", true)
                        xhttp.setRequestHeader(
                            "Content-type",
                            "application/x-www-form-urlencoded"
                        )
                        xhttp.send(data)
                    } else {
                    }

                    selectedColorsArray = selectedColorsArray.map((item) => {
                        if (item.type === "lipstick") {
                            return { type: "lipstick", color: "" }
                        } else {
                            return item
                        }
                    })
                } else {
                    colorDiv.classList.add("addborder")

                    if (obj.heading === "foundation") {
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
                    } else if (obj.heading === "lipstick") {
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
                    } else if (obj.heading === "blush") {
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
                    } else if (obj.heading === "eye shadow") {
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
                    } else if (obj.heading === "concealer") {
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
                    } else {
                    }

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
            })
            colorsDiv.appendChild(colorDiv)

            if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
                let row = document.createElement("div")
                row.classList.add("row")
                colorsDiv.appendChild(row)
            }
        }
        line.appendChild(colorsDiv)

        document.getElementById("aiRec").appendChild(line)
    }

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
            colorDiv.setAttribute("id", "color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
                document
                    .querySelectorAll("#color")
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
            colorDiv.setAttribute("id", "color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
                document
                    .querySelectorAll("#color")
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
            colorDiv.setAttribute("id", "color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
                document
                    .querySelectorAll("#color")
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
            colorDiv.setAttribute("id", "color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
                document
                    .querySelectorAll("#color")
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
            colorDiv.setAttribute("id", "color")
            colorDiv.style.backgroundColor = obj.colors[j]
            // add click event listener to each color div
            colorDiv.addEventListener("click", function () {
                document
                    .querySelectorAll("#color")
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
