import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferentPageRoutingModule } from './referent-routing.module';

import { ReferentPage } from './referent.page';
import { NomPipe } from '../../pipes/nom.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReferentPage, NomPipe]
})
export class ReferentPageModule {}
