using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using DotVVM.Framework.Hosting;
using DotVVM.Framework.Routing;
using JsIntegrationDemo.Hubs;
using JsIntegrationDemo.Services;
using Microsoft.Extensions.Hosting;

namespace JsIntegrationDemo
{
    public class Startup
    {
        private readonly IConfiguration configuration;
        private readonly DotvvmStartup dotvvmStartup;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.dotvvmStartup = new DotvvmStartup(configuration);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDataProtection();
            services.AddAuthorization();
            services.AddWebEncoders();
            services.AddDotVVM(dotvvmStartup);
            services.AddSignalR();

            services.AddSingleton<PositionService>();
        }                                                         

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // use DotVVM
            var dotvvmConfiguration = app.UseDotVVM(dotvvmStartup, env.ContentRootPath, env.IsDevelopment());
            dotvvmConfiguration.AssertConfigurationIsValid();

            app.UseRouting();
            app.UseDefaultFiles();
            
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(env.WebRootPath)
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<DashboardHub>("/hub");
            });
        }
    }
}
