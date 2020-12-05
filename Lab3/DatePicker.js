class DatePicker{
    constructor(id,callback){
        this.id = id;
        this.callback = callback; //this.callback gedeg n huvisagch callback n function
        
    }
    render(date){
        var i,j;
        var table = document.createElement("table");
        var months=['Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
        var days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        var me = this;
        var temp = new Date(date);
        var lastDateOfpreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0);
        var lastDayOfpreviousMonth = lastDateOfpreviousMonth.getDate();
        var lastDateOfcurMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
        var lastDayOfcurMonth = lastDateOfcurMonth.getDate();
        temp.setDate(1);
        var week = temp.getDay();
       // console.log(week);
        let ehlel = lastDayOfpreviousMonth-week+1;
        if((week + lastDayOfcurMonth)>35){
            var len = 42;
            
        }
        else{
            var len =35;
            
        }
        var array=[len];// сараасаа шалтгаалж өөр өөр 7 хоногтой байна
        //өмнөх сараас орж ирж буй өдрүүдийн утга
        for(var i=0;i<week;i++){
            array[i]=ehlel;
            ehlel++; 
        }
        
        var curDay=1;
        //өөрийн сарын өдрүүдийн утга
        for(var j = i;j<lastDayOfcurMonth+i;j++){
            array[j]=curDay;
            curDay++;
        }
        var last = j;//дараагийн сарын эхний өдрийн индекс
        // дараагийн сарын өдрүүдийн утга
        let a = array.length;
        let b = 1;
        while(a<len){               
            array[a] = b;
            b++;
            a++;
        }
        var r = table.insertRow(0);
        var cell1 = r.insertCell(0);
        cell1.setAttribute("id",this.id+"perv");
        var cell2 = r.insertCell(1);
        cell2.setAttribute("id",this.id+"Year");
        cell2.setAttribute("colSpan","2");
        var cell3 = r.insertCell(2);
        cell3.setAttribute("id",this.id+"Month");
        cell3.setAttribute("colSpan","3");
        var cell4 = r.insertCell(3);
        cell4.setAttribute("id",this.id+"next");
        cell1.innerHTML = "<";
        cell2.innerHTML = date.getFullYear();
        cell3.innerHTML = months[date.getMonth()];
        cell4.innerHTML = ">";
        var r2 = table.insertRow(1);
        
        for(i=0;i<7;i++){
            var cellofweek = r2.insertCell(i);
            cellofweek.innerHTML = days[i];
            cellofweek.setAttribute("class","weeks");
        }
        //INSERT VALUES
        var r3 = table.insertRow(2);
        for(j = 0;j < 7;j++){
           if(array[j]>=(lastDayOfpreviousMonth-week+1)){
              var cell = r3.insertCell(j);
              cell.setAttribute("class","beforeDate");
              cell.innerHTML = array[j];
           }
           else{
            var cell = r3.insertCell(j);
            /*if(array[j]==date.getDate()){
                cell.setAttribute("class","now");
            }*/
            cell.setAttribute("class","curDate");
            cell.callback = this.callback;
            cell.gid = this.id;
            cell.fixedDate = { month:date.getMonth(),year:date.getFullYear(),day:array[j]};
            cell.innerHTML = array[j];
            cell.addEventListener("click", function(){ //cell нь тухайн хэвлэх гэж буй утгыг агуулж байгаа учир обьект маягаар байна.
                this.callback(this.gid,this.fixedDate);
            });
           }
        }
        var k = 3;//мөрийн тоо
        if(len==42){
            var mur = 8;
        }
        else{
            var mur = 7;
        }
        while(k < mur){
            var row = table.insertRow(k);
            for(i = 0;i < 7;i++){
                if(j<last){
                    var cell = row.insertCell(i);
                    /*if(array[j]==date.getDate()){
                        cell.setAttribute("class","now");
                    }
                    */
                    cell.setAttribute("class","curDate");
                    cell.callback = this.callback;
                    cell.gid = this.id;
                    cell.fixedDate = { month:date.getMonth(),year:date.getFullYear(),day:array[j]};
                    cell.innerHTML = array[j];
                    cell.addEventListener("click", function(){ //cell нь тухайн хэвлэх гэж буй утгыг агуулж байгаа учир обьект маягаар байна.
                        this.callback(this.gid,this.fixedDate);
                    });
                    cell.innerHTML = array[j];
                }
                else{
                    var cell = row.insertCell(i);
                    cell.setAttribute("class","nextDate");
                    cell.innerHTML = array[j];
                }
                j++;
            }
            k++;
        }
        document.getElementById(this.id).innerHTML = '';
        document.getElementById(this.id).appendChild(table);
        document.getElementById(this.id+"next").addEventListener("click", function(){ 
            if(date.getMonth()==11){
                date.setMonth(0);
                date.setFullYear(date.getFullYear()+1);
            }
            else{
                date.setMonth(date.getMonth()+1);
            }
            
            me.render(date);
        });
        document.getElementById(this.id+"perv").addEventListener("click", function(){ 
            if(date.getMonth()==0){
                date.setMonth(11);
                date.setFullYear(date.getFullYear()-1);
            }
            else{
                date.setMonth(date.getMonth()-1);
            }
            me.render(date);
        });
     
        
    }
    
}