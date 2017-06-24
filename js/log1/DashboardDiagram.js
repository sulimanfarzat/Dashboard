/*function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split("."); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join("-"); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}
//reverseString("hello");
*/

//22.02.2017 -->142511200000
/*var myDate = datenbank[i].Datum;  
		myDate = myDate.split(".");
		var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];
		//alert(new Date(newDate).getTime());
		x.push((new Date(newDate).getTime()), ((((datenbank[i].KPI_BöHö_OG) / ziel_boho) * 100).toFixed()));
		 //x.push(('<br/>' + '['+ reverseString(datenbank[i].Datum)), ((((datenbank[i].KPI_BöHö_OG) / ziel_boho) * 100).toFixed()) +']');
		//var usdeur = x;
		ana = '['+ x + ']';
		*/


$(function() {
/* Highcharts.setOptions({
        colors: ['#ff6c49', '#4cf0dc', '#90ed7d', '#ffc107', '#67a5ec', '#e780e1', '#90ed7d', '#000', '#6AF9C4']
    });	 */
var ziel_boho = 30,
    ziel_keller = 30,
    ziel_bechtle = 18.5,
    ziel_gif = 20;

var datum = [], kpi_bechtle=[], kpi_kell=[], kpi_böhö1=[], kpi_gif = [];
	for (var i = 0; i < datenbank.length ; i++){
		datum.push(datenbank[i].Datum);
		kpi_böhö1.push((((datenbank[i].KPI_BöHö_OG) / ziel_boho) * 100));
        kpi_kell.push(((datenbank[i].KPI_Keller) / ziel_keller) * 100);
        kpi_bechtle.push(((datenbank[i].KPI_Bechtle) / ziel_bechtle) * 100);
        kpi_gif.push(((datenbank[i].KPI_GIF) / ziel_gif) * 100);			
		 }; 




var highchartsOptions = Highcharts.setOptions({
      lang: {
            loading: 'Diagramm...',
            months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            weekdays: [ 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            shortMonths: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            exportButtonTitle: "Exportieren",
            printButtonTitle: "Imprtieren",
            rangeSelectorFrom: "von",
            rangeSelectorTo: "zu",
            rangeSelectorZoom: "Vergrößern",
            //downloadPNG: 'Download PNG',
            //downloadJPEG: 'Download JPEG',
            //downloadPDF: 'Download PDF',
            //downloadSVG: 'Download SVG'
             resetZoom: "Reset",
             resetZoomTitle: "Reset",
            // thousandsSep: ".",
            // decimalPoint: ','
            }
      }
  );
  

  Highcharts.stockChart('container1', {
	  
	  title: {
            text: 'KPI'
        },

        subtitle: {
            text: 'Zusammenfassung'
        },


		xAxis: {
			  minRange: 5,
			  crosshair: true,
			  //categories: datum,
			  breaks: [/*{ // Nights
                from: Date.UTC(2011, 9, 6, 16),
                to: Date.UTC(2011, 9, 7, 8),
                repeat: 24 * 36e5
            }, */{ // Weekends
                from: Date.UTC(2017, 0, 8, 0),
                to: Date.UTC(2017, 0, 8, 24),
                repeat: 7 * 24 * 36e5
            }],
			  type: 'datetime',
			  dateTimeLabelFormats: {
				  second: '%Y-%m-%d<br/>%H:%M:%S',
				  minute: '%Y-%m-%d<br/>%H:%M',
				  hour: '%Y-%m-%d<br/>%H:%M',
				  day: '%Y<br/>%d.%m',
				  week: '%Y<br/>%d.%m',
				  month: '%Y-%m',
				  year: '%Y'
			  },		  
			 /* plotLines: [{
				  value: 50,
				  width: 2,
				  color: 'silver'
			  }]*/
			},
			 chart: {
				//plotBackgroundColor: '#e3f2fd',
				//zoomType: 'xy'
		},
		yAxis: {
           type: 'areaspline',
		   scrollbar: {
                enabled: true,
                showFull: false
            },
			plotLines: [{
            value: 100,
            width: 1,
            color: 'green',
            dashStyle: 'dash',
            label: {
                text: '100% KPI Ziel',
                align: 'right',
                y: 12,
                x: 0
				}
			}]
		},

		rangeSelector: {
			selected: 1,
		},
		plotOptions: {
			series: {
              //compare: 'percent',
              showInNavigator: true,
			  animation : true,
			  gapSize: 1
			  //stacking: 'normal'
			}
		},

		tooltip: {
			pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}%<br/>',
			valueDecimals: 2,
			// distance: 30,
			//padding: 5,
			split: true
		},
		 scrollbar: {
            barBackgroundColor: 'gray',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: 'gray',
            buttonBorderWidth: 0,
            buttonBorderRadius: 7,
            trackBackgroundColor: 'none',
            trackBorderWidth: 1,
            trackBorderRadius: 8,
            trackBorderColor: '#CCC'
        },

		series: [{
              name: 'KPI BöHö1 OG',
              data: kpi_böhö1 ,
              pointStart: Date.UTC(2017, 0, 2),
              pointInterval: 24 * 3600 * 1000, // one day
              //pointIntervalUnit: 'day',
			  type: 'areaspline',
			  gapSize: 1,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            threshold: null

          } ,
          {
              name: 'KPI Keller',
              pointStart: Date.UTC(2017, 0, 2),
              pointInterval: 24 * 3600 * 1000, // one day
              data: kpi_kell,
			  //pointIntervalUnit: 'day',
			  type: 'spline',
			  gapSize: 1

          },
          {
              name: 'KPI Bechtle',
              pointStart: Date.UTC(2017, 0, 2),
              pointInterval: 24 * 3600 * 1000, // one day
              data: kpi_bechtle,
			  //pointIntervalUnit: 'day',
			  type: 'spline',
			  gapSize: 1

          },
          {
              name: 'KPI GIF',
              pointStart: Date.UTC(2017, 0, 2),
              pointInterval: 24 * 3600 * 1000, // one day
              data: kpi_gif,
			  //pointIntervalUnit: 'day',
			  type: 'spline',
			  gapSize: 1

          }
      ]
  });
  });
