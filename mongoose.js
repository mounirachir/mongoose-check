const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

// connection to db
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGOOSE_URI);
  console.log("connected to mongodb");
}

// Define Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create Person Model
const Person = mongoose.model("Person", personSchema);

// create person
const createPerson = async (newPerson) => {
  try {
    const person = new Person(newPerson);
    const result = await person.save();
    console.log(result);
  } catch (err) {
    console.error("ERROR :", err.message);
  }
};

createPerson({ name: "John", age: 30, favoriteFoods: ["Pizza", "Pasta"] });

// create people
const createPeople = async (people) => {
  try {
    const result = await Person.create(people);
    console.log("people added", result);
  } catch (err) {
    console.error("ERROR :", err.message);
  }
};

createPeople([
  { name: "Jane", age: 20, favoriteFoods: ["Pizza", "Apples"] },
  { name: "Steve", age: 35, favoriteFoods: ["Oranges", "Pasta"] },
  { name: "John", age: 30, favoriteFoods: ["Pizza", "Strawberries"] },
]);

// find people by name
const findPeople = async (personName) => {
  try {
    const people = await Person.find({ name: personName });
    console.log("People found by name:", people);
  } catch (err) {
    console.error("Error:", error.message);
  }
};

findPeople("John");

// find one person by favorite food
const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log("Person found by food:", person);
  } catch (error) {
    console.error("Error finding person by food:", error);
  }
};

findOneByFood("pizza");

// find person by ID
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log("Person found by ID:", person);
  } catch (error) {
    console.error("Error finding person by ID:", error);
  }
};

findPersonById("66472e7ecff6b645a9883bb7");

// update function
const findAndUpdate = async (personId) => {
  try {
    const person = await Person.findById(personId);
    if (!person) {
      console.log("Person not found");
      return;
    }
    person.favoriteFoods.push("Hamburger");
    const savedPerson = await person.save();
    console.log("Updated person:", savedPerson);
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

findAndUpdate("66472e7ecff6b645a9883bb7");

// Function to perform new updates using findOneAndUpdate
const findAndUpdate2 = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log("Updated person:", updatedPerson);
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

findAndUpdate2("John");

// delete one person by ID
const DeleteById = async (personId) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(personId);
    console.log("Deleted person:", deletedPerson);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

DeleteById("66472e7ecff6b645a9883bb7");

// delete many people by name
const deleteManyPeople = async () => {
  try {
    const result = await Person.deleteMany({ name: "Steve" });
    console.log("Deleted people:", result);
  } catch (error) {
    console.error("Error deleting people:", error);
  }
};

deleteManyPeople();

// chain search query helpers
const queryChain = async () => {
  try {
    const result = await Person.find({ favoriteFoods: "Pizza" })
      .sort("name")
      .limit(2)
      .select("-age");
    console.log("Query result:", result);
  } catch (error) {
    console.error("Error in query chain:", error);
  }
};

queryChain();

mongoose.connection.close();
