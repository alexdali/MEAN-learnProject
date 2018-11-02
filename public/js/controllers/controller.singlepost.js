angular.module("ppp")
	.controller("SinglePostCtrl", SinglePostCtrl)


	SinglePostCtrl.$inject = ["$http", "$state"];

	function SinglePostCtrl($http, $state) {
		var vm = this;

		console.log($state.params.id);

		vm.currentUser = JSON.parse(localStorage.getItem('user'));

		$http.get('/api/blog/' + $state.params.id)
			.success(function(data) {
				vm.blog = data;
				//console.log(data);
				console.log('vm.blog', vm.blog);
			})
			.error(function(){
				alert(err.msg);
			});


			$http.get('/api/comment/' + $state.params.id)
				.success(function(data){
					vm.comments = data;
					vm.fixText();
				})
				.error(function(err){
					allert(err);
				})





			vm.saveComment = function(){
				$http.post('/api/comment', {

					text: vm.text,
					blog_id: $state.params.id
				})
				.success(function(data){
					vm.comments.push(data);
					vm.text='';
				})
			}


			vm.deleteComment = function(comment) {
				$http.delete('/api/comment/' + comment._id)
					.success(function(){
						var index = vm.comments.indexOf(comment);
						vm.comments.splice(index, 1);
					})
					.error(function(err){
						alert(err.msg);
					})
			}

			vm.fixText = function() {
				switch(vm.comments.length%10) {
					case 1: 
						vm.numberOfCommentsText = 'Комментарий';
						break;
					case 2: 
					case 3:
					case 4:
						vm.numberOfCommentsText = 'Комментария';
						break;
					default:
						vm.numberOfCommentsText = 'Комментариев';
				}
			}


			$http.get('/api/like/' + $state.params.id)
				.success(function(data){
					console.log(' get api/like', data);
					vm.like = data.numberOfLikes;
					vm.likeExist = data.isLikeExist;
				})
				.error(function(err){
					allert(err);
				})



			vm.likeIt = function(){
				$http.post('/api/like', {
					blog_id: $state.params.id
				})
				.success(function(data){
					console.log(' post api/like', data);
					if(data.isLike) {
						vm.like++;
						
					} else {
						vm.like--
					}
					vm.likeExist = !vm.likeExist;

				});
			}


	}