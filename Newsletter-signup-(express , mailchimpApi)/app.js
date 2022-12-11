const express = require('express');
const bodyParser = require('body-parser');

const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))


mailchimp.setConfig({
  apiKey: "8065c615b0b7a517c1a5ffe0dc8cc17d-us17",
  server: "us17",
});



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  const listId = "4ae831821c";
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  async function run() {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
      res.sendFile(__dirname + "/success.html");
      console.log(response);
    } catch (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }
    // console.log(
    //   `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    // );

  }

  run();


});

// app.post("/failure", (req, res) => {
//   res.redirect("/");
// })


app.listen(3000, () => {
  console.log("Sever started on port 3000")
})
