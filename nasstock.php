<?php 
/**
 * Plugin Name: Nas Stock Information
 * Description: US Stock information
 * Version: 0.1
 * Author: Bakti Idaman Nanda
 */

// avoid direct access to file
if (! defined('ABSPATH')) {
    exit;
    } // end if ! abspath

//**--1--REGISTER JAVASCRIPT FILES, CSS FILES */ */
function nasstock_enqueue_assets() {
    // 1. REGISTER CSS FILE
    wp_enqueue_style(
        'nasstock-custom-styles', // 1. Name of this Function
        plugin_dir_url( __FILE__ ).'/assets/css/styles.css', // 2. Location of CSS file
        array(),    // 3. Requirement of Library/ No need other Library 
        '0.1',      // 4. Style Version
        true        // 5. Put script below
        ) ;         // end of wp_enqueue_style

    // 2. REGISTER JAVASCRIPT FILE
    wp_enqueue_script(
        'nasstock-fh-company-profile-js',   // name of --thisfunction--
        plugin_dir_url( __FILE__ ).'/assets/js/fh_companyProfile.js',     // location of --javaScript file--
        array() ,   // Library required
        '1.0' ,     // Version of JavaScript file
        true        // put Script below
        ) ;         // end of -  wp_enqueue_script()

    // 3 . REGISTER JAVASCRIPT FILE
     wp_enqueue_script(
        'nasstock-fh-company-news-js',   // name of --thisfunction--
        plugin_dir_url( __FILE__ ).'/assets/js/fh_companyNews.js',     // location of --javaScript file--
        array() ,    // Library required
        '1.0' ,      // Version of JavaScript file
        true         // put Script below
        ) ;          // end of -  wp_enqueue_script()

    // Send Finhubb API Key to JavaScript safely
    //wp_localize_script( 'nasstock-fh-company-profile-js','finnhub-data',array(
   //     'api_key' => 'cugpn3pr01qr6jndd8rgcugpn3pr01qr6jndd8s0'
    //    )) ;        // wp_localize_script


    } // end function finnhub_enqueue_assets() 

// **2** CONNECT JAVASCRIPTS FILES, CSS FILES TO HOOK TO CONNECT WORDPRESS SYSTEM
add_action( 'wp_enqueue_scripts','nasstock_enqueue_assets' ) ; 




//** **/ DISPLAY HTML 
function fh_html_companyProfileAndNews() {
    ob_start() ;
    ?>  <!-- ***end PHP start HTML*** -->

<!--START HTML TEMPLATE-->
    <h1>WordPress Finance API</h1> 
    <div class="finnhub-container" >
        <h3>Stock Company Profiel</h3>
        <p>Stock Company Profile -Basic Information </p>
        <input type="text" id="ticker" placeholder="type Stock TICKER..." />
        <button onclick="getCompanyProfile()" >Get Company Profile</button>
        <div id="result_company_profile" >Company Profile</div>
    </div>
    
    <div class="finnhub-container" >
        <h3>Stock Latest News</h3>
        <p>Company Updated News</p>
        <input type="text" id="tickerCompanyNews" placeholder="type Stock TICKER..." />
        <button onclick="getCompanyNews()" >Get Company News</button>
        <div id="result_company_news" >Latest Stock News</div>
    </div>

    
    <!--END HTML TEMPLATE-->
    <!-- ***start PHP End HTML*** -->
    <?php 
    return ob_get_clean() ;
    
    }   // end fh_html_companyProfileAndNews()


// FUNCTIONS<-->SHORTCODE<-->WORDPRESS SYSTEM        
//REGISTER SHORT CODE TO FUNCTION TO CONNECT TO WORDPRESS SYSTEM 

add_shortcode('fhCompanyProfileAndNews','fh_html_companyProfileAndNews')  ;
