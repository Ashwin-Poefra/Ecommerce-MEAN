import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, ShellComponent, SidebarComponent],
    imports: [BrowserModule, RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' })],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
