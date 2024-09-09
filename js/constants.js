const USER_ID = 'USER_ID';
const POST_ID = 'POST_ID';
const USERS = 'USERS';

const URI_USERS = 'https://jsonplaceholder.typicode.com/users';
const URI_USER_POSTS = 'https://jsonplaceholder.typicode.com/users/USER_ID/posts';
const URI_USER_POST_COMMENTS = 'https://jsonplaceholder.typicode.com/posts/POST_ID/comments';

const PATH = document.location.href;

// Pages INDEX for local develop is 'index.html', for GitHub is ''
const PAGES = {
    INDEX: location.origin.includes('localhost') ? 'index.html' : '',
    USER: 'pages/user-details.html',
    POST: 'pages/post-details.html',
}

