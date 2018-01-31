var mw = 18.016, rStar = 8314.3;
var defaultRelHum = 65;
var absoluteHumOutside = null;
var measurements = [];

//polyfills
Math.log10 = Math.log10 || function(x) {
  return Math.log(x) * Math.LOG10E;
};

function collectData(targetRelHum) {
    document.querySelectorAll(".sensor").forEach(function (el, idx) {
        var temp, hum, id, name, time;
        name = el.querySelector("h3").innerText;
        id = el.querySelector(".sensor-header > div > h4").innerText;
        time = el.querySelector("div.sensor-component:nth-child(3) > h4").innerText;
        time = new Date(time.replace(/(\d{1,2}).(\d{1,2}).(\d{2,4}) ([0-9:]{6,8})/, "$3-$2-$1 $4"));
        temp = el.querySelector("div.sensor-component:nth-child(4) > h4").innerText;
        temp = parseFloat(temp.replace(",", "."))

        el.querySelector("h3 a").setAttribute("id", id);
      
        hum = el.querySelector("div.sensor-component:nth-child(5) > h4");
        if (hum) {
            var cln = hum.parentNode;
            hum = hum.innerText
            hum = hum ? parseInt(hum.replace("%", "")) : hum;
        }

        if (id == '031F8F284595') {
            absoluteHumOutside = absoluteHum(hum, temp);
        }
        ;

        var measurement = {};
        measurement.name = name;
        measurement.id = id;
        measurement.temp = temp;
        measurement.time_d = time;
        if (hum) {
            measurement.relHum = hum
        }
        ;
        measurement = getHumObject(measurement, absoluteHumOutside, targetRelHum);
        measurements.push(measurement);
        printValues(measurement, absoluteHumOutside, targetRelHum, el, cln);

        if (id == '11717015806B') {

            temp = el.querySelector("div.sensor-component:nth-child(6) > h4").innerText;
            temp = parseFloat(temp.replace(",", "."))

            hum = el.querySelector("div.sensor-component:nth-child(7) > h4");
            if (hum) {
                var cln = hum.parentNode;
                hum = hum.innerText
                hum = hum ? parseInt(hum.replace("%", "")) : hum;
            }
            measurement = {};
            measurement.name = "Bad EG";
            measurement.id = id;
            measurement.time_d = time;
            measurement.temp = temp;
            if (hum) {
                measurement.relHum = hum
            }
            ;
            measurement = getHumObject(measurement, absoluteHumOutside, targetRelHum);
            measurements.push(measurement);
            printValues(measurement, absoluteHumOutside, targetRelHum, el, cln);


            temp = el.querySelector("div.sensor-component:nth-child(8) > h4").innerText;
            temp = parseFloat(temp.replace(",", "."))

            hum = el.querySelector("div.sensor-component:nth-child(9) > h4");
            if (hum) {
                var cln = hum.parentNode;
                hum = hum.innerText
                hum = hum ? parseInt(hum.replace("%", "")) : hum;
            }
            measurement = {};
            measurement.name = "Vorrat UG";
            measurement.id = id;
            measurement.time_d = time;
            measurement.temp = temp;
            if (hum) {
                measurement.relHum = hum
            }
            ;
            measurement = getHumObject(measurement, absoluteHumOutside, targetRelHum);
            measurements.push(measurement);
            printValues(measurement, absoluteHumOutside, targetRelHum, el, cln);


            temp = el.querySelector("div.sensor-component:nth-child(10) > h4").innerText;
            temp = parseFloat(temp.replace(",", "."))

            hum = el.querySelector("div.sensor-component:nth-child(11) > h4");
            if (hum) {
                var cln = hum.parentNode;
                hum = hum.innerText
                hum = hum ? parseInt(hum.replace("%", "")) : hum;
            }
            measurement = {};
            measurement.name = "Garage UG";
            measurement.id = id;
            measurement.time_d = time;
            measurement.temp = temp;
            if (hum) {
                measurement.relHum = hum
            }
            ;
            measurement = getHumObject(measurement, absoluteHumOutside, targetRelHum);
            measurements.push(measurement);
            printValues(measurement, absoluteHumOutside, targetRelHum, el, cln);


        }
        ;


        console.debug(//temp, hum, id, name,
            //absoluteHum(hum,temp),
            //equilibriumHum(hum, temp, absoluteHumOutside),
            //tauPunkt(hum, temp),
            //warmup(hum,temp, 65),
            getHumObject(measurement, absoluteHumOutside, defaultRelHum)
        );
    })
}

