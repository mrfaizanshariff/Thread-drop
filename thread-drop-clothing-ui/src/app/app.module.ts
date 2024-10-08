import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
// import { EssentialsLayoutComponent } from './layouts/essentials-layout/essentials-layout.component';
import { SignatureLayoutComponent } from './layouts/signature-layout/signature-layout.component';
// import { EliteLayoutComponent } from './layouts/elite-layout/elite-layout.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
// import { PremiumLayoutComponent } from './layouts/premium-layout/premium-layout.component';
import { LuxuryLayoutComponent } from './layouts/luxury-layout/luxury-layout.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FiltersectionComponent } from './shared/components/filtersection/filtersection.component';
import { ProductComponent } from './features/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SignatureLayoutComponent,
    NavbarComponent,
    FooterComponent,
    LuxuryLayoutComponent,
    FiltersectionComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
