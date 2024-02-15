import { Component, OnInit } from '@angular/core';
import { Objet } from '../../models/objet';
import { ObjetService } from '../../api/objet.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BibliothecaireService } from 'src/app/api/bibliothecaire.service';

@Component({
  selector: 'app-objetperdu',
  templateUrl: './objetperdu.page.html',
  styleUrls: ['./objetperdu.page.scss'],
})
export class ObjetperduPage implements OnInit {

  idBibliothecaire: number = 0;
  objets: Observable<Array<Objet>>;
  Nom = '';
  Prenom = '';
  messageInfo = '';

  constructor(private objetService: ObjetService,
    private bibliothecaireService: BibliothecaireService) {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.objets = this.objetService.refreshObjets.pipe(switchMap(_ => this.objetService.obtenirTousLesObjetsPerdus()));
  }

  ngOnInit() {
    this.idBibliothecaire = parseInt(this.bibliothecaireService.recupererDonneesJeton().id);
    this.bibliothecaireService.obtenirUnBibliothecaire(this.idBibliothecaire).subscribe(
      (data) => {
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
      }
    );
    this.objets = this.objetService.refreshObjets.pipe(switchMap(_ => this.objetService.obtenirTousLesObjetsPerdus()));
  }


  reintegrerObjet(id: number) {
    this.objetService.reintegrerObjet(id).subscribe(
      () => { },
      (err) => console.log(err),
      () => { setTimeout(() => { this.objetService.refreshObjets.next(true) }, 100); }
    );
  }

  supprimerObjet(id: number) {
    this.objetService.supprimerUnObjet(id).subscribe(
      () => { },
      (err) => console.log(err),
      () => { setTimeout(() => { this.objetService.refreshObjets.next(true) }, 100); }
    );
  }

}
