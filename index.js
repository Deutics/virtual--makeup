
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
  }
}

const storedSection = localStorage.getItem("selectedSection");
if (storedSection) {
  showSection(storedSection);
}
