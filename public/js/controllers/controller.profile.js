angular.module("ppp")
	.controller("ProfileCtrl", ProfileCtrl)


	ProfileCtrl.$inject = ["$http", "$scope", '$state'];

	function ProfileCtrl($http, $scope, $state) {
		var vm = this;

		// $http.get("/api/blog")
		// 	.success(function(data){
		// 		vm.blogs = data;
		// 		console.log(data)
		// 	})

		vm.currentUser = JSON.parse(localStorage.getItem('user'));

		console.log(vm.currentUser)
		$http.get("/api/blog/user/" + $state.params.user_id )
			.success(function(data){
				vm.blogs = data.blogs;
				vm.author = data.author;

				console.log('get blog/user', data, vm.author._id, vm.currentUser._id )
			})




		// vm.name = "Decode";

		// vm.send=function(){
		// 	console.log(vm.name);
		// }


		vm.AddModal = false;

		vm.readURL = function() {
			if(event.target.files&&
				event.target.files[0]){
				vm.img = event.target.files[0];

				var reader = new FileReader();

				reader.onload = function(e) {
					console.log(e.target.result);
					$scope.$apply(function(){
						vm.imgPreload = e.target.result;
					})
				}

				reader.readAsDataURL(event.target.files[0]);
			}
		};

		vm.imgEditBlog =  function() {
			if(event.target.files&&
				event.target.files[0]){
				vm.img = event.target.files[0];

				var reader = new FileReader();

				reader.onload = function(e) {
					console.log(e.target.result);
					$scope.$apply(function(){
						vm.imgPreload = e.target.result;
					})
				}

				reader.readAsDataURL(event.target.files[0]);
			} else {
				vm.imgPreload = vm.editBlog.img
			}
		};
		
  			

		vm.save=function(){
			console.log("1", vm.title, vm.description);
			if(
				vm.title&&
				vm.title!=''&&
				vm.description&&
				vm.description.length>0) {

				var obj = new FormData();

				obj.append('title', vm.title);
				obj.append('description', vm.description);
				obj.append('img', vm.img);

				console.log(vm.img);


				$http.post("/api/blog", obj, {
					headers: {'Content-Type': undefined}
				}).success(function(data){
					console.log("2", vm.title, vm.description);
					vm.AddModal = false;
					vm.blogs.push(data);

				});

			} else {

			}

		}


		vm.deleteBlog = function(blog){
			$http.delete('/api/blog/' + blog._id)
				.success(function(){
					var index = vm.blogs.indexOf(blog);
					vm.blogs.splice(index,1);
				})
				.error(function(data){
					alert(err.msg);
				});

		}

		vm.editModal = false;

		vm.openEditModal = function(editblog) {
			if(editblog) {
				vm.editBlog = angular.copy(editblog);
				vm.editModal = true;				
			}
			else vm.editModal = false;
		}

		vm.updateBlog = function(){

			if(vm.editBlog&&
				vm.editBlog.title&&
				vm.editBlog.title!=''&&
				vm.editBlog.description&&
				vm.editBlog.description.length>0) {

				$http.put('/api/blog', vm.editBlog)
					.success(function(){
						console.log('ok. updateBlog');
						vm.editModal = false;

						//for update on page
						vm.blogs[vm.findIndexById(vm.editBlog._id)] = vm.editBlog;
					})
					.error(function(data){
						alert(data.msg);
					})
			}

		}

		vm.findIndexById = function(id){
			for (var i = vm.blogs.length - 1; i >=0; i--) {
				if(id==vm.blogs[i]._id) return i;
			}
		}



		

		vm.openAddModal = function() {
				//console.log('ok');
				vm.AddModal = true;				
		}

		vm.closeAddModal = function() {
			console.log('close');
			vm.AddModal = false;
		}

		vm.AddBlog = function(){

			if(vm.newBlog&&
				vm.newBlog.title&&
				vm.newBlog.title!=''&&
				vm.newBlog.description&&
				vm.newBlog.description.length>0) {

				$http.post("/api/blog", vm.newBlog)
					.success(function(data){
						vm.blogs.push(data);
						//console.log('ok');
						vm.AddModal = false;
						vm.newBlog = null;
					})
					.error(function(data){
						alert(data.msg);
					})
			}
		}

		








	}


	// function handleFileSelect(evt) {
 //    var file = evt.target.file; // FileList object

 //    // Loop through the FileList and render image files as thumbnails.
 //    // for (var i = 0, f; f = files[i]; i++) {

 //    //   // Only process image files.
 //    //   if (!f.type.match('image.*')) {
 //    //     continue;
 //    //   }

 //    //   var reader = new FileReader();

 //    //   // Closure to capture the file information.
 //    //   reader.onload = (function(theFile) {
 //    //     return function(e) {
 //    //       // Render thumbnail.
 //    //       var span = document.createElement('span');
 //    //       span.innerHTML = ['<img class="thumb" src="', e.target.result,
 //    //                         '" title="', escape(theFile.name), '"/>'].join('');
 //    //       document.getElementById('list').insertBefore(span, null);
 //    //     };
 //    //   })(f);

 //    //   // Read in the image file as a data URL.
 //    //   reader.readAsDataURL(f);
 //    // }
 //    f = file;
 //    if (!f.type.match('image.*')) {
 //        continue;
 //    }
 //    var reader = new FileReader();

 //      // Closure to capture the file information.
 //      reader.onload = (function(theFile) {
 //        return function(e) {
 //          // Render thumbnail.
 //          var span = document.createElement('span');
 //          span.innerHTML = '<img class="thumb" src="', e.target.result,
 //                            '" title="', escape(theFile.name), '"/>';
 //          document.getElementById('list').insertBefore(span, null);
 //        };
 //      })(f);

 //      // Read in the image file as a data URL.
 //      reader.readAsDataURL(f);
 //  }

 //  document.getElementById('file').addEventListener('change', handleFileSelect, false);
