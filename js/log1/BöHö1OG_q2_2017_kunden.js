/* ***************************************
*******powerd by Suliman Farzat 2017********
*************for Fritz-Gruppe***************
******************************************** */

$(function() {
    Highcharts.setOptions({
        colors: ['#ff6c49', '#4cf0dc', '#ffc107', '#67a5ec', '#e780e1', '#90ed7d', '#0000CD', '#FF0082', '#000']
    });
	
/* 	************************************************ */
	var datum = [], kaco=[], gsd=[], söhner=[], lti=[], intersport=[], ks=[], weber_w=[], kpi_böhö1=[], weberKonsi =[],
		schifferStadt =[], summe = 0, kpi_mittel = 0, co ='', nulls = 0;
	for (var i = 77; i < datenbank.length ; i++){
		datum.push(datenbank[i].Datum);
		kaco.push(Math.round(datenbank[i].KACO));
		gsd.push(Math.round(datenbank[i].KACO_GSD));
		söhner.push(Math.round(datenbank[i].Söhner));
		lti.push(Math.round(datenbank[i].LTI));
		intersport.push(Math.round(datenbank[i].Intersport));
		ks.push(Math.round(datenbank[i].KS_Huayu));
		weberKonsi.push(Math.round(datenbank[i].Weber_Konsi));
		weber_w.push(Math.round(datenbank[i].Weber_wagenheber));
		schifferStadt.push(Math.round(datenbank[i].Schiffer_Stadt));
		kpi_böhö1.push(Math.round(datenbank[i].KPI_BöHö_OG));
		
		if (datenbank[i].KPI_BöHö_OG === 0 ){
			co += datenbank[i].KPI_BöHö_OG;
			nulls = co.length;			
		}
		summe += datenbank[i].KPI_BöHö_OG;
		kpi_mittel = Math.round(summe/((datenbank.length -77) - nulls));
		 };
	
/* 	************************************************ */
						
    Highcharts.chart('container2017_q2', {
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
            text: 'Fritz Logistik - Log1 KPI - BöHö1 OG - Q2 2017' 
        },
        subtitle: {
            text: '<h1 style="color:green;"> KPI Ziel: 30 bis 40</h1>'
        },
        xAxis: {
            categories: datum
        },
		
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors['8']
                }
            },
            title: {
                text: 'KPI',
                style: {
                    color: Highcharts.getOptions().colors['8']
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
				var z= "KPI Mittelwert"
				if(this.series.name === s){
					return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y //+ '<br/>' +
                    //'Total: ' + this.point.stackTotal;
					} 
				else if(this.series.name === z){
					return this.series.name + ': ' + this.y 
					}
				else {
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
            }, /*{
                name: 'Söhner',
                type: 'column',
                yAxis: 1,
                data: söhner
            },*/ {
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
                name: 'Weber Konsi',
                type: 'column',
                yAxis: 1,
                data: weberKonsi
            },
			{
                name: 'Schiffer Stadt',
                type: 'column',
                yAxis: 1,
                data: schifferStadt
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
                data: kpi_böhö1
        },
           {
                name: 'KPI Mittelwert',
                type: 'pie',
				center: [1200, -40],
				size: 50,
				showInLegend: false,
				dataLabels: {
					enabled: true
				},
				tooltip: false,
                data: [{
						name: 'KPI Q2 Mittelwert',
						y: kpi_mittel,
						color: Highcharts.getOptions().colors[2] 
						}]
        }]
    });
});





