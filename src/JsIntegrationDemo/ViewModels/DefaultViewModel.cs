using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using DotVVM.Framework.ViewModel;
using DotVVM.Framework.Hosting;
using JsIntegrationDemo.Hubs;
using JsIntegrationDemo.Model;
using JsIntegrationDemo.Services;
using Microsoft.AspNetCore.SignalR;

namespace JsIntegrationDemo.ViewModels
{
    public class DefaultViewModel : MasterPageViewModel
    {
        private readonly IHubContext<DashboardHub> dashboardHubContext;
        private readonly PositionService positionService;

        public bool Connected { get; set; }

        public CourierInfo SelectedCourier { get; set; }

        public List<CourierInfo> Couriers { get; set; }

        public string ChatMessage { get; set; }

        public string Notification { get; set; }


        public DefaultViewModel(IHubContext<DashboardHub> dashboardHubContext, PositionService positionService)
        {
            this.dashboardHubContext = dashboardHubContext;
            this.positionService = positionService;
        }

        public override Task PreRender()
        {
            if (!Context.IsPostBack)
            {
                Couriers = positionService.GetCouriers();
            }

            return base.PreRender();
        }

        public void SendMessage()
        {
            Task.Factory.StartNew(() =>
            {
                DashboardHub.SendNotification(dashboardHubContext, "The message was sent."); 
            });

            ChatMessage = "";
        }
    }
}
