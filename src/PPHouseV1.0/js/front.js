$(document).ready(function() {

    'use strict';

    // ------------------------------------------------------- //
    // Search Box
    // ------------------------------------------------------ //
    /*$('#search').on('click', function(e) {
        e.preventDefault();
        $('.search-box').fadeIn();
    });
    $('.dismiss').on('click', function() {
        $('.search-box').fadeOut();
    });
    */

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

//设置cookie
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
//setCookie('name', 'zzyn', 1); // cookie过期时间为1天。


function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }

            return unescape(document.cookie.substring(c_start, c_end));
        }
    }

    return "";
}

function delCookie(name) {
    setCookie(name, "", -1);
}

function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

//登录数据交互
$("#login").click(function() {

    user_name = $('#user_name').val();
    password = $('#password').val();

    if (user_name.length == 0) { document.getElementById('wrong_box').innerText = '未输入用户名'; } else {
        if (password.length == 0) { document.getElementById('wrong_box').innerText = '未输入密码'; } else {

            var val = valiCode.value;
            var current = result.join('');

            console.log(val, typeof val, current, typeof current)
            if (current.toLowerCase() != val.toLowerCase()) {
                document.getElementById('wrong_box').innerText = '验证码输入有误!';
                getRandomStr();

            } else {
                //wrongShow.innerText = '验证码输入正确!';
                /* getRandomStr();
                 alert('验证码输入正确!');*/


                $.ajax({
                    type: "POST", //提交的方法
                    url: "/sign_in_by_password", //提交的地址  
                    // contentType: false,
                    data: {
                        'user_name': user_name,
                        'password': password
                    },

                    datatype: "json",
                    //$('#login_form').serialize(), // 序列化表单值  
                    async: false,
                    error: function(request) { //失败的话
                        alert("Connection error");
                    },
                    success: function(data) { //成功
                        //var dataObj = data.phra;
                        switch (data.is_success) {
                            /*
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
                            */
                            //switch (data) 
                            case '0':
                                {
                                    //window.localStorage.setItem("name", data.user.user_name);
                                    setCookie('session', 'user', 7);
                                    setCookie('name', data.user.user_name, 7);
                                    window.location.href = "index.html";
                                    break;
                                }
                            case "1":
                                {
                                    document.getElementById('wrong_box').innerText = "用户名不存在";
                                    break;
                                }
                            case "2":
                                document.getElementById('wrong_box').innerText = "密码错误";
                                break;
                            default:
                                document.getElementById('wrong_box').innerText = "未知错误";

                        }

                    }
                });

            }
        }
    }
});

//手机号登录
$("#login_by_phone").click(function() {
    phone_number = $('#phone_number').val();
    phone_code = $('#phone_code').val();

    if (phone_number.length == 0) { document.getElementById('wrong_box').innerText = '未输入手机号'; } else {
        if (phone_number.length != 11) { document.getElementById('wrong_box').innerText = '手机号长度有误'; } else {


            $.ajax({
                type: "POST", //提交的方法
                url: "/sign_in_by_phone_number", //提交的地址  
                // contentType: false,
                data: {
                    'phone_number': phone_number,
                    'phone_code': phone_code
                },

                datatype: "json",
                //$('#login_form').serialize(), // 序列化表单值  
                async: false,
                error: function(request) { //失败的话
                    alert("Connection error");
                },
                success: function(data) { //成功

                    switch (data.is_success) {
                        case '0':
                            // window.localStorage.setItem("name", data.user.user_name);
                            setCookie('session', 'user', 7);
                            setCookie('name', data.user.user_name, 7);
                            window.location.href = "index.html";
                            break;
                        case '1':
                            document.getElementById('wrong_box').innerText = "手机号未注册";
                            break;
                        case '2':
                            document.getElementById('wrong_box').innerText = "手机验证码错误";
                            break;
                        default:
                            document.getElementById('wrong_box').innerText = "未知错误";
                    }

                    // $.cookie("user_name", user_name, { expires: 7 }); // 存储一个带7天期限的 cookie

                }
            });
        }
    }
});

