
document.addEventListener('DOMContentLoaded',function() {
alert (">>connect to main.js") ;

        // **--1--CONNECTt to **INPUT AND BUTTON** HTML
        const btnProfile = document.getElementById('btnGetProfile') ;
        const btnNews = document.getElementById('btnGetNews') ;
        const tickerProfileInput = document.getElementById('tickerCompanyProfile') ;
        const tickerNewsInput = document.getElementById('tickerCompanyNews') ;

    // ensure if button available, avoid javascript error
    // event listener in javascript not onclick in html--best practice for html onlyu for structure

    // ***--2--ensure BUTTON AVAILABLE ****  
    if (btnProfile) { 
        btnProfile.addEventListener('click',getCompanyProfile);
        } // end if(btnProfile) ;
    
    if (btnNews) {
        btnNews.addEventListener('click',getCompanyNews) ;
        } // end if(btnNews) ;

        // --Fnuction for Company Profile

    //** DONE**** */
    
    //**--3--GET COMPANY PROFILE***/
    async function getCompanyProfile() {
        const ticker = tickerProfileInput.value.toUpperCase() ;

        //*** get API & CHECK TICKER  */
        // get API Key from object send from wp_localize_script
        const apiKey = finnhub_data.api_key ;

        //**--3-1--CHECK TICKER  */
        if (!ticker) {
            document.getElementById("result_company_profile").innerHTML = "<p>Please enter ticker symbol</p>" ;
            return ;
            } // end if (!ticker)
        
        

        //**3-2--input URL and place result to HTML** */
        const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`;
        const resultDiv = document.getElementById("result_company_profile");
        resultDiv.innerHTML = "fetching profile data..." ;

        
        //**3--3--START TRY EXCEPT */
        try {
            const response = await fetch(url) ;
            const data = await response.json() ;

            if (Object.keys(data).length === 0 || data.name === undefined ) {
                resultDiv.innerHTML = `<p>Data not found, pelase check your ticker symbo: ${ticker}</p>` ;
                } // end if
            
            else {
                resultDiv.innerHTML = `
                    <p><strong> Company Name : </strong> ${data.name}</p>
                    <p><strong> TIcker Symbol : </strong> ${data.ticker}</p>
                    <p><strong> Industry : </strong> ${data.finnhubIndustry}</p>
                    <p><strong> Website : </strong><a href=" ${data.weburl} target="_blank" >  ${data.weburl} </a>"</p>
                    <p><strong> <img src="${data.logo}" alt="${data.name} Logo" style= "width:100px; height:auto; "  />  </strong> </p>

                    
                    ` ; // end else --resultDinv.innerHTML
                } // end else

            } // end try


        catch (error) {
            resultDiv.innerHTML = `<p>Something went wrong. Please check Internet Connection </p>` ;
            console.error(`error fetching profile:${ticker} `, error) ;
            } // end catch

        } // end async function getCompanyProfile()

    
    
    //**4--GET COMPANY NEWS***/
    async function getCompanyNews() {

        //**--TICKER & API KEY --
        const ticker = tickerNewsInput.value.toUpperCase() ;

        //**--*API KEY --  API Key from the finnhub data, the same with the function getCompanyProfile
        const apiKey = finnhub_data.api_key ;

        
        if(!ticker) {
            document.getElementById("result_company_news").innerHTML='<p>Please enter ticker symbol</p>' ;
            return ;
             } // end if(!ticker)

        //**4-2--CONSTANTS
        //*  DATE */
        const toDate = new Date() ;
        const fromDate = new Date() ;
        
        fromDate.setDate(toDate.getDate() - 60) ; //get latest 60 days

        const to  = toDate.toISOString().split('T')[0] ;
        const from = fromDate.toISOString().split('T')[0] ;



        //***URL FETCHING & HTML const */
        const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${from}&to=${to}&token=${apiKey}` ; 

        const resultDiv = document.getElementById("result_company_news") ; 
        
        resultDiv.innerHTML = "Fetching news..." ;

        
        //**4--3--START TRY & EXCEPT */
        try {
            const response = await fetch(url) ;
            const newsData = await response.json() ;

            //**4-3-1 CHECK DATA--IF ELSE*/
            if (!newsData) {
                resultDiv.innerHTML = `<p>No news for the ${ticker}</p>` ;
                return() ;
                } // end if

            //**4-3-2 OUTPUT HTML */
            // limit only 5 latest news
            let newsHTML = newsData.slice(0,5).map(news => `
                <div class="news-item" style="border-bottom: 1px solid #ccc; margin-bottom: 15px; padding-bottom: 15px;" >
                    <p class="news-date" ><strong>Date :</strong>${new Date(news.datetime * 1000).toLocaleDateString()}</p>
                    <p class="news-title" ><strong><a href="${news.url}">${news.headline}</a></strong></p>
                    <p class="news-summary" ><strong>***</strong>${news.summary}8</p>
                    </div>
                `).join('') ;// end let newsHTML

            } //end Try
        
        catch (error) {
            resultDiv.innerHTML = `something happened when fetching data, please check you ticker:  ${ticker} ` ;
            console.error(`Error fetching news for ${ticker}`,error) ;
            } // end except


        } // end getCompanyNews()


        } // end function (getCompanyProfile, getCompanyNews)


    ); // end document.addEventListener('DOMContentLoaded') ;




