function open_dial_service() {
    document.getElementById("search_animation").style.display = "none";
    $("#call_now_button").click();
    $("#user_pin").show();
    $("#mydetailedlocation_dialog").show();
}

function getfareestimate_close() {
    document.getElementById("getfareestimate").style.display = "none";
    document.getElementById("mydestination").style.display = "block";
    document.getElementById("citynavigator_start").style.display = "block";
}

function init_call_taxi_ui() {

    $("#taxirequest_destination").focus(function () {
        // $("#fare_estimate_go").hide();
        // $("#taxi_go").hide();
    });

    $("#taxirequest_destination").blur(function () {
        // $("#fare_estimate_go").show();
        // $("#taxi_go").show();
    });

    $("#taxirequest_detailedlocation").focus(function () {
        // $("#fare_estimate_go").hide();
        // $("#taxi_go").hide();
    });

    $("#taxirequest_detailedlocation").blur(function () {
        // $("#fare_estimate_go").show();
        // $("#taxi_go").show();
    });


    $("#taxirequest_destination").focus(function () {
        $("#taxirequest_destination").val("");
    });

    $("#taxirequest_destination").keypress(function (e) {
        if (e.which == 13) {
            detailedlocation_complete();
        }
    });

    $("#ride_now_button").click(function () {

        localStorage.setItem("ride_start", "now");

        document.getElementById("taxi_go_text").innerHTML = "pick me now";

        document.getElementById("detailedlocation_date_time_button").style.display = "none";

        $("#taxirequest_detailedlocation").attr("placeholder", "Where are you standing?");

        $("#taxirequest_detailedlocation").keypress(function (e) {
            if (e.which == 13) {
                detailedlocation_complete('estimate');
            }
        });

        document.getElementById("pickup_booking_date").style.display = "none";

        console.log("ride_start: now");
        mydetailedlocation_show();
    });

    $("#ride_later_button").click(function () {

        localStorage.setItem("ride_start", "later");

        document.getElementById("taxi_go_text").innerHTML = "book now";

        document.getElementById("detailedlocation_date_time_button").style.display = "block";

        $("#taxirequest_detailedlocation").attr("placeholder", "Where will you be standing?");

        document.getElementById("pickup_booking_date").style.display = "block";

        console.log("ride_start: later");
        mydetailedlocation_show();
    });

    $("#call_now_button").click(function () {

        if (window.cordova) {
            luxury();
        } else {
            luxury_web();
        }

    });

}


function luxury() {
    var userid = localStorage.getItem("userid");
    var country = localStorage.getItem("country");

    localStorage.setItem("logupdate", "" + userid + "*0*service*User" + userid + "selected AfriCar.");
    logupdate_v2();

    window.open('https://250taxi.com/appcontent/luxury/vehicles_new.php?userid=' + userid + '&country=' + country + '', '_blank', 'location=no');
}

function luxury_web() {

    $("#loadingindicator").fadeIn();

    var userid = localStorage.getItem("userid");
    var country = localStorage.getItem("country");

    localStorage.setItem("logupdate", "User <span class='log_userid'>" + userid + "</span> selected luxury");
    logupdate();

    location.href = 'https://250taxi.com/appcontent/luxury/vehicles_new.php?userid=' + userid + '&country=' + country + '';
}

function call_now_button() {
    console.log("call button clicked");
    document.getElementById("at_modal").style.display = "block";

    var at_content = '<nav onclick="call_customer_care();"></div><img src="css/payment/cellphone-android.svg">Call us</nav>' +
        '<nav onclick="message_to_customer_care();"><img src="css/message-text-outline.svg">Send Message</nav>' +
        '<nav onclick="close_at_modal();"><img src="css/close.svg">Cancel</nav>';

    document.getElementById("at_modal_content").innerHTML = at_content;
}

function message_to_customer_care() {
    close_at_modal();
    send_message_to_customer_care();
}

