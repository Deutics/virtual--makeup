const lisptickMate = [
  {
    id: 1,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 2,
    img: "/Images/lipstik/lipstik_img4.svg",
    icon: "/Images/lipstik/lipstick_img3_color.svg",
    title: "Rouge Refillable Lipstock",
    content: "Buildable lip colour with a blurred, soft-focus effect",
    price: "$200",
  },
  {
    id: 3,
    img: "/Images/lipstik/lipstik_img2.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Matte Refillable Lipstick ",
    content: "Transfer-resistant, matte lipstick ",
    price: "$200",
  },
  {
    id: 4,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Velvet Matte Lipstick",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 5,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 6,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Kind Words Matte Lipstick",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 7,
    img: "/Images/lipstik/lipstik_img3.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 8,
    img: "/Images/lipstik/lipstik_img2.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Kind Words Matte Lipstick",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 9,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Velvet Matte Lipstick",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
];

function showSection(sectionId, button) {
  // Hide all sections
  const sections = document.querySelectorAll(".MainContianer");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Remove the "selected" class from all buttons
  const buttons = document.querySelectorAll(".Sidebar_InnerContainer a");
  buttons.forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "block";
    localStorage.setItem("selectedSection", sectionId);
  }

  // Add the "selected" class to the clicked button
  if (button) {
    button.classList.add("selected");
    localStorage.setItem("selectedButton", button.getAttribute("href"));
  }
}
// Store the selectd section and button in local storage
const storedSection = localStorage.getItem("selectedSection");
const storedButton = localStorage.getItem("selectedButton");

if (storedSection) {
  showSection(storedSection);
}

// Restore the selected buttons border after the page is refreshed
if (storedButton) {
  const buttons = document.querySelectorAll(".Sidebar_InnerContainer a");
  buttons.forEach((btn) => {
    if (btn.getAttribute("href") === storedButton) {
      btn.classList.add("selected");
    }
  });
}

function showLipstickSection(sectionId, button, element) {
  // Hide all sections
  const sections = document.querySelectorAll(".LipstickContent");
  sections.forEach((section) => {
    section.style.display = "none";
  });
  const sections2 = document.querySelectorAll(".LipstickContent");
  sections2.forEach((section) => {
    section.style.display = "none";
  });

  // Remove the "selected" class from all buttons
  const buttons = document.querySelectorAll(".LipstickContainerCategories a");
  buttons.forEach((btn) => {
    btn.classList.remove("selectedlipstick");
  });

  // Show the selected section
  const selectedSectionlipstick = document.getElementById(sectionId);
  if (selectedSectionlipstick) {
    selectedSectionlipstick.style.display = "flex";

    localStorage.setItem("selectedSectionlipstick", sectionId);
  }

  // Add the "selected" class to the clicked button
  if (button) {
    button.classList.add("selectedlipstick");
    localStorage.setItem("selectedButtonlipstick", button.getAttribute("href"));
  }
}

// Store the selectd section and button in local storage
const storedSectionlipstick = localStorage.getItem("selectedSectionlipstick");
const storedButtonlipstick = localStorage.getItem("selectedButtonlipstick");

if (storedSectionlipstick) {
  showLipstickSection(storedSectionlipstick);
}

// Restore the selected buttons border after the page is refreshed
if (storedButtonlipstick) {
  const buttons = document.querySelectorAll(".LipstickContainerCategories a");
  buttons.forEach((btn) => {
    if (btn.getAttribute("href") === storedButtonlipstick) {
      btn.classList.add("selectedlipstick");
    }
  });
}

// Helper function to display the selected lipstick in the addToCart section
function displaySelectedLipstick(img, icon, title, price, index) {
  const addToCartSection = document.querySelector(".addToCart");

  // Create a new div to hold each selected lipstick
  const selectedLipstickDiv = document.createElement("div");
  selectedLipstickDiv.classList.add("selectedLipstickInfo");

  // Populate the div with the selected lipstick data
  selectedLipstickDiv.innerHTML = `
    <div class="lipstickInfo">
      <img class="addToCartImg" src="${img}" />
      <img class="addToCartIcon" src="${icon}" />
      <h4>${title}</h4>
      <p>${price}</p>
      <div class="deleteButton" data-index="${index}"><img class="delete_icon" src="/Images/Icons/detele_Icon.svg" /></div>
      </div>
     
  `;

  const deleteButton = selectedLipstickDiv.querySelector(".deleteButton");
  deleteButton.addEventListener("click", () => {
    // Get the index of the selected lipstick from the data-index attribute
    const indexToRemove = parseInt(deleteButton.getAttribute("data-index"), 10);

    // Call the function to remove the selected lipstick from the array and update the display
    removeSelectedLipstick(selectedLipstickDiv, indexToRemove);
  });

  // Append the div to the addToCartSection
  addToCartSection.appendChild(selectedLipstickDiv);
}
let selectedLipsticksArray = [];

