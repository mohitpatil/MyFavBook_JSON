var myBookApp = angular.module('myApp',[]);

myBookApp.controller('myBookCtrl', function($scope, $http) {

    $scope.searchResult = [];
    $scope.favList = [];
    $scope.favShow = false;
    $scope.noResultFound = true;

    $scope.getBooks = function(search) {

        $scope.favShow = true;
        $scope.noResultFound = true;
        $scope.searchResult = [];       // Emptied Search Array for 2nd Search.
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
                    $scope.searchResult.push(myWelcome.books[i]);
                } else {
                    console.log('Not Found');
                }
            }

            if($scope.searchResult.length >= 1) {
                $scope.noResultFound = true;
            } else {
                $scope.noResultFound = false;
            }
        }, function myError(response) {
            $scope.noResultFound = false;
            var errorText = response.statusText;
            //console.log('myWelcome Bad Response', errorText);
        });
    };

    $scope.addToFav = function ($index) {
        console.log('$index : ', $index, 'FavList', $scope.favList, 'SearchResult', $scope.searchResult);
        /*$scope.bId = document.getElementById('bId').innerHTML;
        console.log('bookId : ', $scope.bId);*/

        if ($scope.favList.length === 0) {
            console.log('FavList 0', $scope.favList);
             $scope.favList.push($scope.searchResult[$index]);
        } else {
            console.log('FavList going');
            for (var x = 0 ; x < $scope.favList.length ; x++) {
                console.log('$scope.favList[$index].Title', $scope.favList[$index].Title);
                console.log('$scope.favList[x].Title', $scope.favList[x].Title);

                if ($scope.favList[x].Title === $scope.favList[$index].Title) {
                    console.log ('Already in favourite' ,$scope.favList[x]);
                } else {
                    console.log ('Adding in favourite after ');
                    $scope.favList.push($scope.searchResult[$index]);
                }
            }
        }

        //$scope.favList.push($scope.searchResult[$index]);
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


    //List and Grid View
    var elements = document.getElementsByClassName("view");
    $scope.listView = function() {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = "100%";
        }
    };
    $scope.gridView = function() {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = "40%";
        }
    };

});