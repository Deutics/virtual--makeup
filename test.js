let selectedConcealerArray = [];
function showConcealerSection(sectionId, button) {
  // Hide all sections
  const sectionsConcealer = document.querySelectorAll(".concealerContent");
  sectionsConcealer.forEach((section) => {
    section.style.display = "none";
  });

  // Remove the "selected Concealer Container Categories" class from all buttons
  const buttonsConcealer = document.querySelectorAll(
    ".concealerContainerCategories a"
  );
  buttonsConcealer.forEach((btn) => {
    btn.classList.remove("selectedConcealer");
  });

  // Show the selected section
  const selectedSectionConcealer = document.getElementById(sectionId);
  if (selectedSectionConcealer) {
    selectedSectionConcealer.style.display = "flex";
    localStorage.setItem("selectedSectionConcealer", sectionId);
  }

  // Add the "selected  Concealer Categories" class to the clicked button
  if (button) {
    button.classList.add("selectedConcealer");
    localStorage.setItem(
      "selectedButtonconcealer",
      button.getAttribute("href")
    );
  }
  window.history.pushState(null, `#concealer${sectionId}`);
}

// Store the selectd  Concealer section and selected Concealer hover button in local storage
const storedSectionconcealer = localStorage.getItem("selectedSectionConcealer");
const storedButtonconcealer = localStorage.getItem("selectedButtonconcealer");

if (storedSectionconcealer) {
  showConcealerSection(storedSectionconcealer);
}
Concealer;

// Restore the selected Concealer Container Categories and selected buttons border after the page is refreshed
if (storedButtonconcealer) {
  const buttonsConcealer = document.querySelectorAll(
    ".concealerContainerCategories a"
  );
  buttonsConcealer.forEach((btn) => {
    if (btn.getAttribute("href") === storedButtonconcealer) {
      btn.classList.add("selectedConcealer");
    }
  });
}

// Helper function to display the selected Concealer in the addToCart section
function displaySelectedConcealer(img, icon, title, price, index) {
  const addToCartSectionConcealer = document.querySelector(
    ".addToCartConcealer"
  );

  // Create a new div to hold each selected Concealer
  const selectedConcealerDiv = document.createElement("div");
  selectedConcealerDiv.classList.add("selectedConcealerInfo");

  // Populate the div with the selected Concealer data
  selectedConcealerDiv.innerHTML = `
    <div class="lipstickInfo">
      <img class="addToCartImg" src="${img}"/>
      <img class="addToCartIcon" src="${icon}" />
      <div class="Concealer_Details">
        <h4>${title}</h4>
        <p>${price}</p>
      </div>
      <div class="deleteButtonconcealer" data-index="${index}">
        <img class="delete_icon" src="/Images/Icons/detele_Icon.png" />
      </div>
    </div>
  `;

  const deleteButtonconcealer = selectedConcealerDiv.querySelector(
    ".deleteButtonconcealer"
  );
  deleteButtonconcealer.addEventListener("click", () => {
    // Get the index of the selected Concealer from the data-index attribute
    const indexToRemoveConcealer = parseInt(
      deleteButtonconcealer.getAttribute("data-index"),
      10
    );

    // Remove the selected Concealer from the array and update the display
    removeSelectedConcealer(selectedConcealerDiv, indexToRemoveConcealer);
  });

  // Append the div to the addToCartSection
  addToCartSectionConcealer.appendChild(selectedConcealerDiv);
}

function removeSelectedConcealer(selectedConcealerDiv, indexToRemoveConcealer) {
  const addToCartSectionConcealer = document.querySelector(
    ".addToCartConcealer"
  );

  // Remove the selected Concealer div from the addToCartSection
  addToCartSectionConcealer.removeChild(selectedConcealerDiv);

  // Remove the selected Concealer from the array
  selectedConcealerArray.splice(indexToRemoveConcealer, 1);

  // Update the stored array in localStorage
  localStorage.setItem(
    "selectedConcealerArray",
    JSON.stringify(selectedConcealerArray)
  );
  generateCartModelConcealerContent();
}

