import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { ObjetService } from '../../api/objet.service';

@Component({
  selector: 'app-ajouterobjet',
  templateUrl: './ajouterobjet.page.html',
  styleUrls: ['./ajouterobjet.page.scss'],
})
export class AjouterobjetPage implements OnInit {

  dateLimiteFormatee = '';
  addForm: FormGroup;
  Nom = '';
  Prenom = '';
  message = '';
  messageInfo = '';
  idBibliothecaire: number = 0;
  ecrit = true;


  constructor(private formBuilder: FormBuilder, private bibliothecaireService: BibliothecaireService, private objetService: ObjetService) { 
    this.addForm = this.formBuilder.group({
      id: [0],
      Titre: [''],
      AuteurScenariste: [''],
      Realisateur: [''],
      Scenariste: [''],
      Genre: [''],
      Annee: [''],
      Duree: [0],
      Description: [''],
      Edition: [''],
      Pages: [0],
      Dessinateur: [''],
      Artiste: [''],
      Zone: [''],
      Travee: [''],
      EtagereBac: [''],
      Code3C: [''],
      Etat: ['Correct'],
      Reserve: [''],
      DateReservation: [new Date("2020-01-01")],
      TypeObjet: ['ecrit'],
      empruntId: [1],
      ReservePar: [1],
      CreePar: [parseInt(this.bibliothecaireService.recupererDonneesJeton().id)],
      MisAJourPar: [parseInt(this.bibliothecaireService.recupererDonneesJeton().id)]
    });
  }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    const idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.addForm = this.formBuilder.group({
      id: [0],
      Titre: [''],
      AuteurScenariste: [''],
      Realisateur: [''],
      Scenariste: [''],
      Genre: [''],
      Annee: [''],
      Duree: [0],
      Description: [''],
      Edition: [''],
      Pages: [0],
      Dessinateur: [''],
      Artiste: [''],
      Zone: [''],
      Travee: [''],
      EtagereBac: [''],
      Code3C: [''],
      Etat: ['Correct'],
      Reserve: [''],
      DateReservation: [new Date("2020-01-01")],
      TypeObjet: ['ecrit'],
      empruntId: [1],
      ReservePar: [1],
      CreePar: [idBibliothecaire],
      MisAJourPar: [idBibliothecaire]
    });
  }

  ajouterObjet() {
    this.objetService.ajouterUnObjet(this.addForm.value).subscribe((id) => {
      this.message = "Objet enregistré avec le numéro d'identification "+id;
    });
    this.addForm.patchValue({
      Titre: '',
      AuteurScenariste: '',
      Realisateur: '',
      Scenariste: '',
      Genre: '',
      Annee: '',
      Duree: 0,
      Description: '',
      Edition: '',
      Pages: 0,
      Dessinateur: '',
      Artiste: '',
      Zone: '',
      Travee: '',
      EtagereBac: '',
      Code3C: ''
    });
  }
}
