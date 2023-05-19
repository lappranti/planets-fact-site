import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuMobile: boolean = false;
  linkList!: any[];
  selectedPlanet!: any;

  @Output() currantOutpu = new EventEmitter<any>();
  @Output() menuSide = new EventEmitter<boolean>();

  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.getAllPlanetsList().subscribe(res => {
      this.linkList = res;
    });
  }
  toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const lines = document.querySelectorAll('.line');
    hamburger?.classList.toggle('active');
    lines.forEach(line => {
      line.classList.toggle('active');
    });

    this.menuMobile = !this.menuMobile;
    this.menuSide.emit(this.menuMobile);
  }

  selectPlanet(planet: any) {
    this.selectedPlanet = planet;
    this.currantOutpu.emit(this.selectedPlanet);
  }
}
