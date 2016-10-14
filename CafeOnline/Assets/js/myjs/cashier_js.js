/* FileName: student.js
Project Name: Cafe System Management
Date Created: 09/10/2016
Description: The Boss
Version: 1.0.0.0
Author: Nguyễn tất Chủ
Author Email: tatchu.it@gmail.com
Author Mobile: 0969 369 499
License: public

*/


    //printer preview
    function printer_preview(divID) {
        //Get the HTML of div
        var divElements = document.getElementById(divID).innerHTML;
        //Get the HTML of whole page
        var oldPage = document.body.innerHTML;

        //Reset the page's HTML with div's HTML only
        document.body.innerHTML =
          "<html><head><title>Hóa đơn</title></head><body>" +
          divElements
          +
          "<hr/>"
          +"Tổng tiền: 80,000 đ"

          +"</body></html>";

        //Print Page
        window.print();

        //Restore orignal HTML
        document.body.innerHTML = oldPage;
    }

    function _onTableClick(btn) {
        //Lấy element button bàn cũ
        var _so_ban_cu = document.getElementById("ban_dang_chon").innerHTML;
        var ban_cu = document.getElementById("ban_" + _so_ban_cu);

        //Đặt lại màu nền tương ứng cho bàn
        if (("" + ban_cu.getAttribute("alt")) == "1")
            ban_cu.setAttribute("class", "btn btn-info input-table");
        else
            if (("" + ban_cu.getAttribute("alt")) == "2")
                ban_cu.setAttribute("class", "btn btn-success input-table");
            else
                ban_cu.setAttribute("class", "btn btn-warning input-table");

        //Đổi số bàn bên khung bàn đang mở
        document.getElementById("ban_dang_chon").innerHTML = "" + btn.value;

        //Đặt màu đỏ cho bàn được mở
        var ban_moi = document.getElementById("ban_" + btn.value);
        ban_moi.setAttribute("class", "btn btn-danger input-table");


        ////////////////////////////////////////////////
        // Mở chi tiết bàn
        if (("" + btn.getAttribute("alt")) == "2" || ("" + btn.getAttribute("alt")) == "3") {
            //do Somthing to Open detail table

            document.getElementById('txt_soBan').value = btn.value;


            //Mở chức năng bàn
            var div_action = document.getElementById("div_action");
            div_action.setAttribute("class", " action center");

            var html = "<h2 class='text-center'> Đang mở bàn ... </h2>";
            document.getElementById("detail-table").innerHTML = html;
            var div_money_time = document.getElementById("detail-money-time");
            div_money_time.setAttribute("class", "col-md-3");

            var div_money_time = document.getElementById("div_in_hoa_don");
            div_money_time.setAttribute("class", "col-md-1");

            var div_checkout = document.getElementById("div_checkout");
            div_checkout.setAttribute("class", " col-md-1");


        }
        else {

            //Khóa chức năng bàn
            var div_action = document.getElementById("div_action");
            div_action.setAttribute("class", "hidden action center");


            var html = "<h2 class='text-center'> Bàn đang trống! </h2>";
            document.getElementById("detail-table").innerHTML = html;

            //Xóa số hóa đơn
            document.getElementById('id_Hoa_Don_ID').value = -1;
            document.getElementById('txt_soBan').value = btn.value;


            ///Ẩn các nút thao tác
            var div_money_time = document.getElementById("detail-money-time");
            div_money_time.setAttribute("class", "hidden col-md-3");

            var div_money_time = document.getElementById("div_in_hoa_don");
            div_money_time.setAttribute("class", "hidden col-md-1");

            var div_checkout = document.getElementById("div_checkout");
            div_checkout.setAttribute("class", "hidden col-md-1");

        }
    }

    function _checkout() {
        var tb = document.getElementById("tien_ban").value;
        var tk = document.getElementById("tien_khach").value;

        document.getElementById("tien_du").value = (tk - tb);
    }

    $(document).keypress(function (e) {

        if (e.keyCode == 105 || e.keyCode == 73) {
            {
                $("#id_in_hoa_don").click();
            }
        }
        if (e.keyCode == 116 || e.keyCode == 84) {
            document.getElementById("id_ban_tinh_tien").innerHTML = document.getElementById("ban_dang_chon").innerHTML;
            $("#img_checkout").click();
        }
        if (e.keyCode == 103 || e.keyCode == 71) {
            document.getElementById("id_ban_gop").innerHTML = document.getElementById("ban_dang_chon").innerHTML;
            $("#id_ip_gop_ban").click();
        }
        if (e.which == 96 || e.keyCode == 96) {
            document.getElementById("id_ban_thoat").innerHTML = document.getElementById("ban_dang_chon").innerHTML;
            $("#id_ip_thoat_ban").click();
        }
    });



