var ajaxResponse
function drawGraph(){
    getVisData(callbackVisLoc);
};

function getVisData() {
    paramDate = (document.getElementById("myDate").value);

    $.ajax({
        type: "GET",
        url: "getvisdata",
        data: { param: paramDate },
        success: callbackVisLoc
    });
}
function callbackVisLoc(response){
    vis_docs = JSON.parse(response);
    c1_x_coord = [];
    c1_y_coord = [];
    c1_v_date = [];
    c1_v_time = [];
    c2_x_coord = [];
    c2_y_coord = [];
    c2_v_date = [];
    c2_v_time = [];
    c3_x_coord = [];
    c3_y_coord = [];
    c3_v_date = [];
    c3_v_time = [];
    vis_details = [];
    v_details = [];
    c1_cnt = 0;
    c2_cnt = 0;
    c3_cnt = 0;
    y_cnt = [];
    p_vid = "";
    p_cid = "";

    for (i=0; i < vis_docs.length; i++){

        vis_details.push (vis_docs[i].cId);
        vis_details.push (vis_docs[i].vId);
        vis_details.push (vis_docs[i].xcoord);
        vis_details.push (vis_docs[i].ycoord);
        vis_details.push (vis_docs[i].vdate);
        vis_details.push (vis_docs[i].vtime);
        v_details.push (vis_details);
        vis_details = [];
        if (p_cid != vis_docs[i].cId || p_vid != vis_docs[i].vId){
            p_cid = vis_docs[i].cId;
            p_vid = vis_docs[i].vId;
            if (p_cid == "C1"){
                c1_x_coord.push (vis_docs[i].xcoord);
                c1_y_coord.push (vis_docs[i].ycoord);
                c1_v_date.push (vis_docs[i].vtime);
                c1_v_time.push (vis_docs[i].vdate);
                c1_cnt += 1
            }
            if (p_cid == "C2"){
                c2_x_coord.push (vis_docs[i].xcoord);
                c2_y_coord.push (vis_docs[i].ycoord);
                c2_v_date.push (vis_docs[i].vtime);
                c2_v_time.push (vis_docs[i].vdate);
                c2_cnt += 1
            }
            if (p_cid == "C3"){
                c3_x_coord.push (vis_docs[i].xcoord);
                c3_y_coord.push (vis_docs[i].ycoord);
                c3_v_date.push (vis_docs[i].vtime);
                c3_v_time.push (vis_docs[i].vdate);
                c3_cnt += 1
                }
            };
    };
    y_cnt.push (c1_cnt)
    y_cnt.push (c2_cnt)
    y_cnt.push (c3_cnt)

    var data = [
        {
            x: c1_x_coord, 
            y: c1_y_coord, 
            mode: 'markers'
        }
    ];
    var layout = {
        title: 'One Side corridor -  Visitor Spread at 15:00:00',
        font:{
            family: 'Raleway, sans-serif'
        }
    }
    Plotly.newPlot('myDiv1', data, layout, {displayModeBar: false});

    var data = [
        {
            x: c2_x_coord, 
            y: c2_y_coord, 
            mode: 'markers'
        }
    ];
    var layout = {
        title: 'Both Side corridor - Visitor Spread at 15:00:00',
        font:{
            family: 'Raleway, sans-serif'
        }
    }
    Plotly.newPlot('myDiv2', data, layout, {displayModeBar: false});

    var data = [
        {
            x: c3_x_coord, 
            y: c3_y_coord, 
            mode: 'markers'
        }
    ];
    var layout = {
        title: 'Attrium Visitor Spread at 15:00:00',
        font:{
            family: 'Raleway, sans-serif'
        }
    }
    Plotly.newPlot('myDiv3', data, layout, {displayModeBar: false});

    var data = [
        {
            x: ["Corridor - One Side", "Corridor - Both Sides", "Attrium"],
            y: y_cnt,
            type: 'bar'
        }
    ];
    var layout = {
        title: 'Total by Location',
        font:{
            family: 'Raleway, sans-serif'
        }
    }
    Plotly.newPlot('myDiv4', data, layout, {displayModeBar: false});
    return v_details;
};


function getInOutData() {
    paramDate = (document.getElementById("myDate").value);

    $.ajax({
        type: "GET",
        url: "getinoutdata",
        data: { param: paramDate },
        success: callbackInOutData
    });
}
function callbackInOutData(response) {
    // do something with the response
    
    docs = JSON.parse(response)
    var minutes = 30;
    sum = 0;
    rcnt = 0;
    x_dt = [];
    y_cnt=[];
    for (i = 0; i < docs.length; i++){
        if (rcnt == 0){
            endTime = new Date(docs[i].vdatetime);
            rcnt ++;
        }
        if ((new Date(docs[i].vdatetime)) >= endTime) {
            x_dt.push (endTime); //.toLocaleString());
            y_cnt.push (sum);
            sum = docs[i].io_ind;
            endTime = new Date(endTime.getTime() + minutes*60000);
        } 
        else {
            sum = sum + docs[i].io_ind;
        }
    }
    var data = [{x: x_dt, y: y_cnt, type: 'bar'}];
    var layout = {
        title: 'Visitor Count by every ' + minutes + ' Minutes',
        font:{
            family: 'Raleway, sans-serif'
        },
        showlegend: false,
        xaxis: {
            tickangle: -45
        },
        yaxis: {
            zeroline: false,
            gridwidth: 2
        },
        bargap :0.05
    };
    Plotly.newPlot(myDivc, data, layout, {displayModeBar: false});

}


