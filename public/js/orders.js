// Orders page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Order status filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const orderCards = document.querySelectorAll('.order-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const status = this.getAttribute('data-status');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter orders
            let visibleCount = 0;
            orderCards.forEach(card => {
                if (status === 'all' || card.getAttribute('data-status') === status) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show empty state if no orders match filter
            const emptyOrders = document.querySelector('.empty-orders');
            if (visibleCount === 0) {
                emptyOrders.style.display = 'block';
            } else {
                emptyOrders.style.display = 'none';
            }
        });
    });

    // Order action buttons
    const orderActions = document.querySelectorAll('.order-actions .btn');
    
    orderActions.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const orderCard = this.closest('.order-card');
            const orderNumber = orderCard.querySelector('h3').textContent;
            
            switch(action) {
                case 'View Details':
                    showNotification(`Viewing details for ${orderNumber}`, 'info');
                    break;
                case 'Rate Product':
                    showNotification(`Rating system for ${orderNumber}`, 'info');
                    break;
                case 'Buy Again':
                    showNotification(`Adding items from ${orderNumber} to cart`, 'success');
                    break;
                case 'Track Package':
                    showNotification(`Tracking package for ${orderNumber}`, 'info');
                    break;
                case 'Cancel Order':
                    if (confirm('Are you sure you want to cancel this order?')) {
                        orderCard.style.animation = 'slideOut 0.3s ease-in';
                        setTimeout(() => {
                            orderCard.remove();
                            updateOrderStats();
                            checkEmptyOrders();
                        }, 300);
                        showNotification(`Order ${orderNumber} cancelled`, 'info');
                    }
                    break;
            }
        });
    });

    // Update order statistics
    function updateOrderStats() {
        const orderCards = document.querySelectorAll('.order-card');
        const totalOrders = orderCards.length;
        
        // Calculate total spent
        let totalSpent = 0;
        orderCards.forEach(card => {
            const totalText = card.querySelector('.order-total').textContent;
            const total = parseFloat(totalText.replace('Total: $', '').replace(',', ''));
            totalSpent += total;
        });
        
        // Calculate average rating (simulated)
        const averageRating = (4.5 + Math.random() * 0.5).toFixed(1);
        
        // Update stats display
        const statsCards = document.querySelectorAll('.stat-card');
        statsCards[0].querySelector('p').textContent = `${totalOrders} orders`;
        statsCards[1].querySelector('p').textContent = `$${totalSpent.toFixed(2)}`;
        statsCards[2].querySelector('p').textContent = `${averageRating}/5`;
    }

    // Check if orders list is empty
    function checkEmptyOrders() {
        const orderCards = document.querySelectorAll('.order-card');
        const emptyOrders = document.querySelector('.empty-orders');
        const ordersContent = document.querySelector('.orders-content');
        
        if (orderCards.length === 0) {
            emptyOrders.style.display = 'block';
            ordersContent.style.display = 'none';
        } else {
            emptyOrders.style.display = 'none';
            ordersContent.style.display = 'block';
        }
    }

    // Order card hover effects
    orderCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Order status animations
    const processingStatus = document.querySelector('.order-status.processing i');
    if (processingStatus) {
        processingStatus.classList.add('fa-spin');
    }

    // Order date formatting
    const orderDates = document.querySelectorAll('.order-date');
    orderDates.forEach(date => {
        const dateText = date.textContent;
        const dateMatch = dateText.match(/Placed on: (.+)/);
        if (dateMatch) {
            const originalDate = new Date(dateMatch[1]);
            const formattedDate = originalDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            date.textContent = `Placed on: ${formattedDate}`;
        }
    });

    // Price formatting
    const orderTotals = document.querySelectorAll('.order-total, .item-price');
    orderTotals.forEach(total => {
        const priceText = total.textContent;
        const priceMatch = priceText.match(/\$([\d,]+\.?\d*)/);
        if (priceMatch) {
            const price = parseFloat(priceMatch[1].replace(',', ''));
            if (!isNaN(price)) {
                const formattedPrice = price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                total.textContent = total.textContent.replace(priceMatch[0], `$${formattedPrice}`);
            }
        }
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
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(-100%); opacity: 0; }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .fa-spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Order status color coding
    const statusElements = document.querySelectorAll('.order-status');
    statusElements.forEach(status => {
        const statusText = status.textContent.trim();
        const icon = status.querySelector('i');
        
        // Add pulse animation for pending orders
        if (statusText === 'Pending') {
            icon.style.animation = 'pulse 2s infinite';
        }
        
        // Add bounce animation for shipped orders
        if (statusText === 'Shipped') {
            icon.style.animation = 'bounce 2s infinite';
        }
    });

    // Add additional CSS for animations
    const additionalStyle = document.createElement('style');
    additionalStyle.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(additionalStyle);

    // Initialize stats
    updateOrderStats();
}); 