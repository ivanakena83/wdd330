// Load featured products
async function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    try {
        // Fetch products from all categories
        const categories = ['tents', 'backpacks', 'sleeping-bags', 'hammocks'];
        const allProducts = [];
        
        for (const category of categories) {
            const response = await fetch(`https://wdd330-backend.onrender.com/products/search/${category}`);
            const data = await response.json();
            if (data.Result && data.Result.length > 0) {
                allProducts.push(...data.Result.slice(0, 2));
            }
        }
        
        // Shuffle and take top 4
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        const featured = shuffled.slice(0, 4);
        
        if (featured.length === 0) {
            featuredContainer.innerHTML = '<p>No featured products available.</p>';
            return;
        }
        
        featuredContainer.innerHTML = featured.map(product => `
            <div class="product-card">
                <a href="/product_pages/?product=${product.Id}" class="product-link">
                    <div class="product-image">
                        <img src="${product.Images?.PrimaryMedium || '/images/placeholder.jpg'}" alt="${product.Name}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <h3>${product.NameWithoutBrand || product.Name}</h3>
                        <div class="product-price">$${product.FinalPrice || product.ListPrice}</div>
                        <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
                    </div>
                </a>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading featured products:', error);
        featuredContainer.innerHTML = '<p>Unable to load featured products at this time.</p>';
    }
}

// Newsletter form submission
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            alert(`Thanks for subscribing! We'll send updates to ${email}`);
            form.reset();
        });
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    initNewsletter();
    initMobileMenu();
});