const catalog = document.querySelector('.catalog')
const nextButton = document.querySelector('#next')
const prevButton = document.querySelector('#prev')
const searchBar = document.getElementById('banner-search');
const profile = document.querySelector('.profile')
const profileName = document.querySelector('.profile-name')
const cartList = document.getElementById('cartList');
const totalSumP = document.querySelector('.TotalSum')
const productsBtn = document.querySelector('.Products')
const header = document.querySelector('header');
const ProductsSection = document.querySelector('.ProductsSect')
const dropdown = document.querySelector('.dropdown')


let foundOne = false
let OnProducts = false
let totalsum = 0
let allCart = []
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

function checkDuplicatesAndRemove(arr, key, newItem) {
    const seen = new Set(); 
    const uniqueItems = arr.filter(item => {
        if (seen.has(item[key])) {
            return false; 
        }
        seen.add(item[key]);
        return true; 
    });

    if (uniqueItems.length < arr.length) {
        console.log(uniqueItems)
        return uniqueItems
    } else {
        console.log('No duplicates found');
        return uniqueItems
    }
    return uniqueItems
}

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
        product.amount += 1
        allCart.push(product);
        console.log(allCart);
        var checkDuplicate = checkDuplicatesAndRemove(allCart,'id',product)
        console.log('Checkduplicate result: ',checkDuplicate)
        updateCartDisplay(checkDuplicate);
        totalsum += product.price
        totalSumP.textContent = `Total sum: ${totalsum.toFixed(2)}₱`
    }catch(error){
        window.location.href = '../auth/auth.html'
    }
    

}

function removeFromCart(product) {
    
    allCart = allCart.filter(item => item !== product);
    console.log('All cart:',allCart)
    totalsum -= product.price * product.amount
    product.amount = 0
    console.log(totalsum)
    totalSumP.textContent = `Total sum: ${totalsum.toFixed(2)}₱`
    var checkDuplicate = checkDuplicatesAndRemove(allCart,'id',product)
    console.log('Checkduplicate result: ',checkDuplicate)
    updateCartDisplay(checkDuplicate);

}

function AddItem(item1){
    var result = allCart.find(item => item.title === item1.title)
    totalsum += item1.price
    totalSumP.textContent = `Total sum: ${totalsum.toFixed(2)}₱`
    result.amount += 1
    console.log('add item result: ',allCart)
    var checkDuplicate = checkDuplicatesAndRemove(allCart,'id',item1)
    console.log('Checkduplicate result: ',checkDuplicate)
    updateCartDisplay(checkDuplicate);
}

function RemoveItem(item2){
    console.log('Item 2 price: ',item2.price)
    var result = allCart.find(item => item.title === item2.title)
    totalsum -= item2.price.toFixed(2)
    totalSumP.textContent = `Total sum: ${totalsum.toFixed(2) * 1}₱`
    var checkDuplicate = checkDuplicatesAndRemove(allCart,'id',item2)
    console.log('Checkduplicate result: ',checkDuplicate)
    result.amount -= 1
    updateCartDisplay(checkDuplicate);
}



function updateCartDisplay(cartarg) {
    Array.from(cartList.children).forEach(child => {
        if (child.tagName !== 'P' && child.tagName !== 'BUTTON') {
            child.remove();
        }

    });
    
        cartarg.forEach(item => {
            if(item.amount === 0){
                console.log('item amount is zero!')
                totalSumP.textContent = `Total sum: ${totalsum.toFixed(2) * 1}₱ `
                
                return null

            }
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            const title = document.createElement('p');
            title.textContent = item.title;
            title.className = 'Product-title'
            const price = document.createElement('p');
            price.textContent = `₱ ${item.price}`;
            const AddRemoveMore = document.createElement('div')
            AddRemoveMore.className = 'AddRemoveMore'
            const Amount = document.createElement('p')
            Amount.className = 'Amount'
            Amount.style.fontSize = '15px'
            Amount.textContent = item.amount
            const Addbtn = document.createElement('button')
            Addbtn.className = 'Addmore'
            Addbtn.textContent = '+'
            Addbtn.addEventListener('click', () => AddItem(item))
            const Removebtn = document.createElement('button')
            Removebtn.className = 'Removemore'
            Removebtn.textContent = '-'
            Removebtn.addEventListener('click', () => RemoveItem(item))
            AddRemoveMore.appendChild(Addbtn)
            AddRemoveMore.appendChild(Amount)
            AddRemoveMore.appendChild(Removebtn)      
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removeFromCart(item));
            cartItem.appendChild(title);
            cartItem.appendChild(price);
            cartItem.appendChild(AddRemoveMore)
            cartItem.appendChild(removeButton);
            cartList.appendChild(cartItem);
        })

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

