const PAGE = document.createElement('div');
PAGE.classList.add('page');
PAGE.innerHTML = `<header><h1>Users</h1></header><main id="main"></main>`;
document.body.appendChild(PAGE);
const MAIN = document.getElementById('main');


let users = getDataFromStorage(USERS);
let user = getDataFromStorage(USER_ID);
let posts = [];
let post = getDataFromStorage(POST_ID);

if (PATH.includes(PAGES.POST)) {
    if (!post) {
        goToPage(PAGES.POST, PAGES.INDEX)
    } else {
        createPostPage(post);
    }
} else if (PATH.includes(PAGES.USER)) {
    if (!user) {
        goToPage(PAGES.USER, PAGES.INDEX)
    } else {
        createUserPage(user);
    }
} else {
    if (!user?.length) {
        getUsers()
            .then(value => {
                users = value;
                setDataToStorage(USERS, users);
                initApp(users);
            });
    } else {
        initApp(users);
    }
}


document.addEventListener('click', event => {


    if (event.target.hasAttribute('data-user')) {
        const id = event.target.getAttribute('data-user');
        const user = users.find(item => item.id === parseFloat(id));
        setDataToStorage(USER_ID, user);
        goToPage(PAGES.INDEX, PAGES.USER);
        return true;
    }

    if (event.target.hasAttribute('data-posts')) {
        getUserPosts(user.id).then(value => {
            event.target.remove();
            posts = value;
            createUserPosts(posts);
        });
        return true;
    }

    if (event.target.hasAttribute('data-post')) {
        const id = parseFloat(event.target.getAttribute('data-post'));
        const post = posts.find(item => item.id === id);
        setDataToStorage(POST_ID, post);
        goToPage(PAGES.USER, PAGES.POST);
        return true;
    }

})



