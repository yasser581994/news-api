

var httpReq = new XMLHttpRequest();
var allData = [];

var links = document.getElementsByClassName("nav-link");
var category = "general";
var country = "fr";

var countries =
[
    {name:'egypt' , code:'eg'},
    {name:'japan' , code:'jp'},
    {name:'italy' , code:'it'},
    {name:'france' , code:'fr'},
    {name:'china' , code:'ch'},
]
displayCountries();

function displayCountries()
{
    var temp = ``;
    for(var i = 0 ; i < countries.length ; i++)
    {
        temp+=`<li class="my-3" onclick='changeCountry("`+countries[i].code+`")'>`+countries[i].name+`</li>`
    }
document.getElementById("countriesList").innerHTML = temp;

}

function changeCountry(code)
{
    country = code;
    getData(category , country)

}

for(var i =0 ; i<links.length ; i++)
{
    links[i].addEventListener("click" , function(e){
        category = e.target.text;
        getData(category , country)

    })
}
getData(category , country)

function getData(category , country)
{
httpReq.open("GET","https://newsapi.org/v2/top-headlines?country="+country+"&category="+category+"&apiKey=31cf74b9d55a4b6780e02b8c74a4cf61" ) // set connection;
httpReq.send(); 


httpReq.onreadystatechange =function()
{

    if(httpReq.readyState == 4 && httpReq.status == 200 ) 
    {
        allData =   JSON.parse( httpReq.response).articles 
        displayNews();

    }   
    
}


}


function displayNews()
{
    var temp = ``;


    for(var i = 0 ; i <allData.length ; i++)
    {
        temp +=`
        <div class="col-md-3">
        <div class="item">
        <img src="`+allData[i].urlToImage+`" class="img-fluid">
          <h4>`+allData[i].title+`</h4>
          <p>`+allData[i].description+`</p>
        </div>
      </div>`;
    }

    document.getElementById("rowData").innerHTML = temp;
}

