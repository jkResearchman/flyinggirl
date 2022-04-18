$(document).ready(function() {
    $("form").submit(function(event) {
        event.preventDefault();
        $(".customForm").removeClass("has-error");
        $(".help-block").remove();

        var btn_obj = $(this).find(":submit");
        var new_btn_txt = ' <i class="fa fa-spinner fa-spin"></i>';
        $(btn_obj).append(new_btn_txt);
        $(this).find(":submit").attr("disabled", true);

        $.ajax({
            type: "POST",
            url: "https://www.frankfinn.com/ajax/process",
            data: new FormData(this),
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
        }).done(function(data) {
            if (!data.success) {
                console.clear();
                console.log(data.errors);
                if(Object.keys(data.errors).length!==0){
                    let errorData = data.errors;
                    Object.keys(errorData).map(function(value) {
                        $("#"+value+"-group"+data.formType).addClass("has-error");
                        $("#"+value+"-group"+data.formType).append(
                        '<div class="help-block">' + errorData[value] + "</div>"
                        );
                    });
                }
                $(btn_obj).find(".fa-spinner").remove();
                $("form").find(":submit").attr("disabled", false);
            } else {
                if (data.class == "form-success") {
                    $("form").trigger("reset");
                    $(btn_obj).find(".fa-spinner").remove();
                    $("form").find(":submit").attr("disabled", false);
                    var datahtml ='<div style="border:solid #398f14;font-size: 11px;color: #398f14;padding: 10px 20px;line-height: 1.5;border-width: 1px;text-align: center;margin-top:10px">Your request has been sent! Our executive will reach out to you soon.</div>';
                    $('#message'+data.formType).empty();
                    $('#message'+data.formType).html(datahtml);
                    let divVar = '#message'+data.formType;
                    setTimeout('$("'+divVar+'").empty()',5000);
                } else {
                    $(btn_obj).find(".fa-spinner").remove();
                    $("form").find(":submit").attr("disabled", false);

                    $("form").trigger("reset");

                    $(".customForm").removeClass("has-error");
                    $(".help-block").remove();
                    
                    $('#message'+data.formType).empty();
                    let datahtml ='<div style="border:solid #fa0000;font-size: 11px;color: #fa0000;padding: 10px 20px;line-height: 1.5;border-width: 1px;text-align: center;margin-top:10px">Something Went Wrong</div>';
                    $('#message'+data.formType).html(datahtml);
                    let divVar = '#message'+data.formType;
                    setTimeout('$("'+divVar+'").empty()',5000);
                }
            }
        });

        event.preventDefault();
    });
});