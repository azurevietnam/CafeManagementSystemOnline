using CafeOnline.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CafeOnline.Areas.Cashier.Controllers
{
    public class TableStatus
    {
        static CafeOnlineDB  db = CafeOnlineDB.ConnectDatabase();

        public static int CheckTable(int table)
        {
            var tb = db.HOADONs.Where(n => n.SoBan == table).SingleOrDefault();
            if (tb != null)
                return (int) tb.DaTinhTien;
            return -1;
        }
    }
}