//管理员登录
$("#admin_login").click(function() {

    admin_name = $('#admin_name').val();
    admin_password = $('#admin_password').val();

    if (admin_name.length == 0) { document.getElementById('wrong_box_1').innerText = '未输入管理员用户名'; } else {
        if (admin_password.length == 0) { document.getElementById('wrong_box_1').innerText = '未输入密码'; } else {

            var val = valiCode.value;
            var current = result.join('');

            console.log(val, typeof val, current, typeof current)
            if (current.toLowerCase() != val.toLowerCase()) {
                document.getElementById('wrong_box_1').innerText = '验证码输入有误!';
                getRandomStr();

            } else {
                //wrongShow.innerText = '验证码输入正确!';
                /* getRandomStr();
                 alert('验证码输入正确!');*/


                $.ajax({
                    type: "POST", //提交的方法
                    url: "/admin_sign_in", //提交的地址  
                    // contentType: false,
                    data: {
                        'admin_name': admin_name,
                        'admin_password': admin_password
                    },

                    datatype: "json",
                    //$('#login_form').serialize(), // 序列化表单值  
                    async: false,
                    error: function(request) { //失败的话
                        alert("Connection error");
                    },
                    success: function(data) { //成功
                        //var dataObj = data.phra;
                        switch (data.is_success) {
                            /*
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
                            */
                            //switch (data) 
                            case '0':
                                {
                                    window.location.href = "admin_page_1.html";
                                    setCookie('session', "admin", 7);
                                    setCookie('name', admin_name, 7);
                                    break;
                                }
                            case "1":
                                {
                                    document.getElementById('wrong_box_1').innerText = "用户名不存在";
                                    break;
                                }
                            case "2":
                                document.getElementById('wrong_box_1').innerText = "密码错误";
                                break;
                            default:
                                document.getElementById('wrong_box_1').innerText = "未知错误";

                        }

                    }
                });

            }
        }
    }
});


//登出
function log_out() {
    //user_name = $('#login_id').val();
    //window.localStorage.removeItem("name");
    delCookie("session");
    delCookie("name");
    //clearCookie();
    window.location.href = "login.html";
};


$("#log_out_a").click(function() {
    //user_name = $('#login_id').val();
    //window.localStorage.removeItem("name");
    delCookie("session");
    delCookie("name");
    //clearCookie();
    window.location.href = "login.html";
});