function removeSelectedCartConcealer(
  cartItemConcealerDiv,
  indexToRemoveConcealer
) {
  const cartItemsContainerConcealer = document.querySelector(
    ".cart-items-Concealer"
  );
  const addToCartSectionConcealer = document.querySelector(
    ".addToCartConcealer"
  );

  // Remove the selected Concealer div from the cart-items section
  cartItemsContainerConcealer.removeChild(cartItemConcealerDiv);

  // Remove the selected Concealer div from the addToCart section
  const addToCartItemsConcealer = addToCartSectionConcealer.querySelectorAll(
    ".selectedConcealerInfo"
  );
  if (addToCartItemsConcealer?.length > indexToRemoveConcealer) {
    addToCartSectionConcealer.removeChild(
      addToCartItemsConcealer[indexToRemoveConcealer]
    );
  }

  // Remove the selected Concealer from the array
  selectedConcealerArray.splice(indexToRemoveConcealer, 1);

  // Update the stored array in localStorage
  localStorage.setItem(
    "selectedConcealerArray",
    JSON.stringify(selectedConcealerArray)
  );

  // Regenerate the cart items and update the total price in the modal
  generateCartModelConcealerContent();
}

function handleConcealerImageClick(img, icon, title, price) {
  // Clear local storage and the UI if a Concealer is already selected
  if (selectedConcealerArray?.length > 0) {
    selectedConcealerArray = [];
    const addToCartSectionConcealer = document.querySelector(
      ".addToCartConcealer"
    );
    addToCartSectionConcealer.innerHTML = "";
    localStorage.removeItem("selectedConcealerArray"); // Clear local storage
  }

  // Call the function to display the selected Concealer in the addToCart section
  displaySelectedConcealer(
    img,
    icon,
    title,
    price,
    selectedConcealerArray.length
  );

  // Add the selected Concealer data to the array
  const selectedItemData = {
    img: img,
    icon: icon,
    title: title,
    price: price,
  };
  selectedConcealerArray.push(selectedItemData);

  // Store the updated Add to Cart array in localStorage
  localStorage.setItem(
    "selectedConcealerArray",
    JSON.stringify(selectedConcealerArray)
  );
}

function displaySelectedConcealerOnLoad() {
  // Retrieve the selected Concealer Add to Cart from localStorage
  const storedConcealer = localStorage.getItem("selectedConcealerArray");
  if (storedConcealer) {
    selectedConcealerArray = JSON.parse(storedConcealer);

    // Display each selected Concealer in the addToCart section
    selectedConcealerArray.forEach((ConcealerData, index) => {
      displaySelectedConcealer(
        ConcealerData.img,
        ConcealerData.icon,
        ConcealerData.title,
        ConcealerData.price,
        index
      );
    });
  }
}

displaySelectedConcealerOnLoad();

function generateLiquidConcealerContent() {
  const liquidConcealerContainer = document.getElementById("concealer_liquid");

  const liquidConcealerHTML = ConcealerLiquid.map(
    (item) => `
    <div class="lipstickItem"
    onclick="handleConcealerImageClick( '${item.img}',
    '${item.icon}', '${item.title}', '${item.price}')" >
      <img class="img" src=${item.img} " style="height: 155px;"/> 
      <img class="icon" src="${item.icon}"/>
      <h3>${item.title}</h3>
      <p style="margin-bottom: 2rem;">${item.content}</p>
    </div>
  `
  ).join("");

  liquidConcealerContainer.innerHTML = liquidConcealerHTML;
}

generateLiquidConcealerContent();

