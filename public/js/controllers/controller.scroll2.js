angular.module("ppp")
	.controller("Scroll2Ctrl", Scroll2Ctrl)


	Scroll2Ctrl.$inject = ["$http", "$state"];

	function Scroll2Ctrl($http, $state) {
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