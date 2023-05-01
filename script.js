const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPosts(){
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
        const data = res.json();
        return data;
    }
    catch(error){
        console.warn(error);
    }
}


async function showPosts() {
    const posts = await getPosts();

    posts.forEach( post =>{
        const {id, title, body} = post;
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${id}</div>
        <div class="post-info">
            <h2 class="post-title">${title}</h2>
            <p class="post-body">${body}</p>
        </div>`;

        postsContainer.append(postEl);
        
    });
}
showPosts();

function showLoading() {
    loading.classList.add('show');

    setTimeout(() =>{
        loading.classList.remove('show');

        setTimeout(() =>{
            page++;
            showPosts();
        }, 300)

    }, 1000)
}

window.addEventListener('scroll', () =>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(clientHeight + scrollTop >= scrollHeight -1){
        showLoading();
    }
    setTimeout(() =>{
        console.log("Scrolling more than the middle of the page")
    }, 23000)
    

});

function filterPosts(e) { 
    console.log(12)
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    
    posts.forEach(post =>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.includes(term) || body.indexOf(term) > -1){
            post.style.display = 'flex';
        }
        else{
            post.style.display = 'none';
        }
    });

}

filter.addEventListener('input', filterPosts);