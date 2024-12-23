const name2 = document.querySelector('.profile-name')
const email = document.querySelector('.info-item2')
const Fullname = document.querySelector('.info-item').querySelector('p')
const phone = document.querySelector('.info-item3')
const address = document.querySelector('.info-item4')


function changeName() {
    const storedName = JSON.parse(localStorage.getItem('usersData'));
    name2.textContent = storedName.username
    Fullname.textContent = storedName.username
}


function initializeSocialIcons() {
    const icons = {
        'icon-globe': `
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        `,
        'icon-twitter': `
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
        `,
        'icon-facebook': `
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
        `,
        'icon-instagram': `
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
        `
    };

    document.querySelectorAll('.social-link i').forEach(icon => {
        const iconName = Array.from(icon.classList).find(cls => cls.startsWith('icon-'));
        if (iconName && icons[iconName]) {
            icon.innerHTML = icons[iconName];
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initializeSocialIcons();
    changeName();
});