//注册
$("#sign_up").click(function() {
    reg_password = $('#reg_password').val();
    reg_password_1 = $('#reg_password_1').val();
    phone_number = $('#phone_number').val();
    reg_phone_code = $('#reg_phone_code').val();
    reg_user_name = $('#reg_user_name').val();

    if (reg_user_name.length == 0) { document.getElementById('wrong_box').innerText = '未输入用户名'; } else {
        if (reg_password.length == 0) { document.getElementById('wrong_box').innerText = '未输入密码'; } else {
            if (phone_number.length == 0) { document.getElementById('wrong_box').innerText = '未输入手机号'; } else {
                if (phone_number.length != 11) { document.getElementById('wrong_box').innerText = '手机号长度有误'; } else {
                    if (reg_password.length > 10) { document.getElementById('wrong_box').innerText = '密码长度不能超过10位'; } else {
                        if (reg_password.length < 4) { document.getElementById('wrong_box').innerText = '密码长度不能少于4位'; } else {
                            if (reg_password != reg_password_1) {
                                document.getElementById('wrong_box').innerText = '两次密码输入不一致';
                            } else {
                                var val = valiCode.value;
                                var current = result.join('');

                                console.log(val, typeof val, current, typeof current);
                                if (current.toLowerCase() != val.toLowerCase()) {
                                    document.getElementById('wrong_box').innerText = '验证码输入有误!';
                                    getRandomStr();

                                } else {
                                    //wrongShow.innerText = '验证码输入正确!';
                                    /* getRandomStr();
                                     alert('验证码输入正确!');*/


                                    $.ajax({
                                        type: "POST", //提交的方法
                                        url: "/sign_up", //提交的地址  
                                        // contentType: false,
                                        datatype: "json",
                                        data: {
                                            'phone_number': phone_number,
                                            'reg_phone_code': reg_phone_code,
                                            'reg_user_name': reg_user_name,
                                            'reg_password': reg_password,
                                        },
                                        //$('#login_form').serialize(), // 序列化表单值  
                                        async: false,
                                        error: function(request) { //失败的话
                                            alert("Connection error");
                                        },
                                        success: function(data) { //成功
                                            switch (data.is_success) {
                                                case '0':
                                                    window.location.href = "login.html";
                                                    break;
                                                case '1':
                                                    document.getElementById('wrong_box').innerText = '手机验证码错误';
                                                    break;
                                                case '2':
                                                    document.getElementById('wrong_box').innerText = '用户名已存在';
                                                default:
                                                    document.getElementById('wrong_box').innerText = '未知错误';
                                            }
                                            // $.cookie("user_name", user_name, { expires: 7 }); // 存储一个带7天期限的 cookie

                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

//验证码

var valiCode = document.getElementsByName('validateCode')[0];
var code = document.getElementsByClassName('code')[0];

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
obj = document.getElementsByClassName('code')[0];
if (obj) {
    window.onload = getRandomStr();


    /*点击页面中该字符串重新生成一次*/
    refresh.onclick = function() {
        getRandomStr();
    };
}


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

            if (data == '0') {} else if (data == '1') {

                if (data == '0') {

                } else if (data == '1') {

                    alert("手机号已注册");
                } else {
                    alert("手机号不存在");
                }

            }
        }

    });
});


//登录和修改密码时获取手机验证码
$("#get_auth_code").click(function() {

    phone_number = $('#phone_number').val();
    $.ajax({
        type: "POST", //提交的方法
        url: "/get_auth_code", //提交的地址  
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

            if (data == '0') {} else if (data == '1') {

                if (data == '0') {} else if (data == '1') {
                    alert("手机号未注册");
                }

            }
        }

    });
});

//忘记密码
$("#forget_password").click(function() {
    phone_number = $('#phone_number').val();
    phone_code = $('#phone_code').val();
    user_name = $('#user_name').val();
    password = $('#password').val();
    password_1 = $('#password_1').val();

    if (user_name.length == 0) { document.getElementById('wrong_box').innerText = '未输入用户名'; } else {
        if (password.length == 0) { document.getElementById('wrong_box').innerText = '未输入密码'; } else {
            if (phone_number.length == 0) { document.getElementById('wrong_box').innerText = '未输入手机号'; } else {
                if (phone_number.length != 11) { document.getElementById('wrong_box').innerText = '手机号长度有误'; } else {
                    if (password.length > 10) { document.getElementById('wrong_box').innerText = '密码长度不能超过10位'; } else {
                        if (password.length < 4) { document.getElementById('wrong_box').innerText = '密码长度不能少于4位'; } else {
                            if (password != password_1) {
                                document.getElementById('wrong_box').innerText = '两次密码输入不一致';
                            } else {
                                var val = valiCode.value;
                                var current = result.join('');

                                console.log(val, typeof val, current, typeof current);
                                if (current.toLowerCase() != val.toLowerCase()) {
                                    document.getElementById('wrong_box').innerText = '验证码输入有误!';
                                    getRandomStr();

                                } else {
                                    //wrongShow.innerText = '验证码输入正确!';
                                    /* getRandomStr();
                                     alert('验证码输入正确!');*/

                                    $.ajax({
                                        type: "POST", //提交的方法
                                        url: "/forget_password", //提交的地址  
                                        // contentType: false,
                                        datatype: "json",
                                        data: {
                                            'phone_number': phone_number,
                                            'phone_code': phone_code,
                                            'user_name': user_name,
                                            'password': password,

                                        },
                                        //$('#login_form').serialize(), // 序列化表单值  
                                        async: false,
                                        error: function(request) { //失败的话
                                            alert("Connection error");
                                        },
                                        success: function(data) { //成功
                                            switch (data.is_success) {
                                                case '0':
                                                    window.location.href = "index.html";
                                                    window.localStorage.setItem("name", data.user.user_name);
                                                    break;
                                                case '1':
                                                    document.getElementById('wrong_box').innerText = '手机验证码错误';
                                                    break;
                                                case '2':
                                                    document.getElementById('wrong_box').innerText = '手机号未注册';
                                                    break;
                                                case '3':
                                                    document.getElementById('wrong_box').innerText = '手机号与用户名不匹配';
                                                    break;
                                                default:
                                                    document.getElementById('wrong_box').innerText = '未知错误';
                                            }
                                            // $.cookie("user_name", user_name, { expires: 7 }); // 存储一个带7天期限的 cookie
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});


//管理员查找用户
$("#admin_search").click(function() {

    search_phone = $('#search_phone').val();
    $.ajax({
        type: "POST", //提交的方法
        url: "/search_member", //提交的地址  
        // contentType: false,
        data: {
            'search_phone': search_phone,
        },

        datatype: "json",
        //$('#login_form').serialize(), // 序列化表单值  
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
            document.getElementById("error_info").style.display = "";
            document.getElementById("search_div").style.display = "none";

        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    document.getElementById("error_info").style.display = "none";
                    document.getElementById("search_div").style.display = "block";
                    //document.getElementById("search_time").innerText = data.
                    document.getElementById("search_user").innerText = data.user.user_name;
                    document.getElementById("search_phone_number").innerText = data.user.user_phone;
                    break;
                case '1':
                    document.getElementById("error_info").style.display = "block";
                    document.getElementById("search_div").style.display = "none";
                    break;
                default:
                    alert("未知错误");
            }



        }

    });
});

//管理员删除用户
$("#delete_user").click(function() {
    var search_user = document.getElementById('search_user').innerText;
    var search_phone_number = document.getElementById('search_phone_number').innerText;


    $.ajax({
        type: "POST", //提交的方法
        url: "/delete_users", //提交的地址  
        // contentType: false,
        data: {
            'search_user': search_user,
            'search_phone_number': search_phone_number
        },

        datatype: "json",
        //$('#login_form').serialize(), // 序列化表单值  
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
            document.getElementById("delete_info").value = "连接失败";

        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    document.getElementById("delete_info").innerText = "删除成功";
                    break;
                case '1':
                    document.getElementById("delete_info").innerText = "删除失败";
                    break;
                default:
                    alert(data.is_success);
                    // alert("未知错误");
            }
        }

    });
});


//管理员注册新用户
$("#admin_add").click(function() {

    add_user = $('#add_user').val();
    add_phone = $('#add_phone').val();
    add_password = $('#add_password').val();
    $.ajax({
        type: "POST", //提交的方法
        url: "/add_users", //提交的地址  
        // contentType: false,
        data: {
            'add_user': add_user,
            'add_phone': add_phone,
            'add_password': add_password
        },

        datatype: "json",
        //$('#login_form').serialize(), // 序列化表单值  
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
            document.getElementById("add_info").innerText = "连接失败";
        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    document.getElementById("add_info").innerText = "注册成功";
                    break;
                default:
                    alert("未知错误");

            }
        }

    });
});


var num = new Array(12);
//显示访客人数趋势图
function show_visitor() {

    $.ajax({
        type: "POST", //
        url: "/new_sign_in", //
        datatype: "json",
        data: {},
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
        success: function(data) {
            num[0] = data.new[0];
            num[1] = data.new[1];
            num[2] = data.new[2];
            num[3] = data.new[3];
            num[4] = data.new[4];
            num[5] = data.new[5];
            num[6] = data.new[6];
            num[7] = data.new[7];
            num[8] = data.new[8];
            num[9] = data.new[9];
            num[10] = data.new[10];
            num[11] = data.new[11];

        }
    });

    $(document).ready(function() {

        'use strict';
        var LINECHART5 = $('#lineChartExample5');
        var myLineChart5 = new Chart(LINECHART5, {
            type: 'line',
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: true
                        }
                    }]
                },
                legend: { labels: { fontColor: "#777", fontSize: 12, }, display: false }
            },


            data: {
                labels: [GetDateStr(-11), GetDateStr(-10), GetDateStr(-9), GetDateStr(-8), GetDateStr(-7), GetDateStr(-6), GetDateStr(-5), GetDateStr(-4), GetDateStr(-3), GetDateStr(-2), GetDateStr(-1), GetDateStr(0)],
                datasets: [{
                    label: "访客",
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#6ccef0',
                    pointBorderColor: '#59c2e6',
                    pointHoverBackgroundColor: '#59c2e6',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBackgroundColor: "#59c2e6",
                    pointBorderWidth: 0,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 4,
                    pointHitRadius: 0,
                    data: [num[0], num[1], num[2], num[3], num[4], num[5], num[6], num[7], num[8], num[9], num[10], num[11]],
                    spanGaps: false
                }]
            }
        });
    });
}



//显示新增用户人数趋势图

var num1 = new Array(12);

function show_user() {

    $.ajax({
        type: "POST", //
        url: "/new_sign_up", //
        datatype: "json",
        data: {},
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");

        },
        success: function(data) {
            num1[0] = data.new[0];
            num1[1] = data.new[1];
            num1[2] = data.new[2];
            num1[3] = data.new[3];
            num1[4] = data.new[4];
            num1[5] = data.new[5];
            num1[6] = data.new[6];
            num1[7] = data.new[7];
            num1[8] = data.new[8];
            num1[9] = data.new[9];
            num1[10] = data.new[10];
            num1[11] = data.new[11];

        }
    });

    $(document).ready(function() {

        'use strict';
        var LINECHART6 = $('#lineChartExample6');
        var myLineChart6 = new Chart(LINECHART6, {
            type: 'line',
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: true
                        }
                    }]
                },
                legend: { labels: { fontColor: "#777", fontSize: 12, }, display: false }
            },


            data: {
                labels: [GetDateStr(-11), GetDateStr(-10), GetDateStr(-9), GetDateStr(-8), GetDateStr(-7), GetDateStr(-6), GetDateStr(-5), GetDateStr(-4), GetDateStr(-3), GetDateStr(-2), GetDateStr(-1), GetDateStr(0)],
                datasets: [{
                    label: "用户",
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#6ccef0',
                    pointBorderColor: '#59c2e6',
                    pointHoverBackgroundColor: '#59c2e6',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBackgroundColor: "#59c2e6",
                    pointBorderWidth: 0,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 4,
                    pointHitRadius: 0,
                    data: [num1[0], num1[1], num1[2], num1[3], num1[4], num1[5], num1[6], num1[7], num1[8], num1[9], num1[10], num1[11]],
                    spanGaps: false
                }]
            }
        });
    });
}

//访客表
function show_visitor_table() {

    $.ajax({
        type: "POST", //
        url: "/new_sign_in_list", //
        datatype: "json",
        data: {},
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
        success: function(data) {
            if (data.first.hour == "0")
                document.getElementById("visitor_1_time").innerText = data.first.minute + "分钟前";
            else
                document.getElementById("visitor_1_time").innerText = data.first.hour + "小时" + data.first.minute + "分钟前";

            document.getElementById("visitor_1_name").innerText = data.first.user_name;
            document.getElementById("visitor_1_phone").innerText = data.first.user_phone;

            if (data.second.hour == "0")
                document.getElementById("visitor_2_time").innerText = data.second.minute + "分钟前";
            else
                document.getElementById("visitor_2_time").innerText = data.second.hour + "小时" + data.second.minute + "分钟前";
            document.getElementById("visitor_2_name").innerText = data.second.user_name;
            document.getElementById("visitor_2_phone").innerText = data.second.user_phone;

            if (data.third.hour == "0")
                document.getElementById("visitor_3_time").innerText = data.third.minute + "分钟前";
            else
                document.getElementById("visitor_3_time").innerText = data.third.hour + "小时" + data.third.minute + "分钟前";
            document.getElementById("visitor_3_name").innerText = data.third.user_name;
            document.getElementById("visitor_3_phone").innerText = data.third.user_phone;
        }
    });

}

//新增用户表
function show_user_table() {

    $.ajax({
        type: "POST", //
        url: "/new_sign_up_list", //
        datatype: "json",
        data: {},
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
        success: function(data) {
            if (data.first.hour == "0") {

                document.getElementById("user_1_time").innerText = data.first.minute + "分钟前";
            } else
                document.getElementById("user_1_time").innerText = data.first.hour + "小时" + data.first.minute + "分钟前";
            document.getElementById("user_1_name").innerText = data.first.user_name;
            document.getElementById("user_1_phone").innerText = data.first.user_phone;

            if (data.second.hour == "0")
                document.getElementById("user_2_time").innerText = data.second.minute + "分钟前";
            else
                document.getElementById("user_2_time").innerText = data.second.hour + "小时" + data.second.minute + "分钟前";
            document.getElementById("user_2_name").innerText = data.second.user_name;
            document.getElementById("user_2_phone").innerText = data.second.user_phone;

            if (data.third.hour == "0")
                document.getElementById("user_3_time").innerText = data.third.minute + "分钟前";
            else
                document.getElementById("user_3_time").innerText = data.third.hour + "小时" + data.third.minute + "分钟前";
            document.getElementById("user_3_name").innerText = data.third.user_name;
            document.getElementById("user_3_phone").innerText = data.third.user_phone;
        }
    });

}
//新增用户 new_sign_up_list
//新增访问 new_sign_in_list
//new_sign_up1


//用户修改密码
$("#change_password").click(function() {

    change_user_name = $('#change_user_name').val();
    change_password_1 = $('#change_password_1').val();
    change_password_2 = $('#change_password_2').val();
    change_password_3 = $('#change_password_3').val();

    $.ajax({
        type: "POST", //提交的方法
        url: "/change_password_func", //提交的地址  
        // contentType: false,
        data: {
            'change_user_name': change_user_name,
            'change_password_1': change_password_1,
            'change_password_2': change_password_2,
        },

        datatype: "json",
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    alert("修改成功");
                    break;
                case '1':
                    alert("用户名错误");
                    break;
                case '2':
                    alert("密码错误");
                    break;

                default:
                    alert("未知错误");
            }
        }

    });
})

