$(document).ready(function() {

    'use strict';

    // ------------------------------------------------------- //
    // Search Box
    // ------------------------------------------------------ //
    $('#search').on('click', function(e) {
        e.preventDefault();
        $('.search-box').fadeIn();
    });
    $('.dismiss').on('click', function() {
        $('.search-box').fadeOut();
    });

    // ------------------------------------------------------- //
    // Card Close
    // ------------------------------------------------------ //
    $('.card-close a.remove').on('click', function(e) {
        e.preventDefault();
        $(this).parents('.card').fadeOut();
    });

    // ------------------------------------------------------- //
    // Tooltips init
    // ------------------------------------------------------ //    

    $('[data-toggle="tooltip"]').tooltip()


    // ------------------------------------------------------- //
    // Adding fade effect to dropdowns
    // ------------------------------------------------------ //
    $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn();
    });
    $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut();
    });


    // ------------------------------------------------------- //
    // Sidebar Functionality
    // ------------------------------------------------------ //
    $('#toggle-btn').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');

        $('.side-navbar').toggleClass('shrinked');
        $('.content-inner').toggleClass('active');
        $(document).trigger('sidebarChanged');

        if ($(window).outerWidth() > 1183) {
            if ($('#toggle-btn').hasClass('active')) {
                $('.navbar-header .brand-small').hide();
                $('.navbar-header .brand-big').show();
            } else {
                $('.navbar-header .brand-small').show();
                $('.navbar-header .brand-big').hide();
            }
        }

        if ($(window).outerWidth() < 1183) {
            $('.navbar-header .brand-small').show();
        }
    });

    // ------------------------------------------------------- //
    // Universal Form Validation
    // ------------------------------------------------------ //

    $('.form-validate').each(function() {
        $(this).validate({
            errorElement: "div",
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            ignore: ':hidden:not(.summernote, .checkbox-template, .form-control-custom),.note-editable.card-block',
            errorPlacement: function(error, element) {
                // Add the `invalid-feedback` class to the error element
                error.addClass("invalid-feedback");
                console.log(element);
                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.siblings("label"));
                } else {
                    error.insertAfter(element);
                }
            }
        });

    });

    // ------------------------------------------------------- //
    // Material Inputs
    // ------------------------------------------------------ //

    var materialInputs = $('input.input-material');

    // activate labels for prefilled values
    materialInputs.filter(function() { return $(this).val() !== ""; }).siblings('.label-material').addClass('active');

    // move label on focus
    materialInputs.on('focus', function() {
        $(this).siblings('.label-material').addClass('active');
    });

    // remove/keep label on blur
    materialInputs.on('blur', function() {
        $(this).siblings('.label-material').removeClass('active');

        if ($(this).val() !== '') {
            $(this).siblings('.label-material').addClass('active');
        } else {
            $(this).siblings('.label-material').removeClass('active');
        }
    });

    // ------------------------------------------------------- //
    // Footer 
    // ------------------------------------------------------ //   

    var contentInner = $('.content-inner');

    $(document).on('sidebarChanged', function() {
        adjustFooter();
    });

    $(window).on('resize', function() {
        adjustFooter();
    })

    function adjustFooter() {
        var footerBlockHeight = $('.main-footer').outerHeight();
        contentInner.css('padding-bottom', footerBlockHeight + 'px');
    }

    // ------------------------------------------------------- //
    // External links to new window
    // ------------------------------------------------------ //
    $('.external').on('click', function(e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });

    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    var stylesheet = $('link#theme-stylesheet');
    $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function() {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, {
                expires: 365,
                path: document.URL.substr(0, document.URL.lastIndexOf('/'))
            });

        }

        return false;
    });

});


