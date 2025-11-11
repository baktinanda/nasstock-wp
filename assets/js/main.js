alert (">>connect to main.js--test 07") ;
console.log(">>connect to main.js") ;

document.addEventListener('DOMContentLoaded',function(){

        // connet to input and button from html
        const btnProfile = document.getElementById('btnGetProfile') ;
        const btnNews = document.getElementById('btnGetNews') ;
        const tickerProfileInput = document.getElementById('tickerCompanyProfile') ;
        const tickerNewsInput = document.getElementById('tickerCompanyNews') ;

    // ensure if button available, avoid javascript error
    // event listener in javascript not onclick in html--best practice for html onlyu for structure

    // Connect Button to Function 
    if (btnProfile) {
        btnProfile.addEventListener('click',getCompanyProfile);
        
        } // end if(btnProfile) ;
    
    if(btnNews) {
        btnNews.addEventListener('click',getCompanyNews) ;
        } // end if(btnNews) ;

        // --Function for Company Profile



    //**GET COMPANY PROFILE***/
    async function getCompanyProfile() {
        alert ('connect -->  getCompanyProfile()') ;
        const ticker = tickerProfileInput.value.toUpperCase() ;

        // get API Key from object send from wp_localize_script
        const apiKey = finnhub_data.api_key ;

        if (!ticker) {
            document.getElementById("result_company_profile").innerHTML = "<p>Please enter ticker symbol</p>" ;
           return ;
            } // end if (!ticker)
        //---isi function---
        
        const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`;
        const resultDiv = document.getElementById("result_company_profile");
        resultDiv.innerHTML = `<p>checking api key and url--> apiKey: ${apiKey} -- url : ${url}</p>` ; 

        //**START TRY EXCEPT */
        try {
            alert ("connect to  getCompanyProfile() --try ") ;
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
                    <p><strong> Website : </strong><a href=" ${data.weburl}" target="_blank" >  ${data.weburl} </a></p>
                    <p><strong> <img src="${data.logo}" alt="${data.name} Logo" style= "width:100px; height:auto; "  />  </strong> </p>

                    
                    ` ; // end else --resultDinv.innerHTML
                } // end else


            } // end try
        catch (error) {
            console.error() ;
             resultDiv.innerHTML = `<p>Something went wrong. Please check Internet Connection </p>` ;
            console.log("getCompanyProfile() catch error ") ;

            } // end catch

        } // end async function getCompanyProfile()








    //**GET COMPANY NEWS***/
    async function getCompanyNews() {
        alert ('connect to function: getCompanyNews()') ; 
        const ticker = tickerNewsInput.value.toUpperCase() ;        

         // get API Key from object send from wp_localize_script
        const apiKey = finnhub_data.api_key ;


        if (!ticker) {
            document.getElementById("result_company_news").innerHTML = "<p>getCompanyNews(): Please enter ticker symbol</p>" ;
            return ;
            }
        
        
        // Define output const --resultDiv 
        const resultDiv = document.getElementById("result_company_news");
        resultDiv.innerHTML = "Fetching news..." ;
        
        
        //**START TRY & EXCEPT */
        try {
        alert ('Try--getCompanyNews()') ;
            } //end Try
        
        catch (error) {
            alert('Catch--getCompanyNews()') ;

            } // end except


        } // end getCompanyNews()


        }  ); // end function (getCompanyProfile, getCompanyNews) 
    // end document.addEventListener('DOMContentLoaded') ;




