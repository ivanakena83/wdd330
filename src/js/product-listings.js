export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    
    async init() {
        try {
            const products = await this.dataSource.getData(this.category);
            this.renderList(products);
        } catch (error) {
            console.error('Error initializing product list:', error);
            this.showError();
        }
    }
    
    renderList(products) {
        if (!this.listElement) return;
        
        if (!products || products.length === 0) {
            this.listElement.innerHTML = '<div class="no-products">No products found in this category.</div>';
            return;
        }
        
        const html = products.map(product => this.renderProductCard(product)).join('');
        this.listElement.innerHTML = html;
    }
    
    renderProductCard(product) {
        // Handle image URL - use PrimaryMedium if available, otherwise fallback to Images.PrimaryMedium
        let imageUrl = '';
        if (product.Images && product.Images.PrimaryMedium) {
            imageUrl = product.Images.PrimaryMedium;
        } else if (product.Image) {
            imageUrl = product.Image;
        } else {
            imageUrl = '/images/placeholder.jpg';
        }
        
        return `
            <div class="product-card">
                <a href="/product_pages/?product=${product.Id}" class="product-link">
                    <div class="product-image">
                        <img src="${imageUrl}" alt="${product.Name}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.NameWithoutBrand || product.Name}</h3>
                        <div class="product-brand">${product.Brand?.Name || ''}</div>
                        <div class="product-price">$${product.FinalPrice || product.ListPrice}</div>
                        ${product.SuggestedRetailPrice ? `<div class="product-retail">Retail: $${product.SuggestedRetailPrice}</div>` : ''}
                        <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
                    </div>
                </a>
            </div>
        `;
    }
    
    showError() {
        if (this.listElement) {
            this.listElement.innerHTML = '<div class="error-message">Failed to load products. Please try again later.</div>';
        }
    }
}