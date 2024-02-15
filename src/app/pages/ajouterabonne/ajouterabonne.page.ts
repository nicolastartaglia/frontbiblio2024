import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';
import { AbonneService } from '../../api/abonne.service';

@Component({
  selector: 'app-ajouterabonne',
  templateUrl: './ajouterabonne.page.html',
  styleUrls: ['./ajouterabonne.page.scss'],
})
export class AjouterabonnePage implements OnInit {

  addForm: FormGroup;
  Nom = '';
  Prenom = '';
  message = '';
  messageInfo = '';
  idBibliothecaire: number = 0;
  dateLimiteFormatee = '';


  constructor(private formBuilder: FormBuilder, private bibliothecaireService: BibliothecaireService, private abonneService: AbonneService) { 
    this.addForm = this.formBuilder.group({
      id: [0],
      Prenom: ['', [Validators.required]],
      Nom: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Rue: [''],
      CodePostal: [''],
      Ville: [''],
      DateLimiteAbonnement: [this.dateLimiteFormatee],
      Amende: [0],
      DateEmpruntPossible: [(new Date()).toLocaleDateString()],
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
    const dateJour = new Date();
    const dateLimite = new Date(dateJour.setDate(dateJour.getDate() + 365));
    this.dateLimiteFormatee = dateLimite.toLocaleDateString();
    const dateJourFormatee = (new Date()).toLocaleDateString();
    const idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.addForm = this.formBuilder.group({
      id: [0],
      Prenom: ['', [Validators.required]],
      Nom: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Rue: [''],
      CodePostal: [''],
      Ville: [''],
      DateLimiteAbonnement: [this.dateLimiteFormatee],
      Amende: [0],
      DateEmpruntPossible: [dateJourFormatee],
      CreePar: [idBibliothecaire],
      MisAJourPar: [idBibliothecaire]
    });
    console.log(this.addForm.value);


  }

  ajouterAbonne() {
    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    const dateDbLimiteAbonnement = this.addForm.value.DateLimiteAbonnement.replace(pattern, '$3-$2-$1');
    const dateDbEmpruntPossible = this.addForm.value.DateEmpruntPossible.replace(pattern, '$3-$2-$1');
    this.addForm.patchValue({
      DateLimiteAbonnement: dateDbLimiteAbonnement,
      DateEmpruntPossible: dateDbEmpruntPossible
    });
    console.log(this.addForm.value);
    this.abonneService.ajouterUnAbonne(this.addForm.value).subscribe((id) => {
      this.message = "Abonné enregistré et identifié avec le numéro: "+id;
    });
    this.addForm.patchValue({
      Nom: '',
      Prenom: '',
      Email: '',
      Rue: '',
      CodePostal: '',
      Ville: ''
    });

  }



}
