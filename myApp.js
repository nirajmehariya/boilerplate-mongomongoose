require('dotenv').config();

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  const niraj=new Person({
    "name":"niraj",
    "age":20,
    "favoriteFoods":["soda","wishky","rum","dolly ni chai"],
    
  })
  niraj.save(function(err,data){
    if (err) return console.error(err);
    done(null, data);
  });

};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  const person=Person.find({"name":personName},function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  const persons=Person.findById(personId,(err,person)=>{
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd)

    person.save(function(err,data){
      if (err) return console.error(err);
      done(null, data);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const person = Person.findOneAndUpdate({"name":personName},{$set:{"age":ageToSet}},{ new: true },(err,data)=>{
    if(err) return console.log(err);

    done(null,data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,data)=>{
    if(err) return console.log(err);

    done(null,data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,data)=>{
    if(err) return console.log(err);

    done(null,data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  const query = Person.find({ favoriteFoods: { $in: [foodToSearch] } }).sort({ name: 1 }).limit(2).select({ age: 0 });

  query.exec((err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
