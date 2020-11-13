
var docRef = db.collection("entry and exit");
//to recieve data from firestore
console.log("function of firestore works");
var x_val = [];
var y_val = [];

docRef.get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.exists) {
                // console.log(doc.id, " => ", doc.data());
                x_val.push(doc.data());
                
            }
            
            // doc.data() is never undefined for query doc snapshots
            else {
                console.log("Error getting documents" + error);
            }
          


        });
        for(var i in x_val){
            // y_val.push(x_val[i].values());
            y_val = x_val[i].timestamp;
        }
    });





