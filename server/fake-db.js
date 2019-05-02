const Rental = require('./models/rental');
 const User = require('./models/user');
  
  class FakeDb {
  	constructor() {
  		this.rentals = [{
  			title: "New House",
  			city: "Bangalore",
        street: "HSR",
        category: "house",
        image: "https://cdn.pixabay.com/photo/2016/06/24/10/47/architecture-1477041__340.jpg",
        bedrooms: 4,
        shared: true,
        description: "very nice apartment in center og city",
        dailyRate: 30
  		},
      {
        title: "Nice Apartment",
        city: "Hydrabad",
        street: "HSR",
        category: "house",
        image: "https://cdn.pixabay.com/photo/2016/06/24/10/47/architecture-1477041__340.jpg",
        bedrooms: 3,
        shared: true,
        description: "very nice apartment in center og city",
        dailyRate: 23
      },
  		{
  			title: "Awesome Apartment",
        city: "Kolkata",
        street: "New Town",
        category: "house",
        image: "https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070__340.jpg",
        bedrooms: 5,
        shared: true,
        description: "awesome apartment in center og city",
        dailyRate: 25
  		}];

      this.users = [{
        username: "Test User",
        email: "test@gmail.com",
        password: "testtest"
      },
      {
        username: "Test1 User",
        email: "test1@gmail.com",
        password: "testtest1"
      }];
  	}




async cleanDb() {
    await User.remove({});
	  await Rental.remove({});
   
}
   
     

  	pushDataToDb() {
       const user = new User(this.users[0]);
       const user2 = new User(this.users[1]);

  		this.rentals.forEach((rental) => {
  			const newRental = new Rental(rental);
        newRental.user = user;

        user.rentals.push(newRental); 
  			newRental.save();
  		});
      user.save();
      user2.save();
  	}
  

 async seedDb() {
  	  await this.cleanDb();
  		this.pushDataToDb();
  	}
  }

  module.exports = FakeDb;