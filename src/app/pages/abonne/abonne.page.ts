import { Component, OnInit } from '@angular/core';
import { BibliothecaireService } from '../../api/bibliothecaire.service';
import { Animation, AnimationController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-abonne',
  templateUrl: './abonne.page.html',
  styleUrls: ['./abonne.page.scss']
})
export class AbonnePage implements OnInit {

  Nom = '';
  Prenom = '';
  idBibliothecaire: number = 0;
  state = 'normal';

  menuAbonne = [
    {url:'/rechercheabonne', title: 'Rechercher un abonné'},
    {url:'/ajouterabonne', title: 'Ajouter un abonné'},
    {url:'/modifierabonne', title: 'Modifier un abonné'},
    {url:'/supprimerabonne', title: 'Supprimer un abonné'},
    {url:'/bibliothecaire', title: 'Retour au menu principal'}
  ];
  menuBibliothecaire = [
    {url:'/emprunt', title: 'Enregistrer un emprunt'},
    {url:'/retour', title: 'Enregistrer un retour'},
    {url:'/abonne', title: 'Gestion des abonnés'},
    {url:'/commentaire', title: 'Commentaires à traiter'},
    {url:'/mediatheque', title: 'Gestion de la médiathèque'}
  ];

  constructor(private bibliothecaireService: BibliothecaireService,
              private animationCtrl: AnimationController,
              private router: Router,
              private menuCtrl: MenuController) { }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.bibliothecaireService.seDeconnecte$.next(true);
    this.bibliothecaireService.pages$.next(this.menuAbonne);
   // this.animerPage();
  }

  animerPage() {
    const elt1: any = document.querySelector('#it1');
    const animation1: Animation = this.animationCtrl.create()
    .addElement(elt1)
    .duration(700)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');

    const elt2: any = document.querySelector('#it2');
    const animation2: Animation = this.animationCtrl.create()
    .addElement(elt2)
    .duration(750)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');

    const elt3: any = document.querySelector('#it3');
    const animation3: Animation = this.animationCtrl.create()
    .addElement(elt3)
    .duration(850)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');

    const elt4: any = document.querySelector('#it4');
    const animation4: Animation = this.animationCtrl.create()
    .addElement(elt4)
    .duration(1050)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');

    const elt5: any = document.querySelector('#it5');
    const animation5: Animation = this.animationCtrl.create()
    .addElement(elt5)
    .duration(1250)
    .iterations(1)
    .fromTo('transform', 'translateY(1000%)', 'translateY(10vh)')
    .fromTo('opacity', '0.2', '1');


    animation1.play();
    animation2.play();
    animation3.play();
    animation4.play();
    animation5.play();

  }

  revenir() {
    this.bibliothecaireService.seDeconnecte$.next(true);
    this.bibliothecaireService.pages$.next(this.menuBibliothecaire);
    this.menuCtrl.close();
    this.router.navigateByUrl('/bibliothecaire');
  }

}
