import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {
  username: string = "";
  userData: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  async onSubmit() {
    try {
      this.userData = await this.userService.inspectUser(this.username);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }
}
