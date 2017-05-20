(function(){
	var register = {
		init:function(){
			this.viewModel = avalon.define({
				$id:'register',
				mobile:'',
				codeImg:'123456',
				register:function(){
					// console.log(register.viewModel.mobile);
					// console.log(register.viewModel.codeImg);
				}
			});

			
		}
	};

	register.init();
})();