using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CafeOnline.Areas.Cashier.Controllers
{
    public class TongQuanController : BaseCashierController
    {
        // GET: Cashier/TongQuan
        public ActionResult Index()
        {
            return View();
        }
    }
}