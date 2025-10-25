// Pastikan DOM sudah termuat sepenuhnya sebelum menjalankan script

document.addEventListener('DOMContentLoaded', function () {

    

    // Ambil tombol dan input dari HTML

    const btnProfile = document.getElementById('btnGetProfile');

    const btnNews = document.getElementById('btnGetNews');

    const tickerProfileInput = document.getElementById('tickerProfile');

    const tickerNewsInput = document.getElementById('tickerNews');

    

    // Tambahkan event listener ke tombol, bukan menggunakan onclick di HTML

    if (btnProfile) {

        btnProfile.addEventListener('click', getCompanyProfile);

    }

    

    if (btnNews) {

        btnNews.addEventListener('click', getCompanyNews);

    }



    // --- FUNGSI UNTUK COMPANY PROFILE ---

    async function getCompanyProfile() {

        const ticker = tickerProfileInput.value.toUpperCase();

        

        // Ambil API Key dari objek yang dikirim oleh wp_localize_script

        const apiKey = finnhub_data.api_key;

        

        if (!ticker) {

            document.getElementById("result_company_profile").innerHTML = '<p>Please enter a ticker symbol.</p>';

            return;

        }



        const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`;

        const resultDiv = document.getElementById("result_company_profile");

        resultDiv.innerHTML = "Fetching profile...";



        try {

            const response = await fetch(url);

            const data = await response.json();



            if (Object.keys(data).length === 0 || data.name === undefined) {

                resultDiv.innerHTML = `<p>Data not found. Please check your ticker symbol: ${ticker}</p>`;

            } else {

                resultDiv.innerHTML = `

                    <p><strong>Company Name:</strong> ${data.name}</p>

                    <p><strong>Ticker Symbol:</strong> ${data.ticker}</p>

                    <p><strong>Industry:</strong> ${data.finnhubIndustry}</p>

                    <p><strong>Website:</strong> <a href="${data.weburl}" target="_blank">${data.weburl}</a></p>

                    <p><img src="${data.logo}" alt="${data.name} Logo" style="width:100px; height:auto;" /></p>

                `;

            }

        } catch (error) {

            resultDiv.innerHTML = `<p>Something went wrong. Please check the internet connection.</p>`;

            console.error("Error fetching profile:", error);

        }

    }



    // --- FUNGSI UNTUK COMPANY NEWS ---

    async function getCompanyNews() {

        const ticker = tickerNewsInput.value.toUpperCase();



        // Ambil API Key dari objek yang sama

        const apiKey = finnhub_data.api_key;

        

        if (!ticker) {

            document.getElementById("result_company_news").innerHTML = '<p>Please enter a ticker symbol.</p>';

            return;

        }



        const toDate = new Date();

        const fromDate = new Date();

        fromDate.setDate(toDate.getDate() - 60); // Ambil berita 60 hari terakhir



        const to = toDate.toISOString().split('T')[0];

        const from = fromDate.toISOString().split('T')[0];



        const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${from}&to=${to}&token=${apiKey}`;

        const resultDiv = document.getElementById("result_company_news");

        resultDiv.innerHTML = "Fetching news...";



        try {

            const response = await fetch(url);

            const newsData = await response.json();



            if (!newsData || newsData.length === 0) {

                 resultDiv.innerHTML = `<p>No news found for ticker: ${ticker}</p>`;

                 return;

            }



            // Batasi hanya 5 berita teratas

            let newsHTML = newsData.slice(0, 5).map(news => `

                <div class="news-item" style="border-bottom: 1px solid #ccc; margin-bottom: 15px; padding-bottom: 15px;">

                    <p class="news-date"><strong>Date:</strong> ${new Date(news.datetime * 1000).toLocaleDateString()}</p>

                    <p class="news-title"><strong><a href="${news.url}" target="_blank">${news.headline}</a></strong></p>

                    <p class="news-summary">${news.summary}</p>

                </div>

            `).join('');



            resultDiv.innerHTML = newsHTML;

        } catch (error) {

            resultDiv.innerHTML = `<p>Error fetching news. Please check the ticker symbol.</p>`;

            console.error("Error fetching news:", error);

        }

    }

});