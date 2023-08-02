const lisptickMate = [
  {
    id: 1,
    img: "/Images/lipstik/lipstik_img1.png",
    icon: "/Images/lipstik/lipstick_img1_color.png",
    title: "Powermatte Long Lasting ",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 2,
    img: "/Images/lipstik/lipstik_img4.png",
    icon: "/Images/lipstik/lipstick_img3_color.png",
    title: "Rouge Refillable Lipstock",
    content: "Buildable lip colour with a blurred, soft-focus effect",
    price: "$200",
  },
  {
    id: 3,
    img: "/Images/lipstik/lipstik_img2.png",
    icon: "/Images/lipstik/lipstick_img1_color.png",
    title: "Matte Refillable Lipstick ",
    content: "Transfer-resistant, matte lipstick ",
    price: "$200",
  },
  {
    id: 4,
    img: "/Images/lipstik/lipstik_img1.png",
    icon: "/Images/lipstik/lipstick_img1_color.png",
    title: "Velvet Matte Lipstick",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 5,
    img: "/Images/lipstik/lipstik_img1.png",
    icon: "/Images/lipstik/lipstick_img1_color.png",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 6,
    img: "/Images/lipstik/lipstik_img1.png",
    icon: "/Images/lipstik/lipstick_img1_color.png",
    title: "Kind Words Matte Lipstick",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 7,
    img: "/Images/lipstik/lipstik_img3.png",
    icon: "/Images/lipstik/lipstick_img1_color.png",
    title: "Powermatte Long Lasting",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 8,
    img: "/Images/lipstik/lipstik_img2.png",
    icon: "/Images/lipstik/lipstick_img1_color.png",
    title: "Kind Words Matte Lipstick",
    content: "Transfer-resistant, matte lipstick",
    price: "$200",
  },
  {
    id: 9,
    img: "/Images/lipstik/lipstik_img1.png",
    icon: "/Images/lipstik/lipstick_img1_color.png",
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

  // Show the selected SideBar section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "block";
    localStorage.setItem("selectedSection", sectionId);
  }

  // Add the "selected Side Bar Border Button" class to the clicked button
  if (button) {
    button.classList.add("selected");
    localStorage.setItem("selectedButton", button.getAttribute("href"));
  }
  //Give the selected path in the URL
  window.history.pushState(null, null, `#${sectionId}`);
}
// Store the selectd Side Bar section and Selected Side Bar Border button in local storage
const storedSection = localStorage.getItem("selectedSection");
const storedButton = localStorage.getItem("selectedButton");

if (storedSection) {
  showSection(storedSection);
}

// Restore the selected Side Bar  buttons border after the page is refreshed
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

  // Remove the "selected Lipstick Container Categories" class from all buttons
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

  // Add the "selected  Lipstick Categories" class to the clicked button
  if (button) {
    button.classList.add("selectedlipstick");
    localStorage.setItem("selectedButtonlipstick", button.getAttribute("href"));
  }
  window.history.pushState(null, `#lipstick-${sectionId}`);
}

// Store the selectd  lipstick section and selected listick hover button in local storage
const storedSectionlipstick = localStorage.getItem("selectedSectionlipstick");
const storedButtonlipstick = localStorage.getItem("selectedButtonlipstick");

if (storedSectionlipstick) {
  showLipstickSection(storedSectionlipstick);
}

// Restore the selected Lipstick Container Categories and selected buttons border after the page is refreshed
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
      <div class=" lipstick_Details" >
      <h4>${title}</h4>
      <p >${price}</p>
      </div>
      <div class="deleteButton" data-index="${index}"><img class="delete_icon" src="/Images/Icons/detele_Icon.png" /></div>
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
  generateCartModelContent();
}
let selectedLipsticksArray = [];

function removeSelectedLipstick(selectedLipstickDiv, indexToRemove) {
  const addToCartSection = document.querySelector(".addToCart");

  // Remove the selected lipstick div from the addToCartSection
  addToCartSection.removeChild(selectedLipstickDiv);
  // cartItemsContainer.removeChild(cartItemDiv);

  // Remove the selected lipstick from the array
  selectedLipsticksArray.splice(indexToRemove, 1);

  // Update the stored array in localStorage
  localStorage.setItem(
    "selectedLipsticks",
    JSON.stringify(selectedLipsticksArray)
  );
  generateCartModelContent();
}
function removeSelectedCartLipstick(cartItemDiv, indexToRemove) {
  const cartItemsContainer = document.querySelector(".cart-items");
  const addToCartSection = document.querySelector(".addToCart");

  // Remove the selected lipstick div from the cart-items section
  cartItemsContainer.removeChild(cartItemDiv);

  // Remove the selected lipstick div from the addToCart section
  const addToCartItems = addToCartSection.querySelectorAll(
    ".selectedLipstickInfo"
  );
  if (addToCartItems.length > indexToRemove) {
    addToCartSection.removeChild(addToCartItems[indexToRemove]);
  }

  // Remove the selected lipstick from the array
  selectedLipsticksArray.splice(indexToRemove, 1);

  // Update the stored array in localStorage
  localStorage.setItem(
    "selectedLipsticks",
    JSON.stringify(selectedLipsticksArray)
  );

  // Regenerate the cart items and update the total price in the modal
  generateCartModelContent();
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

  // Store the updated Add to Cart array in localStorage
  localStorage.setItem(
    "selectedLipsticks",
    JSON.stringify(selectedLipsticksArray)
  );

  // generateMateLipstickContent();
  // generateCartModelContent();
}

