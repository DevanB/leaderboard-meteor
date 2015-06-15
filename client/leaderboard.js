Meteor.subscribe('thePlayers');
Template.leaderboardList.helpers({
	'player': function(){
		var currentUserId = Meteor.userId();
		return PlayersList.find({}, {sort: {score: -1, name: 1} })
	},
	'selectedClass': function() {
		var playerId = this._id;
		var selectedPlayer = Session.get('selectedPlayer');
		if(playerId == selectedPlayer){
			return "selected"	
		}
	},
	'showSelectedPlayer': function(){
		var selectedPlayer = Session.get('selectedPlayer');
		return PlayersList.findOne(selectedPlayer)
	}
});
Template.leaderboardList.events({
	'click .player': function(){
		var playerId = this._id;
		Session.set('selectedPlayer', playerId);
	},
	'click .increment': function(){
		var selectedPlayer = Session.get('selectedPlayer');	
		Meteor.call('modifyPlayerScore', selectedPlayer, 5);
	},
	'click .decrement': function(){
		var selectedPlayer = Session.get('selectedPlayer');	
		Meteor.call('modifyPlayerScore', selectedPlayer, -5);
	},
	'click .remove': function(){
		var selectedPlayer = Session.get('selectedPlayer');
		if (confirm("Are you sure you want to remove " + PlayersList.findOne(selectedPlayer).name + "?")){
			Meteor.call('removePlayerData', selectedPlayer);
		}
	}
});
Template.addPlayerForm.events({
	'submit form': function(event) {
		event.preventDefault();
		var playerNameVar = event.target.playerName.value;
		var scoreVar = parseInt(event.target.score.value);
		event.target.playerName.value = '';
		event.target.score.value = '';
		Meteor.call('insertPlayerData', playerNameVar, scoreVar);
	}
});