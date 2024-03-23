const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose");
const { log } = require('console');

mongoose               
  .connect("mongodb://localhost:27017/svce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


const userSchema = new mongoose.Schema({
    name:{
      type:String
    },
    email:{
      type:String
    },
    password:{
      type:String,
      unique:true
    }
  })
  const addressSchema = new mongoose.Schema({
    field1:{
      type:String
    },
    field2:{
      type:String
    },
    field3:{
      type:String
    }
  })
  const placeSchema = new mongoose.Schema({
    templename:{
      type:String
    },
    templehistory:{
      type:String
    },
    templeabout:{
      type:String,
    },
    templespecialty:{
      type:String,
    },
    address:{
      type:addressSchema,
    },
    templetimings:{
      type:String,
    },
    hotels:{
      type:String
    }
  })
 

const User = mongoose.model("users", userSchema);
const Temple = mongoose.model("temples",placeSchema)

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })

  );

app.use(express.json());

app.post('/fetchTempleDetail',async(req,res)=>{
  const templeId = req.body.id;
  console.log("t: ",templeId);
  const temple = await Temple.findOne({_id:templeId});
  console.log(temple);
  res.json({status:true,detail:temple});
})

app.post("/insertDoc",async(req,res)=>{
  const temple= new Temple({
    templename:"Kailasanathar Temple",
    templehistory:"Arulmozhivarman, a Tamil emperor who was popular as Rajaraja Chola I laid out foundations of Brihadeeswarar Temple during 1002 CE. It was first among other great building projects by Tamil Chola. A symmetrical and axial geometry rules layout of this temple. Temples from same period and two following centuries are expressions of Tamils Chola power, artistic expertise and wealth. Emergence of these types of features, such as multifaceted columns along with projecting signals of square capitals signifies arrival of Chola style, which was new at that time.",
    templeabout:"Brihadeeshwara Temple (Peruvudaiyar Kovil) is a Hindu temple dedicated to Shiva located in Thanjavur in the Indian state of Tamil Nadu. It is also known as Periya Kovil, RajaRajeswara Temple and Rajarajesvaram. It is one of the largest temples in India and is an example of Dravidian architecture during the Chola period. Built by emperor Raja Raja Chola I and completed in 1010 AD, the temple turned 1000 years old in 2010. The temple is part of the UNESCO World Heritage Site known as the “Great Living Chola Temples”, with the other two being the Brihadeeswarar Temple, Gangaikonda Cholapuram and Airavatesvara temple.",
    templespecialty:"The Brihadeeswarar Temple was completed in around 1010 in the southeastern part of the new capital Thanjavur constructed in the basin of the Kaveri (Cauvery) River by the king of the Chola Dynasty, Rajaraja I (r. 985-1014). It has also been called Rajarajesvara Temple after the king's name. It is one of the two greatest temples from the age of the Chola Dynasty together with the Rajendra -Cholisvara Temple built in the next new capital, Gangaikondacholapuram, which was constructed by his successor Rajendra I. Those constructions were prodigious national projects showing the Chola Empire's hegemony in south India.",
    address:{
        field1:"Balaganapathy Nagar, Thanjavur",
        field2:"Tamil Nadu 613007",
        field3:"Telephone:  04362-226949/227949",
    },
    templetimings:"The much celebrated Ponnambalam (temple with golden roof) at Thillai (Chidambaram) was just a few hours of journey away.Thiruvarur, the most important Sapta Vitanka Sthalam, which had the patronage of the Cholas right from the days of Manuneedhi Cholan and Musukuntha Cholan, was also nearby.So were numerous temples referred to as paadal Petra Sthalangals - temples where the Saivite saints Appar, Sundarar, Sambandhar and Manickavasagar had sung Thevaram hymns (religious hymns praising the deeds of Lord Shiva).",
    hotels:"Hotel Gnanam"
  
  })
  temple.save()
        .then(async(result) => {

          // Put absent for him in Student collection
          res.json({status:true,message:"User Created",});
        })
        .catch((error) => {
          console.log(error);
          res.json({status:false,message:"Error",err:error});
        })
})





app.post('/login',async(req,res)=>{
    try{
        console.log("hello");
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;
        
        const user = await User.findOne({email:email});
        if(user){
            if(user.password===password) res.json({status:true,user:user})
            else res.json({status:false,message:"Wrong password"});
        }else{
            res.json({status:false,message:"Invalid Username"});
        }
    }catch(err){
        res.json({status:false,message:"Error"});
    }
})


app.post('/register',async(req,res)=>{
  try{
      
      const name = req.body.name;
      const password = req.body.password;
      const email = req.body.email;
      console.log(name,password,email);

      const user = await User.findOne({name:name});
      
      if(user){
        res.json({status:false,message:"Username Already Exist"});
      }else{
        const user = new User({
          name:name,
          email:email,
          password:password
        })
        user.save()
        .then(async(result) => {

          // Put absent for him in Student collection
          res.json({status:true,message:"User Created",user:user});
        })
        .catch((error) => {
          console.log(error);
          res.json({status:false,message:"Error",err:error});
        })
        
      }
  }catch(err){
      res.json({status:false,message:"Error",s:"efe"});
  }
})



app.post('/regisCouncelling',async(req,res)=>{
  try{
    const cause = req.body.cause;
    const howlong = req.body.howlong;
    const councellings = new Councelling({
      user:"rwdw",
      cause:cause,
      howlong:howlong
    })

    councellings.save()
        .then(async(result) => {

          // Put absent for him in Student collection
          res.json({status:true,message:"success",cause:cause});
        })
        .catch((error) => {

          res.json({status:false,message:"Error"});
        })
        

  }catch(err){
    res.json({status:false,message:"Error"});
  }

})
app.listen(4000,()=>{
    console.log("server is listenning");
})