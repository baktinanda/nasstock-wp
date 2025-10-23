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

    //**GET COMPANY PROFILE***/
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

        //**START TRY EXCEPT */
        try {

            } // end try
        catch (error) {

            } // end catch

        } // end async function getCompanyProfile()

    //**GET COMPANY NEWS***/
    async function getCompanyNews() {
        const ticker = tickerNewsInput.value.toUpperCase() ;

        //API KEY
        // get API Key from the finnhub data, the same with the function getCompanyProfile
        const apiKey = finnhub_data.api_key ;
        if(!ticker) {
            document.getElementById("result_company_news").innerHTML='<p>Please enter ticker symbol</p>' ;
            return ;
             } // end if(!ticker)

        /**DATE */
        const toDate = new Date() ;
        const fromDate = new Date() ;
        
        fromDate.setDate(toDate.getDate() - 60) ; //get last 60 days

        const to  = toDate.toISOString.split('T')[0] ;
        const from = fromDate.toISOString.splut('T')[0] ;

        //***URL FETCHING  */
        const url = `` ; 
        const resultDiv.innerHTML = "Fetching news..." ;

        
        //**START TRY & EXCEPT */
        try {
        //********* */
        //********* */
        //********* */
        //********* */
        //********* */
        //********* */
            } //end Try
        
        catch (error) {
            //********* */
            //********* */
            //********* */
            //********* */
            //********* */

            //********* */

            } // end except


        } // end getCompanyNews()


        }) // end function (getCompanyProfile, getCompanyNews)


    ); // end document.addEventListener('DOMContentLoaded') ;




