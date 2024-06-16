const logoutButton = document.querySelector('.logout-button');

logoutButton.addEventListener('click', function () {
    (async () => {
        const rawResponse = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const content = await rawResponse.json();

        if (content.loggedOut) {
            window.location.href = '/register.html';
        } else {
            alert('Logout failed');
        }
    })();
});