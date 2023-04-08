let objects = [
  {
    heading: "SHEER",
    colors: ["#FD0000", "#FF3B3B", "#FF5C5C", "#FD0000", "#FCB9B9", "#FFD0D0"],
  },
  {
    heading: "MATTE",
    colors: ["#FE007A", "#FF3A8D", "#FF66B9", "#FC6AFF", "#FF9DEF", "#FFD0F8"],
  },
  {
    heading: "GLOSSY",
    colors: ["#FD0000", "#FF3B3B", "#FF5C5C", "#FD0000", "#FCB9B9", "#FFD0D0"],
  },
  {
    heading: "SHEER",
    colors: ["#FD0000", "#FF3B3B", "#FF5C5C", "#FD0000", "#FCB9B9", "#FFD0D0"],
  },
  {
    heading: "MATTE",
    colors: ["#FE007A", "#FF3A8D", "#FF66B9", "#FC6AFF", "#FF9DEF", "#FFD0F8"],
  },
  {
    heading: "GLOSSY",
    colors: ["#FD0000", "#FF3B3B", "#FF5C5C", "#FD0000", "#FCB9B9", "#FFD0D0"],
  },
  {
    heading: "SHEER",
    colors: ["#FD0000", "#FF3B3B", "#FF5C5C", "#FD0000", "#FCB9B9", "#FFD0D0"],
  },
  {
    heading: "MATTE",
    colors: ["#FE007A", "#FF3A8D", "#FF66B9", "#FC6AFF", "#FF9DEF", "#FFD0F8"],
  },
  {
    heading: "GLOSSY",
    colors: ["#FD0000", "#FF3B3B", "#FF5C5C", "#FD0000", "#FCB9B9", "#FFD0D0"],
  },
];

for (let i = 0; i < objects.length; i++) {
  let obj = objects[i];
  let line = document.createElement("div");
  line.classList.add("line");

  let heading = document.createElement("p");
  heading.textContent = obj.heading;
  heading.style.color = "white";
  heading.style.fontSize = "10px";
  heading.style.marginTop = "10px";
  heading.style.marginBottom = "0px";
  line.appendChild(heading);

  let colorsDiv = document.createElement("div");
  colorsDiv.style.width = "300px";
  colorsDiv.style.height = "20px";
  colorsDiv.style.display = "flex";
  colorsDiv.style.flexDirection = "row";
  colorsDiv.style.justifyContent = "center";
  colorsDiv.classList.add("colors");

  for (let j = 0; j < obj.colors.length; j++) {
    let colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = obj.colors[j];
    colorDiv.style.width = "20px";
    colorDiv.style.height = "20px";
    colorDiv.style.marginLeft = "20px";
    colorDiv.style.borderRadius = "15px";

    // add click event listener to each color div
    colorDiv.addEventListener("click", function () {
      console.log(colorDiv.style.backgroundColor);
    });

    colorsDiv.appendChild(colorDiv);

    if ((j + 1) % 6 === 0 && j !== obj.colors.length - 1) {
      let row = document.createElement("div");
      row.classList.add("row");
      colorsDiv.appendChild(row);
    }
  }

  line.appendChild(colorsDiv);

  document.body.appendChild(line);
  document.getElementById("myDiv").appendChild(line);
}
