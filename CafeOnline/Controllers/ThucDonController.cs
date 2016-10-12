using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CafeOnline.Models;
using PagedList;

namespace CafeOnline.Controllers
{
    public class ThucDonController : Controller
    {
        CafeOnlineDB db = CafeOnlineDB.ConnectDatabase();
        /// <summary>
        /// Xem thực đơn
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>
        public ActionResult Index(int? page)
        {
            int pageNumber = (page ?? 1);
            int pageSize = 9;
            return View(db.MATHANGs.ToList().OrderBy(x => x.LoaiHang).ToPagedList(pageNumber, pageSize));
        }

        /// <summary>
        /// Xem thực đơn theo nhóm
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public ActionResult Nhom(string id, int? page)
        {
            ViewBag.Title = id;
            int pageNumber = (page ?? 1);
            int pageSize = 9;
            return View(db.MATHANGs.Where(n=>n.LOAIMATHANG.TenLoaiHang.Equals(id)).ToList().OrderBy(x => x.LoaiHang).ToPagedList(pageNumber, pageSize));
        }



        public ActionResult XemMon(int id)
        {
            var model = db.MATHANGs.SingleOrDefault(n => n.MatHangID == id);
            if (model == null) return RedirectToAction("Index");
            return View(model);
        }
        

    }
}