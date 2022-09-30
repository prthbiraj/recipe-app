import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { DataStorageService } from '../shared/services/data-storage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth:boolean = false;

  constructor(private dataStoregeService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userSubject.subscribe(
      user => {
        this.isAuth = !!user;
      }
    );
  }

  saveRecipes() {
    console.log("Save Data into DB");
      this.dataStoregeService.storeRecipes();      
  }

  fetchRecipes() {
    this.dataStoregeService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logOut();
  }
 
}
