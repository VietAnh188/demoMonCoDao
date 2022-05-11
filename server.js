const username = document.querySelector('#username');
const email = document.querySelector('#email');
const submit = document.querySelector('#submit');
const getBtn = document.querySelector('.get');
const deleteBtn = document.querySelector('#delete');
const updateBtn = document.querySelector('#update');
const findBtn = document.querySelector('#find');
const inputId = document.querySelector('#inputId');

const handleSubmit = () => {
    if (username.value && email.value) {
        const request = {
            username: username.value,
            email: email.value,
        };
        handleSubmitPost('http://localhost:2000/user', request);
    } else {
        console.log({
            message: 'Please fill in all the fields',
        });
    }
};

const handleSubmitPost = async (api, request) => {
    try {
        await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
    } catch (error) {
        console.log({
            message: error,
        });
    }
};

const handleSubmitGet = async api => {
    try {
        const response = await fetch(api);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log({
            message: error,
        });
    }
};

const handleSubmitPut = async (api, request) => {
    try {
        await fetch(api, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
    } catch (error) {
        console.log({
            message: error,
        });
    }
};

const handleSubmitDelete = async api => {
    try {
        await fetch(api, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log({
            message: error,
        });
    }
};

const handleRender = data => {
    const responses = document.querySelector('.responses');
    responses.innerHTML = data
        .map(
            item => `<li>
                        <span>${item.id}</span>
                        <span>${item.username}</span>
                        <span>${item.email}</span>
                    </li>`
        )
        .join('');
};

const handleFind = async id => {
    try {
        const response = await handleSubmitGet(
            `http://localhost:2000/user/${id}`
        );
        handleRender([response]);
    } catch (error) {
        console.log({
            message: error,
        });
    }
};

submit.addEventListener('click', handleSubmit);
getBtn.addEventListener('click', event => {
    event.preventDefault();
    const data = handleSubmitGet('http://localhost:2000/user');
    data.then(data => handleRender(data));
});
updateBtn.addEventListener('click', event => {
    event.preventDefault();
    if (inputId.value) {
        if (username.value || email.value) {
            const request = {
                username: username.value,
                email: email.value,
            };
            handleSubmitPut(
                `http://localhost:2000/user/${inputId.value}`,
                request
            );
        }
    }
});
deleteBtn.addEventListener('click', event => {
    event.preventDefault();
    if (inputId.value) {
        handleSubmitDelete(`http://localhost:2000/user/${inputId.value}`);
    }
});
findBtn.addEventListener('click', event => {
    event.preventDefault();
    if (inputId.value) {
        handleFind(inputId.value);
    }
});
