//******************************************************start high chart********************************
$(function () {
		/* 	************************************************ */
	var boho1 = "", keller = "", bechtle = "" , dat = "";
	for (var i = 0; i < datenbank.length ; i++){
		boho1 = datenbank[i].KPI_BöHö_OG;
		keller = datenbank[i].KPI_Keller;
		bechtle = datenbank[i].KPI_Bechtle;
		dat = datenbank[i].Datum;
		 };
		var s1 = keller.toString() 

   /* 	************************************************ */
   
   
    var data = {
            'LOG 1': {
                'BöHö1 OG': {
                    'KPI': boho1
                },
                'Keller': {
                    'KPI': keller
                },
                'Bechtle Halle': {
                    'KPI': bechtle
                },
               /*  'GIF': {
                    'KPI': null
                },
                'A 14': {
                    'KPI': null
                }, */
			},
            'LOG 2': {
                'BöHö3': {
                    'KPI': '0'
                },
                'Chemie Halle': {
                    'KPI': '0'
                },
                'Faurecia': {
                    'KPI': '0'
                },
                'Halle A6': {
                    'KPI': '0'
                },
                'Warenfelter': {
                    'KPI': '0'
                },
            },
            'LOG 3': {
                '???': {
                    'KPI': '0'
                },
                '###': {
                    'KPI': '0'
                },          
		   }
        },
        points = [],
        regionP,
        regionVal,
        regionI = 7,
        countryP,
        countryI,
        causeP,
        causeI,
        region,
        country,
        cause,
        causeName = {
            'KPI': 'KPI'
        };

    for (region in data) {
        if (data.hasOwnProperty(region)) {
            regionVal = 0;
            regionP = {
                id: 'id_' + regionI,
                name: region,
                color: Highcharts.getOptions().colors[regionI]
            };
            countryI = 0;
            for (country in data[region]) {
                if (data[region].hasOwnProperty(country)) {
                    countryP = {
                        id: regionP.id + '_' + countryI,
                        name: country,
                        parent: regionP.id
                    };
                    points.push(countryP);
                    causeI = 0;
                    for (cause in data[region][country]) {
                        if (data[region][country].hasOwnProperty(cause)) {
                            causeP = {
                                id: countryP.id + '_' + causeI,
                                name: causeName[cause],
                                parent: countryP.id,
                                value: (+data[region][country][cause])
                            };
                            regionVal += causeP.value;
                            points.push(causeP);
                            causeI = causeI + 1;
                        }
                    }
                    countryI = countryI + 1;
                }
            }
            regionP.value = (regionVal / countryI).toFixed(1);
            points.push(regionP);
            regionI = regionI + 1;
        }
    }
    Highcharts.chart('container-dash', {
		chart: {
			backgroundColor: 'hsla(0, 0%, 0%, 0.2)',			
		},
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
                enabled: false
            },
            levelIsConstant: false,
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true
                },
                borderWidth: 5
            }],
            data: points
        }],
        subtitle: {
            text: 'Fritz Logistik - KPI Dashboard <a href="index.html"></a>.'
        },
        title: {
            text: dat
        }
    });
});
//******************************************************start high chart********************************

