define([
  "jquery",
  "text!resources/template/form.html",
  "text!dist/style.css",
], function ($, formHtml, widgetcss, cleanslatecss, pickercss) {
  "use strict";

  // private variables here...
  var settings, $form;

  var app = {
    init: function (config) {
      // get the settings and make them available through the app
      settings = config;
      
      if(!settings.hasOwnProperty('locale') || settings.locale === undefined){
      	settings.locale = "en-us";
      }

      var $widgetStyle = $("<style></style>", {
        type: "text/css",
      });
      $widgetStyle.text(widgetcss);
      $("head").append($widgetStyle);

      var $cleanslateStyle = $("<style></style>", {
        type: "text/css",
      });
      $cleanslateStyle.text(cleanslatecss);
      $("head").append($cleanslateStyle);

      var $pickerStyle = $("<style></style>", {
        type: "text/css",
      });
      $pickerStyle.text(pickercss);
      $("head").append($pickerStyle);

      $("#RootRezWidget").append(formHtml);
      // get a reference of the form after is inserted
      $form = $("#rootrez-widget-form");
      // call initialization methods
      initializeEvents(settings);

      // Guest toggle
      $(".search_occupancy-event").click(function () {
        $(".search_occupancy").toggleClass("open");
      });

      $(".search_occupancy-counter .cancel").click(function () {
        $(".search_occupancy").toggleClass("open");
      });
      // Promo Code toggle
      $(".search_promo_code-event").click(function () {
        $(".search_promo_code").toggleClass("open");
      });
      //$(".search_promo_code .cancel").click(function () {
      	//removed. This comment added to force github to recognize this change in a pull request.
      //});
    
    //$("#dealApply").click(function(){
      	//removed. This comment added to force github to recognize this change in a pull request.
    //});
    
    $("#guestApply").click(function(){
      $(".search_occupancy").toggleClass("open");
    });
    
    
      if(settings.locale == "fr-ca"){
      	$("#guests_txt").text("Clients ");
      	$("#localeSearch").text("Rechercher");
      	$("#guestApply").text("Appliquer");
      	$("#guestCancel").text("Annuler");
      	$("#localeChildren").text("Enfants");
      	$("#localeAdults").text("Adultes");
      	$("#rootrez_daterangepicker").text("Arrivée → Départ");
      	$("#dealApply").text("Appliquer");
      	$("#dealCancel").text("Annuler");
      }

    // Guest Counter
    var $apbutton = $(".adults .p-btn");
    var $ambutton = $(".adults .m-btn");
    var $acounter = $(".adults .counter");

    var $cpbutton = $(".children .p-btn");
    var $cmbutton = $(".children .m-btn");
    var $ccounter = $(".children .counter");

    function guestTotals() {
      var tot = parseInt(+$acounter.val() + +$ccounter.val());
      $(".guest-total span span").text(tot);
    }

    $apbutton.click(function () {
      if ($acounter.val() <= 9) {
        $acounter.val(parseInt($acounter.val()) + 1);
        guestTotals();
      }
    });

    $ambutton.click(function () {
      if ($acounter.val() >= 2) {
        $acounter.val(parseInt($acounter.val()) - 1);
        guestTotals();
      }
    });

    $cpbutton.click(function () {
      if ($ccounter.val() <= 9) {
        $ccounter.val(parseInt($ccounter.val()) + 1);
        guestTotals();
      }
    });

    $cmbutton.click(function () {
      if ($ccounter.val() >= 1) {
        $ccounter.val(parseInt($ccounter.val()) - 1);
        guestTotals();
      }
    });
    
    // hide discount section until discounts found
    //$("#PromoCode").hide();
    
    
  },
  };

  // event initialization
  function initializeEvents(settings) {
    if (settings.title_text && settings.title_text.length) {
      $("#widget-title").text(settings.title_text);
      $("#widget-title-box").show();
    }
    if (settings.tagline_text && settings.tagline_text.length) {
      $("#widget-tagline").text(settings.tagline_text);
      $("#widget-tagline").show();
    }
    if (settings.default_checkin != "") {
      $("#Checkin").val(settings.default_checkin);
    }

    if (settings.default_checkout != "") {
      $("#Checkout").val(settings.default_checkout);
    }

    if (settings.default_checkin != "" && settings.default_checkout == "") {
      var default_checkin = new Date(settings.default_checkin);
      var default_checkout = new Date(settings.default_checkin);
      default_checkout.setDate(default_checkin.getDate() + 1);
      var checkout_dd = default_checkout.getDate();
      var checkout_mm = default_checkout.getMonth() + 1;
      var checkout_yyyy = default_checkout.getFullYear();
      if (checkout_dd < 10) {
        checkout_dd = "0" + checkout_dd;
      }

      if (checkout_mm < 10) {
        checkout_mm = "0" + checkout_mm;
      }
      var checkout_date = checkout_mm + "/" + checkout_dd + "/" + checkout_yyyy;
      $("#Checkout").val(checkout_date);
      settings.default_checkout = checkout_date;
    }

    if (settings.default_checkin != "" && settings.default_checkout != "") {
      var monthArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var defaultCheckin = new Date(settings.default_checkin);
      var defaultCheckout = new Date(settings.default_checkout);
      $("#rootrez_daterangepicker").html(
        monthArr[defaultCheckin.getMonth()] +
          " " +
          defaultCheckin.getDate() +
          ", " +
          defaultCheckin.getFullYear() +
          " &rarr; " +
          monthArr[defaultCheckout.getMonth()] +
          " " +
          defaultCheckout.getDate() +
          ", " +
          defaultCheckout.getFullYear()
      );
    }

    if (settings.min_checkin == "") {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      var today_date = mm + "/" + dd + "/" + yyyy;
      settings.min_checkin = today_date;
    }

    if (settings.max_checkout == "") {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      var yyyy = today.getFullYear() + 2;
      var today_date = mm + "/" + dd + "/" + yyyy;
      settings.max_checkout = today_date;
    }
if(settings.locale == "fr-ca"){
    var dpSettings = {
      minDate: settings.min_checkin,
      maxDate: settings.max_checkout,
      dateLimit: {
        days: 28,
      },
      applyClass: "",
      cancelClass: "",
      buttonClasses: "",
      "locale": {
        "format": "MM/DD/YYYY",
        "separator": " - ",
        "applyLabel": "Appliquer",
        "cancelLabel": "Annuler",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": [
            "di",
			"lu",
			"ma",
			"me",
			"je",
			"ve",
			"sa"
        ],
        "monthNames": [
            "janvier",
			"février",
			"mars",
			"avril",
			"mai",
			"juin",
			"juillet",
			"août",
			"septembre",
			"octobre",
			"novembre",
			"décembre"
        ],
        "firstDay": 1
      }
    };
} else {
	var dpSettings = {
      minDate: settings.min_checkin,
      maxDate: settings.max_checkout,
      dateLimit: {
        days: 28,
      },
      applyClass: "",
      cancelClass: "",
      buttonClasses: ""
    };
}
	
    $("#rootrez-widget-form #rootrez_daterangepicker").daterangepicker(
      dpSettings,
      function (start, end) {
      	var dispFormat;
      	if(settings.locale == "fr-ca"){
      		dispFormat = "YYYY-MM-DD";
      	} else{
      		dispFormat = "MMM D YYYY";
      	}
        $("#rootrez_daterangepicker").html(
          start.format(dispFormat) + " &rarr; " + end.format(dispFormat)
        );
        $("#Checkin").val(start.format("MM/DD/YYYY"));
        $("#Checkout").val(end.format("MM/DD/YYYY"));

		if(settings.value_add_code == ""){
	        $.ajax({
	          type: "GET",
	          cache: false,
	          url: settings.api_url + "/publisher/v3.0/discounts/grouped.json",
	          data: {
	            checkin: start.format("MM/DD/YYYY"),
	            checkout: end.format("MM/DD/YYYY"),
	            key: settings.publisher_key,
	          },
	          success: function (response) {
	            buildDropdown(response, $("#deals-ul"), "No offers available for selected dates");
	          },
	        });
	      }
      }
    );

    if (settings.submission_url != "") {
      if (
        settings.value_add_code != "" &&
        settings.value_add_code != undefined
      ) {
        if (
          settings.submission_url.charAt(settings.submission_url.length - 1) ==
          "/"
        ) {
          settings.submission_url = settings.submission_url.slice(0, -1);
        }
        $("#rootrez-widget-form").attr(
          "action",
          settings.submission_url +
            "?PromoCode=" +
            settings.value_add_code.toString()
        );
      } else {
        $("#rootrez-widget-form").attr("action", settings.submission_url);
      }
    } else {
      $('#rootrez-widget-form button[type="submit"]').attr(
        "disabled",
        "disabled"
      );
    }

    $("#rootrez-widget-form").on("submit", function (e) {
      e.preventDefault();
      var formData = $(this).serialize();
      var numAdults = $("#adultnumber").val();
      var numChildren = $("#childnumber").val();
      if(settings.submission_url.indexOf("?") == -1){
	      	settings.submission_url = settings.submission_url + "?";
		} else {
	      	settings.submission_url = settings.submission_url + "&";
		}
      if(settings.value_add_code != "") {
		
        var finalUrl = settings.submission_url + "PromoCode=" + settings.value_add_code + "&" + formData + "&GuestsAdult=" + numAdults + "&GuestsChildren=" + numChildren;
      } else {
        var finalUrl = settings.submission_url + formData + "&GuestsAdult=" + numAdults + "&GuestsChildren=" + numChildren;
      }
      //console.log(finalUrl);
      window.location.href = finalUrl;
    });
  }

  function buildDropdown(result, dropdown, emptyMessage) {
    
    dropdown.html("");
    // Add the empty option with the empty message
    if (result.data.length == 0) {
      dropdown.append('<li class="no-deals">' + emptyMessage + "</li>");
      //$("#PromoCode").hide();
      $(".rootrez_widget_form_wrapper").addClass("no-deals");
      $(".rootrez_widget_form_wrapper").removeClass("has-deals");
    } else {
      //$("#PromoCode").show();
      $(".rootrez_widget_form_wrapper").removeClass("no-deals");
      $(".rootrez_widget_form_wrapper").addClass("has-deals");
    }
    // Check result isnt empty
    if ("data" in result && result.data.length > 0) {
      // Loop through each of the results and append the option to the dropdown
      $.each(result.data, function (k, v) {
        //console.log(v);
        dropdown.append(
          '<li class="deal-select" offer_id="'+ v.code +'"><span>' + v.title + '</span><span class="tip" tooltip="' + v.description +'"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M5.99999974,-1.133e-05 L5.99999974,-1.133e-05 C2.68628974,-1.133e-05 -2.6e-07,2.68629 -2.6e-07,6 C-2.6e-07,9.31371 2.68628974,12 5.99999974,12 C9.31370974,12 11.9999997,9.31371 11.9999997,6 L11.9999997,5.99993867 C11.9963833,2.68771367 9.31215968,0.00353867 5.99994967,-1.133e-05 L5.99999974,-1.133e-05 Z M6.125,2.5 L6.12499996,2.5 C6.53921346,2.5 6.87499996,2.8357865 6.87499996,3.25 C6.87499996,3.6642135 6.53921346,4 6.12499996,4 C5.71078646,4 5.37499996,3.6642135 5.37499996,3.25 L5.37499996,3.25000008 C5.37499996,2.83578658 5.71078646,2.5 6.12499996,2.5 L6.125,2.5 L6.125,2.5 Z M7.24999995,9.25 L5.24999995,9.25 L5.24999995,9.25 C4.97385748,9.25 4.74999995,9.0261425 4.74999995,8.75 C4.74999995,8.4738575 4.97385748,8.25 5.24999995,8.25 L5.62499998,8.25 L5.62499997,8.25 C5.69403547,8.25 5.74999995,8.1940355 5.74999995,8.125 L5.74999995,5.875 C5.74999995,5.8059645 5.69403547,5.75 5.62499997,5.75 L5.24999995,5.75 L5.24999995,5.75 C4.97385746,5.75 4.74999995,5.5261425 4.74999995,5.25 C4.74999995,4.9738575 4.97385746,4.75 5.24999995,4.75 L5.74999995,4.75 L5.74999995,4.75 C6.30228491,4.75 6.74999995,5.197715 6.74999995,5.75 L6.74999995,8.125 L6.74999995,8.12500002 C6.74999995,8.19403552 6.80596441,8.25 6.87499991,8.25 L7.24999995,8.25 L7.24999995,8.25 C7.52614239,8.25 7.74999995,8.47385752 7.74999995,8.75 C7.74999995,9.02614252 7.52614239,9.25 7.24999995,9.25 L7.24999995,9.25 Z"/></svg><span></li>'
        );
      });
      //Add "none" option
      dropdown.append(
          '<li class="deal-select" offer_id=""><span>' + 'None' + '</span><span class="tip" tooltip="Do not apply any offer to my selection."> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M5.99999974,-1.133e-05 L5.99999974,-1.133e-05 C2.68628974,-1.133e-05 -2.6e-07,2.68629 -2.6e-07,6 C-2.6e-07,9.31371 2.68628974,12 5.99999974,12 C9.31370974,12 11.9999997,9.31371 11.9999997,6 L11.9999997,5.99993867 C11.9963833,2.68771367 9.31215968,0.00353867 5.99994967,-1.133e-05 L5.99999974,-1.133e-05 Z M6.125,2.5 L6.12499996,2.5 C6.53921346,2.5 6.87499996,2.8357865 6.87499996,3.25 C6.87499996,3.6642135 6.53921346,4 6.12499996,4 C5.71078646,4 5.37499996,3.6642135 5.37499996,3.25 L5.37499996,3.25000008 C5.37499996,2.83578658 5.71078646,2.5 6.12499996,2.5 L6.125,2.5 L6.125,2.5 Z M7.24999995,9.25 L5.24999995,9.25 L5.24999995,9.25 C4.97385748,9.25 4.74999995,9.0261425 4.74999995,8.75 C4.74999995,8.4738575 4.97385748,8.25 5.24999995,8.25 L5.62499998,8.25 L5.62499997,8.25 C5.69403547,8.25 5.74999995,8.1940355 5.74999995,8.125 L5.74999995,5.875 C5.74999995,5.8059645 5.69403547,5.75 5.62499997,5.75 L5.24999995,5.75 L5.24999995,5.75 C4.97385746,5.75 4.74999995,5.5261425 4.74999995,5.25 C4.74999995,4.9738575 4.97385746,4.75 5.24999995,4.75 L5.74999995,4.75 L5.74999995,4.75 C6.30228491,4.75 6.74999995,5.197715 6.74999995,5.75 L6.74999995,8.125 L6.74999995,8.12500002 C6.74999995,8.19403552 6.80596441,8.25 6.87499991,8.25 L7.24999995,8.25 L7.24999995,8.25 C7.52614239,8.25 7.74999995,8.47385752 7.74999995,8.75 C7.74999995,9.02614252 7.52614239,9.25 7.24999995,9.25 L7.24999995,9.25 Z"/></svg><span></li>'
        );
      $(".deal-select").click(function(event){
        var selectedId = $(this).attr("offer_id");
        $(".deal-select").removeClass("selected");
        $(this).addClass("selected");
        //console.log("Clicked discount id: "+selectedId);
        settings.value_add_code = selectedId;
      	$(".search_promo_code").toggleClass("open");
      	$('.search_promo_code-event h3 span').text($('.deal-select.selected span').text());
      });
      //$("#PromoCode").addClass("show");
      //$("#PromoCode").removeClass("hide");
    } else {
      //$("#PromoCode").addClass("hide");
      //$("#PromoCode").removeClass("show");
    }
  }

  return app;
});
