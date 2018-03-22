var myBookApp = angular.module('myApp',[]);

myBookApp.controller('myBookCtrl', function($scope, $http) {

    $scope.searchResult = [];
    $scope.storedResult = []
    $scope.noResult = false;
    var myWelcome ;

    $scope.getBooks = function(search) {

        document.getElementById('searchItem').value = '';

        var myWelcome ;

        $http({
            method : "GET",
            //url : "https://www.booknomads.com/api/v0/isbn/9789000035526"
            url : "books.json"
        }).then(function mySuccess(response) {
            myWelcome = (response.data);

            console.log('myWelcome Response', myWelcome, 'length : ', myWelcome.books.length);

            for (var i = 0 ; i < myWelcome.books.length ;i++) {
                if(myWelcome.books[i].Title === search) {

                    /*if ($scope.searchResult.length === 0) {
                        $scope.searchResult.push(myWelcome.books[i]);
                        console.log ('Book List if', $scope.searchResult);
                    } else {

                        for (var k = 0 ; k < $scope.searchResult.length; k++) {
                            console.log ('Book List for', $scope.searchResult);
                            if($scope.searchResult[k].Title === search) {
                                console.log ('Book List inside if', $scope.searchResult);
                                console.log('Book Already Exist');
                            } else {
                                console.log('Book Added after check');
                                $scope.searchResult.push(myWelcome.books[i]);
                            }
                        }
                    }*/

                    $scope.searchResult.push(myWelcome.books[i]);
                    //console.log ('Found', $scope.searchResult);
                } else {
                    //console.log ('Not Found');
                    $scope.noResult = true;

                }
            }
            }, function myError(response) {
            var errorText = response.statusText;
            //console.log('myWelcome Bad Response', errorText);
        });
    };

    $scope.favList = [];
    //$scope.bId = '';
    $scope.addToFav = function ($index) {
        console.log('$index : ', $index);
        /*$scope.bId = document.getElementById('bId').innerHTML;
        console.log('bookId : ', $scope.bId);*/

        /* if ($scope.favList.length === 0) {
             $scope.favList.push($scope.searchResult[$index]);
         } else {
             for (var x = 0 ; x < $scope.favList.length ; x++) {
                 if ($scope.favList[x].Title === $scope.favList[$index].Title) {
                     console.log ('Already in favourite');
                 } else {
                     $scope.favList.push($scope.searchResult[$index]);
                 }
             }
         }*/

        $scope.favList.push($scope.searchResult[$index]);
        console.log('$scope.favList : ', $scope.favList);
    };

    $scope.removeFav = function (favList, $index) {
        console.log('Remove $index : ', $index);
        //$scope.favList.shift($scope.favList[$index]);

        if ($index > -1) {
            $scope.favList.splice($index, 1)
        }
        return $scope.favList;
    };









    var elements = document.getElementsByClassName("column");
    console.log("elements", elements);
    // Declare a loop variable
    var i;

    // List View
    $scope.listView = function() {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = "100%";
        }
    };

    // Grid View
    $scope.gridView = function() {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = "50%";
        }
    };
});




























/*function getBooks() {
    var searchItem, url, response, resp_error;
    searchItem = document.getElementById('searchItem').value;

    console.log(searchItem);
    document.getElementById('searchItem').value = '';
}*/


/*
function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("searchItem");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}*/
