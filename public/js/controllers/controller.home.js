angular.module("ppp")
	.controller("HomeCtrl", HomeCtrl)


	HomeCtrl.$inject = ["$http", "$state"];

	function HomeCtrl($http, $state) {
		var vm = this;

		vm.currentPage = 0;

		vm.showPage = function() {
			$http.get('/api/blog/' + vm.currentPage + '/pagination')
			.success(function(data) {
				console.log(data);
				vm.allblogs = data.blogs;
				vm.numberOfPages = new Array(data.numberOfPages);
				console.log('HomeCtrl vm.allblogs', vm.allblogs);
			})
			.error(function(){
				alert(err.msg);
			});
		}	

		vm.showPage();


		vm.openPage = function(page) {
			vm.currentPage = page;
			vm.showPage();
		}

		vm.nextPage = function() {
			if(vm.currentPage!=(vm.numberOfPages.length - 1)) {
				vm.currentPage++;
				vm.showPage();
			}
		}

		vm.prevPage = function() {
			if(vm.currentPage!=0) {
				vm.currentPage--;
				vm.showPage();
			}
		}

		
		// $http.get('/api/blog/')
		// 	.success(function(data) {
		// 		console.log(data);
		// 		vm.allblogs = data;
		// 		console.log('HomeCtrl vm.allblogs', vm.allblogs);
		// 	})
		// 	.error(function(){
		// 		alert(err.msg);
		// 	});




	}