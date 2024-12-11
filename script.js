const catalog = document.querySelector('.catalog')
const nextButton = document.querySelector('#next')
const prevButton = document.querySelector('#prev')
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



