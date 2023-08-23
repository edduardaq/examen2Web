import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChoferesModule } from './choferes/choferes.module';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MatSnackBarModule, AppRoutingModule, BrowserAnimationsModule, ChoferesModule, HttpClientModule, FormsModule, ToastrModule.forRoot(),],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
