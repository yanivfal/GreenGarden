import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {CartComponent} from './components/shopping-cart/cart/cart.component';
import {RegisterComponent} from './components/register/register.component';
import {CheckOutComponent} from './components/shopping-cart/check-out/check-out.component';
import {ProductsResolver} from './services/resolvers/products-resolver';
import {AdminComponent} from './components/admin/admin.component';
import {AuthGuard} from './services/auth.guard';
import {ThankYouComponent} from './components/shopping-cart/check-out/thank-you/thank-you.component';
import {AddProductFormComponent} from './components/admin/add-product-form/add-product-form.component';
import {UserActivityComponent} from './components/admin/user-activity/user-activity.component';
import {PurchasesHistoryComponent} from './components/admin/purchases-history/purchases-history.component';
import {HomeComponent} from './components/home/home.component';
import {ReadmeComponent} from './components/readme/readme.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/shop',
    pathMatch: 'full'
  },
  {
    path: 'readme',
    component: ReadmeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'checkout',
    component: CheckOutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout/thanks',
    component: ThankYouComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    component: ShoppingCartComponent,
    resolve: {
      products: ProductsResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'addProduct', pathMatch: 'full' },
      { path: 'addProduct', component: AddProductFormComponent },
      { path: 'userActivity', component: UserActivityComponent },
      { path: 'purchasesHistory', component: PurchasesHistoryComponent }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    ProductsResolver,
    AuthGuard
  ]
})



export class AppRoutingModule {

}
