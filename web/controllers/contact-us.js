
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


    if (!$("#cf_name").val()) {
        // showFeedback_fb('#cf_name', 'Full Name is required!', "fullname_val");
        $('#cf_name').focus().css({ "border": "1px solid red", 'box-shadow': 'none' });
        $("#fullname_val").html('<div class="form-alert"> Full Name is required.' +
            '</div>').css('color', 'red')
        $('#cf_name').keyup(function (e) {
            if ($(this).val() != "") {
                $("#fullname_val").html("")
                $('#cf_name').focus().css({ "border": "1px solid #66b23c" });
            }
        })
    }
    else if (!$("#cf_email").val()) {
        // showFeedback_fb('#cf_email', 'Email Id is required!', "email_val");
        $('#cf_email').focus().css({ "border": "1px solid red", 'box-shadow': 'none' });
        $("#email_val").html('<div class="form-alert"> Email Id is required.' +
            '</div>').css('color', 'red')
        $('#cf_email').keyup(function (e) {
            if ($(this).val() != "") {
                $("#email_val").html("")
                $('#cf_email').focus().css({ "border": "1px solid #66b23c" });
            }
        })
    }
    // else if (!$("#recaptcha").val()) {
    //     $('#recaptcha').focus().css({ "border": "1px solid red", 'box-shadow': 'none' });
    //     $("#recaptcha_val").html('<div class="form-alert"> Email Id is required.' +
    //         '</div>').css('color', 'red')
    //     $('#recaptcha').keyup(function (e) {
    //         if ($(this).val() != "") {
    //             $("#recaptcha_val").html("")
    //             $('#recaptcha').focus().css({ "border": "1px solid #66b23c" });
    //         }
    //     })
    // }
    else if (g_response) {

        // defaultStyle_fb("feedback_user_prof");

        $(".submitBtn").attr('disabled','disabled');

        var content = "<p><b>Name:</b><br>" + $("#cf_name").val() + "</p>" +
            "<p><b>Company:</b><br>" + $("#cf_cname").val() + "</p>" +
            "<p><b>Email:</b><br>" + $("#cf_email").val() + "</p>" +
            "<p><b>Phone No:</b><br>" + $("#cf_phone").val() + "</p>" +
            "<p><b>Subject:</b><br>" + $("#cf_subject").val() + "</p>" +
            "<p><b>Message:</b><br>" + $("#cf_message").val() + "</p>" +
            "<p><b>Date:</b><br>" + new Date() + "</p>";

        var data = {
            from: $("#cf_email").val(),
            fromName: $("#cf_name").val() ,
            to: 'contactus',
            subject:  $("#cf_subject").val(),
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
                $("#cf_name").val('')
                $("#cf_cname").val('')
                $("#cf_email").val('')
                $("#cf_phone").val('')
                $("#cf_subject").val('')
                $("#cf_message").val('')

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

function defaultStyle_fb(id) {
    $("#" + id).hide();
    $("form input").css({ border: "1px solid #cccccc", background: "#efefef" });
}

// function showFeedback_fb(id, text, feedbackDivId) {
//     $("form input").css({ border: "1px solid #cccccc", background: "#efefef" });
//     $(id).focus().css({ border: "1px solid #d64541", background: "rgb(255 243 244)" });
//     if ($("#" + feedbackDivId + " .alert").is(":visible")) {
//         $("#" + feedbackDivId).html('<div class="form-alert">' + text + '</div>');
//     } else {
//         $("#" + feedbackDivId).html('<div class="form-alert"> ' + text + '</div>').slideDown(1000);
//     }
    
//     // $(id).on('keyup',function (_e) {
//     //     if ($(id).val() != "") {
//     //         $(id).removeClass('form-alert')
//     //         defaultStyle(alertId)
//     //     }
//     // })

//     // $(id).keyup(function (e) {
//     //     if ($(this).val() != "") {
//     //         $(id).html("")
//     //         $(input).focus().css({ "border": "1px solid #66b23c" });
//     //     }
//     // })
// }

function IsEmail(email) {
    const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return !(!regex.test(email));
}

function IsAlphaNumeric(e) {
    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || keyCode == 32 || (keyCode >= 97 && keyCode <= 122));
    return ret;
}