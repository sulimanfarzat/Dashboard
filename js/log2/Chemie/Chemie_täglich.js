$(function() {

    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#DF5353'], // red
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#55BF3B'] // green
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The Leistungsindikator
    var chartSpeed = Highcharts.chart('container-speed-chemie', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 800,
            title: {
                text: 'WE/WA Gesamt Bewegungen'
            }
        },

        credits: {
            enabled: true,
			text: 'Dei Zahlen von'+' '+ d
        },

        series: [{
            name: 'Leistungsindikator',
            data: [592],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">LI/Tag</span></div>'
            },
            tooltip: {
                valueSuffix: ' LI/Tag'
            }
        }]

    }));

    // The KPI

    var chartRpm = Highcharts.chart('container-rpm-chemie', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 2,
            title: {
                text: 'KPI'
            }
        },

        credits: {

            text: 'Dei Zahlen von'+' '+ d
        },

        series: [{
            name: 'KPI',
            data: [1.12],
            dataLabels: {
                format: '<div style="text-align:center;"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                    '<span style="font-size:12px;color:silver">* KPI/Tag</span></div>'
            },

            tooltip: {
                valueSuffix: ' KPI/T'
            }
        }]

    }));

    // Bring life to the dials
    setInterval(function() {
        // Leistungsindikator
        var point,
            newVal,
            inc;

        /* if (chartSpeed) {
            point = chartSpeed.series[0].points[0];
            inc = Math.round((Math.random() - 1.1) * 1);
            newVal = point.y + inc;

            if (newVal < 0 || newVal > 1) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        } */

        // KPI
        /*  if (chartRpm) {
             point = chartRpm.series[0].points[0];
             inc = Math.random() - 0.5;
             newVal = point.y + inc;

             if (newVal < 0 || newVal > 1) {
                 newVal = point.y - inc;
             }

             point.update(newVal);
         } */
    }, 4000);

});