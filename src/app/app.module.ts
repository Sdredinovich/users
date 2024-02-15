import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { usersFeature } from './components/users/store/+state/users.reducer';
import { TodosEffects, UsersEffects } from './components/users/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { todosFeature } from './components/users/store/+state/todo/todos.reducer';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    NoopAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      router: routerReducer,
      [usersFeature.name]: usersFeature.reducer,
      [todosFeature.name]: todosFeature.reducer,
    }),
    EffectsModule.forRoot([UsersEffects, TodosEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
