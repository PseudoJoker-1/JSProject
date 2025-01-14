const name2 = document.querySelector('.profile-name')
const email = document.querySelector('.info-item2')
const Fullname = document.querySelector('.info-item').querySelector('p')
const phone = document.querySelector('.info-item3')
const address = document.querySelector('.info-item4')
const changePasswordBtn = document.querySelector('.btn-change-password');
const orderHistoryContainer = document.getElementById('orderHistory');
const modal = document.getElementById('passwordModal');
const closeBtn = document.querySelector('.close');
const passwordForm = document.getElementById('passwordForm')

function changeName() {
    const storedName = JSON.parse(localStorage.getItem('usersData'));
    name2.textContent = storedName.username
    Fullname.textContent = storedName.username
}

changePasswordBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    passwordForm.reset();
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        passwordForm.reset();
    }
});

passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const storedPassword = JSON.parse(localStorage.getItem('usersData'));

    if(storedPassword.password != currentPassword){
        alert('Current password is incorrect!')
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }

    if (newPassword.length < 6) {
        alert('New password must be at least 6 characters long!');
        return;
    }


    alert('Password changed successfully!');

    modal.style.display = 'none';
    passwordForm.reset();
});





function loadOrderHistory() {
    const purchasedProducts = JSON.parse(localStorage.getItem('PurchasedProdData')) || [];
    
    if (purchasedProducts.length === 0) {
        orderHistoryContainer.innerHTML = `
            <div class="no-orders">
                <p>No orders found in your history.</p>
            </div>
        `;
        return;
    }

    orderHistoryContainer.innerHTML = purchasedProducts.map(product => `
        <div class="order-item">
            <img src="${product.image}" alt="${product.title}" class="order-image">
            <div class="order-details">
                <h3 class="order-title">${product.title}</h3>
                <p class="order-description">${product.description}</p>
                <span class="order-category">${product.category}</span>
            </div>
            <div class="order-price">$${product.price.toFixed(2)}</div>
        </div>
    `).join('');
}



document.addEventListener('DOMContentLoaded', () => {
    changeName();
    loadOrderHistory();
});