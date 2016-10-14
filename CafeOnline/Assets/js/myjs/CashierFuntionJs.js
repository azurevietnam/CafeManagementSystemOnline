
function _OpenTable(ban) {
    $.ajax({
        url: '/Cashier/BanHang/HoaDonBan?ban='+ ban,
        // data: JSON.stringify(dto),
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.HoaDonID != 9)
            {
                document.getElementById('#id_Thoi_Gian_Vao').value = (result.ThoiGianVao);
                document.getElementById('#id_Tong_Tien').value = (result.TongTien);
                document.getElementById('#id_MaKH').value = (result.KhachHang);
                document.getElementById('#id_Hoa_Don_ID').value = (result.HoaDonID);
            }
            else
            {

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