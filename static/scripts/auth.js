//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    console.log(email);
    console.log(password);

    //signup the user

    if(email != "" & password != "")
    {
        var result =  auth.createUserWithEmailAndPassword(email, password);

        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage =  error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("message:" + errorMessage);

        });
    }

});

//logout
function logout() {

//to check it is called
console.log("logout is called");

// const logout = document.querySelector('#logoutbutton');
// logout.addEventListener('click', (e) => {
//     e.preventDefault();
    auth.signOut().then(() => {
        console.log("user signed out");
        auth.onAuthStateChanged(function(user)
		{
			if(user)
			{
				window.location.href = "./index.html";
			}
		});
    });

// });
}


//login the user
function login() {
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit-login', (e) => {
    e.preventDefault();

    //get user info
    const emaila = loginForm['login-email'].value;
    const passworda = loginForm['login-password'].value;
    alert(emaila);

    //signup the user

    if(email != "" & password != "")
    {
        var result =  auth.signInWithEmailAndPassword(email, password);

        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage =  error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("message:" + errorMessage);

        });
    }

});    
}