function printValues(measurement, absoluteHumOutside, targetRelHum, el, cln) {

    if (measurement.relHum) {
        cln = cln.cloneNode(true)
        cln.querySelector("h5").innerText = "Absolute Luftfeuchtigkeit";
        cln.querySelector("h4").innerText = absoluteHum(measurement.relHum, measurement.temp).toPrecision(3) + " g/m3"
        el.appendChild(cln);

        cln = cln.cloneNode(true);
        cln.querySelector("h5").innerText = "Ziel LF nach Lüften";
        cln.querySelector("h4").innerText = equilibriumHum(measurement.relHum, measurement.temp, absoluteHumOutside).toPrecision(3) + " %"
        el.appendChild(cln);

        cln = cln.cloneNode(true);
        cln.querySelector("h5").innerText = "Taupunkt";
        cln.querySelector("h4").innerText = tauPunkt(measurement.relHum, measurement.temp).toPrecision(3) + " C"
        el.appendChild(cln);


        cln = cln.cloneNode(true);
        cln.querySelector("h5").innerText = "Aufwärmen für 65 %";
        cln.querySelector("h4").innerText = warmup(measurement.relHum, measurement.temp, targetRelHum).toPrecision(3) + " C"
        el.appendChild(cln);
    }

}

function getA(temp) {
    return temp >= 0 ? 7.5 : 7.6;
}

function getB(temp) {
    return temp >= 0 ? 237.3 : 240.7;
}


function SDD(temp) {
    return 6.1078 * Math.pow(10, getA(temp) * temp / (getB(temp) + temp))
}

function DD(relHum, temp) {
    var result = relHum / 100 * SDD(temp);

    return result;
}

function Cel2Kel(temp) {
    return temp + 273.15;
}

function absoluteHum(relHum, temp) {
    var result = 100000 * mw / rStar * DD(relHum, temp) / Cel2Kel(temp);
    return result;
}

function tauPunkt(relHum, temp) {
    var c = Math.log10(DD(relHum, temp) / 6.1078);
    var result = (getB(temp) * c) / (getA(temp) - c);
    return result;
}

function equilibriumHum(relHum, temp, refAbsoluteHum) {
    var result = refAbsoluteHum * Cel2Kel(temp) * rStar / (SDD(temp) * 1000 * mw  );
    return result;
}

function warmup(relHum, temp, targetRelHum) {
    targetRelHum = targetRelHum?targetRelHum:defaultRelHum;
    var logarithm = Math.log10(absoluteHum(relHum, temp) * Cel2Kel(temp) * rStar / (targetRelHum * 6.1078 * 1000 * mw  ));
    var result = getB(temp) * logarithm / (getA(temp) - logarithm);
    return result;
}

function getHumObject(measurement, refAbsoluteHum, targetRelHum) {
    targetRelHum = targetRelHum?targetRelHum:defaultRelHum;
    var result = JSON.parse(JSON.stringify(measurement), dateTimeReviver);
    if (measurement && measurement.relHum && measurement.temp) {
        result.absoluteHum = absoluteHum(measurement.relHum, measurement.temp);
        result.dewPoint = tauPunkt(measurement.relHum, measurement.temp);
        result.warmup = warmup(measurement.relHum, measurement.temp, targetRelHum);
        if (refAbsoluteHum) {
            result.equilibriumHum = equilibriumHum(measurement.relHum, measurement.temp, refAbsoluteHum);
        }
    }
    return result;
}

function dateTimeReviver(key, value) {
    if (key.endsWith("_d")) {
        return new Date(value);
    } else {
        return value;
    }
};

