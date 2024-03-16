import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FamilyService } from '../../core/services/family.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { tap } from 'rxjs';
import { Family } from '../../core/models/family.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgIf, JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  #authService = inject(AuthService);
  #router = inject(Router);

  familyService = inject(FamilyService);

  family:
    | {
        id: string;
        family: Family;
      }
    | undefined;
  user$ = this.#authService.user$.pipe(
    tap((user) => {
      if (user) {
        this.familyService.getFamily(user.uid).then((family) => {
          this.family = family;
        });
      }
    })
  );

  signout() {
    this.#authService.signout().then(() => {
      this.#router.navigate(['']);
    });
  }
}
