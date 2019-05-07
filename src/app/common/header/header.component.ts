import { Component } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
	selector: "bmw-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})

export class HeaderComponent{
	constructor(private auth: AuthService) {}

	logout() {
		this.auth.logout();
	}
}