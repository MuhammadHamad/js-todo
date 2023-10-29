const form = document.getElementById("form");
const input = document.getElementById("input-text");
const list = document.getElementById("list");
const btn = document.getElementById("btn");

// Disable the button on page load
btn.disabled = true;

// Focus the cursor on the input field when the page loads
input.focus();

let editingItem = null; // Variable to keep track of the currently edited item

function createListItem(text) {
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");

  const textElement = document.createElement("p");
  textElement.textContent = text;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");

  // Add click event listener for editing the text
  editButton.addEventListener("click", function () {
    if (editingItem !== listItem) {
      editingItem = listItem;
      input.value = textElement.textContent;
      input.focus();
    }
  });

  listItem.appendChild(textElement);
  listItem.appendChild(editButton);

  return listItem;
}

function createDeleteButton(listItem) {
  const deleteListItem = document.createElement("button");
  deleteListItem.textContent = "Delete";
  deleteListItem.classList.add("delete-button");
  deleteListItem.addEventListener("click", function () {
    list.removeChild(listItem);
    if (editingItem === listItem) {
      editingItem = null;
    }
    // Remove the delete button when a to-do item is deleted
    list.removeChild(deleteListItem);
  });
  return deleteListItem;
}

function handleSubmit(event) {
  event.preventDefault();

  let value = input.value;

  if (value.trim() === "") {
    return; // Prevent adding empty items
  }

  if (editingItem) {
    // If an item is being edited, update its content
    editingItem.querySelector("p").textContent = value;
    editingItem = null;
  } else {
    // If not, create a new to-do item
    const listItem = createListItem(value);
    const deleteListItem = createDeleteButton(listItem);

    list.appendChild(listItem);
    list.appendChild(deleteListItem);
  }

  input.value = "";
  btn.disabled = true;
}

input.addEventListener("input", function () {
  btn.disabled = input.value.trim() === "";
});

form.addEventListener("submit", handleSubmit);
