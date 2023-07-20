const lisptickMate = [
  {
    id: 1,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
  },
  {
    id: 1,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
  },
  {
    id: 1,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
  },
  {
    id: 1,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
  },
  {
    id: 1,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
  },
  {
    id: 1,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
  },
  {
    id: 1,
    img: "/Images/lipstik/lipstik_img1.svg",
    icon: "/Images/lipstik/lipstick_img1_color.svg",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
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

function showLipstickSection(sectionId, button) {
  // Hide all sections
  const sections = document.querySelectorAll(".LipstickContent");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Remove the "selected" class from all buttons
  const buttons = document.querySelectorAll(".LipstickContainer a");
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
  const buttons = document.querySelectorAll(".LipstickContainer a");
  buttons.forEach((btn) => {
    if (btn.getAttribute("href") === storedButtonlipstick) {
      btn.classList.add("selectedlipstick");
    }
  });
}

function generateMateLipstickContent() {
  const mateLipstickContainer = document.getElementById("mate");
  // Map the dummy data and generate the HTML elements
  const mateLipstickHTML = lisptickMate
    .map(
      (item) => `
    <div class="lipstickItem">
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

// Call the function to generate the Mate Lipstick content
generateMateLipstickContent();

function showScrollOnHover() {
  const lipstickContainer = document.querySelector(".LipstickContainer");
  const screenSizeThreshold = 1050; // Set your desired screen size threshold here

  function updateScrollOnHover() {
    if (window.innerWidth <= screenSizeThreshold) {
      // Show the scrollbar on hover for smaller screens
      lipstickContainer.style.overflowX = "scroll";
    } else {
      // Hide the scrollbar for larger screens
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

  // Update scroll on window resize
  window.addEventListener("resize", updateScrollOnHover);
}
// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", showScrollOnHover);




