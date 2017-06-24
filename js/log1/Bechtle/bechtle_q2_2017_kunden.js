/* ***************************************
*******powerd by Suliman Farzat 2017********
*************for Fritz-Gruppe***************
******************************************** */
$(function() {
    Highcharts.setOptions({
        colors: ['#67a5ec', '#ffc107', '#6AF9C4', '#FF9655', '#0f0f0f', '#0f0f0f', '#FF9655', '#FFF263', '#ff6c49']
    });
/* 	************************************************ */
	var datum = [], mann_schröder=[], kpibechtle=[], unilever=[], skh=[], sons =[];
	for (var i = 77; i < datenbank.length; i++){
		datum.push(datenbank[i].Datum);
		mann_schröder.push(Math.round(datenbank[i].Mann_Schröder));
		unilever.push(Math.round(datenbank[i].Unilever));
		skh.push(Math.round(datenbank[i].SKH));
		sons.push(Math.round(datenbank[i].Sonstiges));
		kpibechtle.push(datenbank[i].KPI_Bechtle);
		 }
	
/* 	************************************************ */
    Highcharts.chart('bechtle_q2_2017', {
        chart: {
            zoomType: 'x',
            type: 'line',
            borderWidth: 0,
            plotBorderWidth: 0,
            margin: [60, 80, 70, 70],
            shadow: false


        },
        title: {
            text: 'Fritz Logistik - Log1 KPI - Bechtle Halle - Q2 2017'
        },
        subtitle: {
            text: '<h1 style="color:green;"> KPI Ziel: 18,5 bis 25</h1>'
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
                from: 18.5,
                to: 25
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
            formatter: function() {
				var s= "KPI";
				if(this.series.name === s){
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y //+ '<br/>' +
                    //'Total: ' + this.point.stackTotal;
					} else {
					return '<b>' + this.x + '</b><br/>' +
                    '<br/><span style="color:{this.series.color}">\u25CF</span> ' + this.series.name + ': ' + this.y + '<br/>' + '<p style="color:red;">' +
                    'Total: ' + '</p>'  + Math.round(this.point.stackTotal);
					}			
            }
        },
        plotOptions: {
			series: {
						allowPointSelect: true
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
                name: 'Mann & Schröder',
                type: 'column',
                /* maxPointWidth: 100000, */
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                yAxis: 1,
                data: mann_schröder
            }, 
			{
                name: 'Unilever',
                type: 'column',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                yAxis: 1,
                data: unilever
            },
            {
                name: 'SKH',
                type: 'column',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                yAxis: 1,
                data: skh
            },
            {
                name: 'Sonstiges',
                type: 'column',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                yAxis: 1,
                data: sons
            },




            {
                name: 'KPI',
                type: 'spline',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                data: kpibechtle
			}


        ]
    });
});