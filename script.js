document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("form");
  let formDataBody = document.getElementById("formDataBody");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrorMessages();

    if (!validateForm()) {
      return;
    }

    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let email = document.getElementById("email").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let address = document.getElementById("address").value;
    let country = document.getElementById("country").value;
    let state = document.getElementById("state").value;
    let pincode = document.getElementById("pincode").value;
    let foodOptions = document.querySelectorAll('input[name="food"]:checked');

    if (foodOptions.length < 2) {
      alert("Please choose at least two food options.");
      return;
    }

    let newRow = document.createElement("tr");

    newRow.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${gender}</td>
            <td>${address}</td>
            <td>${country}</td>
            <td>${state}</td>
            <td>${pincode}</td>
            <td>${Array.from(foodOptions)
              .map((option) => option.value)
              .join(",")}</td>
        `;

    formDataBody.appendChild(newRow);

    form.reset();
  });

  function validateForm() {
    let isValid = true;

    let inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        displayErrorMessage(input, "Please do not leave this field blank.");
        isValid = false;
      }
    });

    return isValid;
  }

  function displayErrorMessage(input, message) {
    let errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";
    errorDiv.textContent = message;

    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  }

  function clearErrorMessages() {
    let errorMessages = form.querySelectorAll(".alert-danger");
    errorMessages.forEach((errorMessage) => {
      errorMessage.remove();
    });
  }
});