function close_at_modal() {
    document.getElementById("at_modal").style.display = "none";
}

function call_customer_care() {

    var country = localStorage.getItem("country");

    if (country == "Rwanda") {
        window.open("tel:+250783000096", "_self");
    }
    if (country == "Zambia") {
        window.open("tel:+260963085459", "_self");
    }

}

function close_dialataxi() {

    document.getElementById("call_now_button").style.pointerEvents = "all";

    var pickup_ext_loader_closer = document.getElementById("pickup_ext_loader");

    document.getElementById("dialataxi").className = "animated fadeOutLeft";

    setTimeout(function () {
        document.getElementsByTagName('body')[0].removeChild(pickup_ext_loader_closer);
    }, 1000);

}

function calltaxigo() {

    var ride_start = localStorage.getItem("ride_start");

    if (ride_start == "now") {
        document.getElementById("search_launch").innerHTML = "pick me now";
    }
    if (ride_start == "later") {
        document.getElementById("search_launch").innerHTML = "book now";
    }

    if (typeof getdriverslist_updater !== 'undefined') {
        clearInterval(getdriverslist_updater);
    }

    document.getElementById("taxis_online_info").style.display = "block";

    document.getElementById("taxirequest_pickup_estimate").value = document.getElementById("inlocationfield").value;

    var passenger_lat = document.getElementById("lat").value;
    var passenger_long = document.getElementById("long").value;

    var get_estimate = localStorage.getItem("get_estimate");
    if (get_estimate == "Yes") {
        localStorage.setItem("activity", "fare_estimate");
        get_fare_estimate();
        return;
    }
    if (get_estimate == "No") {
        getdrivers();
    }
    // console.log(passenger_lat);
    // console.log(passenger_long);


    var ride_start = localStorage.getItem("ride_start");
    if (ride_start == "now") {
        getdriverslist_updater = setInterval(getdriverslist, 5000);
    }
    if (ride_start == "later") {

    }

}



function searchdrivers_x() {

    $("#taxis_online_info").fadeIn("slow", function () {});

    document.getElementById("citynavigator").style.display = "none";
    document.getElementById("searchdrivers").style.display = "none";
    document.getElementById("driverlist").style.display = "none";

    document.getElementById("citynavigator_start").style.display = "block";
    document.getElementById("mydestination").style.display = "block";

    $("#calltaxiui").fadeIn("slow", function () {});

}

function getdriverslist() {

    var userid = localStorage.getItem("userid");
    var pickup_lat = localStorage.getItem('pickup_lat');
    var pickup_lng = localStorage.getItem('pickup_lng');

    $("#driverlist_scanner").load("https://250taxi.com/db/requests/taxi_go_now.php?pickup_lat=" + pickup_lat + "&pickup_lng=" + pickup_lng + "&userid=" + userid + "", function (taxigoinfo) {

        var taxigoinfo = taxigoinfo.substr(0, taxigoinfo.indexOf('-'));

        console.log("Taxi go: " + taxigoinfo);

        if (taxigoinfo > 0) {
            localStorage.setItem('pickdriver_id', taxigoinfo);

            document.getElementById("mydetailedlocation").style.display = "none";
            document.getElementById("search_animation").style.display = "none";
            document.getElementById("calltaxiui").style.display = "none";

            clearInterval(getdriverslist_updater);

            pickdriver();
        }

    });
}

function getdriversskipdestination() {

    localStorage.setItem('activity', 'driver_list');

    localStorage.setItem("destination", "Not specified");
    localStorage.setItem("destination_type", "user_input");

    document.getElementById("mydestination").style.display = "none";
    document.getElementById("citynavigator_start").style.display = "none";

    $("#driverlist").fadeIn("slow", function () {});

}

