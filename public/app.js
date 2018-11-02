angular.module("ppp",[
		'ui.router'
	])
	.config(routeConfig);

	routeConfig.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];

	function routeConfig($stateProvider, $locationProvider, $urlRouterProvider) {
		$locationProvider.html5Mode(true);

		$urlRouterProvider.otherwise('/'); 	//elси нет страницы редирект на рут page

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('profile', {
				url: '/profile/:user_id',
				templateUrl: 'views/profile.html',
				controller: 'ProfileCtrl',
				controllerAs: 'vm'
			})
			.state('singlePost', {
				url: '/singlePost/:id',
				templateUrl: 'views/singlepost.html',
				controller: 'SinglePostCtrl',
				controllerAs: 'vm'
			})
			.state('scroll', {
				url: '/scroll',
				templateUrl: 'views/scroll.html',
				controller: 'ScrollCtrl',
				controllerAs: 'vm'
			})
			.state('scroll2', {
				url: '/scroll2',
				templateUrl: 'views/scroll2.html',
				controller: 'Scroll2Ctrl',
				controllerAs: 'vm'
			})


	}