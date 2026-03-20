const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

let products = [];

// Fetch product data
async function getProducts() {
  const response = await fetch("products.json"); // adjust path if needed
  products = await response.json();
}

// Display results
function displayResults(filtered) {
  resultsDiv.innerHTML = filtered
    .map(product => `<p>${product.name}</p>`)
    .join("");
}

// Listen for typing
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(value)
  );

  displayResults(filtered);
});

// Load products
getProducts();