function getdrivers() {

    $("#user_location_pin").hide();
    console.log("User location pin removed");

    $("#mydetailedlocation").hide();
    $("#mydetailedlocation_dialog").hide();
    console.log("mydetailedlocation removed");

    clearInterval(map_updater);
    console.log("map updater stopped");

    $("#getfareestimate").hide();
    console.log("Get fare estimate dialog hidden");

    localStorage.setItem('activity', 'driver_automatic_search');

    var taxirequest_destination = document.getElementById('taxirequest_destination').value;
    localStorage.setItem("destination_name", taxirequest_destination);

    // var taxirequest_destination = taxirequest_destination.split(', Kigali')[0]+'';

    localStorage.setItem("destination", taxirequest_destination);
    localStorage.setItem("taxirequest_destination", taxirequest_destination);

    var taxirequest_destination_length = taxirequest_destination.length;

    if (taxirequest_destination_length > 2) {

        localStorage.setItem("destination", taxirequest_destination);
        localStorage.setItem("destination_type", "user_input");

        document.getElementById("mydestination").style.display = "none";
        document.getElementById("citynavigator_start").style.display = "none";


        var ride_start = localStorage.getItem("ride_start");
        if (ride_start == "now") {

            document.getElementById("search_animation").style.display = "block";
            document.getElementById("map_glogo").style.bottom = "0px";

            setTimeout(function () {
                document.getElementById("search_animation_timeout").style.display = "block";
            }, 40000);

            // alert("Please select a driver from the list to take you to "+taxirequest_destination+". If the driver is not available, we will find a different one for you.");

            // document.getElementById("driverlist").style.display = "block";    
        }
        if (ride_start == "later") {
            confirm_booking();
            document.getElementById("getfareestimate").style.display = "none";
            document.getElementById("mydetailedlocation").style.display = "none";
            document.getElementById("search_animation").style.display = "none";
            return;
        }

    } else {
        swal("", "Please enter a destination!", "");
        return;
    }

}









function citynavigator() {

    localStorage.setItem('activity', 'city_navigator');

    $("#citynavigator_category option:selected").text();

    var passenger_lat = document.getElementById("lat").value;
    var passenger_long = document.getElementById("long").value;

    $("#citynavigatorlist").load("https://250taxi.com/db/partner/city_navigator.php?passenger_lat=" + passenger_lat + "&passenger_long=" + passenger_long + "", function () {

        $('#citynavigator_category').find('option:eq(0)').prop('selected', true);

        $(".religious").wrapAll("<div class='drawer Religious'>");
        $(".shopping").wrapAll("<div class='drawer Shopping'>");
        $(".hotels").wrapAll("<div class='drawer Hotels'>");
        $(".restaurants").wrapAll("<div class='drawer Restaurants'>");
        $(".police").wrapAll("<div class='drawer Police'>");
        $(".banks").wrapAll("<div class='drawer Banks'>");
        $(".forex").wrapAll("<div class='drawer Forex'>");
        $(".insurance").wrapAll("<div class='drawer Insurance'>");
        $(".petrol").wrapAll("<div class='drawer Petrol'>");
        $(".schools").wrapAll("<div class='drawer Schools'>");
        $(".hospitals").wrapAll("<div class='drawer Hospitals'>");
        $(".pharmacies").wrapAll("<div class='drawer Pharmacies'>");
        $(".sights").wrapAll("<div class='drawer Sights'>");
        $(".government").wrapAll("<div class='drawer Government'>");
        $(".clubs").wrapAll("<div class='drawer Clubs'>");

        $("#citynavigator_category").change(function () {
            var citynavigator_category = $("#citynavigator_category option:selected").text();
            // alert (citynavigator_category);

            $('.drawer').hide();
            $('.' + citynavigator_category).fadeIn('slow');
        });

    });

    document.getElementById("citynavigator_start").style.display = "none";
    document.getElementById("mydestination").style.display = "none";

    $("#citynavigator").fadeIn("slow", function () {});
}

