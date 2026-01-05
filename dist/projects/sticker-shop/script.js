/**
 * StickerLah E-commerce Demo
 * Cart and interaction functionality
 */

// State
let cart = [];

// DOM Elements
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Product emoji mapping (for cart display)
const productEmojis = {
    1: '☕', 2: '🦁', 3: '🧃', 4: '🟢', 5: '🧋',
    6: '😅', 7: '🍗', 8: '🎒', 9: '🫛', 10: '💪',
    11: '📉', 12: '🍪', 101: '☕🔑', 102: '🧃🔑', 103: '🦁🔑'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCart();
    initAddToCartButtons();
});

// Cart Drawer Toggle
function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus the close button for accessibility
    cartClose.focus();
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Return focus to cart button
    cartBtn.focus();
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Escape key closes cart
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
});

// Initialize Add to Cart buttons
function initAddToCartButtons() {
    const addButtons = document.querySelectorAll('.btn-add-cart');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productId = parseInt(card.dataset.id);
            const productName = card.dataset.name;
            const productPrice = parseFloat(card.dataset.price);

            addToCart(productId, productName, productPrice);
        });
    });
}

// Add to Cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }

    updateCartUI();
    showToast(`${name} added to cart!`);
}

// Remove from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Update Quantity
function updateQty(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    // Update count badge
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${productEmojis[item.id] || '🏷️'}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove">×</button>
            </div>
        `).join('');
    }

    // Update total
    const total = calculateTotal();
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Save to localStorage
    saveCart();
}

// Calculate total with bulk discount
function calculateTotal() {
    const stickerItems = cart.filter(item => item.id < 100);
    const keychainItems = cart.filter(item => item.id >= 100);

    const totalStickerQty = stickerItems.reduce((sum, item) => sum + item.qty, 0);

    // Bulk discount: $1 each for 5+ stickers
    let stickerTotal = 0;
    if (totalStickerQty >= 5) {
        stickerTotal = totalStickerQty * 1.00;
    } else {
        stickerTotal = stickerItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

    const keychainTotal = keychainItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

    return stickerTotal + keychainTotal;
}

// Toast Notification
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 2500);
}

// Checkout (Demo)
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }

    const total = calculateTotal();
    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

    closeCart();

    setTimeout(() => {
        alert(`🎉 Demo Checkout\n\nItems: ${itemCount}\nTotal: $${total.toFixed(2)}\n\nThis is a demo site. No actual purchase will be made.\n\nThank you for exploring StickerLah!`);

        // Clear cart after "checkout"
        cart = [];
        updateCartUI();
    }, 300);
});

// Persist cart to localStorage
function saveCart() {
    localStorage.setItem('stickerlah_cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('stickerlah_cart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}

function initCart() {
    loadCart();
    updateCartUI();
}
