import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentPlanet!: any;
  currentView!: any;
  menuSideView: boolean = false;

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getAllPlanetsList().subscribe(res => {
      this.currentPlanet = res[0];
      this.initializeView();
    });
  }

  initializeView() {
    this.currentView = {
      name: this.currentPlanet.name,
      img: this.currentPlanet.images.planet,
      description: this.currentPlanet.overview.content,
      source: this.currentPlanet.overview.source,
      btns: [
        {
          text: 'OVERVIEW',
          name: 'overview',
          selected: true
        },
        {
          text: 'Internal Structure',
          name: 'structure',
          selected: false
        },
        {
          text: 'Surface Geology',
          name: 'geology',
          selected: false,
          isActive: false
        }
      ],
      parameters: [
        {
          text: 'ROTATION TIME',
          value: this.currentPlanet.rotation
        },
        {
          text: 'REVOLUTION TIME',
          value: this.currentPlanet.revolution
        },
        {
          text: 'radius',
          value: this.currentPlanet.radius
        },
        {
          text: 'AVERAGE TEMP.',
          value: this.currentPlanet.temperature
        }
      ]
    };
  }
  getEmitedPlanet(planet?: any) {
    this.currentPlanet = planet;
    this.initializeView();
  }
  isMenuMobileToggle(action: any) {
    this.menuSideView = action;
  }

  selecViewMode(mode: string) {
    this.currentView.btns[2].isActive = false;
    this.currentView.btns.forEach((btn: any) => {
      btn.selected = false;
    });
    if (mode === 'overview') {
      this.currentView.description = this.currentPlanet.overview.content;
      this.currentView.source = this.currentPlanet.overview.source;
      this.currentView.img = this.currentPlanet.images.planet;
      this.currentView.btns[0].selected = true;
    } else if (mode === 'structure') {
      this.currentView.description = this.currentPlanet.structure.content;
      this.currentView.source = this.currentPlanet.structure.source;
      this.currentView.img = this.currentPlanet.images.internal;
      this.currentView.btns[1].selected = true;
    } else {
      this.currentView.description = this.currentPlanet.geology.content;
      this.currentView.source = this.currentPlanet.geology.source;
      this.currentView.img = this.currentPlanet.images.geology;
      this.currentView.btns[2].isActive = true;
      this.currentView.btns[2].selected = true;
    }
  }

  getLastWord(phrase: string) {
    // Sépare la chaîne de caractères en mots individuels
    const mots = phrase.split(' ');

    // Retourne le dernier mot de la phrase
    return mots[mots.length - 1];
  }
}
