// listener for form submit


document.getElementById('myform').addEventListener('submit', savebookmark);

 function savebookmark(e){
   // get form values
   var siteName = document.getElementById('siteName').value;
   var siteURL = document.getElementById('siteURL').value;

   var bookmark = {
     name: siteName,
     url: siteURL
   }

   if(!siteName || !siteURL){
     alert("Pleae provide all the details");
   }

   // localStorage test
  //localStorage.setItem('Test', 'Helloworld');
  //localStorage.setItem(siteName, siteURL);

  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  document.getElementById('myform').reset();

  fetchBookmarks();

   // prevent form from submitting
   e.preventDefault();
 }

 function fetchBookmarks() {
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   var bookmarksresults = document.getElementById('bookmarksresults')

   bookmarksresults.innerHTML = '';
   for(var i =0; i < bookmarks.length; i++){

     var name = bookmarks[i].name;
     var url = bookmarks[i].url;

     bookmarksresults.innerHTML += '<div class = "card card-body bg-light">'+
                                      '<h3>'+ name +
                                      '<a class="btn btn-default" target = "_blank" href = "'+url+'">visit</a>'+
                                      '<a onclick= "deletebookmark(\''+url+'\')"class="btn btn-danger">delete</a>'
                                      + '</h3>'
                                      +'</div>';
   }
   //console.log(bookmarksresults.innerHTML);
 }

 function deletebookmark(url){
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   for (var i = 0; i < bookmarks.length; i++) {
     if (bookmarks[i].url == url) {
       bookmarks.splice(i, 1);
     }
   }
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

   fetchBookmarks();
 }
