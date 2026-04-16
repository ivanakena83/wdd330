export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details using the dataSource
    this.product = await this.dataSource.findProductById(this.productId);
    // Render the HTML
    this.renderProductDetails();
    // Add event listener to Add to Cart button
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
   let cartContents = localStorage.getItem('so-cart');
  if (!cartContents) {
    cartContents = [];
  } else {
    cartContents = JSON.parse(cartContents);
  }
  cartContents.push(this.product);
  localStorage.setItem('so-cart', JSON.stringify(cartContents));
  }

  renderProductDetails() {
      // Find the container element in index.html
  const container = document.querySelector('.product-detail');
  if (!container) return;

  // Build the HTML string
  const html = `
    <h3>${this.product.Brand.Name}</h3>
    <h2>${this.product.NameWithoutBrand}</h2>
    <img src="${this.product.Images.PrimaryLarge}" alt="${this.product.Name}">
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart">Add to Cart</button>
    </div>
  `;

  container.innerHTML = html;
  }
}