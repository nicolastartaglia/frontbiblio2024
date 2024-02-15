import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjetService } from '../../api/objet.service';
import { Objet } from 'src/app/models/objet';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EmpruntService } from '../../api/emprunt.service';
import { AbonneService } from '../../api/abonne.service';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.page.html',
  styleUrls: ['./rechercher.page.scss'],
})
export class RechercherPage implements OnInit {

  rechercheForm: FormGroup;
  reserverForm: FormGroup;
  commenterForm: FormGroup;
  objets: Observable<Array<Objet>>;
  messageInfo = '';
  messageInfo2: any;
  messageAlerte: any;
  dateJour: number = 0;
  initRecherche: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private objetService: ObjetService,
    private empruntService: EmpruntService,
    private abonneService: AbonneService) {

    this.rechercheForm = this.formBuilder.group({
      TitreRecherche: [this.objetService.TitreRecherche],
      AuteurArtisteRecherche: [this.objetService.AuteurArtisteRecherche],
      TypeObjetRecherche: [this.objetService.TypeObjetRecherche]
    });
    this.reserverForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
    this.commenterForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      Commentaire: ['', Validators.required]
    });
    this.objets = this.objetService.refreshObjets.pipe(switchMap(_ => this.objetService.obtenirQuelquesObjets(this.rechercheForm.value)));
  }

  ngOnInit() {
    this.rechercheForm = this.formBuilder.group({
      TitreRecherche: [this.objetService.TitreRecherche],
      AuteurArtisteRecherche: [this.objetService.AuteurArtisteRecherche],
      TypeObjetRecherche: [this.objetService.TypeObjetRecherche]
    });
    this.reserverForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
    this.commenterForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      Commentaire: ['', Validators.required]
    });
    this.dateJour = (new Date()).valueOf();
  }

  rechercheObjet() {
    this.initRecherche = true;
    this.objetService.TitreRecherche = this.rechercheForm.value.TitreRecherche;
    this.objetService.AuteurArtisteRecherche = this.rechercheForm.value.AuteurArtisteRecherche;
    this.objetService.TypeObjetRecherche = this.rechercheForm.value.TypeObjetRecherche;
    this.objets = this.objetService.refreshObjets.pipe(switchMap(_ => this.objetService.obtenirQuelquesObjets(this.rechercheForm.value)));
    this.objets.subscribe((objets) => {
      if (objets.length > 0 && this.initRecherche) {
        this.messageInfo2 = new Object();
        this.messageAlerte = new Object();
        objets.forEach(objet => {
          const obj = { [objet.id]: "" };
          Object.assign(this.messageInfo2, obj);
          Object.assign(this.messageAlerte, obj);
        });
        this.initRecherche = false;
      }
    });
  }

  indisponbibleALaReservation(objet: Objet): boolean {
    const dateReservation = (new Date(objet.DateReservation)).valueOf();
    const dureeReservation = Math.floor((this.dateJour - dateReservation) / (1000 * 60 * 60 * 24));
    if (dureeReservation > this.empruntService.dureeMaxReservation && objet.Etat == "correct") {
      return false;
    }
    return true;
  }

  reserverObjet(id: number) {
    this.messageInfo2[id] = '';
    this.messageAlerte[id] = '';
    this.abonneService.verifierAbonne(this.reserverForm.value.id).subscribe((data) => {
      if (data.message === "ok") {
        this.objetService.reserverUnObjet({ objetId: id, ReservePar: this.reserverForm.value.id }).subscribe((data) => {
          this.cacherFormulaireReservation(id);
          this.objetService.refreshObjets.next(true);
          this.messageInfo2[id] = "Réservation validée"
        });
      } else {
        this.messageAlerte[id] = data.message;
      }
    });
  }

  afficherFormulaireCommentaire(id: number) {
    this.cacherFormulaireReservation(id);
    const elt = document.getElementById("inputFormCommentaire" + id);
    if (elt != null){
      elt.style.display = "block";
    }
  }

  afficherFormulaireReservation(id: number) {
    this.cacherFormulaireCommentaire(id);
    const elt = document.getElementById("inputFormReservation" + id);
    if (elt != null){
      elt.style.display = "block";
    }
  }

  cacherFormulaireReservation(id: number) {
    this.messageInfo2[id] = '';
    this.messageAlerte[id] = '';
    this.reserverForm.patchValue({
      id: ''
    });
    const elt = document.getElementById("inputFormReservation" + id);
    if (elt != null){
      elt.style.display = "none";
    }
  }

  cacherFormulaireCommentaire(id: number) {
    this.messageInfo2[id] = '';
    this.messageAlerte[id] = '';
    this.commenterForm.patchValue({
      id: '',
      Commentaire: ''
    });
    const elt = document.getElementById("inputFormCommentaire" + id);
    if (elt != null){
      elt.style.display = "none";
    }
  }

  commenterObjet(id: number) {
    this.messageInfo2[id] = '';
    this.messageAlerte[id] = '';
    this.abonneService.verifierAbonne(this.commenterForm.value.id).subscribe((data) => {
      if (data.message === "ok") {
        this.objetService.commenterUnObjet(id, { Commentaire: this.commenterForm.value.Commentaire }).subscribe((commentaire) => {
          this.cacherFormulaireCommentaire(id);
          this.messageInfo2[id] = "Commentaire enregistré et en attente de confirmation";
        });
      } else {
        this.messageAlerte[id] = data.message;
      }
    });
  }

}
