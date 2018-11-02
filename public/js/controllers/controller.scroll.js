angular.module("ppp")
	.controller("ScrollCtrl", ScrollCtrl)


	ScrollCtrl.$inject = ["$http", "$state"];

	function ScrollCtrl($http, $state) {
		var vm = this;

		vm.currentPage = 0;

		vm.allblogs = [];

		vm.inProgress = false;

		vm.getBlogs = function() {

			if(vm.inProgress==false) {
				vm.inProgress = true;


				$http.get('/api/blog/' + vm.currentPage + '/scroll')
				.success(function(data){
					vm.allblogs = vm.allblogs.concat(data);

					vm.inProgress = false;
				})
					
			}

			

		}

		vm.getBlogs(); 

		vm.showMore = function() {
			vm.currentPage++;
			vm.getBlogs(); 
		}

	}