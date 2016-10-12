﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace CafeOnline.Common
{
    public static class CommonConstants
    {
        public static string ADMIN_SESSION_NAME = "ADMIN_SESSION";
        public static string CASHIER_SESSION_NAME = "CASHIER_SESSION";
        public static string WAITER_SESSION_NAME = "WAITER_SESSION";
        public static string CUSTOMER_SESSION_NAME = "CUSTOMER_SESSION";
        public static string HOMEPAGE = ConfigurationManager.AppSettings["domainUrl"];

        public static string COOKIE_ACCOUNT_NAME = "COOKIE_ACCOUNT";
    }
}