function myChange(){
    gDate = (document.getElementById("myDate").value);
    return gDate;
};

function showInGraph(){
    gd = myChange();
    // db = fbInit();
    // dRef = setCollection(db, "vis_ent_exit", gd);
    readInOutData(dRef, gd);
};

function readVisDetails(visRef, paramDate){
    c1_x_coord = [];
    c1_y_coord = [];
    c1_v_date = [];
    c1_v_time = [];
    c2_x_coord = [];
    c2_y_coord = [];
    c2_v_date = [];
    c2_v_time = [];
    c3_x_coord = [];
    c3_y_coord = [];
    c3_v_date = [];
    c3_v_time = [];
    vis_details = [];
    v_details = [];
    c1_cnt = 0;
    c2_cnt = 0;
    c3_cnt = 0;
    y_cnt = [];
    p_vid = "";
    p_cid = "";
    
    visRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.exists) {
                vis_details.push (doc.data().cId);
                vis_details.push (doc.data().vId);
                vis_details.push (doc.data().xcoord);
                vis_details.push (doc.data().ycoord);
                vis_details.push (doc.data().vdate);
                vis_details.push (doc.data().vtime);
                v_details.push (vis_details);
                vis_details = [];
                if (p_cid != doc.data().cId || p_vid != doc.data().vId){
                    p_cid = doc.data().cId;
                    p_vid = doc.data().vId;
                    if (p_cid == "C1"){
                        c1_x_coord.push (doc.data().xcoord);
                        c1_y_coord.push (doc.data().ycoord);
                        c1_v_date.push (doc.data().vtime);
                        c1_v_time.push (doc.data().vdate);
                        c1_cnt += 1
                    }
                    if (p_cid == "C2"){
                        c2_x_coord.push (doc.data().xcoord);
                        c2_y_coord.push (doc.data().ycoord);
                        c2_v_date.push (doc.data().vtime);
                        c2_v_time.push (doc.data().vdate);
                        c2_cnt += 1
                    }
                    if (p_cid == "C3"){
                        c3_x_coord.push (doc.data().xcoord);
                        c3_y_coord.push (doc.data().ycoord);
                        c3_v_date.push (doc.data().vtime);
                        c3_v_time.push (doc.data().vdate);
                        c3_cnt += 1
                    }
                };
            }
            else {
                console.log("Error getting documents" + error);
            };
        });
        y_cnt.push (c1_cnt)
        y_cnt.push (c2_cnt)
        y_cnt.push (c3_cnt)

        var data = [
            {
                x: c1_x_coord, //[630, 670, 60, 755, 706, 474, 721, 114, 704, 726],
                y: c1_y_coord, //[236, 258, 286, 311, 373, 413, 458, 720, 106, 106],
                mode: 'markers'
            }
        ];
        var layout = {
            title: 'One Side corridor -  Visitor Spread at 15:00:00',
            font:{
                family: 'Raleway, sans-serif'
            }
        }
        Plotly.newPlot('myDiv1', data, layout, {displayModeBar: false});

        var data = [
            {
                // var i;
                // for (i=0; i<c2_x_coord.length; i++) {
                //     r=((c2_x_coord[i]*c2_y_coord[i])/((c2_x_coord[i]-2)*(c2_y_coord[i]-2)))
                //     g=((c2_x_coord[i]*c2_y_coord[i])/((c2_x_coord[i]-4)*(c2_y_coord[i]-4)))
                //     b=((c2_x_coord[i]*c2_y_coord[i])/((c2_x_coord[i]-6)*(c2_y_coord[i]-6)))
                //     rgb_color="rgb("+r+","+g+","+b+")"
                //     x: c2_x_coord[i],
                //     y: c2_y_coord[i],
                //     mode: 'markers',
                //     marker: {
                //         color: rgb_color
                //     }

                // }               
                x: c2_x_coord, //[630, 670, 60, 755, 706, 474, 721, 114, 704, 726],
                y: c2_y_coord, //[236, 258, 286, 311, 373, 413, 458, 720, 106, 106],
                mode: 'markers'
            }
        ];
        var layout = {
            title: 'Both Side corridor - Visitor Spread at 15:00:00',
            font:{
                family: 'Raleway, sans-serif'
            }
        }
        Plotly.newPlot('myDiv2', data, layout, {displayModeBar: false});

        var data = [
            {
                x: c3_x_coord, //[630, 670, 60, 755, 706, 474, 721, 114, 704, 726],
                y: c3_y_coord, //[236, 258, 286, 311, 373, 413, 458, 720, 106, 106],
                mode: 'markers'
            }
        ];
        var layout = {
            title: 'Attrium Visitor Spread at 15:00:00',
            font:{
                family: 'Raleway, sans-serif'
            }
        }
        Plotly.newPlot('myDiv3', data, layout, {displayModeBar: false});

        var data = [
            {
                x: ["Corridor - One Side", "Corridor - Both Sides", "Attrium"],
                y: y_cnt,
                type: 'bar'
            }
        ];
        var layout = {
            title: 'Total by Location',
            font:{
                family: 'Raleway, sans-serif'
            }
        }
        Plotly.newPlot('myDiv4', data, layout, {displayModeBar: false});
    });
    return v_details;
}

