$('#twitter-button').on('click', function () {
    // Initialize with your OAuth.io app public key
    OAuth.initialize('glmOI2fYuJvYlMW_eKVyrZMoBII');
    // Use popup for OAuth
    OAuth.popup('twitter').then(twitter => {
        console.log('twitter:', twitter);
        // Prompts 'welcome' message with User's email on successful login
        // #me() is a convenient method to retrieve user data without requiring you
        // to know which OAuth provider url to call
        twitter.me().then(data => {
            console.log('data:', data);
            var name = document.getElementById('nombre');
            name.innerHTML = data.name;
        });
        // Retrieves user data from OAuth provider by using #get() and
        // OAuth provider url    
        twitter.get('/1.1/account/verify_credentials.json?include_email=true').then(data => {
            console.log('self data:', data);
        })
    });
})