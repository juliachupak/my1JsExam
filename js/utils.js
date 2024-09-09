// set data to sessionStorage
const setDataToStorage = (key, value) => sessionStorage.setItem(key, JSON.stringify(value))

// get data from sessionStorage
const getDataFromStorage = (key) => JSON.parse(sessionStorage.getItem(key))

const getUsers = () => fetch(URI_USERS).then(value => value.json());

const getUserPosts = (id) => fetch(URI_USER_POSTS.replace(USER_ID, id)).then(value => value.json());

const getUserPostsComments = (id) => fetch(URI_USER_POST_COMMENTS.replace(POST_ID, id)).then(value => value.json());

const goToPage = (from, to) => {
    document.location.href = from === '' ? `${PATH}${to}` : PATH.replace(from, to);
}

const initApp = (array) => {
    const section = document.createElement('section');
    section.classList.add('users')
    for (const item of array) {
        const user = createUserCard(item);
        section.appendChild(user);
    }
    MAIN.appendChild(section);
}

const createUserCard = (obj) => {
    const user = document.createElement('div');
    user.classList.add('user-card');
    user.innerHTML = `
            <h2>${obj.id} ${obj.name}</h2>    
            <button data-user="${obj.id}">View profile \&rarr;</button>
        `
    return user;
}

const createUserPage = (obj) => {
    const section = document.createElement('section');
    section.classList.add('user-page');
    section.innerHTML += `<h2 class="title">Name: ${obj.name}</h2>`;
    section.innerHTML += parseObject(obj);
    section.innerHTML += `<button data-posts="">Post of current user \&rarr;</button>`;
    MAIN.appendChild(section);
}

const parseObject = (object) => {
    let html = ``;
    for (const key in object) {
        if (key !== "name" && key !== "title") {
            const value = object[key];
            if (typeof value !== 'object') {
                html += `
                    <dl>
                        <dt>${key}</dt>
                        <dd>${value}</dd>
                    </dl>`
            } else {
                html += `<dl><dt class="parent">${key}</dt><dd>`;
                html += parseObject(value);
                html += `</dd></dl>`
            }
        }
    }
    return html;
}

const createUserPosts = (arr) => {
    let html = `<h3>Post of current user</h3>`;
    html += `<div class="user-posts">`
    for (const item of arr) {
        html += `<button data-post="${item.id}">${item.title}</button>`
    }
    html += `</div>`
    const section = MAIN.querySelector('section');
    section.innerHTML += html;
}

const createPostPage = (obj) => {
    const section = document.createElement('section');
    section.classList.add('user-post');
    section.innerHTML += `<h2 class="title">Title: ${obj.title}</h2>`;
    section.innerHTML += parseObject(obj);

    MAIN.appendChild(section);

    getUserPostsComments(obj.id).then(value => {
        let html = `<h3 class="comments-title">Comments</h3><div class="comments">`;
        html += value.reduce((result, item) => {
            result += `<div class="comment"><h4>${item.name}</h4><p>${item.body}</p><small>${item.email}</small></div>`;
            return result;
        }, ``);
        html += `</div>`;
        section.innerHTML += html;
    });
}
