const express = require('express')
const app = express()

app.get("/form/create", (req, res, next) => {
 res.send('Created a form!')
})
app.get("/form/:formToken", (req, res, next) => {
 res.send('Returns the form with token' + req.params.formToken)
})
app.put("/form/:formToken", (req, res, next) => {
 res.send('Modifies the form with token' + req.params.formToken)
})
app.delete("/form/:formToken", (req, res, next) => {
 res.send('Deletes the form with token' + req.params.formToken)
})
app.get("/responses/:formToken", (req, res, next) => {
 res.send('Returns the responses for form with token' + req.params.formToken)
})
app.post("/responses/:formToken", (req, res, next) => {
 res.send('New response for form with token' + req.params.formToken)
})
app.delete("/responses/:formToken", (req, res, next) => {
 res.send('Deletes all responses for the form with token' + req.params.formToken)
})
app.put("/responses/:formToken/:resID", (req, res, next) => {
 res.send('Modify response with id ' + req.params.resID + ' for form with token' + req.params.formToken)
})
app.delete("/responses/:formToken/:resID", (req, res, next) => {
 res.send('Delete response with id ' + req.params.resID + ' for form with token' + req.params.formToken)
})
app.listen(3000, () => {
	 console.log("Server running on port 3000");
})