function generateCartModelConcealerContent() {
  const cartItemsContainerConcealer = document.querySelector(
    ".cart-items-Concealer"
  );
  cartItemsContainerConcealer.innerHTML = ""; // Clear previous content

  // Iterate through the selected Concealer array and create HTML elements for each selected Concealer
  selectedConcealerArray.forEach((ItemData, index) => {
    const cartItemDivConcealer = document.createElement("div");
    cartItemDivConcealer.classList.add("cart-item-Concealer");
    cartItemDivConcealer.innerHTML = `
      <div class="cart-item-info">
        <img class="cart-item-img" src="${ItemData.img}"  />
        <img class="cart-item-icon" src="${ItemData.icon}" />
        <h4>${ItemData.title}</h4>
        <p>${ItemData.price}</p>
      </div>
      <div class="deleteButtonCartConcealer" data-index="${index}"><img class="delete_icon" src="/Images/Icons/detele_Icon.png" /></div>
    </div>
  `;

    const deleteCartButtonConcealer = cartItemDivConcealer.querySelector(
      ".deleteButtonCartConcealer"
    );
    deleteCartButtonConcealer.addEventListener("click", () => {
      // Get the index of the selected Concealer from the data-index attribute
      const indexToRemoveConcealer = parseInt(
        deleteCartButtonConcealer.getAttribute("data-index"),
        10
      );
      // Call the function to remove the selected foundaton from the array and update the display
      removeSelectedCartConcealer(cartItemDivConcealer, indexToRemoveConcealer);
    });

    cartItemsContainerConcealer.appendChild(cartItemDivConcealer);
  });

  // Calculate and display the total price
  const totalPriceElementConcealer = document.getElementById(
    "totalPriceconcealer"
  );
  let totalPriceConcealer = 0;
  selectedConcealerArray.forEach((Concealer) => {
    totalPriceConcealer += parseInt(Concealer.price.slice(1));
  });
  totalPriceElementConcealer.textContent = `$${totalPriceConcealer}`;
}

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // For Concealer Container Categories
  const storedSectionConcealer = localStorage.getItem(
    "selectedSectionConcealer"
  );
  const storedButtonConcealer = localStorage.getItem("selectedButtonConcealer");
  if (storedSectionConcealer && storedButtonConcealer) {
    const selectedButtonconcealer = document.querySelector(
      `.concealerContainerCategories a[href="${storedButtonConcealer}"]`
    );
    showConcealerSection(storedSectionConcealer, selectedButtonconcealer);
  } else {
    showConcealerSection("concealer_liquid"); // Default selection if no data is stored
    // Add the border to the default selectedConcealer buttton "Concealer"
    const defaultSelectedConcealer = document.querySelector(
      '.concealerContainerCategories a[href="#concealer_liquid"]'
    );
    defaultSelectedConcealer.classList.add("selectedConcealer");
  }
  generateCartModelConcealerContent();

  //   // Event listener to open the modal when the "Add to Cart" button is clicked
  const addToCartButtonConcealer = document.querySelector(
    ".addToCartButtonConcealer"
  );
  addToCartButtonConcealer.addEventListener("click", () => {
    if (selectedConcealerArray?.length === 0) {
      const emptyCartMessage = document.getElementById(
        "emptyCartModalConcealer"
      );
      emptyCartMessage.style.display = "block";

      // Hide the message after a short delay
      setTimeout(() => {
        emptyCartMessage.style.display = "none";
      }, 2000);
    } else {
      openCartModalConcealer();
      toggleCartModalConcealer();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebarMainContainer = document.querySelector(".Sidebar_MainContainer");
  const toggleButtonConcealer = document.createElement("div");
  toggleButtonConcealer.classList.add("toggle-button");
  toggleButtonConcealer.innerHTML = `
    <div class="toggle-line-Concealer"></div>
    <div class="toggle-line-Concealer"></div>
    <div class="toggle-line-Concealer"></div>
  `;

  document.body.appendChild(toggleButtonConcealer);

  function addToggleLinesConcealer() {
    const toggleLines = toggleButtonConcealer.querySelectorAll(
      ".toggle-line-Concealer"
    );
    toggleLines.forEach((line) => {
      line.style.display = "block";
    });
  }

  function addArrowButtonConcealer() {
    const arrowButton = document.createElement("div");
    arrowButton.classList.add("arrow-button-Concealer");
    arrowButton.innerHTML = "&#8592;";
    toggleButtonConcealer.appendChild(arrowButton);
  }

  function removeArrowButtonConcealer() {
    const arrowButton = toggleButtonConcealer.querySelector(
      ".arrow-button-Concealer"
    );
    if (arrowButton) {
      toggleButton.removeChild(arrowButton);
    }
  }

  function removeToggleLinesConcealer() {
    const toggleLines = toggleButtonConcealer.querySelectorAll(
      ".toggle-line-Concealer"
    );
    toggleLines.forEach((line) => {
      line.style.display = "none";
    });
  }
  toggleButtonConcealer.addEventListener("click", () => {
    sidebarMainContainer.classList.toggle("active");

    if (sidebarMainContainer.classList.contains("active")) {
      removeToggleLinesConcealer();
      addArrowButtonConcealer();
    } else {
      removeArrowButtonConcealer();
      addToggleLinesConcealer();
    }
  });
});

function closeAndToggleCartModalConcealer() {
  closeCartModalConcealer();
  toggleCartModalConcealer();
}

// Function to toggle the blur effect on the background elements
function toggleBlurBackgroundConcealer() {
  const cartModalConcealer = document.getElementById("cartModalConcealer");
  const backgroundElements = document.querySelectorAll(".blur");

  function handleBackgroundConcealerClick(event) {
    if (event.target === cartModalConcealer) {
      closeAndToggleCartModalConcealer();
    }
  }

  if (cartModalConcealer.classList.contains("active")) {
    backgroundElements.forEach((element) => {
      element.classList.add("blur-background");
      element.classList.add("unselectable");
      element.style.pointerEvents = "none";
      element.addEventListener("click", handleBackgroundConcealerClick);
    });
  } else {
    backgroundElements.forEach((element) => {
      element.classList.remove("blur-background");
      element.classList.remove("unselectable");
      element.style.pointerEvents = "auto";
      element.removeEventListener("click", handleBackgroundConcealerClick);
    });
  }
}

window.addEventListener("click", (event) => {
  const cartModalConcealer = document.getElementById("bbbb");
  // Check if the clicked element is outside the modal
  if (event.target == cartModalConcealer) {
    closeCartModalConcealer();
    toggleCartModalConcealer();
  }
});

// Function to open the cart modal
function openCartModalConcealer() {
  const cartModal = document.getElementById("cartModalConcealer");
  cartModal.style.display = "block";
  document.body.style.overflow = "hidden";
  toggleBlurBackgroundConcealer();
  generateCartModelConcealerContent();
}
function closeEmptyCartModalConcealer() {
  const emptyCartModal = document.getElementById("emptyCartModalConcealer");
  emptyCartModal.style.display = "none";
}

// Event listener to open the modal when the "Add to Cart" button is clicked
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtonConcealer = document.querySelector(
    ".addToCartButtonConcealer"
  );
  addToCartButtonConcealer.addEventListener("click", () => {
    if (selectedConcealerArray.length <= 0) {
      const emptyCartModalConcealer = document.getElementById(
        "emptyCartModalConcealer"
      );
      emptyCartModalConcealer.style.display = "block";

      setTimeout(() => {
        emptyCartModalConcealer.style.display = "none";
      }, 3000);
    } else {
      openCartModalConcealer();
    }
  });
});

