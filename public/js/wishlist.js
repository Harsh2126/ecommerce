// Wishlist page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Remove from wishlist functionality
    const removeButtons = document.querySelectorAll('.remove-from-wishlist');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const wishlistItem = this.closest('.wishlist-item');
            const productName = wishlistItem.querySelector('h3').textContent;
            
            // Animate removal
            wishlistItem.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                wishlistItem.remove();
                updateWishlistStats();
                checkEmptyWishlist();
            }, 300);
            
            showNotification(`${productName} removed from wishlist!`, 'info');
        });
    });

    // Add to cart from wishlist
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const productName = this.closest('.wishlist-item').querySelector('h3').textContent;
            
            // Simulate adding to cart
            this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
            this.style.background = '#27ae60';
            this.disabled = true;
            
            showNotification(`${productName} added to cart!`, 'success');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                this.style.background = '#667eea';
                this.disabled = false;
            }, 2000);
        });
    });

    // Add all to cart functionality
    const addAllToCartBtn = document.getElementById('addAllToCart');
    
    addAllToCartBtn.addEventListener('click', function() {
        const wishlistItems = document.querySelectorAll('.wishlist-item');
        let addedCount = 0;
        
        wishlistItems.forEach(item => {
            const addBtn = item.querySelector('.add-to-cart-btn');
            if (!addBtn.disabled) {
                addBtn.click();
                addedCount++;
            }
        });
        
        if (addedCount > 0) {
            showNotification(`${addedCount} items added to cart!`, 'success');
        } else {
            showNotification('No new items to add to cart!', 'info');
        }
    });

    // Clear wishlist functionality
    const clearWishlistBtn = document.getElementById('clearWishlist');
    
    clearWishlistBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your entire wishlist?')) {
            const wishlistItems = document.querySelectorAll('.wishlist-item');
            
            wishlistItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'slideOut 0.3s ease-in';
                    setTimeout(() => {
                        item.remove();
                        updateWishlistStats();
                        checkEmptyWishlist();
                    }, 300);
                }, index * 100);
            });
            
            showNotification('Wishlist cleared!', 'info');
        }
    });

    // Update wishlist statistics
    function updateWishlistStats() {
        const wishlistItems = document.querySelectorAll('.wishlist-item');
        const totalItems = wishlistItems.length;
        
        // Calculate total value
        let totalValue = 0;
        wishlistItems.forEach(item => {
            const priceText = item.querySelector('.current-price').textContent;
            const price = parseFloat(priceText.replace('$', '').replace(',', ''));
            totalValue += price;
        });
        
        // Calculate average discount
        let totalDiscount = 0;
        let discountCount = 0;
        wishlistItems.forEach(item => {
            const discountText = item.querySelector('.discount').textContent;
            const discount = parseFloat(discountText.replace('% OFF', ''));
            if (!isNaN(discount)) {
                totalDiscount += discount;
                discountCount++;
            }
        });
        
        const averageDiscount = discountCount > 0 ? Math.round(totalDiscount / discountCount) : 0;
        
        // Update stats display
        const statsCards = document.querySelectorAll('.stat-card');
        statsCards[0].querySelector('p').textContent = `${totalItems} products`;
        statsCards[1].querySelector('p').textContent = `$${totalValue.toFixed(2)}`;
        statsCards[2].querySelector('p').textContent = `${averageDiscount}% off`;
    }

    // Check if wishlist is empty
    function checkEmptyWishlist() {
        const wishlistItems = document.querySelectorAll('.wishlist-item');
        const emptyWishlist = document.querySelector('.empty-wishlist');
        const wishlistContent = document.querySelector('.wishlist-content');
        
        if (wishlistItems.length === 0) {
            emptyWishlist.style.display = 'block';
            wishlistContent.style.display = 'none';
        } else {
            emptyWishlist.style.display = 'none';
            wishlistContent.style.display = 'block';
        }
    }

    // Wishlist item hover effects
    const wishlistItems = document.querySelectorAll('.wishlist-item');
    
    wishlistItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(-100%); opacity: 0; }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Price formatting
    const prices = document.querySelectorAll('.current-price, .original-price');
    prices.forEach(price => {
        const value = parseFloat(price.textContent.replace('$', '').replace(',', ''));
        if (!isNaN(value)) {
            price.textContent = '$' + value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    });

    // Initialize stats
    updateWishlistStats();
}); 