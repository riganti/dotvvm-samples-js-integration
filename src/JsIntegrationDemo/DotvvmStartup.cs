﻿using System.Linq;
using DotVVM.Framework.Configuration;
using DotVVM.Framework.ResourceManagement;
using DotVVM.Framework.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace JsIntegrationDemo
{
    public class DotvvmStartup : IDotvvmStartup, IDotvvmServiceConfigurator
    {
        private readonly IConfiguration configuration;

        public DotvvmStartup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        // For more information about this class, visit https://dotvvm.com/docs/tutorials/basics-project-structure
        public void Configure(DotvvmConfiguration config, string applicationPath)
        {

            ConfigureRoutes(config, applicationPath);
            ConfigureControls(config, applicationPath);
            ConfigureResources(config, applicationPath);
        }

        private void ConfigureRoutes(DotvvmConfiguration config, string applicationPath)
        {
            config.RouteTable.Add("Default", "", "Views/Default.dothtml");
            config.RouteTable.AutoDiscoverRoutes(new DefaultRouteStrategy(config));    
        }

        private void ConfigureControls(DotvvmConfiguration config, string applicationPath)
        {
            // register code-only controls and markup controls
        }

        private void ConfigureResources(DotvvmConfiguration config, string applicationPath)
        {
            // register custom resources and adjust paths to the built-in resources
            config.Resources.Register("bootstrap", new StylesheetResource()
            {
                Location = new UrlResourceLocation("~/lib/bootstrap/css/bootstrap.min.css"),
                Dependencies = new[] { "bootstrap-js" }
            });
            config.Resources.Register("bootstrap-js", new ScriptResource()
            {
                Location = new UrlResourceLocation("~/lib/bootstrap/js/bootstrap.bundle.min.js"),
                Dependencies = new[] { "jquery" }
            });
            config.Resources.Register("jquery", new ScriptResource()
            {
                Location = new UrlResourceLocation("~/lib/jquery/jquery.min.js")
            });

            config.Resources.Register("google-maps", new ScriptResource()
            {
                Location = new UrlResourceLocation($"https://maps.googleapis.com/maps/api/js?key={configuration.GetSection("GoogleMaps").GetValue<string>("apiKey")}")
            });
            config.Resources.Register("signalr", new ScriptResource()
            {
                Location = new UrlResourceLocation("~/lib/signalr/signalr.min.js")
            });

            config.Resources.Register("dashboard-module", new ScriptModuleResource(new UrlResourceLocation("~/app/dashboard-module.js"))
            {
                Dependencies = new [] { "google-maps", "signalr" }
            });
        }

        public void ConfigureServices(IDotvvmServiceCollection options)
        {
            options.AddDefaultTempStorages("temp");
		}
    }
}
