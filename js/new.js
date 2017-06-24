        //When DOM loaded we attach click event to button
        $(document).ready(function() {
            
            //after button is clicked we download the data
           // $('.button').click(function(){

                //start ajax request
                $.ajax({
                    url: "data.json",
                    //force to handle it as text
                    dataType: "text",
                    success: function(data) {
                        
                        //data downloaded so we call parseJSON function 
                        //and pass downloaded data
                        var json = $.parseJSON(data);
                        //now json variable contains data in json format
                        //let's display a few items
						var i, x = "";
						for (i = 0; i < json.length; i++){							
						x += '' + json[i].Datum + ',</br>' //+ json[i].KACO;                      
						}
						$('#results').html(x);
                    }
                });
            //});
        });