function buyFunc(){
    if(allCart.length !== 0){
        alert('Successful!')
        totalsum -= totalsum
        totalSumP.textContent = `Total sum: ${totalsum}₱`
        localStorage.setItem('PurchasedProdData', JSON.stringify(allCart));
        Array.from(cartList.children).forEach(child => {
            if (child.tagName !== 'P' && child.tagName !== 'BUTTON') {
                child.remove();
            }
        });

    }
    
}

function ShowProducts() {
    console.log('Called showProducts function');

    Array.from(document.body.children).forEach(child => {
        if (
            child.tagName !== 'HEADER' &&
            child.tagName !== 'FOOTER' &&
            child.className !== 'ProductsSect' &&
            child.className !== 'products-container' &&
            child.tagName !== 'SCRIPT'
        ) {
            child.style.display = 'none';
        }
    });

    Array.from(header.children).forEach(child => {
        if (!child.classList.contains('head')) {
            child.style.display = 'none';
        }
    });

    OnProducts = true;

    fetch(url, options)
        .then(data => data.json())
        .then(answer2 => {
            console.log(answer2);

            // Создаем контейнер для продуктов
            const productsContainer = document.createElement('div');
            productsContainer.classList.add('products-container');
            ProductsSection.append(productsContainer);

            // Функция для отображения продуктов
            function displayProducts(products) {
                productsContainer.innerHTML = ''; // Очищаем контейнер
                products.forEach(element => {
                    const block = document.createElement('div');
                    block.classList.add('products-List');

                    const image = document.createElement('img');
                    image.src = element.image;

                    const nameBrand = document.createElement('h2');
                    nameBrand.textContent = element.title;
                    nameBrand.classList.add('brandname2');

                    const price = document.createElement('p');
                    price.classList.add('price2');
                    price.textContent = `₱ ${element.price}`;

                    const btn = document.createElement('button');
                    btn.classList.add('buybtn2');
                    element['amount'] = 0;
                    btn.textContent = 'Buy';
                    btn.addEventListener('click', () => {
                        addToCart(element);
                    });

                    block.append(image);
                    block.append(nameBrand);
                    block.append(price);
                    block.append(btn);
                    productsContainer.append(block);
                });
            }

            // Отображаем продукты при первой загрузке
            displayProducts(answer2);

            // Добавляем сортировку
            const sortMenu = document.createElement('div');
            sortMenu.classList.add('sort-menu');

            const ascendingBtn = document.createElement('button');
            ascendingBtn.textContent = 'Sort Ascending';
            ascendingBtn.addEventListener('click', () => {
                const sorted = [...answer2].sort((a, b) => a.price - b.price);
                displayProducts(sorted);
            });

            const descendingBtn = document.createElement('button');
            descendingBtn.textContent = 'Sort Descending';
            descendingBtn.addEventListener('click', () => {
                const sorted = [...answer2].sort((a, b) => b.price - a.price);
                displayProducts(sorted);
            });

            sortMenu.append(ascendingBtn, descendingBtn);
            ProductsSection.prepend(sortMenu);
        });
}



function ShowHome(){
    if(OnProducts === true){
        Array.from(document.body.children).forEach(child => {
            if (child.tagName !== 'HEADER' && child.tagName !== 'FOOTER' && child.className !== 'ProductsSect' && child.className !== 'products-container' && child.tagName !== 'SCRIPT') {
                if(child.className === 'about-us'){
                    child.style.display = 'flex'
                }
                else{
                    child.style.display = 'block';
                }
                OnProducts = false

            }
        });
        Array.from(header.children).forEach(child => {
            if (!child.classList.contains('head')) {
              child.style.display = 'block'; 
            }
          });

          ProductsSection.innerHTML = '';

    }

}




searchBar.addEventListener('input', filterProducts);

displayProducts(products);


