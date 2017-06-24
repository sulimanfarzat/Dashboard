/* ***************************************
*******powerd by Suliman Farzat 2017********
*************for Fritz-Gruppe***************
******************************************** */
$(function() {
    Highcharts.setOptions({
        colors: ['#ff6c49', '#ffc107', '#67a5ec', '#4cf0dc', '#000', '#0f0f0f', '#FF9655', '#FFF263', '#6AF9C4']
    });
/* 	************************************************ */
	var datum = [], porsche_s=[], vw = [], audi =[], weber = [], kpikellers=[];
	for (var i = 77; i < datenbank.length; i++){
		datum.push(datenbank[i].Datum);
		porsche_s.push(Math.round(datenbank[i].Porsche));
		vw.push(Math.round(datenbank[i].VW));
		audi.push(Math.round(datenbank[i].Audi_A8));
		weber.push(Math.round(datenbank[i].Weber));
		kpikellers.push(datenbank[i].KPI_Keller);

		 }
	
/* 	************************************************ */
    Highcharts.chart('keller_q2_2017', {
        chart: {
            zoomType: 'x',
            type: 'line',
            borderWidth: 0,
            plotBorderWidth: 0,
            margin: [60, 80, 70, 70],
            shadow: false


        },
		rangeSelector: {
            allButtonsEnabled: true,
            selected: 2
        },
        title: {
            text: 'Fritz Logistik - Log1 KPI - Keller - Q2 2017'
        },
        subtitle: {
            text: '<h1 style="color:green;"> KPI Ziel: 30 bis 40</h1>'
        },
        xAxis:  {
			categories: datum
            //type: 'datetime',
            //dateTimeLabelFormats: {
                //day: '%d.%m.%y'
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
            },
			 plotBands: [{
                color: '#c9f7e4',
                from: 30,
                to: 40
            }]
        }, { // Secondary yAxis
            title: {
                text: 'Leistungsindikator',
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
			borderWidth: 3 ,
			crosshairs: true,
            shared: false,
			shadow: true,
			valueSuffix: '',
            formatter: function() {
				var s= "KPI";
				if(this.series.name === s){
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y ;//+ '<br/>' +
                    //'Total: ' + this.point.stackTotal;
					} else {
					return '<b>' + this.x + '</b><br/>' +
                    '<br/><span style="color:{this.series.color}">\u25CF</span> ' + this.series.name + ': ' + this.y + '<br/>' + '<p style="color:red;">' +
                    'Total: ' + '</p>'  + this.point.stackTotal;
					}			
            }
        },
        plotOptions: {
			series: {
						allowPointSelect: true,
					},
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
            borderColor: '#C98657',
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'hsla(181, 25%, 75%, 0.17)',
			itemHoverStyle: {
				color: '#ff8000'
				}
        },

        series: [{
                name: 'Porsche',
                type: 'column',
                /* maxPointWidth: 100000, */
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                yAxis: 1,
                data: porsche_s
            }, 
			{
                name: 'VW Osenbrück',
                type: 'column',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                yAxis: 1,
                data: vw
            },
			{
                name: 'Audi A8',
                type: 'column',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                yAxis: 1,
                data: audi
            },
            {
                name: 'Weber',
                type: 'column',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                yAxis: 1,
                data: weber
            },




            {
                name: 'KPI',
                type: 'spline',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                data: kpikellers
}


        ]
    });
});