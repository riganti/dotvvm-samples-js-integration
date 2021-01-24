using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DotVVM.Framework.Hosting.AspNetCore;
using JsIntegrationDemo.Model;
using JsIntegrationDemo.Services;
using Microsoft.AspNetCore.SignalR;

namespace JsIntegrationDemo.Hubs
{
    public class DashboardHub : Hub
    {
        
        public static void SendNewPositions(IHubContext<DashboardHub> context, IEnumerable<CourierPosition> positions)
        {
            context.Clients.All.SendAsync("newPositions", positions);
        }

        public static async void SendNotification(IHubContext<DashboardHub> context, string notification)
        {
            await Task.Delay(500);
            await context.Clients.All.SendAsync("notification", notification);
        }
    }
}