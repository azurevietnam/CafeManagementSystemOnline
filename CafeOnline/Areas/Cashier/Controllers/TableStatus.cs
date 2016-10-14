using CafeOnline.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CafeOnline.Common;
namespace CafeOnline.Areas.Cashier.Controllers
{
    public class TableStatus
    {
        static CafeOnlineDB db = CafeOnlineDB.ConnectDatabase();

        /// <summary>
        /// Kiểm tra trạng thái bàn
        /// </summary>
        /// <param name="table"></param>
        /// <returns>1: bàn đang có khách</returns>
        /// <returns>2: bàn đã in hóa đơn</returns>
        public static int CheckTable(int table)
        {
            var tb = db.HOADONs.Where(n => n.SoBan == table
            &&
            (n.TrangThaiHoaDon == CommonConstants.HoaDonMoi || n.TrangThaiHoaDon == CommonConstants.HoaDonMoiDaInHoaDon))
            .SingleOrDefault();

            if (tb != null && tb.ThoiGianVao > DateTime.Now.AddDays(-1))
                return (int)tb.TrangThaiHoaDon;
            return -1;///Bàn trống
        }

        public static int Get_HoaDonID_by_TableNumber(int table)
        {
            HOADON hd = db.HOADONs.Where(n => n.SoBan == table).SingleOrDefault();
            if (hd != null && hd.ThoiGianVao > DateTime.Now.AddDays(-1))
                return hd.HoaDonID;

            return -1;//bàn trống
        }


    }
}