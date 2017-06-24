$(function() {
    Highcharts.setOptions({
        colors: ['#ff6c49', '#4cf0b3', '#67a5ec', '#ffc107', '#2721e3', '#0f0f0f', '#FF9655', '#FFF263', '#6AF9C4']
    });
    Highcharts.chart('container2017', {
        chart: {
            zoomType: 'x',
            type: 'line',
            borderWidth: 0,
            plotBorderWidth: 0,
            margin: [60, 70, 70, 50],
            shadow: true


        },
        title: {
            text: 'Fritz Logistik - Log1 KPI'
        },
        subtitle: {
            text: 'BöHö1 OG - Q4'
        },
        xAxis: {
            categories: [
                '01.01.2017',
                '02.01.2017',
                '03.01.2017',
                '04.01.2017',
                '05.01.2017',
                '06.01.2017',
                '07.01.2017'

            ]
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[5]
                }
            },
            title: {
                text: 'Produktivitätzahl',
                style: {
                    color: Highcharts.getOptions().colors[5]
                }
            }
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
            shared: false,
            formatter: function() {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
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
            x: 30,
            verticalAlign: 'top',
            y: 2,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },

        series: [{
                name: 'KACO',
                type: 'column',
                /* maxPointWidth: 100000, */
                yAxis: 1,
                data: [
                    0,
                    245,
                    240,
                    427,
                    486,
                    0,
                    0

                ]
            }, {
                name: 'KACO GSD',
                type: 'column',
                yAxis: 1,
                data: [
                    0,
                    222,
                    158,
                    62,
                    14,
                    0,
                    0
                ]
            }, {
                name: 'Söhner',
                type: 'column',
                yAxis: 1,
                data: [
                    0,
                    108,
                    176,
                    353,
                    191,
                    0,
                    0

                ]
            }, {
                name: 'LTI',
                type: 'column',
                yAxis: 1,
                data: [
                    0,
                    0,
                    0,
                    0,
                    26,
                    0,
                    0
                ]
            },
            {
                name: 'Intersport',
                type: 'column',
                yAxis: 1,
                data: [
                    0,
                    345,
                    128,
                    32,
                    449,
                    0,
                    0

                ],
            },

            /* {
			tooltip: {
                valueSuffix: ''
            }

        }, */



            {
                name: 'Produktivitätzahl',
                type: 'spline',
                data: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0


                ]
            }


        ]
    });
});