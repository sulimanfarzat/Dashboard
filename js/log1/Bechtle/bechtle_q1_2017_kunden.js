$(function() {
    Highcharts.setOptions({
        colors: ['#67a5ec', '#ffc107', '#6AF9C4', '#0f0f0f', '#2721e3', '#0f0f0f', '#FF9655', '#FFF263', '#ff6c49']
    });
/* 	************************************************ */
	var datum = [], mann_schröder=[], kpi_mann_schröder=[], unilever=[];
	for (var i = 0; i < 77; i++){
		datum.push(datenbank[i].Datum);
		mann_schröder.push(datenbank[i].Mann_Schröder);
		unilever.push(datenbank[i].Unilever);
		kpi_mann_schröder.push(datenbank[i].KPI_Bechtle);
		 };
	
/* 	************************************************ */
    Highcharts.chart('bechtle_q1_2017', {
        chart: {
            zoomType: 'x',
            type: 'line',
            borderWidth: 0,
            plotBorderWidth: 0,
            margin: [60, 80, 70, 70],
            shadow: false


        },
        title: {
            text: 'Fritz Logistik - Log1 KPI'
        },
        subtitle: {
            text: 'Bechtle Halle - Q1 2017'
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
				var s= "KPI"
				if(this.series.name === s){
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y //+ '<br/>' +
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
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
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
                data: [],
            },




            {
                name: 'KPI',
                type: 'spline',
				//pointStart: Date.UTC(2017, 0, 1),
                //pointInterval: 24 * 3600 * 1000, // one day
                data: kpi_mann_schröder
}


        ]
    });
});