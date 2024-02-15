import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { BibliothecaireService } from '../../api/bibliothecaire.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private animationCtrl: AnimationController,
              private bibliothecaireService: BibliothecaireService) {}

  ngOnInit() {
    this.animerPage();
  }

  animerPage() {
    const elt1 : any = document.querySelector('#it1');
    const animation1: Animation = this.animationCtrl.create()
    .addElement(elt1)
    .duration(800)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(30vh)')
    .fromTo('opacity', '0.2', '1');

    const elt2 : any = document.querySelector('#it2');
    const animation2: Animation = this.animationCtrl.create()
    .addElement(elt2)
    .duration(850)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(30vh)')
    .fromTo('opacity', '0.2', '1');

    const elt3 : any = document.querySelector('#it3');
    const animation3: Animation = this.animationCtrl.create()
    .addElement(elt3)
    .duration(950)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(30vh)')
    .fromTo('opacity', '0.2', '1');

    animation1.play();
    animation2.play();
    animation3.play();

  }

}
