import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';


@Injectable()
export class RentalService { 

	private rentals: Rental[] = [{
		id: "1",
		title: "New House",
  		city: "Delhi",
        street: "HSR",
        category: "Apartment",
        image: "https://cdn.pixabay.com/photo/2016/06/24/10/47/architecture-1477041__340.jpg",
        bedrooms: 4,
        shared: false,
        description: "very nice apartment in center og city",
        dailyRate: 23,
        createAt: "20/05/2019"
	},
	{
		id: "2",
		title: "Apartment2",
  		city: "Hydrabad",
        street: "HSR",
        category: "Home",
        image: "https://cdn.pixabay.com/photo/2016/06/24/10/47/architecture-1477041__340.jpg",
        bedrooms: 4,
        shared: false,
        description: "very nice apartment in center og city",
        dailyRate: 29,
        createAt: "15/05/2019"
	},
	{
		id: "3",
		title: "Apartment 3",
  		city: "Chennai",
        street: "HSR",
        category: "House",
        image: "https://cdn.pixabay.com/photo/2016/06/24/10/47/architecture-1477041__340.jpg",
        bedrooms: 4,
        shared: false,
        description: "very nice apartment in center og city",
        dailyRate: 40,
        createAt: "12/05/2019"
	},
	{
		id: "4",
		title: "Apartment 4",
  		city: "Mumbai",
        street: "HSR",
        category: "Apartment",
        image: "https://cdn.pixabay.com/photo/2016/06/24/10/47/architecture-1477041__340.jpg",
        bedrooms: 4,
        shared: false,
        description: "very nice apartment in center og city",
        dailyRate: 50,
        createAt: "13/05/2019"
	}];

	public getRentalById(rentalId: string): Observable<Rental>{
		return new Observable<Rental>((observer) => {
				setTimeout(() => {
				 const foundRental = this.rentals.find((rental) => {
				 	return rental.id == rentalId;
				 });
				 	observer.next(foundRental);

				}, 500);
		});
	}


	public getRentals(): Observable<Rental[]> {
		debugger;
		return new  Observable<Rental[]>((observer)=> {
		  setTimeout(()=>{
			 observer.next(this.rentals);
		  }, 1000);

		   setTimeout(()=>{
			 observer.error("I am Error...");
		  }, 2000);
		
		 setTimeout(()=>{
			 observer.complete();
		  }, 5000);

		});
		
	}
}