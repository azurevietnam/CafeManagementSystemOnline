﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CafeOnline.Models;
using System.IO;

namespace CafeOnline.Areas.Admin.Controllers
{
    public class QuanTriTinTucController : BaseAdminController
    {

        CafeOnlineDB db = CafeOnlineDB.ConnectDatabase();
        // GET: Admin/QuanTriTinTuc
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public ActionResult ThemBaiViet()
        {
            ViewBag.ChuDe = db.CHUDEBAIVIETs.ToList();
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemBaiViet(HttpPostedFileBase file, BAIVIET bv)
        {
            if (ModelState.IsValid)
            {
                if (file != null)
                    if (file.ContentLength > 0)
                    {
                        string filename = Path.GetFileName(file.FileName);
                        /*Saving the file in server folder*/
                        //Xử lý upload trùng tên
                        var FullPath = Request.MapPath("~/Images/BaiViet/" + filename);
                        if (System.IO.File.Exists(FullPath))
                            filename = "1_" + filename;
                        //upload
                        file.SaveAs(Server.MapPath("~/Images/BaiViet/" + filename));

                        bv.HinhAnh = filename;
                    }
                    else
                        bv.HinhAnh = "BaiViet_Default.jpg";
                else
                    bv.HinhAnh = "default.jpg";

                bv.TrangThai = true;
                bv.NgayViet = DateTime.Now;
                bv.NgayDang = DateTime.Now;
                
                db.BAIVIETs.Add(bv);
                db.SaveChanges();
            }
            return View();
        }
    }
}