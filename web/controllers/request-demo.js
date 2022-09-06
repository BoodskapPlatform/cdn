
var a2a_config = a2a_config || {};
a2a_config.linkname = $(document).attr("title");
a2a_config.linkurl = window.location.href;
a2a_config.num_services = 4;
a2a_config.show_title = 1;

$(function() {
    $('[data-toggle="popover"]').popover();  
    
    $(".stopAnimate").hover(function(){
        $(".social-logo,.social-outer-circle,.social-inner-circle").css("animation-play-state", "paused");
    }, function(){
        if($(".socialPopover").parent().parent().is(':visible')){
            if(!$(".socialPopover").parent().parent().is(":hover")){ // popover should not close when we hover on it
                $(".socialPopover").parent().parent().popover('hide');
            }
        }
        $(".social-logo,.social-outer-circle,.social-inner-circle").css("animation-play-state", "");
    });

    $(".social-logo").click(function(){
        $(".popover").hover(function(){
            $(".social-logo,.social-outer-circle,.social-inner-circle").css("animation-play-state", "paused");
            }, function(){
                if($(".socialPopover").parent().parent().is(':visible')){
                    if(!$(".socialPopover").parent().parent().is(":hover")){ // popover should not close when we hover on it
                        $(".socialPopover").parent().parent().popover('hide');
                    }
                }
            $(".social-logo,.social-outer-circle,.social-inner-circle").css("animation-play-state", "");
        });
    });
    $(".social-logo").dblclick(function(){
        window.open($(this).attr("data-attr"))
    })
});


var g_response = null;
function renderResponse(response) {
    g_response = response;
}


function sendEmail() {
    $(".sentMessage").html('');

    if (!$("#req_name").val()) {
        // showFeedback_fb('#cf_name', 'Full Name is required!', "fullname_val");
        $('#req_name').focus().css({ "border": "1px solid red", 'box-shadow': 'none' });
        $("#name_req").html('<div class="form-alert"> Full Name is required.' +
            '</div>').css('color', 'red')
        $('#req_name').keyup(function (e) {
            if ($(this).val() != "") {
                $("#name_req").html("")
                $('#req_name').focus().css({ "border": "1px solid #66b23c" });
            }
        })
    }

    else if (!$("#req_email").val()) {
        // showFeedback_fb('#cf_name', 'Full Name is required!', "fullname_val");
        $('#req_email').focus().css({ "border": "1px solid red", 'box-shadow': 'none' });
        $("#email_req").html('<div class="form-alert"> Full Name is required.' +
            '</div>').css('color', 'red')
        $('#req_email').keyup(function (e) {
            if ($(this).val() != "") {
                $("#email_req").html("")
                $('#req_email').focus().css({ "border": "1px solid #66b23c" });
            }
        })
    }

    else if (!$("#req_phone").val()) {
        // showFeedback_fb('#cf_name', 'Full Name is required!', "fullname_val");
        $('#req_phone').focus().css({ "border": "1px solid red", 'box-shadow': 'none' });
        $("#mobile_req").html('<div class="form-alert"> Full Name is required.' +
            '</div>').css('color', 'red')
        $('#req_phone').keyup(function (e) {
            if ($(this).val() != "") {
                $("#mobile_req").html("")
                $('#req_phone').focus().css({ "border": "1px solid #66b23c" });
            }
        })
    }

    else if(g_response) {
        $(".submitBtn").attr('disabled','disabled');

        var content = "<p><b>Name:</b><br>" + $("#req_name").val() + "</p>" +
            "<p><b>Email:</b><br>" + $("#req_email").val() + "</p>" +
            "<p><b>Phone No:</b><br>" + $("#req_phone").val() + "</p>" +
            "<p><b>Date:</b><br>" + new Date() + "</p>";

        var data = {
            from: $("#req_email").val(),
            fromName: $("#req_name").val() ,
            to: 'demo',
            subject:  'Boodsakp.io | Request For Demo',
            body_text: content,
            auth : g_response
        }

        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: '/sendemail',
            data: JSON.stringify(data),
            success: function (response) {
                g_response = null;
                $("#req_name").val('')
                $("#req_email").val('')
                $("#req_phone").val('')

                $(".sentMessage").html('<div class="alert alert-success">\n' +
                    '               <strong>Successfully Sent!</strong> We will revert you in 24hrs.' +
                    '            </div>')

                $(".submitBtn").removeAttr('disabled');
                grecaptcha.reset();
            },
            error: function (e) {

                g_response = null;
                $(".sentMessage").html('<div class="alert alert-danger">\n' +
                    '                <strong>Error!</strong> Something went wrong.\n' +
                    '            </div>')
                $(".submitBtn").removeAttr('disabled');
                grecaptcha.reset()
            }
        })
    }
}