//登录数据交互
$("#login").click(function() {

    var val = valiCode.value;
    var current = result.join('');

    console.log(val, typeof val, current, typeof current)
    if (current.toLowerCase() != val.toLowerCase()) {
        wrongShow.innerText = '验证码输入有误!';
        getRandomStr();

    } else {
        //wrongShow.innerText = '验证码输入正确!';
        /* getRandomStr();
         alert('验证码输入正确!');*/
        user_name = $('#user_name').val();
        password = $('#password').val();

        $.ajax({
            type: "POST", //提交的方法
            url: "/sign_in_by_password", //提交的地址  
            // contentType: false,
            data: {
                'user_name': user_name,
                'password': password
            },

            // datatype: "json",
            //$('#login_form').serialize(), // 序列化表单值  
            async: false,
            error: function(request) { //失败的话
                alert("Connection error");
            },
            success: function(data) { //成功
                if (data == '0') {
                    alert("登陆成功"); //就将返回的数据显示出来
                    window.location.href = "index.html";
                    // $.cookie("user_name", user_name, { expires: 7 }); // 存储一个带7天期限的 cookie
                    window.localStorage.setItem("name", data);
                } else if (data == '1') {
                    alert("用户名不存在");
                } else {
                    alert("密码错误");
                }

            }
        });

    }
});

//手机号登录
$("#login_by_phones").click(function() {


    var val = valiCode.value;
    var current = result.join('');

    console.log(val, typeof val, current, typeof current)
    if (current.toLowerCase() != val.toLowerCase()) {
        wrongShow.innerText = '验证码输入有误!';
        getRandomStr();

    } else {
        // wrongShow.innerText = '验证码输入正确!';
        /* getRandomStr();
         alert('验证码输入正确!');*/
        phone_number = $('#phone_number').val();
        phone_login_code = $('#phone_login_code').val();


        $.ajax({
            type: "POST", //提交的方法
            url: "/sign_in_by_password", //提交的地址  
            // contentType: false,
            data: {
                'phone_number': phone_number,
                'phone_login_code': phone_login_code
            },

            // datatype: "json",
            //$('#login_form').serialize(), // 序列化表单值  
            async: false,
            error: function(request) { //失败的话
                alert("Connection error");
            },
            success: function(data) { //成功
                switch (data) {
                    case '0':
                        window.localStorage.setItem("name", user_name);
                        window.location.href = "index.html";
                        break;
                    case '1':
                        document.getElementsByClassName('wrong-show').innerText = '手机验证码错误';
                        break;
                    default:
                }

                // $.cookie("user_name", user_name, { expires: 7 }); // 存储一个带7天期限的 cookie

            }
        });


    }
});

//登出
$("#log_out").click(function() {
    //user_name = $('#login_id').val();
    window.localStorage.removeItem("name");

});


//注册
$("#sign_up").click(function() {
    reg_password = $('#reg_password').val();
    reg_password_1 = $('#reg_password_1').val();
    if (reg_password.length > 10) {
        document.getElementsByClassName('wrong-show').innerText = '密码长度超过10位';

    } else {
        if (reg_password != reg_password_1) {
            document.getElementsByClassName('wrong-show').innerText = '两次密码输入不一致';
        } else {
            var val = valiCode.value;
            var current = result.join('');

            console.log(val, typeof val, current, typeof current);
            if (current.toLowerCase() != val.toLowerCase()) {
                wrongShow.innerText = '验证码输入有误!';
                getRandomStr();

            } else {
                //wrongShow.innerText = '验证码输入正确!';
                /* getRandomStr();
                 alert('验证码输入正确!');*/
                phone_number = $('#phone_number').val();
                reg_phone_code = $('#reg_phone_code').val();
                reg_user_name = $('#reg_user_name').val();
                reg_password = $('#reg_password').val();
                reg_password_1 = $('#reg_password_1').val();

                $.ajax({
                    type: "POST", //提交的方法
                    url: "/sign_up", //提交的地址  
                    // contentType: false,
                    data: {
                        'phone_number': phone_number,
                        'reg_phone_code': reg_phone_code,
                        'reg_user_name': reg_user_name,
                        'reg_password': reg_password,

                    },

                    // datatype: "json",
                    //$('#login_form').serialize(), // 序列化表单值  
                    async: false,
                    error: function(request) { //失败的话
                        alert("Connection error");
                    },
                    success: function(data) { //成功
                        switch (data) {
                            case '0':
                                window.localStorage.setItem("name", user_name);
                                window.location.href = "index.html";
                                break;
                            case '1':
                                document.getElementsByClassName('wrong-show').innerText = '手机验证码错误';
                                break;
                            case '2':
                                document.getElementsByClassName('wrong-show').innerText = '用户名已存在';
                            default:
                        }
                        // $.cookie("user_name", user_name, { expires: 7 }); // 存储一个带7天期限的 cookie

                    }
                });

            }
        }
    }

});

