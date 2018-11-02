angular.module("ppp")
  .directive('decodeScroll', [ 
      function() {
            return {
                  link: function(scope, elem, attrs) {
                      angular.element(elem).on('scroll', function(evt) {
                      	console.log(elem[0].scrollHeight - elem[0].clientHeight - elem[0].scrollTop)
                          if((elem[0].scrollHeight - elem[0].clientHeight - elem[0].scrollTop)-60 < 0){ 
                               return scope.$apply(attrs.decodeScroll);
                          }
                      }); 
                  }
            };
      }
])