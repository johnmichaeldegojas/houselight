var http = require("http");
const Lookup = require("node-yeelight-wifi").Lookup;
let look = new Lookup();
let light;
let fs = require("fs");

look.on("detected", (light) => {
  console.log("new yeelight detected: id=" + light.id + " name=" + light.name);
  let lights = look.getLights();
  light = lights[0];

  // ******************* state updates *******************
  light.on("connected", () => {
    console.log("connected");
  });

  light.on("disconnected", () => {
    console.log("disconnected");
  });

  light.on("stateUpdate", (light) => {
    console.log(light.rgb);
  });

  light.on("failed", (error) => {
    console.log(error);
  });

  console.log(light);
});
//create a server object:
http
  .createServer(function (req, res) {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    });

    light = look.getLights()[0];
    let queryValue = 100;
    if (req.url.includes("-")) {
      queryValue = req.url.split("-")[1];
      req.url = req.url.split("-")[0];
      console.log(req.url, queryValue);
    }
    switch (req.url) {
      // case "/device":
      //   fs.readFile("./index.html", null, function (error, data) {
      //     if (error) {
      //       res.writeHead(404);
      //       res.write("Whoops! File not found!", function (err) {
      //         console.log(err);
      //       });
      //     } else {
      //       res.write(data, function (err) {
      //         console.log(err);
      //       });
      //     }
      //     res.end();
      //   });
      //   break;
      case "/getDeviceInfo":
        res.write(JSON.stringify(light) + "");
        break;
      case "/morning":
        light
          .setBright(100, 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        light
          .setRGB([255, 255, 255], 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        light
          .setCT(6500, 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        break;
      case "/lightOn":
        light
          .setPower(true, 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        break;
      case "/lightOff":
        light
          .setPower(false, 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        break;
      case "/night":
        light
          .setBright(10, 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        light
          .setRGB([255, 153, 0], 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        break;
      case "/movie":
        light
          .setBright(70, 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        light
          .setRGB([0, 0, 255], 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        break;
      case "/half":
        light
          .setBright(50, 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        light
          .setRGB([0, 0, 255], 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        light
          .setCT(6500, 1000)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        break;
        break;
      case "/brightness":
        console.log(queryValue);
        light
          .setBright(+queryValue, 1000)
          .then(() => {
            console.log("success brightness");
          })
          .catch((error) => {
            console.log("failed", error);
          });
        break;
      case "/changecolor":
        if (queryValue === "255+255+255") {
          light
            .setCT(6500, 1000)
            .then(() => {
              console.log("success");
            })
            .catch((error) => {
              console.log("failed", error);
            });
        } else {
          const [_r, _g, _b] = queryValue.split("+");
          console.log(_r, _g, _b);
          light
            .setRGB([+_r, +_g, +_b], 1000)
            .then(() => {
              console.log("success");
            })
            .catch((error) => {
              console.log("failed", error);
            });
        }
        break;
      default:
        text = "I have never heard of that fruit...";
    }
    res.end(); //end the response
  })
  .listen(8080);
