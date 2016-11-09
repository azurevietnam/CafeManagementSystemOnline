var domainURL = 'http://192.168.56.1:1234';
function _OpenTable(ban) {
    $.ajax({
        url: domainURL + '/Cashier/BanHang/HoaDonBan?ban=' + ban,
        // data: JSON.stringify(dto),
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.HoaDonID != 9) {
                document.getElementById('#id_Thoi_Gian_Vao').value = (result.ThoiGianVao);
                document.getElementById('#id_Tong_Tien').value = (result.TongTien);
                document.getElementById('#id_MaKH').value = (result.KhachHang);
                document.getElementById('#id_Hoa_Don_ID').value = (result.HoaDonID);
            }
            else {

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}



function _order() {
    var obj = {
        HoaDonID: $('#id_Hoa_Don_ID').val(),
        SoBan: $('#ban_dang_chon').val(),
        KhachHang: $('#id_MaKH').val(),
        NhanVienPhucVu: $('#id_ip_msnv').val(),
        MatHang: $('#id_ip_mon').val(),
        SoLuong: $('#id_ip_sl').val(),
        GhiChu: $('#id_ip_ghi_chu').val(),
    }
    $.ajax({
        url: '/Cashier/BanHang/Order',
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            alert("Order thành công" + result.HoaDonID);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//auto complete  món và nhân viên
$(function () {
    $("#id_ip_mon").autocomplete({
        source: '/TimKiem/DsTenHang'
    });

    $("#id_ip_msnv").autocomplete({
        source: '/TimKiem/DsTenNhanVien'
    });
});



/////////////////
//Jquery Kiểm tra tính hợp lệ khi order


function _checkOrder() {
    var mon = $("#id_ip_mon").val();
    var soluong = parseInt($("#id_ip_sl").val());
    var nhanvien = $("#id_ip_msnv").val();
    var ghichu = $("#id_ip_ghi_chu").val();

    var error = $("#error");

    var flag = 0;// lỗi

    //Kiêm tra món
    $.ajax({
        url: domainURL + '/Cashier/TimKiem/DsTenHang?term=',
        success: function (data) {
            var exits = 0;

            $(data).each(function (index, obj) {
                if (mon == obj)
                    exits = 1;
            });
            if (exits == 0) {
                flag += 1;
                //alert("Tên món không hợp lệ");
                error.text("Tên món không hợp lệ").show().fadeOut(5000);
                return false;
            }
        }
    });
    //Kiểm tra nhân viên
    $.ajax({
        url: domainURL + '/Cashier/TimKiem/DsTenNhanVien?term=',
        success: function (data) {
            var exits = 0;
            $(data).each(function (index, obj) {
                if (nhanvien == obj)
                    exits = 1;
            });

            if (exits == 0) {
                flag += 1;
                //alert("Tên nhân viên không hợp lệ!");
                error.text("Tên nhân viên không hợp lệ!").show().fadeOut(5000);
                return false;
            }
        }
    });

    //Kiểm tra số lượng
    if (soluong <= 0) {
        error.text("Số lượng không hợp lệ!").show().fadeOut(5000);
        flag += 1;
        return false;
    }

    if (flag < 3)
        return false;
    else {
        $("#form_order").submit();
        return;
    }



}

function _ThoatBanClick() {
    var soban = $("#txt_soBan").val();
    //Lấy thông tin thanh toán
    $.ajax({
        url: domainURL + '/Cashier/BanHang/ThanhToan?ban=' + soban,
        success: function (res) {
            if (res == -1)
                $("#err_thanhtoan").text('Không tìm được số hóa đơn, thử lại sau!').fadeOut(6000);
            else {
                $("#err_thanhtoan").text('Thoát thành công ...!').fadeOut(6000);
                window.location.href = domainURL + '/Cashier/TongQuan?ban=' + soban;
            }
        }
    });

}

$("#id_ip_thanhtoan").click(function () {

    //var so = $("#txt_soBan").val();
    $("#id_ban_tinh_tien").text($("#txt_soBan").val());
});

$("#img_checkout").click(function () {

    // var so = $("#txt_soBan").val();
    $("#id_ban_tinh_tien").text($("#txt_soBan").val());
});



//printer preview
function printer_preview(divID) {
    $.ajax({
        url: domainURL + '/Cashier/BanHang/InHoaDon?ban=' + $("#txt_soBan").val(),
        success: function (res) {
            if (res == -1) {
                var cf = ("Không tìm được hóa đơn?");
                if (confim(cf))
                    window.location.href = domainURL + '/Cashier/TongQuan?ban=' + $("#txt_soBan").val();
            }
            else {
                //Get the HTML of div
                var divElements = document.getElementById(divID).innerHTML;
                //Get the HTML of whole page
                var oldPage = document.body.innerHTML;

                //Reset the page's HTML with div's HTML only
                document.body.innerHTML =
                  "<html><head><title>Cafe</title></head><body>"

                       + " <h3 > <span style='text-align:left;'> Boss Coffee </span> <span style='text-align:left;'> Hóa đơn khách hàng </span></h3>"
                   +
                  "<hr/>"
                   +
                  divElements

                  + " <h4 style='text-align:right;'> Tổng tiền: 80,000 đ </h4>"
                  + "<hr/>"
                  + " <h5 style='text-align:center;'> Chúc quý khách vui vẻ </h5>"
                  + "</body></html>";

                //Print Page
                window.print();

                //Restore orignal HTML
                document.body.innerHTML = oldPage;
            }

        }
    });



}
