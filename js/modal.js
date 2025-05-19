document.querySelectorAll(".project[data-modal]").forEach((project) => {
  project.addEventListener("click", () => {
    const modalId = project.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden"); // Make modal participate in layout
      // Allow next animation frame before adding 'show' for transition effect
      requestAnimationFrame(() => {
        modal.classList.add("show");
      });
    }
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  const closeBtn = modal.querySelector(".modal-close");

  function hideModal() {
    modal.classList.remove("show");
  }

  closeBtn.addEventListener("click", hideModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });

  // After fade out finishes, hide modal from layout to prevent interactions
  modal.addEventListener("transitionend", (e) => {
    if (!modal.classList.contains("show")) {
      modal.classList.add("hidden");
    }
  });
});