function goplaces() {

    var ride_start = localStorage.getItem("ride_start");

    if (ride_start == "now") {
        localStorage.setItem('activity', 'driver_list');

        var places_name = localStorage.getItem("places_name");
        var places_lat = localStorage.getItem("places_lat");
        var places_lng = localStorage.getItem("places_long");

        localStorage.setItem("destination", places_name);

        localStorage.setItem("destination_name", places_name);
        localStorage.setItem("destination_lat", places_lat);
        localStorage.setItem("destination_lng", places_lng);

        localStorage.setItem("destination_type", "city_navigator");

        document.getElementById("citynavigator").style.display = "none";
        $("#driverlist").fadeIn("slow", function () {
            var activeuser = localStorage.getItem("activeuser");

            var voice_enabled = localStorage.getItem("voice_enabled");
            if (voice_enabled == "On") {
                responsiveVoice.speak("Choose a driver to take you to " + places_name + "");
            }
        });
    }

    if (ride_start == "later") {

        confirm_booking();

    }

}

function pickdriver() {

    document.getElementById("taxis_online_info").style.display = "none";

    localStorage.setItem('activity', 'driver_details');

    var voice_enabled = localStorage.getItem("voice_enabled");
    if (voice_enabled == "On") {
        responsiveVoice.speak("We are notifying this taxi!");
    }

    document.getElementById("driverlist").style.display = "none";
    document.getElementById("menubutton").style.display = "none";
    document.getElementById("locationfieldholder").style.display = "none";
    document.getElementById("locationbutton").style.display = "none";
    document.getElementById("searchdrivers").style.display = "none";

    $("#driveroverlay").fadeIn("slow", function () {

        var pickdriver_id = localStorage.getItem("pickdriver_id");

        $("#driveroverlay_show_details").load("https://250taxi.com/db/partner/taxi_comlink_driver_details.php?pickdriver_id=" + pickdriver_id + "", function () {
            journey_start_map();
            pickdriver_request_start();
        });

        // $( "#driveroverlay_journey_start" ).fadeIn( "slow", function() {});
    });

}

function pickdriver_request_start() {

    request_timer_start();

    document.getElementById("pickdriver_request_timer").style.display = "block";

    localStorage.setItem('activity', 'driver_selected');

    var userid = localStorage.getItem('userid');
    var driverid = localStorage.getItem("pickdriver_id");
    localStorage.setItem("logupdate", "" + userid + "*" + driverid + "*request*User" + userid + " is waiting for driver" + driverid + " to accept.");
    logupdate_v2();

    // Update new request system

    $.get("https://250taxi.com/db/requests/requests.php", {
        task: "create_request",
        userid: userid
    }).done(function (requestid) {

        if (requestid == "request_existed") {
            // alert("Connection problem. Please try again.");
            document.getElementById("driveroverlay_journey_cancel").style.display = "none";
            setTimeout(function () {
                location.reload();
            }, 3000);
            return;
        }

        $.get("https://250taxi.com/db/requests/requests.php", {
            task: "add_driver",
            userid: userid,
            requestid: requestid,
            driverid: driverid
        }).done(function (data) {

        });

    });

    // End

    var voice_enabled = localStorage.getItem("voice_enabled");
    if (voice_enabled == "On") {
        responsiveVoice.speak("Contacting driver, please wait...");
    }

    document.getElementById("driveroverlay_back_to_list").style.display = "none";
    document.getElementById("driveroverlay_journey_start").style.pointerEvents = "none";
    setTimeout(function () {
        document.getElementById("driveroverlay_journey_start").className = "waves-effect waves-dark animated zoomOut";
    }, 700);
    setTimeout(function () {
        document.getElementById("driveroverlay_journey_start").style.display = "none";
        document.getElementById("driveroverlay_journey_cancel").style.display = "block";
        document.getElementById("driveroverlay_journey_cancel").className = "waves-effect waves-dark animated zoomIn";
    }, 2000);

    var pickdriver_id = localStorage.getItem("pickdriver_id");

    if (localStorage.getItem("userid") === null) {
        swal("", "There is a problem with your account. Please contact AfriTaxi support.");
    }

    var destination = localStorage.getItem("destination");
    var destination_type = localStorage.getItem("destination_type");

    if (destination_type == "city_navigator") {
        var destination_lat = localStorage.getItem("places_lat");
        var destination_long = localStorage.getItem("places_long");
    }

    // alert(pickdriver_id);

    var pickup = localStorage.getItem("pickup");
    var userid = localStorage.getItem("userid");

    $.get("https://250taxi.com/db/partner/taxi_comlink_journey_v3.php?task=start&userid=" + userid + "&pickdriver_id=" + pickdriver_id + "&destination=" + destination + "&destination_type=" + destination_type + "&destination_lat=" + destination_lat + "&destination_long=" + destination_long + "&pickup=" + pickup + "", function (data) {

    });

    // setTimeout(function(){    
    // $("#taxirequest_detailedlocation").focus();  

    // Moved this to start map

    // var voice_enabled = localStorage.getItem("voice_enabled");
    // if (voice_enabled == "On") {responsiveVoice.speak("Tell us more info about where you are"); }


    // $( "#mydetailedlocation" ).fadeIn( "slow", function() { 
    // });
    // }, 5000);

}

