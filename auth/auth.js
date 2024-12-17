document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault()
    const userData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    const message = document.getElementById('message');

    const formTitle = document.getElementById('formTitle');
    const button = document.querySelector('button');
    const toggleLink = document.getElementById('toggleLink');

    if (document.getElementById('formTitle').textContent === 'Вход в систему') {

        const storedPassword = JSON.parse(localStorage.getItem('usersData'));
        const password = document.getElementById('password')
        if (storedPassword.password == password.value) {
            message.textContent = 'Успешный вход!';
            message.style.color = 'green';
            window.location.href = '../index.html'
            
        } else {
            console.log(storedPassword.password)
            message.textContent = 'Неверный логин или пароль.';
            message.style.color = 'red'
        }
    } else {

        if (localStorage.getItem('username')) {
            message.textContent = 'Пользователь с таким логином уже существует.';
        } else {
            localStorage.setItem('usersData', JSON.stringify(userData));
            message.textContent = 'Регистрация прошла успешно! Теперь вы можете войти.';
            message.style.color = 'green';
            setTimeout(() => {
                message.textContent = ''
                formTitle.textContent = 'Вход в систему';
                button.textContent = 'Войти';
                toggleLink.textContent = 'Нет аккаунта? Зарегистрируйтесь!'
            }, 6000);

        }
    }
});


document.getElementById('toggleLink').addEventListener('click', function() {
    const formTitle = document.getElementById('formTitle');
    const button = document.querySelector('button');
    const toggleLink = document.getElementById('toggleLink');

    if (formTitle.textContent === 'Вход в систему') {
        formTitle.textContent = 'Регистрация';
        button.textContent = 'Зарегистрироваться';
        toggleLink.textContent = 'Уже есть аккаунт';
    }
    else{
        if(formTitle.textContent === 'Регистрация') {
            formTitle.textContent = 'Вход в систему';
            button.textContent = 'Войти';
            toggleLink.textContent = 'Нет аккаунта? Зарегистрируйтесь!'
        }
    }
    
})

function checkAuth() {
    const userStr = localStorage.getItem('usersData'); // Получаем текущего пользователя
    console.log(localStorage)
    console.log('Current user:', userStr); // Проверяем значение
    if (userStr) {
        window.location.href = '../index.html';
    }
}

document.addEventListener('DOMContentLoaded', checkAuth);
