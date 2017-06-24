$(function() {
    Highcharts.setOptions({
        colors: ['#ff6c49', '#4cf0dc', '#0000CD', '#ffc107', '#67a5ec', '#e780e1', '#90ed7d', '#000', '#6AF9C4']
    });
	
/* 	************************************************ */
	var datum = [], kaco=[], gsd=[], söhner=[], lti=[], intersport=[], ks=[], weber_w=[], kpi_böhö1=[];
	for (var i = 0; i < 77 ; i++){
		datum.push(datenbank[i].Datum);
		kaco.push(datenbank[i].KACO);
		gsd.push(datenbank[i].KACO_GSD);
		söhner.push(datenbank[i].Söhner);
		lti.push(datenbank[i].LTI);
		intersport.push(datenbank[i].Intersport);
		ks.push(datenbank[i].KS_Huayu);
		weber_w.push(datenbank[i].Weber_wagenheber);
		kpi_böhö1.push(datenbank[i].KPI_BöHö_OG);
		 };
	
/* 	************************************************ */
						
    Highcharts.chart('container2017', {
        chart: {
            zoomType: 'x',
            type: 'line',
            borderWidth: 0,
            plotBorderWidth: 0,
            margin: [60, 70, 70, 60],
            shadow: false,
			//backgroundColor: 'hsla(199, 94%, 74%, 0.64)',

        },
		rangeSelector: {
            allButtonsEnabled: true,
            selected: 2
        },
        title: {
            text: 'Fritz Logistik - Log1 KPI - BöHö1 OG - Q1 2017' 
        },
        subtitle: {
            text: '<h1 style="color:green;"> KPI Ziel: 30</h1>'
        },
        xAxis: {
            categories: datum
        },
		
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors['7']
                }
            },
            title: {
                text: 'KPI',
                style: {
                    color: Highcharts.getOptions().colors['7']
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
				var s= "KPI"
				if(this.series.name === s){
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y //+ '<br/>' +
                    //'Total: ' + this.point.stackTotal;
					} else {
					return '<b>' + this.x + '</b><br/>' + 
                    '<br/><span style="color:{this.series.color}">\u25CF</span> '+ this.series.name + '</p>' + ': ' + this.y + '<br/>' + '<p style="color:red;">' +
                    'Total: ' + '</p>' + this.point.stackTotal;
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
                borderRadius: 0.9,
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
            x: 60,
            verticalAlign: 'top',
            y: 0,
            floating: true,
			borderColor: '#C98657',
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'hsla(181, 25%, 75%, 0.17)',
			itemHoverStyle: {
				color: '#ff8000'
				}
        },

        series: [{
				/* zones: [{
							value: 0,
							color: '#f7a35c'
						}, {
							value: 10,
							color: '#7cb5ec'
						}, {
							color: '#90ed7d'
						}], */	
                name: 'KACO',
                type: 'column',
                /* maxPointWidth: 100000, */
                yAxis: 1,
                data: kaco
            }, {
                name: 'KACO GSD',
                type: 'column',
                yAxis: 1,
                data: gsd
            }, {
                name: 'Söhner',
                type: 'column',
                yAxis: 1,
                data: söhner
            }, {
                name: 'LTI',
                type: 'column',
                yAxis: 1,
                data: lti
            },
            {
                name: 'Intersport',
                type: 'column',
                yAxis: 1,
                data: intersport
            },
			            {
                name: 'KS Huayu',
                type: 'column',
                yAxis: 1,
                data: ks
            },
			            {
                name: 'Weber Wagenheber',
                type: 'column',
                yAxis: 1,
                data: weber_w
            },
           {
                name: 'KPI',
                type: 'spline',
				lineWidth: 2.6,
				zones: [{
						value: 0
					}, {
						value: 5,
						dashStyle: 'dot'
					},{
						/* value: 40,
						color: '#495e62' */
						}],
                data: kpi_böhö1
        }]
    });
});





