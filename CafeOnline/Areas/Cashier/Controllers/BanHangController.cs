using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CafeOnline.Models;

namespace CafeOnline.Areas.Cashier.Controllers
{
    public class BanHangController : BaseCashierController
    {


        CafeOnlineDB db = CafeOnlineDB.ConnectDatabase();
        [HttpGet]
        public ActionResult Order()
        {
            return RedirectToAction("Index", "TongQuan", new { area = "Cashier" });
        }
        
       
        [HttpPost]
        public ActionResult Order(FormCollection form)
        {
            int soBan;
            int.TryParse(form["ip_SoBan"].ToString(), out soBan);
            

            string MH = form["ip_mon"].ToString();
            int SoLuong;
            int.TryParse(form["ip_sl"].ToString(), out SoLuong);
            string NhanVien = form["ip_manv"].ToString();
            string GhiChu = form["ip_ghi_chu"].ToString();


            int SoHD = TableStatus.Get_HoaDonID_by_TableNumber(soBan);

            if (SoHD != -1)
            {
                CTHD order = new CTHD();
                
                MATHANG mh = db.MATHANGs.SingleOrDefault(n => n.TenMatHang == MH);
                NGUOIDUNG nv = db.NGUOIDUNGs.SingleOrDefault(n => n.HoTenNV == NhanVien);

                order.SoHD = SoHD;
                order.MatHang = mh.MatHangID;
                order.NhanVienPhucVu = nv.NguoiDungID;
                order.GhiChu = GhiChu;
                order.SoLuong = SoLuong;
                order.TrangThai = true;

                db.CTHDs.Add(order);
                db.SaveChanges();
            }
            else
            {
                HOADON hd_new = new HOADON();
                hd_new.SoBan = soBan;
                hd_new.KhachHang = 7;
                hd_new.ThoiGianVao = DateTime.Now;
                hd_new.TongTien = 0;
                hd_new.TrangThai = true;
                hd_new.TrangThaiHoaDon = 1;
                hd_new.ThoiGianRa = DateTime.Now.AddHours(1);
                hd_new.GiamGia = 0;
                hd_new.GhiChu = "";

                db.HOADONs.Add(hd_new);
                db.SaveChanges();


                CTHD order = new CTHD();

                MATHANG mh = db.MATHANGs.SingleOrDefault(n => n.TenMatHang == MH);
                NGUOIDUNG nv = db.NGUOIDUNGs.SingleOrDefault(n => n.HoTenNV == NhanVien);

                order.SoHD = hd_new.HoaDonID;
                order.MatHang = mh.MatHangID;
                order.NhanVienPhucVu = nv.NguoiDungID;
                order.GhiChu = GhiChu;
                order.SoLuong = SoLuong;
                order.TrangThai = true;

                db.CTHDs.Add(order);
                db.SaveChanges();
            }
            return RedirectToAction("Index", "TongQuan", new { area = "Cashier" });
        }







        /// <summary>
        /// Lấy thông tin bàn theo số bàn
        /// </summary>
        /// <param name="ban"></param>
        /// <returns></returns>
        public JsonResult HoaDonBan(int ban)
        {
            db.Configuration.ProxyCreationEnabled = false;
            /// <summary>
            /// 0: Da thanh toan
            /// 1: Dang co khach, Chua in Hoa Don
            /// 2: Da in hoa don
            /// -1: Lỗi Null
            /// </summary>
            var HD_Ban = db.HOADONs.SingleOrDefault(n => n.SoBan == ban && (n.TrangThaiHoaDon == 2 || n.TrangThaiHoaDon == 3));
            if (HD_Ban != null)
            {
                return Json(HD_Ban, JsonRequestBehavior.AllowGet);
            }
            else
            {
                HD_Ban = db.HOADONs.Single(n => n.HoaDonID == 9);
                HD_Ban.TrangThaiHoaDon = -1; // Lỗi Null
                return Json(HD_Ban, JsonRequestBehavior.AllowGet);
            }
        }



        /// <summary>
        /// Lấy danh sách hàng đã đặt theo số hóa đơn
        /// </summary>
        /// <param name="HD"></param>
        /// <returns></returns>
        public JsonResult ListCTHD(int HD)
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<CTHD> lsct = db.CTHDs.Where(n => n.SoHD == HD).ToList();
            if (lsct != null)
                return Json(lsct, JsonRequestBehavior.AllowGet);
            else
            {
                //Trả về một list ctht ảo, đánh dấu tránh lỗi null của ctdh
                lsct = db.CTHDs.Where(n => n.SoHD == 9 && n.NhanVienPhucVu == 7 && n.TrangThai == false).ToList();
                return Json(lsct, JsonRequestBehavior.AllowGet);
            }
        }


    }
}