



// ======================== //
// ======================== //
// 				INSTAGRAM 				//
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
			$('#instagram').prepend('<div class="post"><img src="' + postURL + '" /><div class="photo-info">LIKES: <span class="likes">' + postLikes + '</span><br>CAPTION: <span class="caption">' + postCaption + '</span></div></div>');
		}
	});



// ======================== //
// ======================== //
// 					REDDIT 					//
// ======================== //
// ======================== //

const appendListing = (listing) => {
	$('#reddit').prepend('<p class=""><a href="' + listing.url + '" target="_blank">' + listing.title + '</a></p>');
}

const lessThan5 = (listing) => {
	// check how many p elements are inside #reddit
	let numArticles = $('#reddit p').length;
	// if 5 already there, remove last one
	if(numArticles === 5){
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
  console.log('reddit listing', listing);
  lessThan5(listing);
});