// Function to close the cart modal
function closeCartModalConcealer() {
  const cartModal = document.getElementById("cartModalConcealer");
  cartModal.style.display = "none";
  document.body.style.overflow = "auto";
  toggleBlurBackgroundConcealer();
}

function toggleCartModalConcealer() {
  const cartModalConcealer = document.getElementById("cartModalConcealer");
  const toggleButton = document.querySelector(".toggle-button");
  cartModalConcealer.classList.toggle("active");
  toggleButton.style.display = cartModalConcealer.classList.contains("active")
    ? "none"
    : "block";

  if (cartModalConcealer.classList.contains("active")) {
    cartModalConcealer.style.display = "block";
  } else {
    cartModalConcealer.style.display = "none";
  }

  toggleBlurBackgroundConcealer();
}

function toggleOrderModalConcealer() {
  const orderModalConcealer = document.getElementById("orderModalConcealer");
  const toggleButton = document.querySelector(".toggle-button-Concealer");
  orderModalConcealer.classList.toggle("active");
  toggleButton.style.display = orderModalConcealer.classList.contains("active")
    ? "none"
    : "block";

  if (orderModalConcealer.classList.contains("active")) {
    orderModalConcealer.style.display = "block";
  } else {
    orderModalConcealer.style.display = "none";
  }

  toggleBlurBackgroundConcealer();
}
function togglePaymentModalConcealer() {
  const paymentModalConcealer = document.getElementById(
    "paymentModalConcealer"
  );
  const toggleButton = document.querySelector(".toggle-button-Concealer");
  paymentModalConcealer.classList.toggle("active");
  toggleButton.style.display = paymentModalConcealer.classList.contains(
    "active"
  )
    ? "none"
    : "block";

  if (paymentModalConcealer.classList.contains("active")) {
    paymentModalConcealer.style.display = "block";
  } else {
    paymentModalConcealer.style.display = "none";
  }

  toggleBlurBackgroundConcealer();
}

