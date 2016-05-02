using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Katana.Domain.Abstract;
using Katana.Domain.Concrete;
using Microsoft.Owin.Hosting;
using Newtonsoft.Json.Serialization;
using Owin;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;

namespace Katana
{
    class Program
    {
        static void Main(string[] args)
        {
            string uri = "http://localhost:9000";

            // Start OWIN host
            using (WebApp.Start<Startup>(uri))
            {
                Console.WriteLine("Server Started!");
                Console.ReadKey(); // keep server running until someone pressing key in the console
                Console.WriteLine("Stopping...");
            }

            return;

        }

        public class Startup
        {

            public void Configuration(IAppBuilder app)
            {

                app.Use(async (environment, next) =>
                {
                    Console.WriteLine("Requesting: " + environment.Request.Path);

                    await next();

                    Console.WriteLine("Response: " + environment.Response.StatusCode);
                });

                ConfigureWebApi(app);
           
            }

            private void ConfigureWebApi(IAppBuilder app)
            {
                // Configure Web API for Self-Host
                HttpConfiguration config = new HttpConfiguration();

                config.Routes.MapHttpRoute(
                    name: "DefaultApi",
                    routeTemplate: "api/{controller}/{id}",
                    defaults: new { id = RouteParameter.Optional }
                );

                config.EnableCors();  // Note: have to install Install-Package Microsoft.AspNet.WebApi.Cors  for this to work

                // Remove Xml formatters. This means when we visit an endpoint from a browser,
                // Instead of returning Xml, it will return Json.
                config.Formatters.Remove(config.Formatters.XmlFormatter);

                // Here we configure it to write JSON property names with camel casing
                // without changing our server-side data model:
                var json = config.Formatters.JsonFormatter;
                json.Indent = true;
                json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

                // DI...
                var container = new Container();
                container.Register<IContactRepository, ContactRepository>();
                config.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);


                app.UseWebApi(config);
            }

        }



    }
}