function detailedlocation_complete(estimate_or_go) {

    if (estimate_or_go == "go") {
        console.log("type: go");
        localStorage.setItem("get_estimate", "No");
    }
    if (estimate_or_go == "estimate") {
        console.log("type: estimate");
        localStorage.setItem("get_estimate", "Yes");
    }

    showindicator();

    var detailedlocation_date_time_button_content = document.getElementById("detailedlocation_date_time_button").innerHTML;

    console.log(detailedlocation_date_time_button_content);

    var ride_start = localStorage.getItem("ride_start");

    if (ride_start == "later") {
        if (detailedlocation_date_time_button_content == "Set date/time") {
            swal("", "Please set a pickup date and time.", "");

            hideindicator();

            return;
        }
    }

    var pickup_name = localStorage.getItem("pickup");
    var pickup_lat = localStorage.getItem("pickup_lat");
    var pickup_lng = localStorage.getItem("pickup_lng");

    var userid = localStorage.getItem("userid");

    var detailedlocation = document.getElementById("taxirequest_detailedlocation").value;
    var landmark = document.getElementById("list_of_nearby_places").value;

    var detailedlocation_length = detailedlocation.length;

    if (detailedlocation_length > 2) {

        localStorage.setItem("detailedlocation", detailedlocation);

        $.get("https://250taxi.com/db/partner/taxi_comlink_journey_v3.php?task=detailedlocation&pickup_name=" + pickup_name + "&pickup_lat=" + pickup_lat + "&pickup_lng=" + pickup_lng + "&userid=" + userid + "&userid=" + userid + "&detailedlocation=" + detailedlocation + "&landmark=" + landmark + "", function (data) {

            hideindicator();

            calltaxigo();

        });
    } else {
        swal('', 'Please describe where you are standing, so the driver can easily locate you.', '');

        hideindicator();

        setTimeout(function () {
            $("#taxirequest_detailedlocation").focus();
        }, 2000);
    }

}

function pickdriver_request_cancel() {
    document.getElementById("driveroverlay_journey_cancel_dialog").style.display = "block";
    document.getElementById("pickdriver_request_timer").style.display = "none";
}

function pickdriver_request_cancel_confirmed() {

    showindicator();

    var userid = localStorage.getItem('userid');
    var driverid = localStorage.getItem("pickdriver_id");
    localStorage.setItem("logupdate", "" + userid + "*" + driverid + "*request cancelled*User" + userid + " cancelled journey with Driver" + driverid + ".");
    logupdate_v2();

    swal("", "Request for driver cancelled!", "");

    setTimeout(function () {
        location.reload();
    }, 5000);

}









function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            // alert("ende");
            // timer = duration;
            document.getElementById("time5min").style.display = "none";
            document.getElementById("instantscreen_customer_care").style.display = "block";
        }
    }, 1000);
}

