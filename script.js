const catalog = document.querySelector('.catalog')
const nextButton = document.querySelector('#next')
const prevButton = document.querySelector('#prev')
const searchBar = document.getElementById('banner-search');
const profile = document.querySelector('.profile')
const profileName = document.querySelector('.profile-name')
const cartList = document.getElementById('cartList');
const totalSumP = document.querySelector('.TotalSum')
let totalsum = 0
let cart = []
let products = [];
prevButton.style.opacity = 0
let currentIndex = 0;
const url = 'https://fakestoreapi.com/products/'; 
const options = { 
 method: 'GET', 
 headers: {
 } 
}; 

fetch(url,options) 
.then(data=>data.json()) 
.then(answer=> {
    console.log(answer)
    answer.forEach(element => {
        const block = document.createElement('div')
        block.classList.add('carousel-item')


        const image = document.createElement('img')
        image.src = element.image

        const nameBrand = document.createElement('h2')
        nameBrand.textContent = element.title
        nameBrand.classList.add('brandname')

        const price = document.createElement('p')
        price.classList.add('price')
        price.textContent = `₱ ${element.price}`
        
        const btn = document.createElement('button')

        block.append(price)
        block.append(image)
        block.append(nameBrand)
        catalog.append(block)
        products.push({title: element.title, price: element.price, image: element.image})
        console.log(products)
    }); 


})


function updateCarousel(IsNextbtn) {
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0]?.offsetWidth || 300;
    
    items.forEach(element => {
        element.style.transform = `translateX(${-currentIndex * (itemWidth + 20)}px)`
    });
    
}

nextButton.addEventListener('click', () => {
    const items = document.querySelectorAll('.carousel-item');
    prevButton.style.opacity = 1
    let Move = true
    items.forEach(element => {
        if(element.style.transform == `translateX(${-4200}px)`){
            Move = false
            nextButton.style.opacity = 0
            return 
        }
        else{
            nextButton.style.opacity = 1
            Move = true
        }
    })
    if(Move == true){
        if(currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        const items = document.querySelectorAll('.carousel-item');
        items.forEach(element => {
            if(element.style.transform == `translateX(${-280}px)`){
                prevButton.style.opacity = 0
            }
        });
        nextButton.style.opacity = 1
        currentIndex--;
        updateCarousel();
    }
});

function addToCart(product) {
    try{
        const userName2 = JSON.parse(localStorage.getItem('usersData'))
        console.log(userName2.username)
        profileName.textContent = userName2.username
        cart.push(product);
        updateCartDisplay();
    }catch{
        alert('Вы не зарегистрированы!')
    }
    

}

function removeFromCart(product) {
    cart = cart.filter(item => item !== product);
    updateCartDisplay();
}

function updateCartDisplay() {
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const title = document.createElement('p');
        title.textContent = item.title;

        const price = document.createElement('p');
        price.textContent = `₱ ${item.price}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(item));

        totalsum += item.price
        totalSumP.textContent = `Total sum: ${totalsum}₱`
        cartItem.appendChild(title);
        cartItem.appendChild(price);
        cartItem.appendChild(removeButton);

        cartList.appendChild(cartItem);
    });
}



function displayProducts(filteredProducts) {
    if(searchBar.value.trim().toLowerCase() === ''){
        const proditem = document.getElementById('productList')
        proditem.innerHTML = ''; 
    }
    else{
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; 
        console.log('Filtered products: ', filteredProducts)
            
        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.textContent = product.title;
            productItem.style.backgroundImage = 'url('+ product.image +')';
            const price = document.createElement('p');
            price.className = 'product-price';
            price.textContent = `₱ ${product.price}`;
            const addToCartBtn = document.createElement('button')
            addToCartBtn.className = 'searchBar-addtoCart'
            addToCartBtn.textContent = 'Add to cart'
            addToCartBtn.addEventListener('click', () => {
                addToCart(product)
            });
            
            productList.appendChild(productItem);
            productItem.appendChild(addToCartBtn)   
            productItem.appendChild(price)
        });
    }
    

    
}

function filterProducts() {
    const searchBar = document.getElementById('banner-search');

    const query = searchBar.value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
    displayProducts(filteredProducts);
}




function profileTransform(){
    try{
        const userName2 = JSON.parse(localStorage.getItem('usersData'))
        console.log(userName2.username)
        profileName.textContent = userName2.username
        if(profile.style.transform == `translateX(${-20}px)`){
            profile.style.transform = `translateX(${0}px)`

            profileName.style.opacity = 0
        }
        else{
            profile.style.transform = `translateX(${-20}px)`
            profileName.style.opacity = 1
        }
    } catch(error) {
        return null
    }
}

function sideBarActive(){
    if(cartList.style.transform == `translateX(${-400}px)`){
        cartList.style.transform = `translateX(${0}px)`
        
    }
    else{
        cartList.style.transform = `translateX(${-400}px)`
    }
}




searchBar.addEventListener('input', filterProducts);

displayProducts(products);


