using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EFoodFE.Controllers
{
    public class MenuController : Controller
    {
        // GET: Menu
        public ActionResult Index()
        {
            return View();
        }     
        public ActionResult CheckOut()
        {
            return View();
        }
        public ActionResult Confirmation() 
        {
            return View();
        }
        public ActionResult CreditCard()
        {
            return View();
        }
        public ActionResult Payment()
        {
            return View();
        }
        public ActionResult ShopDetails()
        {
            return View();
        }      
        public ActionResult ShoppingCart()
        {
            return View();
        }
        public ActionResult ResultadoBusqueda()
        {
            return View();
        }

        public ActionResult NuevaFormaPago()
        {
            return View();
        }
        public ActionResult FacebookLogin()
        {
            return View();
        }

    }
}