function start5mintimer() {

    $("#user_pin").hide();

    localStorage.setItem('activity', 'customer_care_waiting');
    document.getElementById("instantscreen").style.display = "block";

    jQuery(function ($) {
        var fiveMinutes = 60 * 0.1,
            display = $('#time5min');
        startTimer(fiveMinutes, display);
    });
}


function mydetailedlocation_show() {

    $("#user_pin").hide();

    var ride_start = localStorage.getItem("ride_start");

    var voice_enabled = localStorage.getItem("voice_enabled");
    if (voice_enabled == "On") {
        responsiveVoice.speak("Where should we pick you up " + ride_start + "?");
    }

    var mydetailedlocation = document.getElementById("mydetailedlocation");

    var mydetailedlocation_dialog = document.getElementById("mydetailedlocation_dialog");

    mydetailedlocation.style.display = "block";
    mydetailedlocation.opacity = "1";

    if (ride_start == "now") {
        mydetailedlocation_dialog.style.height = "245px";
    }
    if (ride_start == "later") {
        mydetailedlocation_dialog.style.height = "294px";
    }

    mydetailedlocation_content.style.display = "block";
    mydetailedlocation_content.className = "animated fadeIn";

    var pickup = localStorage.getItem("pickup");
    var pickup = pickup.substring(0, pickup.indexOf(','));

    document.getElementById("mydetailedlocation_street").innerHTML = pickup;
}

function mydetailedlocation_close() {

    $("#user_pin").show();

    var mydetailedlocation = document.getElementById("mydetailedlocation");

    var mydetailedlocation_dialog = document.getElementById("mydetailedlocation_dialog");

    var mydetailedlocation_content = document.getElementById("mydetailedlocation_content");

    mydetailedlocation_content.className = "animated fadeOut";

    mydetailedlocation_content.style.display = "none";
    mydetailedlocation_dialog.style.height = "0px";

    mydetailedlocation.style.display = "none";

}









function confirm_booking() {

    showindicator();

    var task = "booking";
    var userid = localStorage.getItem("userid");
    var pickup_date_time = document.getElementById("pickup_booking_date").value;
    var street = document.getElementById("inlocationfield").value;
    var landmark = document.getElementById("list_of_nearby_places").value;
    var detailed_location = document.getElementById("taxirequest_detailedlocation").value;
    var destination = localStorage.getItem("destination");

    $.get("https://250taxi.com/db/book_later/book_taxi.php", {
        task: task,
        userid: userid,
        pickup_date_time: pickup_date_time,
        street: street,
        landmark: landmark,
        detailed_location: detailed_location,
        destination: destination
    }).done(function (data) {

        document.getElementById("searchdrivers").style.display = "none";
        document.getElementById("calltaxiui").style.display = "block";
        swal("", "We received your booking, customer care is about to call you in a few for a follow up. You can check the status in the bookings tab.", "");

        hideindicator();

    });

}









function accepted() {

    localStorage.setItem("end_timer", "Yes");

    clearInterval(itimer);
    document.getElementById("pickdriver_request_timer").style.display = "none";

    // Start updating chat
    localStorage.setItem("chat_enabled", "Yes");

    userid = localStorage.getItem("userid");

    $.get("https://250taxi.com/db/requests/requests.php", {
        task: "get_assigned_driver",
        userid: userid,
    }).done(function (driverid) {

        localStorage.setItem("pickdriver_id", driverid);

        localStorage.setItem("logupdate", "" + userid + "*" + driverid + "*request accepted*User" + userid + " request accepted by Driver" + driverid + ".");
        logupdate_v2();

        // Show overlay with buttons 
        document.getElementById("driveroverlay_journey_cancel").style.display = "none";
        document.getElementById("journey_accepted_panel").style.display = "block";
        document.getElementById("journey_accepted_panel").className = "animated fadeIn";

    });

}