function displaySelectedLipstickOnLoad() {
  // Retrieve the selected lipsticks Add to Cart from localStorage
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

function generateCartModelContent() {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = ""; // Clear previous content

  // Iterate through the selected lipsticks array and create HTML elements for each selected lipstick
  selectedLipsticksArray.forEach((lipstickData, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");
    cartItemDiv.innerHTML = `
      <div class="cart-item-info">
        <img class="cart-item-img" src="${lipstickData.img}" />
        <img class="cart-item-icon" src="${lipstickData.icon}" />
        <h4>${lipstickData.title}</h4>
        <p>${lipstickData.price}</p>
      </div>
      <div class="deleteButtonCart" data-index="${index}"><img class="delete_icon" src="/Images/Icons/detele_Icon.png" /></div>
    </div>
  `;

    const deleteCartButton = cartItemDiv.querySelector(".deleteButtonCart");
    deleteCartButton.addEventListener("click", () => {
      // Get the index of the selected lipstick from the data-index attribute
      const indexToRemove = parseInt(
        deleteCartButton.getAttribute("data-index"),
        10
      );
      // Call the function to remove the selected lipstick from the array and update the display
      removeSelectedCartLipstick(cartItemDiv, indexToRemove);
    });

    cartItemsContainer.appendChild(cartItemDiv);
  });

  // Calculate and display the total price
  const totalPriceElement = document.getElementById("totalPrice");
  let totalPrice = 0;
  selectedLipsticksArray.forEach((lipstick) => {
    totalPrice += parseInt(lipstick.price.slice(1));
  });
  totalPriceElement.textContent = `$${totalPrice}`;
}

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const storedSection = localStorage.getItem("selectedSection");
  const storedButton = localStorage.getItem("selectedButton");
  if (storedSection && storedButton) {
    const selectedButton = document.querySelector(
      `.Sidebar_InnerContainer a[href="${storedButton}"]`
    );
    showSection(storedSection, selectedButton);
  } else {
    showSection("aibeauty"); // Default selection if no data is stored

    // Add the border to the default selected button "aibeauty"
    const defaultSelectedButton = document.querySelector(
      '.Sidebar_InnerContainer a[href="#aibeauty"]'
    );
    defaultSelectedButton.classList.add("selected");
  }

  // For Lipstick Container Categories

  const storedSectionlipstick = localStorage.getItem("selectedSectionlipstick");
  const storedButtonlipstick = localStorage.getItem("selectedButtonlipstick");
  if (storedSectionlipstick && storedButtonlipstick) {
    const selectedButtonlipstick = document.querySelector(
      `.LipstickContainerCategories a[href="${storedButtonlipstick}"]`
    );
    showLipstickSection(storedSectionlipstick, selectedButtonlipstick);
  } else {
    showLipstickSection("mate"); // Default selection if no data is stored
    // Add the border to the default selectedlipstick buttton "Lipstick"
    const defaultSelectedlipstick = document.querySelector(
      '.LipstickContainerCategories a[href="#mate"]'
    );
    defaultSelectedlipstick.classList.add("selectedlipstick");
  }
  generateCartModelContent();
});

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

  function removeToggleLines() {
    const toggleLines = toggleButton.querySelectorAll(".toggle-line");
    toggleLines.forEach((line) => {
      line.style.display = "none";
    });
  }

  function addToggleLines() {
    const toggleLines = toggleButton.querySelectorAll(".toggle-line");
    toggleLines.forEach((line) => {
      line.style.display = "block";
    });
  }

  function addArrowButton() {
    const arrowButton = document.createElement("div");
    arrowButton.classList.add("arrow-button");
    arrowButton.innerHTML = "&#8592;";
    toggleButton.appendChild(arrowButton);
  }

  function removeArrowButton() {
    const arrowButton = toggleButton.querySelector(".arrow-button");
    if (arrowButton) {
      toggleButton.removeChild(arrowButton);
    }
  }

  toggleButton.addEventListener("click", () => {
    sidebarMainContainer.classList.toggle("active");

    if (sidebarMainContainer.classList.contains("active")) {
      removeToggleLines();
      addArrowButton();
    } else {
      removeArrowButton();
      addToggleLines();
    }
  });
});

