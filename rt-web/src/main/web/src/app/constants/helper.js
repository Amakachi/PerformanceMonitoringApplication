export function dateHelper(periodOfTheYear, startOrEndDate) {

var day; var month;
var d = new Date();

    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    let month_index = d.getMonth();
    console.log(month_index)
 if(startOrEndDate === 'start') {
      periodOfTheYear == 'daily' ? day = d.getDate() : day = '01';
       periodOfTheYear == 'yearly' ? month = 'JAN': month = month_names[month_index];
 }else if(startOrEndDate === 'end') {
  periodOfTheYear == 'daily' ? day = d.getDate() : day = new Date(2020, month_index +1, 0).getDate();
  periodOfTheYear == 'yearly' ? month = 'DEC': month = month_names[month_index];
 }
    var year = d.getFullYear();
   
    
    return "" + day + "-" + month + "-" + year;
}