function removeSelectedLipstick(selectedLipstickDiv, indexToRemove) {
  const addToCartSection = document.querySelector(".addToCart");

  // Remove the selected lipstick div from the addToCartSection
  addToCartSection.removeChild(selectedLipstickDiv);

  // Remove the selected lipstick from the array
  selectedLipsticksArray.splice(indexToRemove, 1);

  // Update the stored array in localStorage
  localStorage.setItem(
    "selectedLipsticks",
    JSON.stringify(selectedLipsticksArray)
  );
}

function handleLipstickImageClick(img, icon, title, price) {
  // Clear local storage and the UI if a lipstick is already selected
  if (selectedLipsticksArray.length > 0) {
    selectedLipsticksArray = [];
    const addToCartSection = document.querySelector(".addToCart");
    addToCartSection.innerHTML = "";
    localStorage.removeItem("selectedLipsticks"); // Clear local storage
  }

  // Call the function to display the selected lipstick in the addToCart section
  displaySelectedLipstick(
    img,
    icon,
    title,
    price,
    selectedLipsticksArray.length
  );

  // Add the selected lipstick data to the array
  const selectedLipstickData = {
    img: img,
    icon: icon,
    title: title,
    price: price,
  };
  selectedLipsticksArray.push(selectedLipstickData);

  // Store the updated array in localStorage
  localStorage.setItem(
    "selectedLipsticks",
    JSON.stringify(selectedLipsticksArray)
  );
}

function displaySelectedLipstickOnLoad() {
  // Retrieve the selected lipsticks from localStorage
  const storedLipsticks = localStorage.getItem("selectedLipsticks");
  if (storedLipsticks) {
    selectedLipsticksArray = JSON.parse(storedLipsticks);

    // Display each selected lipstick in the addToCart section
    selectedLipsticksArray.forEach((lipstickData, index) => {
      displaySelectedLipstick(
        lipstickData.img,
        lipstickData.icon,
        lipstickData.title,
        lipstickData.price,
        index
      );
    });
  }
}

// Call the function on page load to display the stored lipsticks
displaySelectedLipstickOnLoad();

function generateMateLipstickContent() {
  const mateLipstickContainer = document.getElementById("mate");

  const mateLipstickHTML = lisptickMate
    .map(
      (item) => `
    <div class="lipstickItem"  
    onclick="handleLipstickImageClick( '${item.img}',
    '${item.icon}', '${item.title}', '${item.price}')" >
      <img class="img" src=${item.img} />
      <img class="icon" src="${item.icon}"/>
      <h3>${item.title}</h3>
      <p>${item.content}</p>
    </div>
  `
    )
    .join("");

  mateLipstickContainer.innerHTML = mateLipstickHTML;
}

generateMateLipstickContent();

function showScrollOnHover() {
  const lipstickContainer = document.querySelector(
    ".LipstickContainerCategories"
  );
  const screenSizeThreshold = 1280;

  function updateScrollOnHover() {
    if (window.innerWidth <= screenSizeThreshold) {
      lipstickContainer.style.overflowX = "scroll";
    } else {
      lipstickContainer.style.overflowX = "hidden";
    }
  }

  updateScrollOnHover();

  // Update scroll on window resize
  window.addEventListener("resize", updateScrollOnHover);
}

function showScrollOnHovermate() {
  const contentlipstick = document.querySelector(".contentlipstick");

  function updateScrollOnHover() {
    contentlipstick.style.overflowY = "scroll";
    contentlipstick.style.overflowY = "hidden";
  }

  showScrollOnHovermate();

  window.addEventListener("resize", updateScrollOnHover);
}
function showScrollOnHoverSidebar() {
  const Side_Bar = document.querySelector(".Side_Bar");

  function updateScrollOnHover() {
    Side_Bar.style.overflowY = "scroll";
    Side_Bar.style.overflowY = "hidden";
  }

  showScrollOnHoverSidebar();
}

// Call the function when the DOM is ready
document.addEventListener(
  "DOMContentLoaded",
  showScrollOnHover,
  showScrollOnHovermate,
  showScrollOnHoverSidebar
);

document.addEventListener("DOMContentLoaded", () => {
  const sidebarMainContainer = document.querySelector(".Sidebar_MainContainer");
  const toggleButton = document.createElement("div");
  toggleButton.classList.add("toggle-button");
  toggleButton.innerHTML = `
    <div class="toggle-line"></div>
    <div class="toggle-line"></div>
    <div class="toggle-line"></div>
  `;

  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", () => {
    sidebarMainContainer.classList.toggle("active");
  });
});

// video = document.getElementById("videoElement");
// if (navigator.mediaDevices.getUserMedia) {
//   navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
//     video.srcObject = stream;
//   });
// }

// // run face-mesh model once the video is ready for processing
// main();

// function main() {
//   // check if the video is loaded and ready for processing
//   if (video.readyState == 4) {
//     get_facemesh();
//     sendFrame();
//   } else {
//     setTimeout(main, 1000 / 60);
//   }
// }
