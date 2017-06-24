/* ***************************************
*******powerd by Suliman Farzat 2017********
*************for Fritz-Gruppe***************
******************************************** */
$(function() {
    Highcharts.setOptions({
        colors: ['#67a5ec', '#000', '#0000CD', '#ffc107', '#ff6c49', '#e780e1', '#90ed7d', '#000', '#6AF9C4']
    });
	
/* 	************************************************ */
	var datum = [], gif=[], kpi_gif=[];
	for (var i = 77; i < datenbank.length ; i++){
		datum.push(datenbank[i].Datum);
		gif.push(Math.round(datenbank[i].GIF));
		kpi_gif.push(datenbank[i].KPI_GIF);
		 };
	
/* 	************************************************ */
						
    Highcharts.chart('GIF_container2017_q2', {
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
            text: 'Fritz Logistik - Log1 KPI - GIF - Q2 2017' 
        },
        subtitle: {
            text: '<h1 style="color:green;"> KPI Ziel: 20 bis 23</h1>'
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
                from: 20,
                to: 23
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
                    '<br/><span style="color:{this.series.color}">\u25CF</span> '+ this.series.name + '</p>' + ': ' + this.y //+ '<br/>' + '<p style="color:red;">' +
                    //'Total: ' + '</p>' + Math.round(this.point.stackTotal);
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
                name: 'GIF',
                type: 'column',
                /* maxPointWidth: 100000, */
                yAxis: 1,
                data: gif
            },
           {
                name: 'KPI',
                type: 'spline',
				lineWidth: 2.6,
				zones: [{
						value: 0
					}, {
						value: 5,
						dashStyle: 'shortdot'
					},{
						/* value: 40,
						color: '#495e62' */
						}],
                data: kpi_gif
        }]
    });
});





