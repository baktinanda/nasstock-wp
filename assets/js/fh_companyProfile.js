alert ('connected to fh_companyProfile.js') ;

async function getCompanyProfile() {
    alert ('connected to function getCompanyProfile');

    const ticker = document.getElementById("ticker").value.toUpperCase() ;
    const apiKey = "cugpn3pr01qr6jndd8rgcugpn3pr01qr6jndd8s0" ;
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}` ;

    /*
    document.getElementById("result_test").innerHTML = 
        `
        <p>ticker: ${ticker}</p>
        <p>Api Key: ${apiKey}</p>
        <p>url : ${url}</p>
        ` ;
    */
   
    try {
        const response = await fetch(url) ;
        const data = await response.json() ;

        // if **NO DATA**
        if (Object.keys(data).length === 0) {
            document.getElementById("result_company_profile").innerHTML = 
                `<p>Data is empty, please check your ticker symbol: ${ticker}</p>
                ` ;
            }

        // yes**DATA AVAILABLE**
        else {
            //const datastring = JSON>stringify(data,null,2) ;
            document.getElementById("result_company_profile").innerHTML = 
                `
                <p>Company Name : ${data.name}</p>
                <p>Ticker Symbol : ${data.ticker}</p>
                <p>Industry : ${data.finnhubIndustry}</p>
                <p>Website : ${data.weburl} </p>
                <p>Logo Path: ${data.logo} </p>
                <p><img src="${data.logo}" style="width:100px; height:100px; " /> </p>
                
                ` ;  

            } // end else --data available
        } // end try

    catch(error) {
        document.getElementById("result_company_profile").innerHTML = 
        `
            <p>something is wrong, 
            please check the internet connection </p>
            ` ;
        } // end catch


    } // end function getCompanyProfile()