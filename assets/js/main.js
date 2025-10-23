alert (">>connect to main.js") ;
document.addEventListener('DOMContentLoaded',function({

        // connet to input and button from html
        const btnProfile = document.getElementById('btnGetProfile') ;
        const btnNews = document.getElementById('btnGetNews') ;
        const tickerProfileInput = document.getElementById('tickerProfile') ;
        const tickerProfileInput = document.getElementById('tickerNews') ;

    // ensure if button available, avoid javascript error
    // event listener in javascript not onclick in html--best practice for html onlyu for structure

    // ensure Button Profile 
    if (btnProfile) {
        btnProfile.addEventListener('click',getCompanyProfile);
        } // end if(btnProfile) ;
    
    if(btnNews) {
        btnNews.addEventListener('click',getCompanyNews) ;
        } // end if(btnNews) ;

        // --Fnuction for Company Profile

    async function getCompanyProfile() {
        const ticker = tickerProfileInput.ariaValueMax.toUpperCase() ;

        // get API Key from object send from wp_localize_script
        const apiKey = finnhub_data.api_key ;

        if (!ticker) {
            document.getElementById().innerHTML = "<p>Please enter ticker symbol</p>" ;
            } // end if (!ticker)
        //---isi function---
        
        const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`;
        const resultDiv = document.getElementById("result_company_profile");
        resultDiv.innerHTML = "fetching profile data..." ;

        try {} // end try
        catch {error} // end catch

        } // end async function getCompanyProfile()

    async function getCompanyNews() {
        


        } // end getCompanyNews()


        }) // end function (getCompanyProfile, getCompanyNews)


    ); // end document.addEventListener('DOMContentLoaded') ;




