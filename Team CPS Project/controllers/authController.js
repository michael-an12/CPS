

const { createApp } = Vue;

createApp({
  mounted() {
    // Get current user
    
  },

  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
      
    };
  },
  methods: {
    login:function(){

      
  const userData_signIn = {
    email: this.email,
    password: this.password,
  };

  // Make a request to the php server, sending the user data to be processed
  axios.post('https://watreioproxy.herokuapp.com/parkz', {
    userData_signIn
  })
  .then(function (response) {
    if (response.data.success) {
      //store data in local storage
      localStorage.setItem("userData", JSON.stringify(response.data.data));

      location.href = "../pages/parking_view.html";
    } else {
     
      alert(response.data.error.message)
    
    }
  })

  .catch(function (error) {
    console.log(error);
  });

  


    },

    showErrorMessage:function(
      tag = "#signup-message",
      message = "Kindly enter the correct values!"
    ) {
      alert(message)
    },
    
    // Display a success message once process is successfully completed
    showSuccessMessage:function(
      tag = "#signup-message",
      message = "Successfully created an account!"
    ) {
     alert(message)
    },

    signup:function(){

      
      const userData = {
        email: this.email,
        password: this.password,
        password2: this.confirm_password,
        name: this.name,
      };
    
      console.log(userData);
      // Make a request to the php server, sending the user data to be processed
      axios.post('https://watreioproxy.herokuapp.com/parkz', {
        userData
      })
      .then(function (response) {
        if (response.data.success) {
          
          
          location.href = "../pages/login.html";

        } else {
         
          alert(response.data.error.message)
        
        }
      })
    
      .catch(function (error) {
        console.log(error);
      });
    
      
    
    
        },

      



  },
}).mount("#authController");