function get_admin_session() {
    $.ajax({
        type: "POST", //提交的方法
        url: "/admin_session", //提交的地址  
        // contentType: false,
        data: {},

        datatype: "json",
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    break;
                case '1':
                    window.location.href = "login.html";
                    break;
                default:
                    alert("未知错误");
            }
        }

    });
}

//管理员增加新房源
$("#admin_add_house").click(function() {

    date = $('#date').val();
    province = $('#province').val();
    city = $('#city').val();
    district = $('#district').val();


    address = $('#address').val();
    firm_name = $('#firm_name').val();
    house_type = $('#house_type').val();
    direction = $('#direction').val();

    area = $('#area').val();
    average_price = $('#average_price').val();
    total_price = $('#total_price').val();
    elevator = $('#elevator').val();

    heigth = $('#heigth').val();
    huxing_jiegou = $('#huxing_jiegou').val();
    jianzhuleixing = $('#jianzhuleixing').val();
    new_h = $('#new_h').val();

    nianxian = $('#nianxian').val();
    ti_bili = $('#ti_bili').val();
    zhuangxiu = $('#zhuangxiu').val();
    kaiaipan_shijian = $('#kaiaipan_shijian').val();

    $.ajax({
        type: "POST", //提交的方法
        url: "/add_users", //提交的地址  
        // contentType: false,
        data: {
            'date': date,
            'province': province,
            'city': city,
            'district': district,

            'address': address,
            'firm_name': firm_name,
            'house_type': house_type,
            'direction': direction,

            'area': area,
            'average_price': average_price,
            'total_price': total_price,
            'elevator': elevator,

            'heigth': heigth,
            'huxing_jiegou': huxing_jiegou,
            'jianzhuleixing': jianzhuleixing,
            'new_h': new_h,

            'nianxian': nianxian,
            'ti_bili': ti_bili,
            'zhuangxiu': zhuangxiu,
            'kaiaipan_shijian': kaiaipan_shijian,

        },

        datatype: "json",
        //$('#login_form').serialize(), // 序列化表单值  
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    alert("提交成功");
                    break;
                default:
                    alert("未知错误");

            }
        }

    });
});

//获取管理员身份证明
function get_admin_session() {
    $.ajax({
        type: "POST", //提交的方法
        url: "/admin_session", //提交的地址  
        // contentType: false,
        data: {},

        datatype: "json",
        async: false,
        error: function(request) { //失败的话
            alert("Connection error");
            window.location.href = "login.html";
        },
        success: function(data) { //成功
            switch (data.is_success) {
                case '0':
                    break;
                case '1':
                    window.location.href = "login.html";
                    break;
                default:
                    alert("未知错误");
            }
        }

    });
}

function check_login_state() {
    if (getCookie('session') == "user") {
        document.getElementById('in_li').style.display = "none";
        document.getElementById('out_li').style.display = "";
        document.getElementById('admin_li').style.display = "none";
    } else if (getCookie('session') == "admin") {
        document.getElementById('in_li').style.display = "none";
        document.getElementById('out_li').style.display = "";
        document.getElementById('admin_li').style.display = "";
    } else {
        document.getElementById('in_li').style.display = "";
        document.getElementById('out_li').style.display = "none";
        document.getElementById('admin_li').style.display = "";
    }
}