//验证码

var valiCode = document.getElementsByName('validateCode')[0];
var code = document.getElementsByClassName('code')[0];
var wrongShow = document.getElementsByClassName('wrong-show')[0];
var refresh = document.getElementsByClassName('refresh')[0];

var result = [];

/*声明一个数组包含所有字母及数字*/
var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

/*生成一个四位随机字符串*/
function getRandomStr() {
    result.lenght = 0;
    for (var i = 0; i < 4; i++) {
        var num = Math.floor(Math.random() * 62);
        result[i] = arr[num];
    }
    var codeStr = result.join('');
    code.innerText = codeStr;
}

/*初始化一个验证码*/
window.onload = getRandomStr();

/*点击页面中该字符串重新生成一次*/
refresh.onclick = function() {
    getRandomStr();
};


//手机验证码
$("#get_phone_code").click(function() {


    phone_number = $('#phone_number').val();

    $.ajax({
        type: "POST", //提交的方法
        url: "/reg_phone_number", //提交的地址  
        // contentType: false,
        data: {
            'phone_number': phone_number,
        },

        // datatype: "json",
        //$('#login_form').serialize(), // 序列化表单值  
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
        success: function(data) { //成功
            if (data == '0') {
                alert(phone_number); //就将返回的数据显示出来
                window.location.href = "index.html";
                // $.cookie("user_name", user_name, { expires: 7 }); // 存储一个带7天期限的 cookie
                window.localStorage.setItem("name", user_name);
            } else if (data == '1') {
                alert("手机号已注册");
            } else {
                alert("手机号不存在");
            }

        }
    });

});

//忘记密码
$("#forget_password").click(function() {
    reg_password = $('#reg_password').val();
    reg_password_1 = $('#reg_password_1').val();
    if (reg_password.length > 10) {
        document.getElementsByClassName('wrong-show').innerText = '密码长度超过10位';

    } else {
        if (reg_password != reg_password_1) {
            document.getElementsByClassName('wrong-show').innerText = '两次密码输入不一致';
        } else {
            var val = valiCode.value;
            var current = result.join('');

            console.log(val, typeof val, current, typeof current);
            if (current.toLowerCase() != val.toLowerCase()) {
                wrongShow.innerText = '验证码输入有误!';
                getRandomStr();

            } else {
                //wrongShow.innerText = '验证码输入正确!';
                /* getRandomStr();
                 alert('验证码输入正确!');*/
                phone_number = $('#phone_number').val();
                reg_phone_code = $('#reg_phone_code').val();
                reg_user_name = $('#reg_user_name').val();
                reg_password = $('#reg_password').val();
                reg_password_1 = $('#reg_password_1').val();

                $.ajax({
                    type: "POST", //提交的方法
                    url: "/sign_up", //提交的地址  
                    // contentType: false,
                    data: {
                        'phone_number': phone_number,
                        'log_phone_code': log_phone_code,
                        'reg_user_name': reg_user_name,
                        'reg_password': reg_password,

                    },

                    // datatype: "json",
                    //$('#login_form').serialize(), // 序列化表单值  
                    async: false,
                    error: function(request) { //失败的话
                        alert("Connection error");
                    },
                    success: function(data) { //成功
                        switch (data) {
                            case '0':
                                window.location.href = "index.html";
                                window.localStorage.setItem("name", user_name);
                                break;
                            case '1':
                                document.getElementsByClassName('wrong-show').innerText = '手机验证码错误';
                                break;
                            default:
                        }
                        // $.cookie("user_name", user_name, { expires: 7 }); // 存储一个带7天期限的 cookie

                    }
                });

            }
        }
    }

});