function myDateChange() {
    var myDt = document.getElementById("myDate").value;
    return myDt;
};

function showGraph() {
    var visData = getVisitorEntExit();
}

function repeatGraph(visitors){
    c1_x_coord = [];
    c1_y_coord = [];
    c1_v_date = [];
    c1_v_time = [];
    c2_x_coord = [];
    c2_y_coord = [];
    c2_v_date = [];
    c2_v_time = [];
    c3_x_coord = [];
    c3_y_coord = [];
    c3_v_date = [];
    c3_v_time = [];
    c1_cnt = 0;
    c2_cnt = 0;
    c3_cnt = 0;
    gTime = (document.getElementById("myTime").value);
    // visitors.filter(gTime)
    p_cid = ""
    p_vid = ""
    for (elements of visitors){
       if (elements[5] == gTime){
            if (p_cid != elements[0] || p_vid != elements[0]){
                p_cid = elements[0];
                p_vid = elements[1];
                if (elements[0] == "C1"){
                    c1_x_coord.push (elements[2]);
                    c1_y_coord.push (elements[3]);
                    c1_v_date.push (elements[4]);
                    c1_v_time.push (elements[5]);
                    c1_cnt += 1;
                }
                if (elements[0] == "C2"){
                    c2_x_coord.push (elements[2]);
                    c2_y_coord.push (elements[3]);
                    c2_v_date.push (elements[4]);
                    c2_v_time.push (elements[5]);
                    c2_cnt += 1;
                }
                if (elements[0] == "C3"){
                    c3_x_coord.push (elements[2]);
                    c3_y_coord.push (elements[3]);
                    c3_v_date.push (elements[4]);
                    c3_v_time.push (elements[5]);
                    c3_cnt += 1;
                }
            };
        };
    }
    y_cnt.push (c1_cnt)
    y_cnt.push (c2_cnt)
    y_cnt.push (c3_cnt)

    var data = [
        {
            x: c1_x_coord, //[630, 670, 60, 755, 706, 474, 721, 114, 704, 726],
            y: c1_y_coord, //[236, 258, 286, 311, 373, 413, 458, 720, 106, 106],
            mode: 'markers'
        }
    ];
    var layout = {
        title: 'One Side corridor -  Visitor Spread at ' + gTime,
        font:{
            family: 'Raleway, sans-serif'
        }
    }
    Plotly.newPlot('myDiv1', data, layout, {displayModeBar: false});

    var data = [
        {
            x: c2_x_coord, //[630, 670, 60, 755, 706, 474, 721, 114, 704, 726],
            y: c2_y_coord, //[236, 258, 286, 311, 373, 413, 458, 720, 106, 106],
            mode: 'markers'
        }
    ];
    var layout = {
        title: 'Both Side corridor - Visitor Spread at ' + gTime,
        font:{
            family: 'Raleway, sans-serif'
        }
    }
    Plotly.newPlot('myDiv2', data, layout, {displayModeBar: false});

    var data = [
        {
            x: c3_x_coord, //[630, 670, 60, 755, 706, 474, 721, 114, 704, 726],
            y: c3_y_coord, //[236, 258, 286, 311, 373, 413, 458, 720, 106, 106],
            mode: 'markers'
        }
    ];
    var layout = {
        title: 'Attrium Visitor Spread at ' + gTime,
        font:{
            family: 'Raleway, sans-serif'
        }
    }
    Plotly.newPlot('myDiv3', data, layout, {displayModeBar: false});
    var data = [
        {
            x: ["Corridor - One Side", "Corridor - Both Sides", "Attrium"],
            y: y_cnt,
            type: 'bar'
        }
    ];
    var layout = {
        title: 'Total by Location',
        font:{
            family: 'Raleway, sans-serif'
        }
    }
    Plotly.newPlot('myDiv4', data, layout, {displayModeBar: false});

}
