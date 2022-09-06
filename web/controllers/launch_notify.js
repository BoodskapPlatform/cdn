
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


    if (!$("#lan_email").val()) {
        $('#lan_email').focus().css({ "border": "1px solid red", 'box-shadow': 'none' });
        $("#lan_val").html('<div class="form-alert"> Email Id is required.' +
            '</div>').css('color', 'red')
        $('#lan_email').keyup(function (e) {
            if ($(this).val() != "") {
                $("#lan_val").html("")
                $('#lan_email').focus().css({ "border": "1px solid #66b23c" });
            }
        })
    }
    else if (!$("#recaptcha").val()) {
        $('#recaptcha').focus().css({ "border": "1px solid red", 'box-shadow': 'none' });
        $("#recaptcha_val").html('<div class="form-alert"> recaptcha is required.' +
            '</div>').css('color', 'red')
        $('#recaptcha').keyup(function (e) {
            if ($(this).val() != "") {
                $("#recaptcha_val").html("")
                $('#recaptcha').focus().css({ "border": "1px solid #66b23c" });
            }
        })
    }

    else if (g_response) {

        // defaultStyle_fb("feedback_user_prof");

        $(".submitBtn").attr('disabled','disabled');

        var content = "<p><b>Email:</b><br>" + $("#lan_email").val() + "</p>" +
            "<p><b>Date:</b><br>" + new Date() + "</p>";

        var data = {
            from: $("#lan_email").val(),
            to: 'contactus',
            subject:  'Platform | Launch Notify',
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
                $("#lan_email").val('')

                $(".sentMessage").html('<div class="alert alert-success">\n' +
                    '               <strong>Successfully Sent!</strong>' +
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

function defaultStyle_fb(id) {
    $("#" + id).hide();
    $("form input").css({ border: "1px solid #cccccc", background: "#efefef" });
}



function IsEmail(email) {
    const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return !(!regex.test(email));
}

function IsAlphaNumeric(e) {
    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || keyCode == 32 || (keyCode >= 97 && keyCode <= 122));
    return ret;
}