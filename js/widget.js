require(["jquery", "js/app", "daterangepicker"], function($, app, daterangepicker){
    'use strict';


    var default_checkin = $('script[id="rootrezScript"]').data("default_checkin") == undefined ? '' : $('script[id="rootrezScript"]').data("default_checkin");
    var default_checkout = $('script[id="rootrezScript"]').data("default_checkout") == undefined ? '' : $('script[id="rootrezScript"]').data("default_checkout");

     var config = {
        title_text: $('script[id="rootrezScript"]').data("title_text"),
        tagline_text: $('script[id="rootrezScript"]').data("tagline_text"),
        min_checkin : $('script[id="rootrezScript"]').data("min_checkin"),
        max_checkout : $('script[id="rootrezScript"]').data("max_checkout"),
        default_checkin : default_checkin,
        default_checkout : default_checkout,
        submission_url : $('script[id="rootrezScript"]').data("submission_url"),
        publisher_key : $('script[id="rootrezScript"]').data("publisher_key"),
        api_url : $('script[id="rootrezScript"]').data("api_url"),
        value_add_code : $('script[id="rootrezScript"]').data("value_add_code"),
        locale : $('script[id="rootrezScript"]').data("locale"),
        results_in_new_tab : $('script[id="rootrezScript"]').data("results_in_new_tab"),
        features : $('script[id="rootrezScript"]').data("features"),
        referrals : $('script[id="rootrezScript"]').data("referrals"),
        prop_types : $('script[id="rootrezScript"]').data("prop_types"),
        areas : $('script[id="rootrezScript"]').data("areas"),
     };
     $(function() {
        app.init(config);
     });
 });
