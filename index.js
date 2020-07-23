const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    //mongoose.connection.dropDatabase();
    return self.connection.dropDatabase();
  })
  .then(() => {
    console.log('MongoDB Database was cleaned');
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Shakshuka',
      level: 'Easy Peasy',
      ingredients: [
        '1 teaspoon coriander seeds',
        '1 teaspoon cumin seeds',
        '6 garlic cloves, divided',
        '2 medium shallots, divided',
        '1 12-ounce jar roasted red peppers',
        '¼ cup extra-virgin olive oil, plus more for drizzling',
        'Kosher salt',
        'Freshly ground black pepper',
        '1 28-ounce can whole peeled tomatoes',
        '4 large eggs',
        '½ cup plain Greek yogurt',
        'Mint leaves and crusty bread (for serving)'
      ],
      cuisine: 'Middle Eastern',
      dishType: 'breakfast',
      image:
        'https://assets.bonappetit.com/photos/59ef54473b712f2957b88c64/3:2/w_1280,c_limit/one-skillet-shakshuka-with-shawarma-spices.jpg',
      duration: 30,
      creator: 'Carla Lalli Music',
      date: new Date(2017, 10, 1)
    });
  })
  .then(() => {
    //console.log('Recipes list are in!');
    return Recipe.insertMany(data, function (error, docs) {});
  })
  .then(() => {
    console.log(data[0].title);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
