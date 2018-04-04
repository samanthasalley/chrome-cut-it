// ======================== //
// ======================== //
// 			GENERAL 		//
// ======================== //
// ======================== //

// hide 'open' element on load and show/hide on clicks
$('#open').hide();
$('#footer').on('click',() => $('#open').delay(150).fadeIn());
$('#open').on('click',() => $('#open').fadeOut());

$('#gram').prepend('<div class="logo-container"><img class = "logo" src = "assets/Insta.png" style = "height: 150px; width: 300px;"/></div>');
$('#dit').prepend('<div class="logo-container"><img class = "logo" src = "assets/reddit.png" style = "height: 150px; width: 300px;"/></div>');



// ======================== //
// ======================== //
// 					TWITTER 				//
// ======================== //
// ======================== //
// TWITTER AUTH BEARER TOKEN ==> {"token_type": "bearer", "access_token":"AAAAAAAAAAAAAAAAAAAAACCj2QAAAAAAZ8LqcEqMiGeuQtC2W0Xu4Yli0%2Bg%3DvQ94fsGfbyireYXzLxWxuaIDAWymff8dOXKUNawfbaRjxcENOw"}
		// Base64 version ==> QUFBQUFBQUFBQUFBQUFBQUFBQUFBQ0NqMlFBQUFBQUFaOExxY0VxTWlHZXVRdEMyVzBYdTRZbGkwJTJCZyUzRHZROTRmc0dmYnlpcmVZWHpMeFd4dWFJREFXeW1mZjhkT1hLVU5hd2ZiYVJqeGNFTk93
// const appendTweet = (tweet) => {
	
// }

// const getTwitterFeed = () => {
// 	let today = new Date();
// 	const params = {
// 		callback:'callback',
// 		oauth_consumer_key:'GbRk5qVHQY5vYiwbw9M0tGaUd',
// 		oauth_token:'AAAAAAAAAAAAAAAAAAAAACCj2QAAAAAAZ8LqcEqMiGeuQtC2W0Xu4Yli0%2Bg%3DvQ94fsGfbyireYXzLxWxuaIDAWymff8dOXKUNawfbaRjxcENOw',
// 		oauth_nonce:'zmTfrI',
// 		oauth_timestamp:Math.round(today.getTime()/1000),
// 		oauth_signature:'fRQVC6XtoNQQjyNQJ4Uy2pye0r8=',
// 		oauth_signature_method:'HMAC-SHA1',
// 		oauth_version:'1.0'
// 	};
// 	$.ajax({
//     type: 'GET',
//     accept:'*/*',
//     contentType:'application/x-www-form-urlencoded',
//     cache:true,
//     url: 'https://api.twitter.com/1.1/search/tweets.json?q=trending&callback=' + params.callback + '&oauth_consumer_key=' + params.oauth_consumer_key + '&oauth_token=' + params.oauth_token + '&oauth_signature_method=' + params.oauth_signature_method + '&oauth_timestamp=' + params.oauth_timestamp + '&oauth_nonce=' + params.oauth_nonce + '&oauth_version=' + params.oauth_version,
//     beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer AAAAAAAAAAAAAAAAAAAAACCj2QAAAAAAZ8LqcEqMiGeuQtC2W0Xu4Yli0%2Bg%3DvQ94fsGfbyireYXzLxWxuaIDAWymff8dOXKUNawfbaRjxcENOw');},
//     dataType:'jsonp'
// 	}).done(function(tweets) { 
//     console.log('tweets', tweets);
// 	});
// }

// getTwitterFeed();






// ======================== //
// ======================== //
// 	       INSTAGRAM 	    //
// ======================== //
// ======================== //
// INSTAGRAM AUTH ==> 3548586454.ddee154.c1e73d30b71a496183aaeb90b74b9b6b
// GET user's feed from Insta API
// loop through each feed item
	// append most recent 5 feed items to instagram div id
const appendInstaPost = (post) => {
	let postURL = post.images.thumbnail.url;
	let postCaption = post.caption.text;
	let postLikes = post.likes.count;
	$('#instagram').prepend('<div class="row insta-post"><div class="col-sm-4"><img class="insta-photo" src="' + postURL + '" /></div><div class="col-sm-8"><div class="insta-post-info"><p class="insta-likes">' + postLikes + '</p><p class="insta-caption">' + postCaption + '</p></div></div></div>');
}

const getInstaFeed = () => {
	$.ajax({
    type: 'GET',
    url: 'https://api.instagram.com/v1/users/self/media/recent/?count=5&access_token=3548586454.ddee154.c1e73d30b71a496183aaeb90b74b9b6b',
    dataType:'jsonp'
	}).done(function(response) { 
    const feed = response.data;
    const existingFeed = $('.insta-post');
    if(existingFeed) $('.insta-post').remove();
		for(let i = 0; i < feed.length; i++){
			appendInstaPost(feed[i]);
		}
	});
}

// Initialize Insta Feed
getInstaFeed();
// Refresh feed every 5 secs
// setInterval(() => getInstaFeed(), 50000);


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
	let numArticles = $('.reddit-listing').length;
	// if 5 already there, remove last one
	if(numArticles === 20){
		$('.reddit-listing:last-child').remove();
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

