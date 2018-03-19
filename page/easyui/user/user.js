USER = {

	Event: {
		addNewUser: function(){

		},

		// delMultipleUser: function(){
		// 	console.log('md');
		// },

		delUser: function(e){

			if (e && e.currentTarget) {
				var	userTR = $(this).closest('tr');
				var userToDel = {
					name: userTR.children(0).html(),
					password:userTR.children(1).html()
				}
				var url = '';
				$.ajax({
					url: url,
					type: 'post',
					data: userToDel,
					dataType: 'text',
					success: function(data){
						$(e.currentTarget).closest('tr').remove();
					},
					error: function(err){

					}
				});
			} 


		},

		handlePriorityChoice: function(e){
			if (e && e.currentTarget) {
				$(e.currentTarget).next().removeClass('hidden');
			}
		},

		handleChoiceUser: function(e){
			if (e && e.currentTarget) {
				e.currentTarget.checked ? $(e.currentTarget).closest('tr').addClass('checked'): $(e.currentTarget).closest('tr').removeClass('checked');
			}
		},
		updateUserPriority: function(e){
			if (e && e.currentTarget) {
				if ($(e.currentTarget).prev().val() != $(e.currentTarget).prev().prev().html()) {
					var userTR = $(this).closest('tr');
					var userToChange = {
						name: userTR.children(0).html(),
						password: userTR.children(1).html(),
						priority: $(e.currentTarget).prev().val()
					};
					var url= '';
					$.ajax({
						url: url,
						type:'post',
						data: userToChange,
						dataType:'html',
						success: function(data){

						},
						error: function(err){

						}
					});
				} else {
					$(this).addClass('hidden');
				}
			}
		}
	},

	_bindAll: function(){
		$(document).on('click', '.add-new-user', this.Event.addNewUser);
		$(document).on('click', '.del-multiple-user', this.Event.delMultipleUser);
		$(document).on('click', '.del-user', this.Event.delUser);
		$(document).on('click', '.save-change-btn', this.Event.updateUserPriority);
		$(document).on('click', '.choice-user input[type=checkbox]', this.Event.handleChoiceUser);
		$(document).on('change', '.user-priority-choice', this.Event.handlePriorityChoice);


	}
}
$(document).ready(function(){

	USER._bindAll();

});