const closeButtonConcealer = document.getElementById("closeConcealer");
closeButtonConcealer.addEventListener("click", () => {
  closeAndToggleCartModalConcealer();
});

const closeArrowCartButtonConcealer = document.querySelector(
  ".ArrowCartConcealer"
);
closeArrowCartButtonConcealer.addEventListener("click", () => {
  closeCartModalConcealer();
  toggleCartModalConcealer();
});
const closeArrowOrderButtonConcealer = document.querySelector(
  ".ArrowOrderConcealer"
);
closeArrowOrderButtonConcealer.addEventListener("click", () => {
  closeOrderModalConcealer();
  removeToggleLinesConcealer();
  toggleOrderModalConcealer();
});
const closeArrowPaymentButtonConcealer = document.querySelector(
  ".ArrowPaymentConcealer"
);
closeArrowPaymentButtonConcealer.addEventListener("click", () => {
  closePaymentModalConcealer();
  removeToggleLinesConcealer();
  togglePaymentModalConcealer();
});

// Function to place the order
function openOrderModalConcealer() {
  const orderModalConcealer = document.getElementById("orderModalConcealer");
  orderModalConcealer.style.display = "block";
}

function closeOrderModalConcealer() {
  const orderModalConcealer = document.getElementById("orderModalConcealer");
  orderModalConcealer.style.display = "none";
}

function submitOrderConcealer() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  closeOrderModalConcealer();
}

function openPaymentModalConcealer() {
  const orderModalConcealer = document.getElementById("paymentModalConcealer");
  orderModalConcealer.style.display = "block";
}

function closePaymentModalConcealer() {
  const orderModal = document.getElementById("paymentModalConcealer");
  orderModal.style.display = "none";
}
function openPaynowModalConcealer() {
  const orderModalConcealer = document.getElementById("payNowConcealer");
  orderModalConcealer.style.display = "block";
}

function closePaynowModalConcealer() {
  const orderModalConcealer = document.getElementById(
    "submitPayNowBtnConcealer"
  );
  orderModalConcealer.style.display = "none";
}

function submitPaymentConcealer() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  closeOrderModalConcealer();
}

function submitPaynowbtnConcealer() {
  const modalsConcealer = document.getElementsByClassName("modal");
  for (const modalConcealer of modalsConcealer) {
    modalConcealer.style.display = "none";
  }

  // Remove the blur effect on the background elements
  const backgroundElementsConcealer = document.querySelectorAll(".blur");
  backgroundElementsConcealer.forEach((element) => {
    element.classList.remove("blur-background");
    element.classList.remove("unselectable");
    element.style.pointerEvents = "auto";
  });

  // Clear the selected Concealer array and remove the Concealer from the addToCart section
  selectedConcealerArray = [];
  const addToCartSectionConcealer = document.querySelector(
    ".addToCartConcealer"
  );
  addToCartSectionConcealer.innerHTML = "";
  localStorage.removeItem("selectedConcealerArray"); // Clear local storage

  toggleCartModalConcealer();
}
