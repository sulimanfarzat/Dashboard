$(function() {
    Highcharts.setOptions({
        colors: ['#ff6c49', '#ffc107', '#0f0f0f', '#2721e3', '#2721e3', '#0f0f0f', '#FF9655', '#FFF263', '#6AF9C4']
    });
    Highcharts.chart('chemie_q1_2017', {
        chart: {
            zoomType: 'x',
            type: 'line',
            borderWidth: 0,
            plotBorderWidth: 0,
            margin: [60, 80, 70, 70],
            shadow: true


        },
        title: {
            text: 'Fritz Logistik - Log2 KPI'
        },
        subtitle: {
            text: 'Chemie Halle - Q1 2017'
        },
        xAxis:  {
			categories: [
"01.01.2017",			
"02.01.2017",
"03.01.2017",
"04.01.2017",
"05.01.2017",
"06.01.2017",
"07.01.2017",
"08.01.2017",
"09.01.2017",
"10.01.2017",
"11.01.2017",
"12.01.2017",
"13.01.2017",
"14.01.2017",
"15.01.2017",
"16.01.2017",
"17.01.2017",
"18.01.2017",
"19.01.2017",
"20.01.2017",
"21.01.2017",
"22.01.2017",
"23.01.2017",
"24.01.2017",
"25.01.2017",
"26.01.2017",
"27.01.2017",
"28.01.2017"
]
			
            //type: 'datetime',
           // dateTimeLabelFormats: {
              //  day: '%d.%m.%y'
            //},
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[5]
                }
            },
            title: {
                text: 'KPI',
                style: {
                    color: Highcharts.getOptions().colors[5]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'WE/WA Bewegungen',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            maxPadding: 0.05,

            opposite: true
        }],
        tooltip: {
            shared: false,
            formatter: function() {
				var s= "KPI"
				if(this.series.name === s){
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y //+ '<br/>' +
                    //'Total: ' + this.point.stackTotal;
					} else {
					return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
					}			
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderWidth: 0,
                borderColor: 'black',
                borderRadius: 1.2,
                pointWidth: null,
                /* pointPadding: 0.1, */
                groupPadding: 0,
                /* shadow: false, */
                /* pointPlacement: 'between' 'on'*/


            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 50,
            verticalAlign: 'top',
            y: 10,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },

        series: [{
                name: 'WE Gesamt Bewegungen',
                type: 'column',
                /* maxPointWidth: 100000, */
				//pointStart: Date.UTC(2017, 0, 1),
               // pointInterval: 24 * 3600 * 1000, // one day
                yAxis: 1,
                data: [
0,
91,
260,
238,
69,
0,
0,
0,
169,
286,
335,
260,
396,
0,
0,
204,
210,
322,
350,
295,
0,
0,
304,
338,
310,
0,
0,
0
]
            },
			
{
                name: 'WA Gesamt Bewegungen',
                type: 'column',
                /* maxPointWidth: 100000, */
				//pointStart: Date.UTC(2017, 0, 1),
               // pointInterval: 24 * 3600 * 1000, // one day
                yAxis: 1,
                data: [
0,
259,
345,
348,
347,
0,
0,
0,
397,
463,
330,
350,
237,
0,
0,
298,
301,
330,
411,
358,
0,
0,
321,
245,
282,
0,
0,
0
]		
},
           {
                name: 'KPI',
                type: 'spline',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                data: [
0,				
0.87,
1.12,
0.98,
1.01,
0.00,
0.00,
0.00,
1.31,
1.09,
1.06,
0.84,
1.14,
0.00,
0.00,
0.93,
0.83,
1.12,
1.21,
1.01,
0.00,
0.00,
1.09,
0.95,
1.12,
0.00,
0.00,
0.00
]
},
           {
                name: 'Eule-Bewegungsfaktor',
                type: 'spline',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                data: [
0,				
9.41,
11.09,
10.25,
10.63,
0.00,
0.00,
0.00,
12.08,
11.57,
10.38,
8.32,
11.30,
0.00,
0.00,
9.27,
8.00,
10.10,
11.90,
11.39,
0.00,
0.00,
10.96,
9.74,
9.39,
0.00,
0.00,
0.00
]
}


        ]
    });
});