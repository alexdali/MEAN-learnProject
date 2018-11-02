angular.module("ppp")
	.controller("HeaderCtrl", HeaderCtrl)


	HeaderCtrl.$inject = ["$http", "$state"];

	function HeaderCtrl($http, $state) {
		var vm = this;

		$http.get('/api/user/current').success(function(data){
			if(data) {
				console.log('current: ', data);
				vm.user = data;
				localStorage.setItem('user', JSON.stringify(data));
			}
		})

		vm.Signup = function(){
			console.log('vm.Signup - ', vm.email)
			$http.post('/api/user/signup',{
				email: vm.email,
				first_name: vm.first_name,
				last_name: vm.last_name,
				password: vm.password,
				password2: vm.password2
			})
			.success(function(data){
				console.log('signup: ' + data);
				vm.showSignup = false;
				vm.showLogin = true;
			})
			.error(function(err){
				vm.errors = err;
			});
		}

		vm.login = function(){
			
			$http.post('/api/user/login',{
				email: vm.emailLogin,
				password: vm.passwordLogin,
			})
			.success(function(data){
				console.log('login: ',  data);
				vm.showLogin = false;

				vm.user = data;

				$state.go('profile', {user_id: vm.user._id});
			})
			.error(function(err){
				vm.errorsLogin = err;
			});
		}


		vm.logout = function(){
			$http.post('/api/user/logout')
				.success(function(){
					$state.go('home');
					vm.user = undefined;
				})
				.error(function(err){

				})
		}


		vm.keyUp = function() {
			if(vm.search.length>0) {

					$http.get('/api/blog/' + vm.search + '/search')
					.success(function(data){
						console.log(data);
						
						vm.searchResult = data;
					})
					.error(function(err){
						alert(err);
					})
	
			} else {
				vm.searchResult = undefined;
			}
			
		}



		vm.goToBlog = function(id) {
			$state.go('singlePost', {id: id});
			vm.search = '';
			vm.searchResult = undefined;
		}








	}