function closeAndToggleCartModal() {
  closeCartModal();
  toggleCartModal();
}

// Function to toggle the blur effect on the background elements
function toggleBlurBackground() {
  const cartModal = document.getElementById("cartModal");
  const backgroundElements = document.querySelectorAll(".blur");

  function handleBackgroundClick(event) {
    if (event.target === cartModal) {
      closeAndToggleCartModal();
    }
  }

  if (cartModal.classList.contains("active")) {
    backgroundElements.forEach((element) => {
      element.classList.add("blur-background");
      element.classList.add("unselectable");
      element.style.pointerEvents = "none";
      element.addEventListener("click", handleBackgroundClick);
    });
  } else {
    backgroundElements.forEach((element) => {
      element.classList.remove("blur-background");
      element.classList.remove("unselectable");
      element.style.pointerEvents = "auto";
      element.removeEventListener("click", handleBackgroundClick);
    });
  }
}

document.addEventListener("click", (event) => {
  console.log(event.target);
  const cartModal = document.getElementById("bbbb");
  // Check if the clicked element is outside the modal
  if (event.target == cartModal) {
    closeCartModal();
    toggleCartModal();
  }
});

// Function to open the cart modal
function openCartModal() {
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "block";
  document.body.style.overflow = "hidden";
  toggleBlurBackground();
  generateCartModelContent();
}

// Function to close the cart modal
function closeCartModal() {
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
  document.body.style.overflow = "auto";
  toggleBlurBackground();
}

function toggleCartModal() {
  const cartModal = document.getElementById("cartModal");
  const toggleButton = document.querySelector(".toggle-button");
  cartModal.classList.toggle("active");
  toggleButton.style.display = cartModal.classList.contains("active")
    ? "none"
    : "block";

  if (cartModal.classList.contains("active")) {
    cartModal.style.display = "block";
  } else {
    cartModal.style.display = "none";
  }

  toggleBlurBackground();
}

// Event listener to open the modal when the "Add to Cart" button is clicked
const addToCartButton = document.querySelector(".addToCartButton");
addToCartButton.addEventListener("click", () => {
  openCartModal();
  toggleCartModal();
});

// Event listener to close the modal when the "Close" button (x) is clicked
const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", () => {
  closeAndToggleCartModal();
});

const closeArrowCartButton = document.querySelector(".ArrowCart");
closeArrowCartButton.addEventListener("click", () => {
  closeCartModal();
  toggleCartModal();
});

// Function to place the order
function openOrderModal() {
  const orderModal = document.getElementById("orderModal");
  orderModal.style.display = "block";
}

function closeOrderModal() {
  const orderModal = document.getElementById("orderModal");
  orderModal.style.display = "none";
}

function submitOrder() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  closeOrderModal();
}

function openPaymentModal() {
  const orderModal = document.getElementById("paymentModal");
  orderModal.style.display = "block";
}

function closePaymentModal() {
  const orderModal = document.getElementById("paymentModal");
  orderModal.style.display = "none";
}
function openPaynowModal() {
  const orderModal = document.getElementById("payNow");
  orderModal.style.display = "block";
}

function closePaynowModal() {
  const orderModal = document.getElementById("payNow");
  orderModal.style.display = "none";
}

function submitPaynowbtn() {
  const orderModal = document.getElementById("lipstick");
  orderModal.style.display = "block";
}
function submitPayment() {
  // Get the selected radio button value
  // const paymentOption = document.querySelector(
  //   'input[name="paymentOption"]:checked'
  // );

  // if (paymentOption) {
  //   // Process the payment option here
  //   const selectedOption = paymentOption.id; // 'throughcard' or 'ondelivery'
  //   console.log("Selected Payment Option:", selectedOption);
  //   // Implement your payment processing logic here.
  // } else {
  //   // Handle the case where no option is selected
  //   console.log("Please select a payment option!");
  // }

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  closeOrderModal();
}

// function placeOrder() {
//   selectedLipsticksArray = [];
//   const addToCartSection = document.querySelector(".addToCart");
//   addToCartSection.innerHTML = "";
//   localStorage.removeItem("selectedLipsticks"); // Clear local storage

//   closeCartModal();
// }

// Event listener for the "Place Order" button
// const placeOrderButton = document.getElementById("placeOrderBtn");
// placeOrderButton.addEventListener("click", placeOrder);

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
