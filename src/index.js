const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json())



//===============connection to mongoose=====================//


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

//===================mongoose connection=======================//

mongoose.connect("",{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


//=============Creating a students================//

app.post("/students", async (req,res)=>{
    try {
        const user = new Student(req.body)

        const createUser = await user.create()                                  //user.save()

        res.status(201).send(createUser)
   
 } catch (error) {
        res.status(500).send(error.messege);
        
    }})


//============= Get a data ====================//

app.get("/students", async (req,res)=>{
    try {

        const studentsData = await Student.find();                             //filter can use in find()
        res.send(200).send(studentsData)

    } catch (error) {
        res.status(500).send(error.messege);
        
    }
})


//================get by id =================//


app.get("/students/:id",async (req,res)=>{
try {
    const _id = req.params;

    const studentsData = await Student.findById(_id);                          

    if(!studentsData){
        return res.status(404).send()
    }else{
        res.send(200).send(studentsData)
    }
    
} catch (error) {
    res.status(500).send(error.messege);
}


})


//===================Delete by id ====================//


app.delete("/students/:id",async (req,res) =>{
    try {
        const id = req.params
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);

        if(!req.params.id){
            return res.status(400).send()
        }else{
            res.status(200).send(deleteStudent)
        }

    } catch (error) {
        res.status(500).send(error.messege);
    }
})


//=============update the students by id ===============//

app.put("/students/:id",async (req,res)=>{
    try {

        const _id = req.params.id;
        const updateStudents= await Student.findByIdAndUpdate(_id, req.body,{new:true});                    //find one and update
        res.send(updateStudents);
        
    } catch (error) {
        res.status(500).send(error.messege);
    }
}) 