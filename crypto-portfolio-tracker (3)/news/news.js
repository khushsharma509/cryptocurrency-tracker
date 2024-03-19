const API_KEY = "dec67ceae029475fb308673fec91582a";

document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'dec67ceae029475fb308673fec91582a';
    const apiUrl = `https://newsapi.org/v2/everything?q=crypto&apiKey=${apiKey}&pageSize=20`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {


            const sortedArticles = data.articles.sort((a, b) => {
                return new Date(b.publishedAt) - new Date(a.publishedAt);
            });

            const newsContainer = document.getElementById('crypto-news');
            data.articles.forEach(article => {
                const newsCard = document.createElement('div');
                newsCard.classList.add('news-card');

                const title = document.createElement('div');
                title.classList.add('news-title');
                title.textContent = article.title;

                const description = document.createElement('div');
                description.classList.add('news-description');
                description.textContent = article.description;

                const image = document.createElement('img');
                image.classList.add('news-image');
                image.src = article.urlToImage ? article.urlToImage : 'placeholder.jpg';
                image.alt = article.title;

                const link = document.createElement('a');
                link.textContent = "Read more";
                link.href = article.url;
                link.target = "_blank";

                const time = document.createElement('div');
                time.classList.add('news-time');
                time.textContent = formatDate(article.publishedAt);
                newsCard.appendChild(time);
                newsCard.appendChild(image);
                newsCard.appendChild(title);
                newsCard.appendChild(description);
                newsCard.appendChild(link);


                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => console.log(error));
});

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}