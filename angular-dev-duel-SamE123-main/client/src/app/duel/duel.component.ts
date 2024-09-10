import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""
  userDataOne: any 
  userDataTwo: any

  leftWonTitle: number = 0
  leftWonRepos: number = 0
  leftWontotalStars: number = 0
  leftWonhighestStarred: number = 0
  leftWonPerfRepos: number = 0
  leftwonFollowers: number = 0
  leftWonFollowing: number = 0
  leftWonOverall: number = 0
  leftWonLocation: number = 0
  leftWonFavLanguage: number = 0

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  async onSubmit() {
    try {
      const data = await this.userService.duelUsers(this.usernameOne, this.usernameTwo);
  
      if (Array.isArray(data) && data.length === 2) {
        const [userOne, userTwo] = data;
        this.userDataOne = userOne;
        this.userDataTwo = userTwo;
  
        // Initialize comparison variables
        this.leftWonTitle = this.compareValues(userOne.titles.length, userTwo.titles.length);
        this.leftWonRepos = this.compareValues(userOne['public-repos'], userTwo['public-repos']);
        this.leftWontotalStars = this.compareValues(userOne['total-stars'], userTwo['total-stars']);
        this.leftWonhighestStarred = this.compareValues(userOne['highest-starred'], userTwo['highest-starred']);
        this.leftWonPerfRepos = this.compareValues(userOne['perfect-repos'], userTwo['perfect-repos']);
        this.leftwonFollowers = this.compareValues(userOne.followers, userTwo.followers);
        this.leftWonFollowing = this.compareValues(userOne.following, userTwo.following);
  
        // Special categories
        this.leftWonLocation = this.compareSpecialValues(userOne.location, userTwo.location);
        this.leftWonFavLanguage = this.compareSpecialValues(userOne['favorite-language'], userTwo['favorite-language']);
  
        // Calculate overall winner
        const categoriesWonByLeft = [
          this.leftWonTitle,
          this.leftWonRepos,
          this.leftWontotalStars,
          this.leftWonhighestStarred,
          this.leftWonPerfRepos,
          this.leftwonFollowers,
          this.leftWonFollowing,
          this.leftWonLocation,
          this.leftWonFavLanguage
        ].filter(result => result === 1).length;
  
        if (categoriesWonByLeft > 4) {
          this.leftWonOverall = 1;
        } else if (categoriesWonByLeft < 4) {
          this.leftWonOverall = -1;
        } else {
          this.leftWonOverall = 0;
        }
  
      } else {
        console.error('Unexpected response format:', data);
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }
  
  // Helper function to compare values
  compareValues(valueOne: number, valueTwo: number): number {
    if (valueOne > valueTwo) return 1;
    if (valueOne < valueTwo) return -1;
    return 0;
  }
  
  // Helper function to compare special values (location, favorite language)
  compareSpecialValues(valueOne: string | null, valueTwo: string | null): number {
    if (valueOne && !valueTwo) return 1;
    if (!valueOne && valueTwo) return -1;
    return 0;
  }
  
  
}
