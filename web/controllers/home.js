$(document).ready(function() {


    var $element = $(".js-KyHtmlParallax", $(document));
    if ($element && $element.length > 0) {
        $element.KyHtmlParallax();
    }

    loadCounter()

   setInterval(function () {
       loadCounter()
   },10000)


});// end of document ready


function loadCounter() {

    $.ajax({
        url: 'https://api.boodskap.io/cluster/statistics',
        type: 'GET',
        success: function (response) {

            var sum = response['udpMessages'] + response['mqttMessages'] + response['httpMessages'] + response['fcmMessages'] +
                response['coapMessages'] + response['tcpMessages'] + response['commands'];

            $(".stats_1").html(numberWithCommas(sum))
            $(".stats_2").html(numberWithCommas(response['devices']))
            $(".stats_3").html(numberWithCommas(response['users']))
            $(".stats_4").html(numberWithCommas(response['domains']))
        },
        error: function (e) {

        }
    });


}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}