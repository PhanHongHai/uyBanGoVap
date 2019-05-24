$(function () {
    $('#formGY').validate({
        errorClass: "invalid",
        rules: {
            name: {
                required: true,
                minlength: 5,
                maxlength: 20
            },
            email: {
                required: true,
                email: true
            },
            adress: {
                minlength: 5
            },
            phone: {
                digits: true,
                minlength: 10,
                maxlength: 10,
            },
            title: {
                required: true,
                minlength: 5
            },
            content: {
                required: true,
                minlength: 5
            },
            file: "required"
        },
        messages: {
            name: {
                required: 'Vui lòng nhập họ tên',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 20 ký tự'
            },
            email: {
                required: 'Vui lòng nhập email',
                email: 'Email không hợp lệ'
            },
            title: {
                required: 'Vui long nhap tiêu đề',
                minlength: 'Nhập tối thiểu 5 ký tự'
            },
            adress: {
                required: 'Vui lòng nhập địa chỉ',
                minlength: 'Nhập tối thiểu 5 ký tự',
            },
            phone: {
                digits: 'Vui lòng nhập ký tự là số',
                minlength: 'Nhập tối thiểu 10 số',
                maxlength: 'Nhập tối đa 10 số'
            },
            content: {
                required: 'Vui lòng nhập nội dung',
                minlength: 'Nhập tối thiểu 5 ký tự'
            },
            file: 'Yêu cầu gửi file'
        },

    });
    
})
