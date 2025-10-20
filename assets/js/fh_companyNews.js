alert ("connected to fh_companyNews.js") ;
async function getCompanyNews() {
            alert ("connected to getCompanyNews.js") ;

            const tickerCompanyNews = document.getElementById("tickerCompanyNews").value.toUpperCase();
            const apiKey = "cugpn3pr01qr6jndd8rgcugpn3pr01qr6jndd8s0";  // 🔥 Replace with your actual API key

            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - 60); // Get news from the last 30 days
            const toDate = new Date();
            
            const from = fromDate.toISOString().split('T')[0];
            const to = toDate.toISOString().split('T')[0];

            const url = `https://finnhub.io/api/v1/company-news?symbol=${tickerCompanyNews}&from=${from}&to=${to}&token=${apiKey}`;

            document.getElementById("result_company_news").innerHTML = "Fetching news...";

            try {
                const response = await fetch(url);
                const newsData = await response.json();

                if (!newsData.length) {
                    throw new Error("No news articles found.");
                }

                let newsHTML = newsData.slice(0, 5).map(news => `
                    <div class="news-item">
                        <p class="news-date">${new Date(news.datetime * 1000).toLocaleDateString()}</p>
                        <p class="news-title"><a href="${news.url}" >${news.headline}<a></p>
                        <p class="news-summary">${news.summary}</p>
                        <p><a class="news-link" href="${news.url}" target="_blank">Read more</a></p>
                    </div>
                `).join('');

                document.getElementById("result_company_news").innerHTML = newsHTML;
            } catch (error) {
                document.getElementById("result_company_news").innerHTML = "Error fetching news. Please check the ticker symbol.";
                console.error("Error:", error);
            }
        } 

