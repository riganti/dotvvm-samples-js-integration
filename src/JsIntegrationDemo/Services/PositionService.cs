using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using JsIntegrationDemo.Hubs;
using JsIntegrationDemo.Model;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;

namespace JsIntegrationDemo.Services
{
    public class PositionService
    {
        private const double InitialLng = 49.872289;
        private const double InitialLat = 15.428261;
        private const double Tolerance = 1;
        private const double MaxSpeed = 0.002;

        private readonly IHubContext<DashboardHub> dashboardHub;
        private readonly Random random = new Random();
        private readonly Timer timer;
        private readonly CourierPosition[] positions;

        public PositionService(IHubContext<DashboardHub> dashboardHub)
        {
            this.dashboardHub = dashboardHub;
        
            positions = Enumerable.Range(0, 10)
                .Select(i => new CourierPosition()
                {
                    Id = i + 1,
                    Name = $"Courier {i + 1}",
                    Lat = InitialLng + random.NextDouble() * Tolerance * 2 - Tolerance,
                    Lng = InitialLat + random.NextDouble() * Tolerance * 2 - Tolerance,
                    Angle = random.NextDouble() * Math.PI * 2,
                    Speed = (0.5 + (random.NextDouble() / 2)) * MaxSpeed
                })
                .ToArray();

            timer = new Timer(OnTick, null, 500, 500);
        }

        public void OnTick(object state)
        {
            foreach (var position in positions)
            {
                position.Lat += Math.Sin(position.Angle) * position.Speed;
                position.Lng += Math.Cos(position.Angle) * position.Speed;

                if (random.NextDouble() > 0.9)
                {
                    position.Angle += random.NextDouble() - 0.5;
                    position.Speed = (0.5 + (random.NextDouble() / 2)) * MaxSpeed;
                }
            }

            DashboardHub.SendNewPositions(dashboardHub, positions);
        }
        
        public List<CourierInfo> GetCouriers()
        {
            return positions.Select(p => new CourierInfo()
                {
                    Id = p.Id,
                    Name = p.Name
                })
                .ToList();
        }
    }
}