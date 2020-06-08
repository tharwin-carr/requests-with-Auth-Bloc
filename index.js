'use strict';

function gitHubRepos(username) {

    const searchUrl = 'https://api.github.com/users/${username}/repos';
    const options = {
        headers: new Headers({
            Accept: "application/vnd.github.v3+json"
          })
        };

    console.log(`finding repos for ${username}`);

    fetch(searchUrl, options)
    .then (response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then (responseJson => displayResults(responseJson))
    .catch (err => {
        ('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    console.log(responseJson);

    ('#js-repo-list').empty();

    responseJson.forEach(obj => 
        $('#js-repo-list').append(`<li><a href='${obj.url}'>${obj.name}</a></li>`)
    );

    ('#js-search-user').text(`${username}`);

    ('#js-results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const username = $('#js-search-user').val();
        gitHubRepos(username);
    });
}

$(watchForm);

