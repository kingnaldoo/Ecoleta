document.querySelector('#page-home section main button').addEventListener('click',() => {
    document.querySelector('#search').style.display = 'block';
})

document.querySelector('#content #top img').addEventListener('click',() => {
    document.querySelector('#search').style.display = 'none';
})

document.querySelector('#search-bar').addEventListener('keyup', (event) => {
    if(event.key == 'Enter' && document.querySelector('#search-bar input').value != ''){
        window.location.href = "/search-results"
    }
})