function renderTable(measurements) {
    var div = document.createElement("div");
    div.setAttribute('class', 'responstable');
    div.setAttribute('id', 'summaryTable');
    var template = "<table><tr><th><h5>ID</h5></th><th><h5>Name</h5></th><th><h5>Temparatur</h5></th><th><h5>Luftfeuchtigkeit</h5></th><th><h5>Ziel LF nach Lüften</h5></td><td><h5>Absolute LF</h5></th><th><h5>Taupunkt</h5></th><th><h5>Aufheizen für 65% LF</h5></th>"
    measurements.forEach(function (measurement, idx) {
        var shouldVentilate = measurement.relHum && measurement.relHum > measurement.equilibriumHum;
        var color = 118;
        var light = 48;
        color = color * (1 - (measurement.relHum - 55) / 40);
        light = 100 * (1 - (measurement.relHum - measurement.equilibriumHum) / 100 * 5);
        light = Math.max(15, light);
        var fontColor = light < 25 ? "color: white;" : "";
        var attribute = shouldVentilate ? 'style="background-color: hsl(' + color + ', 65%, ' + light + '%);' + fontColor + '"' : "";
        var time= measurement.time_d? measurement.time_d.toLocaleTimeString():"";
        var deltaTime = measurement.time_d? "(-"+ new Date(Date.now() - measurement.time_d.getTime() ).toISOString().replace(/^.*T(00:)*(.*).\d{3}Z$/, "$2")+ ")":"";
        template += "<tr>"
        template += "<td><h5><a href='#"+ measurement.id + "'>" + measurement.id + "</a><br>"+ time +" <sup>" + deltaTime +"</sup></h5></td>";
        template += "<td " + attribute + "><h4>" +measurement.name + "</h4></td>";
        template += "<td><h4>" + (measurement.temp ? measurement.temp.toPrecision(3) + "°C" : "") + "</h4></td>";
        template += "<td><h4>" + (measurement.relHum ? measurement.relHum.toPrecision(3) + "%" : "") + "</h4>" + (shouldVentilate ? "<h5>(" + (-measurement.relHum + measurement.equilibriumHum).toPrecision(2) + "%)</h5>" : "") + "</td>";
        template += "<td><h4>" + (measurement.equilibriumHum ? measurement.equilibriumHum.toPrecision(3) + "%" : "") + "</h4></td>";
        template += "<td><h4>" + (measurement.absoluteHum ? measurement.absoluteHum.toPrecision(3) + "&nbsp;g/m&sup3;" : "") + "</h4>" + (shouldVentilate ? "<h5>(" + (-measurement.absoluteHum + absoluteHumOutside).toPrecision(2) + ")</h5>" : "") + "</td>";
        template += "<td><h4>" + (measurement.dewPoint ? measurement.dewPoint.toPrecision(3) + "°C" : "") + "</h4></td>";
        template += "<td><h4>" + (measurement.warmup ? measurement.warmup.toPrecision(3) + "°C" : "") + "</h4></td>";
        +"</h4></td>";
        template += "</tr>";

    })

    template += "</table>";

    div.innerHTML = template;
    var existingTable = document.getElementById("summaryTable");
    var elAfter = document.querySelector(".panel-default");
    if (existingTable) {
        elAfter.parentNode.replaceChild(div, existingTable);
    } else {
        elAfter.parentNode.insertBefore(div, elAfter)
    }
}

function initialize() {
    //elAfter.insertBefore(el, elAfter);
    var script = document.createElement("link");
    script.setAttribute('href', 'https://rawgit.com/DaniHaag/snippets/master/js/src/main/js/mobile-alerts/tablestyle.css');
    //script.setAttribute('href','https://raw.githubusercontent.com/DaniHaag/snippets/master/js/src/main/js/mobile-alerts/tablestyle.css');
    script.setAttribute('rel', 'stylesheet')
    script.setAttribute('type', 'text/css')
    document.head.appendChild(script);
}
function conditionalInitialistion(counter){
    counter = counter ? counter :10;
    function executor(){guggus()};
    function timeout() {
        if(counter>0){
            counter--;
        console.debug("Hello", new Date(Date.now()));

        try {
            executor();
        } catch (e) {
            setTimeout(timeout, Math.pow(2,10- counter)*1000);
        }
        }
    }
    setTimeout(timeout, 2000);
}
if(typeof document != "undefined"){
    collectData(defaultRelHum);
    renderTable(measurements);
    initialize();
}
