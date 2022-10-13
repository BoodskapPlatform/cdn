
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

    if(g_response) {
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