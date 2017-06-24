$(function() {
    Highcharts.setOptions({
        colors: ['#ff6c49', '#4cf0dc', '#0000CD', '#ffc107', '#67a5ec', '#e780e1', '#90ed7d', '#000', '#6AF9C4']
    });
	
/* 	************************************************ */
	var datum = [], ch_kpi=[], tp_we=[], vp_wa=[], kp_wa=[];
	for (var i = 0; i < datenbank_2.length ; i++){
		datum.push(datenbank_2[i].Datum);
		ch_kpi.push(datenbank_2[i].CH_KPI);
		tp_we.push(datenbank_2[i].CH_TPE_WE);
		vp_wa.push(datenbank_2[i].CH_VP_WA);
		kp_wa.push(datenbank_2[i].CH_KP_WA);
		 };
	
/* 	************************************************ */
						
    Highcharts.chart('Chemie_container2017_q2', {
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
            text: 'Fritz Logistik - Log2 KPI - Chemie Halle- Q2 2017' 
        },
        subtitle: {
            text: '<h1 style="color:green;"> KPI Ziel: *** </h1>'
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
                name: 'WE TP',
                type: 'column',
                /* maxPointWidth: 100000, */
                yAxis: 1,
                data: tp_we
            }, {
                name: 'WA Vollpalette',
                type: 'column',
                yAxis: 1,
                data: vp_wa
            }, {
                name: 'WA Kommssionierpalette',
                type: 'column',
                yAxis: 1,
                data: kp_wa
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
                data: ch_kpi
        }]
    });
});





