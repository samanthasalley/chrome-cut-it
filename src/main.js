// ======================== //
// ======================== //
// 			GENERAL 		//
// ======================== //
// ======================== //

// hide 'open' element on load
$('#open').hide();
$('#footer').on('click',() => $('#open').show());
$('#open').on('click',() => $('#open').hide());

// $('#collapseMe').prepend('<img class = "down" src = "/>');
// $('#collapseMe').prepend('<img class = "logo" src = "assets/Logo.png"/>');


$('#gram').prepend('<img class = "logo" src = "assets/Insta.png" style = "height: 150px; width: 300px; margin-left: 150px"/>');
$('#dit').prepend('<img class = "logo" src = "assets/reddit.png" style = "height: 150px; width: 300px; margin-left: 150px"/>');


// ======================== //
// ======================== //
// 	       INSTAGRAM 	    //
// ======================== //
// ======================== //
// INSTAGRAM AUTH ==> 3548586454.ddee154.c1e73d30b71a496183aaeb90b74b9b6b
// GET user's feed from Insta API
// loop through each feed item
	// append most recent 5 feed items to instagram div id

$.ajax({
    type: 'GET',
    url: 'https://api.instagram.com/v1/users/self/media/recent/?count=5&access_token=3548586454.ddee154.c1e73d30b71a496183aaeb90b74b9b6b',
    dataType:'jsonp'
	}).done(function(response) { 
    const feed = response.data;
		for(let i = 0; i < feed.length; i++){
			let postURL = feed[i].images.thumbnail.url;
			let postCaption = feed[i].caption.text;
			let postLikes = feed[i].likes.count;
			$('#instagram').prepend('<div class="row insta-post"><div class="col-sm-4"><img class="insta-photo" src="' + postURL + '" /></div><div class="col-sm-8"><div class="insta-post-info"><p class="insta-likes">' + postLikes + '</p><p class="insta-caption">' + postCaption + '</p></div></div></div>');
		}
	});



// ======================== //
// ======================== //
// 			REDDIT 			//
// ======================== //
// ======================== //

const appendListing = (listing) => {
	$('#reddit').prepend('<div class="row reddit-listing"><div class="col-md-12"><a class="reddit-link" href="' + listing.url + '" target="_blank">' + listing.title + '</a></div></div>');
}

const lessThan20 = (listing) => {
	// check how many p elements are inside #reddit
	let numArticles = $('#reddit p').length;
	// if 5 already there, remove last one
	if(numArticles === 20){
		$('#reddit p:last-child').remove();
	}
	// then append new one
	appendListing(listing);
}



// Open a Pusher connection to the Realtime Reddit API
let pusher = new Pusher("50ed18dd967b455393ed");

// Subscribe to the /r/AskReddit subreddit (lowercase)
let subredditChannel = pusher.subscribe("askreddit");

// Listen for new stories
subredditChannel.bind("new-listing", function(listing) {
  // Append new postings to #reddit
  lessThan20(listing);
});

