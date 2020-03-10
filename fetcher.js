/**
 * @author Alan Insam
 * @licence Apache 2.0
 * @description An Instagram-wall implementation in Html,JavaScript and CSS
 */

// Change the username to your desired profile
let username = "";
const ENDPOINT = 'https://www.instagram.com/' + username + '/?__a=1';
const POST_URL = "https://www.instagram.com/p/";
const POST_COUNT = 3;
let json;


// Fetch the last 12 media articles of the selected account
$(document).ready(async function () {

    // Call the API and await it's response
    const response = await fetch(ENDPOINT);
    json = await response.json();

    parseAndSet();
});

/**
 * Query the fetched json and set the profile-cards
 * Note: var data is the base json array which holds the media (images, videos) of the user
 */
function parseAndSet() {
    let data = json['graphql']['user']['edge_owner_to_timeline_media']['edges'];
    console.log(data);

    // Traverse the edges array
    let i;
    let imageUrls = [];
    let imageDesc = [];
    let postUrl = [];
    for (i = 0; i < POST_COUNT; i++) {

        // Traverse the array for the media sources
        imageUrls.push(data[i]['node']['thumbnail_resources']['4']['src']);

        // Traverse the array for the media description
        imageDesc.push(data[i]['node']['edge_media_to_caption']['edges']['0']['node']['text']);

        // Traverse the array for the shortcode ( which will be appended to the POST_URL
        postUrl.push(POST_URL + data[i]['node']['shortcode']);
    }

    // Set images of the cards
    $('.ig-image').each(function (i, obj) {
        $(obj).attr("src", imageUrls[i]);
    });

    // Set descriptions of the cards
    $('.ig-desc').each(function (i, obj) {
        let desc = imageDesc[i].substr(0, 50) + "...";
        $(obj).text(desc)
    });

    // Finally set the link to the post
    $('.ig-post-url').each(function (i, obj) {
        $(obj).attr("href", postUrl[i])
    })
}